"use client";

import { Button } from "@/components/Button";
import { FilmingScene } from "@/components/Pictogram";
import type { WaitlistStats } from "@/lib/flow";

export function WelcomeStep({
  stats,
  onStart,
}: {
  stats: WaitlistStats;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-5 pb-10 pt-8">
        <h1
          tabIndex={-1}
          className="font-display text-[3.25rem] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-bone outline-none"
        >
          Join the <span className="text-voltage">Fittr waitlist.</span>
        </h1>

        <p className="max-w-[46ch] pt-5 text-bone-dim">
          A few quick questions and you&apos;re on the list.
        </p>

        {/* The live count, same social proof the landing page leads with. */}
        <p className="pt-5 font-display text-2xl font-extrabold uppercase leading-none tabular-nums text-bone">
          {stats.eligibleCount.toLocaleString("en-US")}{" "}
          <span className="text-bone-dim">on the waitlist</span>
        </p>

        <ul className="max-w-[46ch] space-y-2.5 pt-6 text-[0.9375rem] text-bone-dim">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            Less than a minute.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            We check your age first, so nobody wastes a signup.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-voltage">
              /
            </span>
            One email from us, on the day the app goes live.
          </li>
        </ul>

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
