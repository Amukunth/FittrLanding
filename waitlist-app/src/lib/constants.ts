/**
 * How many eligible signups the launch-bonus program covered.
 *
 * Nothing advertises that offer any more: no screen quotes a credit amount,
 * and the Waitlist Terms no longer carry a Launch Bonus section. This is kept
 * only because it still sets the `bonus_eligible` column, which is the
 * standing record of who signed up while the offer was live and accepted the
 * terms that promised it. Clearing that record is a product decision, not a
 * copy change — see lib/signup.ts.
 */
export const BONUS_CAP = 1000;
