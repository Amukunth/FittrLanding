/**
 * The wordmark is a two-pass print: a voltage plate offset 3px down-right with
 * the bone impression sitting on top of it, slightly out of register.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block font-display font-black leading-none tracking-[0.01em] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-[3px] translate-y-[3px] text-voltage"
      >
        FITTR
      </span>
      <span className="relative text-bone">FITTR</span>
    </span>
  );
}
