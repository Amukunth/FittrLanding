import { JoinFlow } from "@/components/JoinFlow";
import { normalizeCode } from "@/lib/referral";
import { getWaitlistStats } from "@/lib/signup";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { ref } = await searchParams;
  const raw = Array.isArray(ref) ? ref[0] : ref;

  const stats = await getWaitlistStats();

  return <JoinFlow stats={stats} referredByCode={normalizeCode(raw)} />;
}
