import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SuccessScreen } from "@/components/outcomes/SuccessScreen";
import { getSignupByCode } from "@/lib/signup";

export const metadata: Metadata = {
  title: "Your place in line — Fittr",
  robots: { index: false, follow: false },
};

/** The return visit: same confirmation screen, now with a live referral count. */
export default async function StatusPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const signup = await getSignupByCode(code);

  if (!signup || signup.status !== "eligible") notFound();

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col border-bone-ink sm:border-x-2">
      <SuccessScreen signup={signup} returning />
    </div>
  );
}
