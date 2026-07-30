import "server-only";

import { prisma } from "@/lib/db";
import { BONUS_CAP } from "@/lib/constants";
import { generateReferralCode, normalizeCode } from "@/lib/referral";
import { encodeInterests, isValidSource } from "@/lib/options";
import { isRestrictedState, isValidState } from "@/lib/states";
import { isValidEmail, isValidName, normalizeEmail } from "@/lib/validation";

export type SignupInput = {
  email: string;
  state: string;
  ageConfirmed: boolean;
  /** Null for notify-only captures, which stop before the name step. */
  name?: string | null;
  /** Only the full flow reaches the terms checkbox. */
  termsAgreed?: boolean;
  challengeInterests?: string[];
  referralSource?: string | null;
  referredByCode?: string | null;
};

export type SignupRecord = {
  email: string;
  name: string | null;
  status: "eligible" | "restricted_state";
  state: string | null;
  referralCode: string;
  waitlistPosition: number | null;
  bonusEligible: boolean;
  referralCount: number;
};

export type CreateSignupResult =
  | { ok: true; signup: SignupRecord }
  | { ok: false; reason: "duplicate_email" | "invalid" | "age_not_confirmed" };

/** Live totals for the counters on the welcome and success screens. */
export async function getWaitlistStats() {
  const eligible = await prisma.signup.count({
    where: { status: "eligible", ageConfirmed: true },
  });
  return {
    eligibleCount: eligible,
    bonusSpotsRemaining: Math.max(0, BONUS_CAP - eligible),
    bonusSpotsFilled: eligible >= BONUS_CAP,
    cap: BONUS_CAP,
  };
}

export async function isEmailTaken(email: string): Promise<boolean> {
  const existing = await prisma.signup.findUnique({
    where: { email: normalizeEmail(email) },
    select: { id: true },
  });
  return existing !== null;
}

/** Powers the `/status/[code]` return visit — the "my referrals" state. */
export async function getSignupByCode(
  rawCode: string,
): Promise<SignupRecord | null> {
  const code = normalizeCode(rawCode);
  if (!code) return null;

  const signup = await prisma.signup.findUnique({
    where: { referralCode: code },
  });
  if (!signup) return null;

  const referralCount = await prisma.signup.count({
    where: { referredByCode: code },
  });

  return toRecord(signup, referralCount);
}

export async function createSignup(
  input: SignupInput,
): Promise<CreateSignupResult> {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || null;

  if (!input.ageConfirmed) return { ok: false, reason: "age_not_confirmed" };
  if (!isValidEmail(email)) return { ok: false, reason: "invalid" };
  if (name !== null && !isValidName(name)) return { ok: false, reason: "invalid" };
  if (!isValidState(input.state)) return { ok: false, reason: "invalid" };
  if (!isValidSource(input.referralSource)) return { ok: false, reason: "invalid" };

  const restricted = isRestrictedState(input.state);

  // A full signup must carry a name and an accepted agreement; a notify-only
  // capture must carry neither. Reject anything in between.
  if (!restricted && (name === null || !input.termsAgreed)) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const created = await prisma.$transaction(async (tx) => {
      if (await tx.signup.findUnique({ where: { email }, select: { id: true } })) {
        return null;
      }

      // Only credit a referrer whose code actually exists — an invented or
      // mistyped code is dropped rather than stored as a dangling reference.
      let referredByCode: string | null = normalizeCode(input.referredByCode);
      if (referredByCode) {
        const referrer = await tx.signup.findUnique({
          where: { referralCode: referredByCode },
          select: { id: true },
        });
        if (!referrer) referredByCode = null;
      }

      let referralCode = generateReferralCode();
      for (let attempt = 0; ; attempt++) {
        const clash = await tx.signup.findUnique({
          where: { referralCode },
          select: { id: true },
        });
        if (!clash) break;
        if (attempt === 7) throw new Error("Could not allocate a referral code");
        referralCode = generateReferralCode();
      }

      // Restricted-state signups join the notify-me list only: they hold no
      // position, so they never consume one of the capped bonus spots.
      let waitlistPosition: number | null = null;
      let bonusEligible = false;

      if (!restricted) {
        const ahead = await tx.signup.count({
          where: { status: "eligible", ageConfirmed: true },
        });
        waitlistPosition = ahead + 1;
        bonusEligible = waitlistPosition <= BONUS_CAP;
      }

      return tx.signup.create({
        data: {
          email,
          name,
          ageConfirmed: true,
          state: input.state,
          challengeInterests: encodeInterests(input.challengeInterests ?? []),
          referralSource: input.referralSource || null,
          termsAgreedAt: input.termsAgreed ? new Date() : null,
          referralCode,
          referredByCode,
          waitlistPosition,
          bonusEligible,
          status: restricted ? "restricted_state" : "eligible",
        },
      });
    });

    if (created === null) return { ok: false, reason: "duplicate_email" };
    return { ok: true, signup: toRecord(created, 0) };
  } catch (error) {
    // A unique-constraint violation here means another request inserted the
    // same email between the check and the write.
    if (isUniqueViolation(error)) return { ok: false, reason: "duplicate_email" };
    throw error;
  }
}

function toRecord(
  signup: {
    email: string;
    name: string | null;
    status: string;
    state: string | null;
    referralCode: string;
    waitlistPosition: number | null;
    bonusEligible: boolean;
  },
  referralCount: number,
): SignupRecord {
  return {
    email: signup.email,
    name: signup.name,
    status: signup.status === "restricted_state" ? "restricted_state" : "eligible",
    state: signup.state,
    referralCode: signup.referralCode,
    waitlistPosition: signup.waitlistPosition,
    bonusEligible: signup.bonusEligible,
    referralCount,
  };
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}
