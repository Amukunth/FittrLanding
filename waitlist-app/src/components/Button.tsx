import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  block?: boolean;
};

const BASE =
  "inline-flex items-center justify-center px-8 py-5 font-extrabold uppercase " +
  "tracking-[0.1em] text-sm text-center cursor-pointer select-none " +
  "transition-[background-color,box-shadow,transform,color] duration-150 " +
  "disabled:cursor-not-allowed";

/**
 * Depth is print registration: a solid second ink layer offset down-right with
 * zero blur. It grows on hover and collapses as the button translates into it
 * on press, so the click reads as the two layers meeting.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-voltage text-ink shadow-[5px_5px_0_var(--color-bone)] " +
    "hover:not-disabled:bg-voltage-deep hover:not-disabled:shadow-[7px_7px_0_var(--color-bone)] " +
    "active:not-disabled:translate-x-[3px] active:not-disabled:translate-y-[3px] " +
    "active:not-disabled:shadow-[2px_2px_0_var(--color-bone)] " +
    "disabled:bg-bone-shade disabled:text-ink disabled:shadow-none",
  ghost:
    "bg-transparent text-bone shadow-[inset_0_0_0_2px_var(--color-bone)] " +
    "hover:not-disabled:bg-bone hover:not-disabled:text-ink " +
    "disabled:text-bone-shade disabled:shadow-[inset_0_0_0_2px_var(--color-bone-shade)]",
};

export function Button({
  variant = "primary",
  block = false,
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${block ? "flex w-full" : ""} ${className}`}
      {...props}
    />
  );
}
