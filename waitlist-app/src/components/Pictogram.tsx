/**
 * The landing page's hero scene: a push-up held at the top while a tripod
 * phone films it, tracking brackets locked around the body. Reused here so the
 * flow opens on the same image the visitor arrived from.
 */
export function FilmingScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 420"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="A person holding the top of a push-up while a phone on a tripod films them, with camera tracking brackets locked around their body."
    >
      <g>
        <path d="M796 196 L100 24 L100 372 Z" fill="var(--color-voltage)" opacity={0.08} />
        <path d="M796 196 L100 24" stroke="var(--color-voltage)" strokeWidth={2.5} opacity={0.22} />
        <path d="M796 196 L100 372" stroke="var(--color-voltage)" strokeWidth={2.5} opacity={0.22} />
      </g>

      <path d="M40 348 H860" stroke="var(--color-bone)" strokeWidth={4} opacity={0.4} />
      <g stroke="var(--color-bone)" strokeWidth={3} opacity={0.14}>
        <path d="M80 348 l-24 32" />
        <path d="M170 348 l-24 32" />
        <path d="M260 348 l-24 32" />
        <path d="M350 348 l-24 32" />
        <path d="M440 348 l-24 32" />
        <path d="M530 348 l-24 32" />
        <path d="M620 348 l-24 32" />
        <path d="M710 348 l-24 32" />
        <path d="M800 348 l-24 32" />
      </g>

      <g
        stroke="var(--color-bone-shade)"
        strokeWidth={24}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M292 186 V344" />
        <path d="M500 246 L622 300 L642 344" />
      </g>
      <g
        stroke="var(--color-bone)"
        strokeWidth={30}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M236 166 L204 154" />
        <path d="M236 166 L500 240 L662 296" />
        <path d="M662 296 L700 344" />
        <path d="M236 166 V344" />
      </g>
      <circle cx={172} cy={140} r={33} fill="var(--color-bone)" />
      <circle cx={236} cy={344} r={16} fill="var(--color-bone)" />

      <g>
        <g stroke="var(--color-voltage)" strokeWidth={7} strokeLinecap="round" fill="none">
          <path d="M800 222 V262" />
          <path d="M800 258 L768 344" />
          <path d="M800 258 L832 344" />
        </g>
        <g transform="rotate(-8 802 196)">
          <rect x={774} y={140} width={56} height={112} fill="var(--color-bone)" />
          <rect x={781} y={153} width={42} height={86} fill="var(--color-ink)" />
          <circle cx={802} cy={146} r={3.6} fill="var(--color-voltage)" />
          <path
            d="M789 168 h12 M789 177 h26"
            stroke="var(--color-voltage)"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <circle cx={814} cy={230} r={5} fill="var(--color-voltage)" opacity={0.35} />
        </g>
      </g>

      <g
        stroke="var(--color-voltage)"
        strokeWidth={6}
        fill="none"
        strokeLinecap="square"
      >
        <path d="M104 128 V74 H162" />
        <path d="M676 74 H734 V128" />
        <path d="M104 322 V376 H162" />
        <path d="M676 376 H734 V322" />
      </g>
    </svg>
  );
}
