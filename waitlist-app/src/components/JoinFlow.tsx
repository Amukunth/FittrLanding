"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FlowHeader } from "@/components/FlowHeader";
import { AgeStep } from "@/components/steps/AgeStep";
import { EmailStep } from "@/components/steps/EmailStep";
import { NameStep } from "@/components/steps/NameStep";
import { PhoneStep } from "@/components/steps/PhoneStep";
import { TermsStep } from "@/components/steps/TermsStep";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { SuccessScreen } from "@/components/outcomes/SuccessScreen";
import { UnderageScreen } from "@/components/outcomes/UnderageScreen";
import {
  EMPTY_FLOW,
  QUESTION_STEPS,
  TOTAL_STEPS,
  type FlowData,
  type Outcome,
  type SignupResult,
  type WaitlistStats,
} from "@/lib/flow";

const STORAGE_KEY = "fittr.waitlist.progress";

export function JoinFlow({
  stats,
  referredByCode,
}: {
  stats: WaitlistStats;
  referredByCode: string | null;
}) {
  // 0 is the welcome screen; 1…4 map onto QUESTION_STEPS.
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"fwd" | "back">("fwd");
  const [data, setData] = useState<FlowData>(EMPTY_FLOW);

  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [result, setResult] = useState<SignupResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restored = useRef(false);

  // Answers survive an accidental refresh mid-flow. Read after mount so the
  // server and client render the same first frame.
  useEffect(() => {
    restored.current = true;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { step: number; data: FlowData };
      if (parsed.step > 0 && parsed.step <= TOTAL_STEPS) {
        setData({ ...EMPTY_FLOW, ...parsed.data });
        setStep(parsed.step);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    if (outcome) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
  }, [step, data, outcome]);

  const patch = useCallback(
    (changes: Partial<FlowData>) => setData((prev) => ({ ...prev, ...changes })),
    [],
  );

  const goNext = useCallback(() => {
    setDirection("fwd");
    setStep((current) => current + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection("back");
    setStep((current) => Math.max(0, current - 1));
  }, []);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          phone: data.phone,
          ageConfirmed: true,
          termsAgreed: true,
          referredByCode,
        }),
      });

      if (response.status === 409) {
        setError("That email is already on the list — you're in already.");
        return;
      }
      if (response.status === 429) {
        setError("Too many tries just now. Give it a minute and try again.");
        return;
      }
      if (!response.ok) {
        setError("That didn't go through. Try once more.");
        return;
      }

      const { signup } = (await response.json()) as { signup: SignupResult };
      setResult(signup);
      setOutcome("success");
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (outcome === "underage") return <Frame><UnderageScreen /></Frame>;

  if (outcome === "success" && result) {
    return (
      <Frame>
        <SuccessScreen signup={result} />
      </Frame>
    );
  }

  const name = step === 0 ? null : QUESTION_STEPS[step - 1];

  return (
    <Frame>
      <FlowHeader
        step={step}
        totalSteps={TOTAL_STEPS}
        onBack={step > 0 ? goBack : undefined}
      />

      {/* Remounting on the key replays the entrance in the travel direction. */}
      <div
        key={step}
        className={`flex flex-1 flex-col ${
          direction === "fwd" ? "animate-step-fwd" : "animate-step-back"
        }`}
      >
        {name === null ? (
          <WelcomeStep stats={stats} onStart={goNext} />
        ) : name === "email" ? (
          <EmailStep
            value={data.email}
            onChange={(email) => patch({ email })}
            onNext={goNext}
          />
        ) : name === "age" ? (
          <AgeStep
            onAnswer={(isAdult) => {
              patch({ ageConfirmed: isAdult });
              if (isAdult) goNext();
              else setOutcome("underage");
            }}
          />
        ) : name === "name" ? (
          <NameStep
            value={data.name}
            onChange={(value) => patch({ name: value })}
            onNext={goNext}
          />
        ) : name === "phone" ? (
          <PhoneStep
            value={data.phone}
            onChange={(value) => patch({ phone: value })}
            onNext={goNext}
          />
        ) : (
          <TermsStep
            agreed={data.termsAgreed}
            onChange={(termsAgreed) => patch({ termsAgreed })}
            onSubmit={() => void handleSubmit()}
            submitting={submitting}
            error={error}
          />
        )}
      </div>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col border-bone-ink sm:border-x-2">
      {children}
    </div>
  );
}
