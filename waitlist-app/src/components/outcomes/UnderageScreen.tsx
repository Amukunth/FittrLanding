"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/Wordmark";

/**
 * A dead end by design. Nothing was sent to the server and no row exists, so
 * there is no "notify me" offer here — collecting a minor's email to contact
 * them later is exactly what the gate is there to prevent.
 */
export function UnderageScreen() {
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
          Come back at
          <span className="text-voltage"> 18.</span>
        </h1>

        <p className="max-w-[46ch] pt-5 text-bone-dim">
          Fittr contests are played for real money, so the law puts a hard floor
          at 18. We haven&apos;t saved anything you entered, and there&apos;s
          nothing for you to do here yet.
        </p>

        <p className="max-w-[46ch] pt-4 text-bone-dim">
          The push-ups still count for something, though. Keep at them.
        </p>
      </div>

      <p className="border-t-2 border-bone-ink pt-5 text-[0.9375rem] text-bone-shade">
        Nothing on this page collected or stored your details.
      </p>
    </div>
  );
}
