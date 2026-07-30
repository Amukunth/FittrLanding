"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { SelectField } from "@/components/Fields";
import { StepShell } from "@/components/StepShell";
import { US_STATES } from "@/lib/states";

export function StateStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <StepShell
      title="Which state do you"
      payload="play from?"
      lede="Real-money play isn't cleared everywhere yet. This decides whether we can give you a spot or just tell you when your state opens."
      action={
        <Button
          block
          onClick={() => {
            if (!value) {
              setError("Pick your state to carry on.");
              return;
            }
            onNext();
          }}
        >
          Continue
        </Button>
      }
    >
      <SelectField
        label="State"
        placeholder="Select your state"
        options={US_STATES}
        value={value}
        error={error}
        autoFocus
        onChange={(event) => {
          onChange(event.target.value);
          if (error) setError(null);
        }}
      />
    </StepShell>
  );
}
