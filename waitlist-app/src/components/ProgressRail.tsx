/**
 * Seven segments that ink in as the visitor advances. The fill is a scaleX
 * transition from the left edge, so progress reads as ink being laid down on
 * an unprinted rail rather than a bar sliding across a track.
 */
export function ProgressRail({
  current,
  total,
  className = "",
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between pb-2">
        <span className="font-display text-xl font-extrabold uppercase leading-none tracking-[0.02em] text-bone-dim tabular-nums">
          Step {String(current).padStart(2, "0")}
          <span className="text-bone-shade"> / {String(total).padStart(2, "0")}</span>
        </span>
      </div>

      <ol
        className="flex gap-1"
        role="list"
        aria-label={`Step ${current} of ${total}`}
      >
        {Array.from({ length: total }, (_, i) => {
          const index = i + 1;
          const inked = index <= current;
          return (
            <li
              key={index}
              className="h-1.5 flex-1 bg-bone-ink"
              aria-current={index === current ? "step" : undefined}
            >
              <div
                className={`h-full origin-left bg-voltage transition-transform duration-300 ease-snap ${
                  inked ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
