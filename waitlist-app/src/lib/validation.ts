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
