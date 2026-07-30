export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

export type USState = (typeof US_STATES)[number];

/**
 * PLACEHOLDER — this list is the brief's working set, not a legal
 * determination. It must be confirmed by gaming counsel before launch, and is
 * the single source of truth for both the client gate and the server check.
 */
export const RESTRICTED_STATES: readonly string[] = [
  "Arizona", "Arkansas", "Connecticut", "Hawaii", "Iowa", "Louisiana",
  "Montana", "South Carolina", "South Dakota", "Tennessee", "Utah",
];

export function isRestrictedState(state: string | null | undefined): boolean {
  return !!state && RESTRICTED_STATES.includes(state);
}

export function isValidState(state: string | null | undefined): state is USState {
  return !!state && (US_STATES as readonly string[]).includes(state);
}
