"use client";

import { useId, useState } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { StepShell } from "@/components/StepShell";
import { isValidEmail } from "@/lib/validation";

export function EmailStep({
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
  const [checking, setChecking] = useState(false);

  async function submit() {
    const email = value.trim();

    if (!email) {
      setError("Enter your email so we can send your invite.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("That address is missing an @ or a domain — check it and try again.");
      return;
    }

    setChecking(true);
    setError(null);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 429) {
        setError("Too many tries just now. Give it a minute and try again.");
        return;
      }
      if (!response.ok) {
        setError("We couldn't check that address. Try once more.");
        return;
      }

      const { taken } = (await response.json()) as { taken: boolean };
      if (taken) {
        setError("That email is already on the list — you're in already.");
        return;
      }

      onNext();
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <StepShell
      title="Where do we send"
      payload="your invite?"
      lede="One email at launch. That's the only one you'll get from us."
      action={
        // Associated with the form by id, so Enter in the field and a tap on
        // the pinned button are the same submit — and there is only ever one
        // control named "Continue".
        <Button block type="submit" form={formId} disabled={checking}>
          {checking ? "Checking…" : "Continue"}
        </Button>
      }
    >
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <TextField
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          spellCheck={false}
          placeholder="you@example.com"
          value={value}
          error={error}
          disabled={checking}
          onChange={(event) => {
            onChange(event.target.value);
            if (error) setError(null);
          }}
        />
      </form>
    </StepShell>
  );
}
