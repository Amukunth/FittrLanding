"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The frame every question screen sits in: question at the top, answer in the
 * middle, commitment pinned to the thumb. Moving between steps does not reload
 * the document, so the new question is focused explicitly — otherwise a screen
 * reader would stay parked on the button that was just pressed.
 */
export function StepShell({
  title,
  payload,
  lede,
  optional = false,
  centered = false,
  children,
  action,
}: {
  title: string;
  /** Trailing words set in voltage — one payload per block, never two. */
  payload?: string;
  lede?: ReactNode;
  optional?: boolean;
  /** For steps that commit on tap and so carry no pinned action bar. */
  centered?: boolean;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div
        className={`flex flex-1 flex-col px-5 pb-10 pt-8 ${
          centered ? "justify-center" : ""
        }`}
      >
        {optional ? (
          <p className="pb-3 text-xs font-bold uppercase tracking-[0.16em] text-voltage">
            Optional
          </p>
        ) : null}

        <h1
          ref={heading}
          tabIndex={-1}
          className="font-display text-[2.5rem] font-extrabold uppercase leading-[0.92] tracking-[-0.015em] text-bone outline-none"
        >
          {title}
          {payload ? <span className="text-voltage"> {payload}</span> : null}
        </h1>

        {lede ? (
          <div className="max-w-[46ch] pt-4 text-bone-dim">{lede}</div>
        ) : null}

        {children ? <div className="pt-8">{children}</div> : null}
      </div>

      {action ? (
        <div className="sticky bottom-0 border-t-2 border-bone-ink bg-ink px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {action}
        </div>
      ) : null}
    </div>
  );
}
