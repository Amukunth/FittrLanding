import { getWaitlistStats } from "@/lib/signup";

/** Live counts. Never cached — the whole point is that the number moves. */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getWaitlistStats());
}
