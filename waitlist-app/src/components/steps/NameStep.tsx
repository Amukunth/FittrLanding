"use client";

import { useId, useState } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { StepShell } from "@/components/StepShell";
import { isValidName } from "@/lib/validation";

export function NameStep({
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
    if (!isValidName(value)) {
      setError("Enter the name you want on your account — at least two characters.");
      return;
    }
    onNext();
  }

  return (
    <StepShell
      title="What should we"
      payload="call you?"
      lede="This is the name your friends see when you challenge them."
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
          label="Full name"
          type="text"
          autoComplete="name"
          autoFocus
          placeholder="Alex Rivera"
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
