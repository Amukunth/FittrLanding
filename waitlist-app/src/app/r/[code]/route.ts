import { normalizeCode } from "@/lib/referral";

/**
 * Kept alive for referral links shared before the referral programme was
 * withdrawn: those URLs still land on the signup flow rather than a 404. The
 * code is carried through and recorded, but it no longer earns anything.
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
