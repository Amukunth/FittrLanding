"use client";

import { ProgressRail } from "@/components/ProgressRail";
import { Wordmark } from "@/components/Wordmark";

export function FlowHeader({
  step,
  totalSteps,
  onBack,
}: {
  /** 0 means the welcome screen, which carries no rail. */
  step: number;
  totalSteps: number;
  onBack?: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-bone-ink bg-ink px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
      <div className="flex h-9 items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-mx-2 flex cursor-pointer items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-[0.16em] text-bone-dim transition-colors duration-150 hover:text-bone"
          >
            <svg viewBox="0 0 16 12" aria-hidden="true" className="w-3.5">
              <path
                d="M6 1 L1 6 L6 11 M1 6 H15"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="square"
              />
            </svg>
            Back
          </button>
        ) : (
          <span />
        )}

        <Wordmark className="text-2xl" />
      </div>

      {step > 0 ? (
        <ProgressRail current={step} total={totalSteps} className="pt-4" />
      ) : null}
    </header>
  );
}
