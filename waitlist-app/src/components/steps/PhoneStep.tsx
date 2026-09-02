"use client";

import { useId, useState } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { StepShell } from "@/components/StepShell";
import { isValidPhone } from "@/lib/validation";

export function PhoneStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}) {
  const formId = useId();
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (!isValidPhone(value)) {
      setError("Enter a 10-digit US phone number.");
      return;
    }
    onNext();
  }

  return (
    <StepShell
      title="Best number"
      payload="to reach you?"
      lede="One text on launch day — nothing else, and never sold on."
      action={
        <Button block type="submit" form={formId}>
          Continue
        </Button>
      }
    >
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <TextField
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          autoFocus
          placeholder="(555) 555-0123"
          value={value}
          error={error}
          onChange={(event) => {
            onChange(event.target.value);
            if (error) setError(null);
          }}
        />
      </form>
    </StepShell>
  );
}
