"use client";

import { Pictogram, type PictogramName } from "@/components/Pictogram";

/**
 * A full-width answer. Big enough to hit without aiming, and it commits the
 * answer on tap — the flow advances rather than waiting for a separate Next.
 */
export function OptionButton({
  label,
  detail,
  onClick,
  selected = false,
}: {
  label: string;
  detail?: string;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full cursor-pointer items-center justify-between gap-4 border-2 px-6 py-6 text-left transition-[background-color,border-color,box-shadow,color] duration-150 ${
        selected
          ? "border-voltage bg-voltage text-ink shadow-[5px_5px_0_var(--color-bone)]"
          : "border-bone-shade bg-ink text-bone hover:border-bone hover:bg-ink-deep"
      }`}
    >
      <span>
        <span className="block font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.01em]">
          {label}
        </span>
        {detail ? (
          <span
            className={`mt-1.5 block text-[0.9375rem] leading-snug ${
              selected ? "text-voltage-shade" : "text-bone-dim"
            }`}
          >
            {detail}
          </span>
        ) : null}
      </span>

      {/* The mark prints only once the answer is chosen. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`w-6 shrink-0 ${selected ? "text-ink" : "text-transparent"}`}
      >
        <path
          d="M3 13 L9 19 L21 5"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}

/** Multi-select tile: pictogram over label, voltage plate when chosen. */
export function InterestChip({
  label,
  icon,
  selected,
  onToggle,
}: {
  label: string;
  icon: PictogramName;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex cursor-pointer flex-col items-start gap-4 border-2 px-5 py-5 transition-[background-color,border-color,box-shadow,color] duration-150 ${
        selected
          ? "border-voltage bg-voltage text-ink shadow-[5px_5px_0_var(--color-bone)]"
          : "border-bone-shade bg-ink text-bone hover:border-bone hover:bg-ink-deep"
      }`}
    >
      <Pictogram name={icon} className="w-11" />
      <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.01em]">
        {label}
      </span>
    </button>
  );
}
