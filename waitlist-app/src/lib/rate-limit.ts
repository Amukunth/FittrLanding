import "server-only";

/**
 * Fixed-window limiter held in module memory. That is the right scope for this
 * app — one Node process in front of one SQLite file. If this ever moves to
 * serverless or more than one instance, swap the Map for a shared store.
 */
type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
const SWEEP_AFTER = 5000;

/**
 * Escape hatch for the API smoke script, which legitimately makes a burst of
 * signups. Both halves must hold, so a stray env var in production cannot turn
 * the limiter off.
 */
const DISABLED =
  process.env.DISABLE_RATE_LIMIT === "1" &&
  process.env.NODE_ENV !== "production";

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  if (DISABLED) return { allowed: true, retryAfterSeconds: 0 };

  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    if (windows.size > SWEEP_AFTER) sweep(now);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}
