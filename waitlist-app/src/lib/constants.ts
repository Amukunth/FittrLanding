/** How many eligible signups get the launch bonus. */
export const BONUS_CAP = 1000;

/**
 * PLACEHOLDER — the bonus amounts are not finalised and are pending
 * confirmation before launch. They live here so a single edit updates every
 * screen that quotes them.
 */
export const BONUS_AMOUNT = "$20";
export const REFERRAL_BONUS_AMOUNT = "$10";

/** Used to build shareable referral links when no deploy URL is configured. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
