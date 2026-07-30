"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import { Wordmark } from "@/components/Wordmark";

export type CaptureState = "saving" | "saved" | "already" | "failed";

/**
 * The flow stops here, but the email is still worth keeping — this visitor
 * asked to be told when their state opens. The capture runs in the background
 * and reports honestly, including when it fails.
 */
export function RestrictedScreen({
  state,
  email,
  capture,
  onRetry,
}: {
  state: string;
  email: string;
  capture: CaptureState;
  onRetry: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus({ preventScroll: true }), []);

  return (
    <div className="flex flex-1 flex-col px-5 pb-12 pt-8">
      <Wordmark className="text-2xl" />

      <div className="flex flex-1 flex-col justify-center py-14">
        <h1
          ref={heading}
          tabIndex={-1}
          className="font-display text-[2.75rem] font-extrabold uppercase leading-[0.92] tracking-[-0.015em] text-bone outline-none"
        >
          Not in {state}
          <span className="text-voltage"> yet.</span>
        </h1>

        <p className="max-w-[46ch] pt-5 text-bone-dim">
          Real-money contests aren&apos;t cleared in {state}, so we can&apos;t
          give you a place in line or a launch bonus. That rule is the state
          line, not you.
        </p>

        <div className="mt-8 border-2 border-bone-ink bg-ink-deep px-5 py-5">
          <p
            className="text-[0.9375rem] leading-snug"
            aria-live="polite"
          >
            {capture === "saving" ? (
              <span className="text-bone-dim">Saving your email…</span>
            ) : capture === "saved" || capture === "already" ? (
              <span className="text-bone">
                <span className="font-bold text-voltage">
                  {capture === "already" ? "Already on the list." : "You're on the notify list."}
                </span>{" "}
                We&apos;ll email {email} the day {state} opens up — and nothing
                else.
              </span>
            ) : (
              <span className="text-bone">
                We couldn&apos;t save your email just now.
              </span>
            )}
          </p>

          {capture === "failed" ? (
            <Button variant="ghost" className="mt-4" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
        </div>
      </div>

      <p className="border-t-2 border-bone-ink pt-5 text-[0.9375rem] text-bone-shade">
        {/* PLACEHOLDER: the restricted-state list is provisional and pending
            gaming-counsel review. */}
        State availability is provisional and may change before launch.
      </p>
    </div>
  );
}
