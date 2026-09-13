/**
 * Einfaches Sliding-Window-Rate-Limit im Prozessspeicher.
 *
 * Hinweis: In Serverless-Umgebungen (Vercel) gilt der Speicher pro Instanz – das
 * Limit ist damit ein Grundschutz gegen Formular-Spam, kein harter Schutz gegen
 * verteilte Angriffe. Für höhere Anforderungen kann hier ein Redis-/Upstash-Adapter
 * eingehängt werden, ohne den Rest des Codes zu ändern.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
/** Maximale Anfragen je IP-Hash und Fenster – per `LEAD_RATE_LIMIT_MAX` anpassbar (z. B. für Tests). */
const MAX_REQUESTS = Math.max(1, Number(process.env.LEAD_RATE_LIMIT_MAX) || 5);
const MAX_KEYS = 5000;

function cleanup(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  cleanup(now);
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    const oldest = bucket.timestamps[0] ?? now;
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Client-Kennung aus IP hashen – die IP selbst wird nie gespeichert. */
export async function hashIdentifier(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}
