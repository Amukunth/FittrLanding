/** Multi-select chips on the challenge-interest step. Both steps are optional. */
export const CHALLENGE_INTERESTS = [
  "Push-ups",
  "Planks",
  "Wall Sits",
  "Running",
  "Other",
] as const;

export const REFERRAL_SOURCES = [
  "TikTok",
  "Instagram",
  "Reddit",
  "Friend referral",
  "Other",
] as const;

export type ChallengeInterest = (typeof CHALLENGE_INTERESTS)[number];
export type ReferralSource = (typeof REFERRAL_SOURCES)[number];

/**
 * SQLite has no array column, so interests round-trip through a comma-joined
 * string. Every read and write of `challengeInterests` goes through these two
 * functions so the encoding stays in one place.
 */
export function encodeInterests(values: readonly string[]): string {
  const allowed = values.filter((v) =>
    (CHALLENGE_INTERESTS as readonly string[]).includes(v),
  );
  return Array.from(new Set(allowed)).join(",");
}

export function decodeInterests(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw.split(",").filter(Boolean);
}

export function isValidSource(value: string | null | undefined): boolean {
  return !value || (REFERRAL_SOURCES as readonly string[]).includes(value);
}
