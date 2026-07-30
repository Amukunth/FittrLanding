"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { useId } from "react";

const LABEL =
  "block text-xs font-bold uppercase tracking-[0.16em] text-bone-shade";

/**
 * Focus thickens the rule to an effective 3px via an inset ring on top of the
 * 2px border, rather than animating border-width, which would shift layout.
 * Error state moves the rule to voltage — this system has no red.
 */
const CONTROL =
  "w-full border-2 bg-ink px-[18px] py-5 text-bone " +
  "transition-[border-color,box-shadow] duration-150 " +
  "focus:outline-none focus:border-voltage focus:shadow-[inset_0_0_0_1px_var(--color-voltage)] " +
  "disabled:border-bone-shade disabled:text-bone-shade disabled:cursor-not-allowed";

export function TextField({
  label,
  error,
  hint,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={className}>
      <label className={LABEL} htmlFor={id}>
        {label}
      </label>

      {hint ? (
        <p id={hintId} className="pt-1.5 text-[0.9375rem] text-bone-dim">
          {hint}
        </p>
      ) : null}

      <input
        id={id}
        className={`${CONTROL} mt-2.5 placeholder:text-bone-shade ${
          error ? "border-voltage" : "border-bone"
        }`}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...props}
      />

      <p
        id={errorId}
        role="alert"
        className={`text-sm font-bold text-voltage ${error ? "pt-2.5" : ""}`}
      >
        {error ?? ""}
      </p>
    </div>
  );
}

export function SelectField({
  label,
  error,
  placeholder,
  options,
  className = "",
  ...props
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  error?: string | null;
  placeholder: string;
  options: readonly string[];
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label className={LABEL} htmlFor={id}>
        {label}
      </label>

      <div className="relative mt-2.5">
        <select
          id={id}
          // The native picker is the right control on a phone; color-scheme
          // makes the OS render its list on dark stock instead of white.
          className={`${CONTROL} appearance-none pr-14 [color-scheme:dark] ${
            error ? "border-voltage" : "border-bone"
          } ${props.value ? "text-bone" : "text-bone-shade"}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* 45° edges, like every other diagonal in the system. */}
        <svg
          viewBox="0 0 12 6"
          className="pointer-events-none absolute right-[18px] top-1/2 w-3 -translate-y-1/2 text-voltage"
          aria-hidden="true"
        >
          <path d="M0 0 H12 L6 6 Z" fill="currentColor" />
        </svg>
      </div>

      <p
        id={errorId}
        role="alert"
        className={`text-sm font-bold text-voltage ${error ? "pt-2.5" : ""}`}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
