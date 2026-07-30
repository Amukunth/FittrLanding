import { randomBytes } from "node:crypto";

/**
 * Crockford-style alphabet: no 0/O, 1/I/L, so a code read aloud or typed from
 * a screenshot cannot land on the wrong account. 32 symbols means 5 bits per
 * character and an exactly uniform draw from a byte mask — no modulo bias.
 */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const CODE_LENGTH = 6;

export function generateReferralCode(): string {
  const bytes = randomBytes(CODE_LENGTH);
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[bytes[i] & 31];
  }
  return code;
}

/** Referral codes are compared uppercase; links in the wild get lowercased. */
export function normalizeCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (code.length !== CODE_LENGTH) return null;
  for (const char of code) {
    if (!ALPHABET.includes(char)) return null;
  }
  return code;
}

export function referralUrl(code: string, origin: string): string {
  return `${origin.replace(/\/$/, "")}/r/${code}`;
}
