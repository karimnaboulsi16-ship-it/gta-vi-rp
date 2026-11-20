import type { IncomingMessage, ServerResponse } from 'node:http';

const META_PIXEL_ID = process.env.META_PIXEL_ID || '1466091202363408';
const META_GRAPH_VERSION = 'v21.0';
const ALLOWED_EVENTS = new Set(['PageView', 'ViewContent', 'InitiateCheckout', 'Lead']);

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

interface MetaCapiBody {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
}

async function parseJsonBody(req: VercelRequest): Promise<MetaCapiBody> {
  if (req.body && typeof req.body === 'object') {
    return req.body as MetaCapiBody;
  }
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as MetaCapiBody;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? (JSON.parse(raw) as MetaCapiBody) : {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  try {
    const token = process.env.META_CONVERSIONS_API_TOKEN;
    if (!token) {
      res.status(200).json({ ok: false, skipped: 'missing_token' });
      return;
    }

    const body = await parseJsonBody(req);
    const eventName = typeof body.eventName === 'string' ? body.eventName.trim() : '';
    const eventId = typeof body.eventId === 'string' ? body.eventId.trim() : '';

    if (!ALLOWED_EVENTS.has(eventName) || !eventId) {
      res.status(400).json({ ok: false, error: 'invalid_event_payload' });
      return;
    }

    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0].trim()
        : req.socket?.remoteAddress || undefined;

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

    const metaJson = (await metaRes.json().catch(() => ({}))) as { events_received?: number };
    if (!metaRes.ok) {
      res.status(200).json({ ok: false, status: metaRes.status });
      return;
    }

    res.status(200).json({ ok: true, events_received: metaJson.events_received ?? 1 });
  } catch {
    res.status(200).json({ ok: false, error: 'internal_error' });
  }
}
