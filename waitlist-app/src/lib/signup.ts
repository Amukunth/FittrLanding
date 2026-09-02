import "server-only";

import { prisma } from "@/lib/db";
import { BONUS_CAP } from "@/lib/constants";
import { generateReferralCode, normalizeCode } from "@/lib/referral";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
} from "@/lib/validation";

export type SignupInput = {
  email: string;
  ageConfirmed: boolean;
  name: string;
  phone: string;
  termsAgreed: boolean;
  referredByCode?: string | null;
};

export type SignupRecord = {
  email: string;
  name: string | null;
  status: "eligible";
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
  const name = input.name.trim();

  if (!input.ageConfirmed) return { ok: false, reason: "age_not_confirmed" };
  if (!isValidEmail(email)) return { ok: false, reason: "invalid" };
  if (!isValidName(name)) return { ok: false, reason: "invalid" };
  if (!isValidPhone(input.phone)) return { ok: false, reason: "invalid" };
  if (!input.termsAgreed) return { ok: false, reason: "invalid" };

  const phone = normalizePhone(input.phone);

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

      const ahead = await tx.signup.count({
        where: { status: "eligible", ageConfirmed: true },
      });
      const waitlistPosition = ahead + 1;
      const bonusEligible = waitlistPosition <= BONUS_CAP;

      return tx.signup.create({
        data: {
          email,
          name,
          phone,
          ageConfirmed: true,
          termsAgreedAt: new Date(),
          referralCode,
          referredByCode,
          waitlistPosition,
          bonusEligible,
          status: "eligible",
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
    referralCode: string;
    waitlistPosition: number | null;
    bonusEligible: boolean;
  },
  referralCount: number,
): SignupRecord {
  return {
    email: signup.email,
    name: signup.name,
    status: "eligible",
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
