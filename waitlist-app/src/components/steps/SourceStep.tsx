"use client";

import { Button } from "@/components/Button";
import { SelectField } from "@/components/Fields";
import { StepShell } from "@/components/StepShell";
import { REFERRAL_SOURCES } from "@/lib/options";

export function SourceStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}) {
  return (
    <StepShell
      optional
      title="How did you"
      payload="find us?"
      lede="It tells us where to keep showing up. Skip it if you'd rather not say."
      action={
        <Button block onClick={onNext}>
          {value ? "Continue" : "Skip this one"}
        </Button>
      }
    >
      <SelectField
        label="Where you heard about Fittr"
        placeholder="Select one"
        options={REFERRAL_SOURCES}
        value={value}
        autoFocus
        onChange={(event) => onChange(event.target.value)}
      />
    </StepShell>
  );
}
