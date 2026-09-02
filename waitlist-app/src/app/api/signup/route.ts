import { createSignup } from "@/lib/signup";
import { clientKey, rateLimit } from "@/lib/rate-limit";

type Body = {
  email?: unknown;
  name?: unknown;
  phone?: unknown;
  ageConfirmed?: unknown;
  termsAgreed?: unknown;
  referredByCode?: unknown;
};

export async function POST(request: Request) {
  const limit = rateLimit(`signup:${clientKey(request)}`, 10, 60_000);
  if (!limit.allowed) {
    return Response.json(
      { error: "rate_limited", retryAfterSeconds: limit.retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (
    typeof body.email !== "string" ||
    typeof body.name !== "string" ||
    typeof body.phone !== "string"
  ) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // The age gate is enforced server-side too: a request that does not carry an
  // explicit confirmation is refused rather than defaulted.
  if (body.ageConfirmed !== true) {
    return Response.json({ error: "age_not_confirmed" }, { status: 403 });
  }

  const result = await createSignup({
    email: body.email,
    name: body.name,
    phone: body.phone,
    ageConfirmed: true,
    termsAgreed: body.termsAgreed === true,
    referredByCode:
      typeof body.referredByCode === "string" ? body.referredByCode : null,
  });

  if (!result.ok) {
    const status = result.reason === "duplicate_email" ? 409 : 400;
    return Response.json({ error: result.reason }, { status });
  }

  return Response.json({ signup: result.signup }, { status: 201 });
}
