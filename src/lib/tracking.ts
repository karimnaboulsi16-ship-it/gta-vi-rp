declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    pixelId?: string;
    __lowtrackLoaded?: boolean;
    __metaPixelInitialized?: boolean;
    __metaPageViewEventId?: string;
    __metaPageViewCapiSent?: boolean;
  }
}

export type MetaEventName = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Lead';

const firedOnceKeys = new Set<string>();
const lastFiredTimestamps = new Map<string, number>();

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function getFbcCookie(): string | undefined {
  const existing = getCookie('_fbc');
  if (existing) return existing;
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

function createEventId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function sendCapiEvent(payload: {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
}) {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([serialized], { type: 'application/json' });
    const queued = navigator.sendBeacon('/api/meta-capi', blob);
    if (queued) return;
  }

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: serialized,
    keepalive: true,
  }).catch(() => {
    // Non-blocking telemetry
  });
}

/**
 * Syncs the initial browser PageView (already fired once in index.html)
 * to Meta Conversions API using the exact same event_id for deduplication.
 */
export function syncInitialPageViewCapi() {
  if (typeof window === 'undefined') return;
  if (window.__metaPageViewCapiSent) return;
  window.__metaPageViewCapiSent = true;

  const eventId = window.__metaPageViewEventId || createEventId('pv');

  sendCapiEvent({
    eventName: 'PageView',
    eventId,
    eventSourceUrl: window.location.href,
    fbp: getCookie('_fbp'),
    fbc: getFbcCookie(),
  });
}

/**
 * Fires a Meta Browser Pixel event and matching CAPI server event with the same event_id,
 * preventing double-counting in Meta Events Manager.
 */
export function trackMetaEvent(
  eventName: MetaEventName,
  customData?: Record<string, unknown>,
  options?: { onceKey?: string; cooldownMs?: number }
) {
  if (typeof window === 'undefined') return;

  if (options?.onceKey) {
    if (firedOnceKeys.has(options.onceKey)) return;
    firedOnceKeys.add(options.onceKey);
  }

  if (options?.cooldownMs) {
    const now = Date.now();
    const last = lastFiredTimestamps.get(eventName) ?? 0;
    if (now - last < options.cooldownMs) return;
    lastFiredTimestamps.set(eventName, now);
  }

  const eventId = createEventId(eventName.toLowerCase());

  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, customData ?? {}, { eventID: eventId });
  }

  sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl: window.location.href,
    fbp: getCookie('_fbp'),
    fbc: getFbcCookie(),
    customData,
  });
}
