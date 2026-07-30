import { isEmailTaken } from "@/lib/signup";
import { isValidEmail } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Duplicate check for the email step. This does confirm whether an address is
 * already on the list, so it is rate-limited to blunt its use as an
 * enumeration oracle.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`email:${clientKey(request)}`, 20, 60_000);
  if (!limit.allowed) {
    return Response.json(
      { error: "rate_limited", retryAfterSeconds: limit.retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  return Response.json({ taken: await isEmailTaken(email) });
}
