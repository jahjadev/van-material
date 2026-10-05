/**
 * Best-effort in-memory rate limiter for public POST endpoints. Ported
 * verbatim (logic unchanged) from the sibling VAN repo's
 * `src/lib/rateLimit.ts`.
 *
 * Scope and honesty about it: state lives in the process, so on serverless
 * each instance keeps its own counters and a determined attacker spread
 * across many cold starts sees a higher effective limit. It still removes
 * the cheap attack — one script hammering one endpoint — which is what
 * actually costs money here (every accepted request sends an email through
 * the company's mailbox and can get the domain rate-limited or blacklisted
 * by its host). If abuse ever gets past this, move the counters to
 * Vercel KV / Upstash.
 */

type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

/** Drop expired buckets so the map can't grow without bound. */
function sweep(now: number) {
  for (const [key, hit] of buckets) {
    if (hit.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets — for the Retry-After header. */
  retryAfter: number;
};

/**
 * Count one hit against `key`. Returns ok:false once `limit` hits have been
 * recorded inside `windowMs`.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Cheap amortised cleanup — only when the map is big enough to matter.
  if (buckets.size > 500) sweep(now);

  const hit = buckets.get(key);

  if (!hit || hit.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  hit.count += 1;

  if (hit.count > limit) {
    return { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

/**
 * Caller IP as seen through the proxy in front of the app. `x-forwarded-for`
 * is spoofable in general, but a correctly configured proxy overwrites it at
 * the edge, so the left-most entry is the real client there. Falls back to a
 * shared bucket when absent, which fails closed-ish: unknown callers share
 * one limit rather than bypassing it.
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
