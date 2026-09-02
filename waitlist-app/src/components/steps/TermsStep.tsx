"use client";

import { useId, useState } from "react";
import { Button } from "@/components/Button";
import { StepShell } from "@/components/StepShell";
import {
  BONUS_AMOUNT,
  REFERRAL_BONUS_AMOUNT,
  REFERRAL_BONUS_MAX_REFERRALS,
  REFERRAL_BONUS_MAX_TOTAL,
} from "@/lib/constants";
import { LEGAL_SECTIONS } from "@/lib/legal-placeholder";

/**
 * The plain-language summary is the part a person actually reads, so it leads
 * at full size on a bone plate. The long form sits beneath it, scrollable —
 * the full Waitlist Terms of Service, sourced in lib/legal-placeholder.ts.
 */
export function TermsStep({
  agreed,
  onChange,
  onSubmit,
  submitting,
  error,
}: {
  agreed: boolean;
  onChange: (agreed: boolean) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const checkboxId = useId();
  const [attempted, setAttempted] = useState(false);

  const summary = [
    `The ${BONUS_AMOUNT} is paid only if the app launches.`,
    `It is Fittr in-app credit, not cash — usable only inside the app, never withdrawn.`,
    `It is credited after launch, not immediately.`,
    `Limited to the first 1,000 eligible signups.`,
    `Only available in eligible states.`,
    `Referrals earn ${REFERRAL_BONUS_AMOUNT} in-app credit each, up to ${REFERRAL_BONUS_MAX_REFERRALS} (${REFERRAL_BONUS_MAX_TOTAL} total) — also non-withdrawable.`,
    `One bonus per person — duplicate or fraudulent signups are voided.`,
  ];

  return (
    <StepShell
      title="Before you're in,"
      payload="the deal."
      action={
        <>
          <Button
            block
            onClick={() => {
              setAttempted(true);
              if (agreed) onSubmit();
            }}
            disabled={!agreed || submitting}
          >
            {submitting ? "Locking in your place…" : "Claim my place"}
          </Button>

          <p
            role="alert"
            className="pt-3 text-center text-sm font-bold text-voltage"
          >
            {error ?? (attempted && !agreed ? "Tick the box to carry on." : "")}
          </p>
        </>
      }
    >
      {/* a) the short version, at a size that expects to be read */}
      <div className="on-bone notch-lg bg-bone px-6 py-7 text-ink">
        <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.01em]">
          The short version
        </h2>
        <ul className="space-y-4 pt-5">
          {summary.map((line) => (
            <li key={line} className="flex gap-3.5 text-[1.0625rem] leading-snug">
              <span aria-hidden="true" className="font-black text-voltage-shade">
                /
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* b) the long version */}
      <div className="pt-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-bone-shade">
          Full waitlist terms
        </h2>

        <div
          tabIndex={0}
          role="region"
          aria-label="Full waitlist terms, scrollable"
          className="mt-3 max-h-72 overflow-y-auto border-2 border-bone-ink bg-ink-deep px-5 py-5"
        >
          <p className="border-2 border-voltage px-4 py-3 text-sm font-bold uppercase leading-snug tracking-[0.04em] text-voltage">
            Waitlist Terms of Service — Dawgear, LLC. Last updated August 31,
            2026.
          </p>

          {LEGAL_SECTIONS.map((section, index) => (
            <section key={section.heading} className="pt-6">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-bone tabular-nums">
                {index + 1}. {section.heading}
              </h3>
              {section.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="pt-2.5 text-[0.9375rem] leading-relaxed text-bone-dim"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* c) the gate */}
      <label
        htmlFor={checkboxId}
        className="mt-7 flex cursor-pointer items-start gap-4"
      >
        <span className="relative mt-0.5 shrink-0">
          <input
            id={checkboxId}
            type="checkbox"
            checked={agreed}
            onChange={(event) => onChange(event.target.checked)}
            className="peer h-7 w-7 cursor-pointer appearance-none border-2 border-bone bg-ink checked:border-voltage checked:bg-voltage"
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 m-auto w-4 text-ink opacity-0 peer-checked:opacity-100"
          >
            <path
              d="M3 13 L9 19 L21 5"
              fill="none"
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="square"
            />
          </svg>
        </span>

        <span className="text-[1.0625rem] leading-snug text-bone">
          I have read and agree to the Waitlist Terms
        </span>
      </label>
    </StepShell>
  );
}
