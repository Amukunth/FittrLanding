"use client";

import { Button } from "@/components/Button";
import { InterestChip } from "@/components/Choice";
import { StepShell } from "@/components/StepShell";
import type { PictogramName } from "@/components/Pictogram";
import { CHALLENGE_INTERESTS } from "@/lib/options";

const ICONS: Record<string, PictogramName> = {
  "Push-ups": "pushup",
  Planks: "plank",
  "Wall Sits": "wallsit",
  Running: "runner",
  Other: "other",
};

export function InterestsStep({
  value,
  onChange,
  onNext,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
}) {
  const chosen = value.length;

  function toggle(interest: string) {
    onChange(
      value.includes(interest)
        ? value.filter((item) => item !== interest)
        : [...value, interest],
    );
  }

  return (
    <StepShell
      optional
      title="What are you"
      payload="here for?"
      lede="Pick as many as you like. It only shapes which contests we open first."
      action={
        <Button block onClick={onNext}>
          {chosen > 0 ? "Continue" : "Skip this one"}
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-3.5">
        {CHALLENGE_INTERESTS.map((interest) => (
          <InterestChip
            key={interest}
            label={interest}
            icon={ICONS[interest]}
            selected={value.includes(interest)}
            onToggle={() => toggle(interest)}
          />
        ))}
      </div>

      <p className="pt-5 text-[0.9375rem] text-bone-shade tabular-nums" aria-live="polite">
        {chosen === 0
          ? "Nothing picked yet."
          : `${chosen} selected.`}
      </p>
    </StepShell>
  );
}
