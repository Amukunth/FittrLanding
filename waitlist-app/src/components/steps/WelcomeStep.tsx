"use client";

import { Button } from "@/components/Button";
import { FilmingScene } from "@/components/Pictogram";
import { BONUS_AMOUNT } from "@/lib/constants";
import type { WaitlistStats } from "@/lib/flow";

export function WelcomeStep({
  stats,
  referrerKnown,
  onStart,
}: {
  stats: WaitlistStats;
  referrerKnown: boolean;
  onStart: () => void;
}) {
  const filled = stats.bonusSpotsFilled;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-5 pb-10 pt-8">
        {referrerKnown ? (
          <p className="mb-6 bg-voltage px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-ink">
            A friend sent you. You both get the launch bonus.
          </p>
        ) : null}

        <h1
          tabIndex={-1}
          className="font-display text-[3.25rem] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-bone outline-none"
        >
          {filled ? (
            <>
              The first 1,000 are in.
              <span className="text-voltage"> The list is still open.</span>
            </>
          ) : (
            <>
              {/* PLACEHOLDER: bonus amount and terms pending confirmation. */}
              First 1,000 people get {BONUS_AMOUNT}.
              <span className="text-voltage"> Free.</span>
            </>
          )}
        </h1>

        <p className="max-w-[46ch] pt-5 text-bone-dim">
          {filled ? (
            <>
              Every bonus spot has been claimed, so there is no {BONUS_AMOUNT} on
              this one — but joining still holds your place in line and gets you
              in on day one.
            </>
          ) : (
            <>
              No deposit, no catch. Answer seven quick questions and the{" "}
              {BONUS_AMOUNT} lands in your account the day we launch.
            </>
          )}
        </p>

        <ul className="max-w-[46ch] space-y-2.5 pt-6 text-[0.9375rem] text-bone-dim">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            About a minute. Two of the seven are optional.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            We check your age and state first, so nobody wastes a signup.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            You get your referral link at the end.
          </li>
        </ul>

        <div className="pt-9">
          {/* PLACEHOLDER: live count comes from the signups table. */}
          <div className="notch-lg on-bone inline-flex items-baseline gap-3 bg-bone px-6 pt-6 pb-[18px] text-ink [filter:drop-shadow(5px_5px_0_var(--color-voltage))]">
            <span className="font-display text-[2.5rem] font-black leading-[0.82] tabular-nums">
              {stats.eligibleCount.toLocaleString("en-US")}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-bone-ink">
              of {stats.cap.toLocaleString("en-US")} spots claimed
            </span>
          </div>
        </div>

        <FilmingScene className="mt-10 w-full" />
      </div>

      <div className="sticky bottom-0 border-t-2 border-bone-ink bg-ink px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <Button block onClick={onStart}>
          Get started
        </Button>
      </div>
    </div>
  );
}
