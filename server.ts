import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const META_PIXEL_ID = process.env.META_PIXEL_ID || '1466091202363408';
const META_GRAPH_VERSION = 'v21.0';

// Server-side deduplication cache so identical eventIds cannot be forwarded twice
const sentEventIds = new Set<string>();

function rememberEventId(eventId: string): boolean {
  if (sentEventIds.has(eventId)) {
    return false;
  }
  if (sentEventIds.size >= 5000) {
    const oldest = sentEventIds.values().next().value;
    if (oldest) sentEventIds.delete(oldest);
  }
  sentEventIds.add(eventId);
  return true;
}

interface MetaCapiBody {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
}

const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'InitiateCheckout',
  'Lead',
]);

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '64kb' }));

  // Meta Conversions API proxy endpoint (keeps token strictly on the server)
  app.post('/api/meta-capi', async (req: Request, res: Response) => {
    try {
      const token = process.env.META_CONVERSIONS_API_TOKEN;
      if (!token) {
        return res.status(200).json({ ok: false, skipped: 'missing_token' });
      }

      const body = (req.body || {}) as MetaCapiBody;
      const eventName = typeof body.eventName === 'string' ? body.eventName.trim() : '';
      const eventId = typeof body.eventId === 'string' ? body.eventId.trim() : '';

      if (!ALLOWED_EVENTS.has(eventName) || !eventId) {
        return res.status(400).json({ ok: false, error: 'invalid_event_payload' });
      }

      // Prevent duplicate server dispatch for the same event_id
      if (!rememberEventId(`${eventName}:${eventId}`)) {
        return res.status(200).json({ ok: true, deduplicated: true });
      }

      const forwardedFor = req.headers['x-forwarded-for'];
      const clientIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : typeof forwardedFor === 'string'
          ? forwardedFor.split(',')[0].trim()
          : req.socket.remoteAddress || undefined;

      const userAgent =
        typeof req.headers['user-agent'] === 'string'
          ? req.headers['user-agent']
          : undefined;

      const userData: Record<string, string> = {};
      if (clientIp) userData.client_ip_address = clientIp;
      if (userAgent) userData.client_user_agent = userAgent;
      if (typeof body.fbp === 'string' && body.fbp) userData.fbp = body.fbp;
      if (typeof body.fbc === 'string' && body.fbc) userData.fbc = body.fbc;

      const eventPayload: Record<string, unknown> = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_id: eventId,
        user_data: userData,
      };

      if (typeof body.eventSourceUrl === 'string' && body.eventSourceUrl) {
        eventPayload.event_source_url = body.eventSourceUrl;
      }

      if (body.customData && typeof body.customData === 'object' && Object.keys(body.customData).length > 0) {
        eventPayload.custom_data = body.customData;
      }

      const endpoint = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

      const metaRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventPayload] }),
      });

      const metaJson = await metaRes.json().catch(() => ({}));
      if (!metaRes.ok) {
        console.error('[Meta CAPI] Error response:', metaRes.status, metaJson);
        return res.status(200).json({ ok: false, status: metaRes.status });
      }

      return res.status(200).json({ ok: true, events_received: metaJson.events_received ?? 1 });
    } catch (err) {
      console.error('[Meta CAPI] Unexpected error:', err);
      return res.status(200).json({ ok: false, error: 'internal_error' });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const isProd =
    process.env.NODE_ENV === 'production' ||
    (fs.existsSync(distPath) && process.env.npm_lifecycle_event === 'start');

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });

    app.get('/@vite/client', async (_req: Request, res: Response, next) => {
      try {
        const result = await vite.transformRequest('/@vite/client');
        if (!result) return next();
        const code = result.code.replace(
          'transport.connect(createHMRHandler(handleMessage));',
          '/* HMR WebSocket disabled */'
        );
        res.setHeader('Content-Type', 'application/javascript');
        return res.send(code);
      } catch {
        return next();
      }
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );
    app.use(
      express.static(distPath, {
        maxAge: '1h',
        index: false,
      })
    );
    app.get('*', (_req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
