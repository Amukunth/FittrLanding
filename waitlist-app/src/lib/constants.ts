/** How many eligible signups get the launch bonus. */
export const BONUS_CAP = 1000;

/**
 * Bonus amounts, sourced from the Waitlist Terms of Service (Dawgear, LLC —
 * last updated August 31, 2026). Both are non-withdrawable Fittr in-app
 * credit, not cash. They live here so a single edit updates every screen
 * that quotes them.
 */
export const BONUS_AMOUNT = "$10";
export const REFERRAL_BONUS_AMOUNT = "$5";
export const REFERRAL_BONUS_MAX_REFERRALS = 2;
export const REFERRAL_BONUS_MAX_TOTAL = "$10";

/** Shown next to every bonus mention — credit is in-app only, never cash. */
export const CREDIT_DISCLAIMER =
  "Credit can be used in the app, not withdrawn as cash.";

/** Used to build shareable referral links when no deploy URL is configured. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
