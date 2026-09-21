"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/Wordmark";
import type { SignupResult } from "@/lib/flow";

export function SuccessScreen({
  signup,
  returning = false,
}: {
  signup: SignupResult;
  returning?: boolean;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  const statusPath = `/status/${signup.referralCode}`;

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-5 pt-8">
        <Wordmark className="text-2xl" />
      </div>

      {/* ── the confirmation ─────────────────────────────────────── */}
      <div className="px-5 pt-10">
        <div className="relative">
          <div className="on-bone notch-lg bg-bone px-6 pt-7 pb-8 text-ink [filter:drop-shadow(5px_5px_0_var(--color-voltage))]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone-ink">
              {returning ? "Your place in line" : "You're on the waitlist"}
            </p>

            <p className="pt-3 font-display text-[4.5rem] font-black leading-[0.8] tabular-nums">
              {signup.waitlistPosition !== null
                ? `#${signup.waitlistPosition.toLocaleString("en-US")}`
                : "—"}
            </p>

            <h1
              ref={heading}
              tabIndex={-1}
              className="pt-4 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.01em] outline-none"
            >
              {signup.name ? `Nice work, ${signup.name.split(" ")[0]}.` : "You're in."}
            </h1>
          </div>

          {/* The stamp: the landing page's verification mark, landing on the
              one moment in this flow that is worth stamping. */}
          {!returning ? (
            <span className="notch-sm pointer-events-none absolute -top-4 right-1 animate-stamp bg-voltage px-4 py-2 font-display text-xl font-black uppercase leading-none tracking-[0.04em] text-ink">
              Confirmed
            </span>
          ) : null}
        </div>
      </div>

      <div className="px-5 py-9">
        <p className="text-[0.9375rem] leading-relaxed text-bone-shade">
          We sent nothing to your inbox yet. The next email you get from us is
          the one that says the app is live.
        </p>
        <p className="pt-4 text-[0.9375rem] leading-relaxed text-bone-shade">
          Keep this link to check your place in line:{" "}
          <a
            className="font-bold text-voltage underline underline-offset-4"
            href={statusPath}
          >
            {statusPath}
          </a>
        </p>
      </div>
    </div>
  );
}
