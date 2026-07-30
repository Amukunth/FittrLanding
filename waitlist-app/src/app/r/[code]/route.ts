import { normalizeCode } from "@/lib/referral";

/**
 * The shareable link. It only carries the code into the flow — the referral is
 * not credited until that visitor actually signs up, and only if the code
 * matches a real account.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  const normalized = normalizeCode(code);

  const target = new URL("/join", request.url);
  if (normalized) target.searchParams.set("ref", normalized);

  return Response.redirect(target, 307);
}
