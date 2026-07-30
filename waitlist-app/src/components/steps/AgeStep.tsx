"use client";

import { OptionButton } from "@/components/Choice";
import { StepShell } from "@/components/StepShell";

/**
 * The gate. Answering "no" ends the flow in the browser — nothing is sent and
 * no row is written, so an under-18 visitor leaves no record behind.
 */
export function AgeStep({
  onAnswer,
}: {
  onAnswer: (isAdult: boolean) => void;
}) {
  return (
    <StepShell
      centered
      title="Are you"
      payload="18 or older?"
      lede="Real-money contests are 18+. We ask before anything else so nobody fills in a form they can't use."
    >
      <div className="space-y-4">
        <OptionButton label="Yes, I'm 18+" onClick={() => onAnswer(true)} />
        <OptionButton label="No, I'm under 18" onClick={() => onAnswer(false)} />
      </div>
    </StepShell>
  );
}
