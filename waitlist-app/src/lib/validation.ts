/** Shared by the client field and the API route so both agree on what passes. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  return EMAIL_RE.test(raw.trim());
}

export function isValidName(raw: string): boolean {
  const name = raw.trim();
  return name.length >= 2 && name.length <= 80;
}

/** Strips a phone number down to its 10 NANP digits, dropping a leading "1". */
function phoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

export function normalizePhone(raw: string): string {
  return `+1${phoneDigits(raw)}`;
}

/** US/Canada numbers only — matches the state-restricted eligibility gate. */
export function isValidPhone(raw: string): boolean {
  return /^[2-9]\d{9}$/.test(phoneDigits(raw));
}
