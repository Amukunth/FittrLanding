# Fittr — waitlist onboarding

A multi-step waitlist flow: Next.js 16 (App Router) + TypeScript + Tailwind v4,
with Prisma 7 over SQLite. Design system inherited from the landing page one
directory up — see `../DESIGN.md`.

## Running it

```bash
npm install          # also runs `prisma generate`
npm run db:migrate   # creates dev.db and applies the schema
npm run dev          # http://localhost:3000
```

`/` redirects to `/join`. The static marketing page lives in the parent folder
and is a separate deployable today; in production it serves `/` and links here.

## Routes

| Route | What it is |
|---|---|
| `/join` | The flow. Accepts `?ref=CODE`. |
| `/r/[code]` | Shareable referral link; redirects into `/join` carrying the code. |
| `/status/[code]` | Return visit — place in line and live referral count. |
| `/api/email` | `POST` duplicate check for the email step. Rate-limited. |
| `/api/signup` | `POST` create a signup. Rate-limited. |
| `/api/stats` | `GET` live counts. |

## The flow

Welcome → email → age → name → phone → terms → confirmation.
Five question screens, all required.

Two of them stop the flow:

- **Under 18** ends it in the browser. Nothing is sent and no row is written.
- **A restricted state** ends it too, but the email is still captured to a
  notify-me list (`status = "restricted_state"`, no queue position, no bonus).

Waitlist position is the count of eligible, age-confirmed signups at the moment
of insert, computed inside the same transaction as the write. Restricted-state
rows hold no position, so they never consume one of the capped bonus spots.
Past 1,000, signups still join and see the "bonus spots are filled" messaging
instead of the offer.

## ⚠️ Placeholders that must be replaced before launch

| What | Where |
|---|---|
| **Restricted-state list** — the brief's working set, not a legal determination | `src/lib/states.ts` |
| **Referral reward mechanics** — referrals are counted, but "moves you up the line" is not implemented | `src/components/outcomes/SuccessScreen.tsx` |

The restricted-state list needs gaming counsel, not a template: real-money
contests touch state gambling and sweepstakes law.

## Data

One `Signup` model (`prisma/schema.prisma`, table `signups`). Referral codes are
6 characters from a Crockford-style alphabet with no `0/O` or `1/I/L`, drawn
from a byte mask over a 32-symbol set so the draw is uniform. A referral is only
credited when the code matches a real account; unknown codes are dropped rather
than stored dangling.

**Swapping SQLite for Supabase:** every query lives in `src/lib/signup.ts`, and
the client is constructed in one place (`src/lib/db.ts`). Change the datasource
provider in `prisma/schema.prisma` to `postgresql`, swap
`@prisma/adapter-better-sqlite3` for `@prisma/adapter-pg`, and point
`DATABASE_URL` at the Supabase connection string. `challengeInterests` is a
comma-joined string only because SQLite has no array type — on Postgres it can
become `String[]` (the encoding is isolated in `src/lib/options.ts`).

## Checks

Both need the dev server running (`SMOKE_BASE_URL` overrides the default port).

```bash
# the API run makes a deliberate burst of signups, which the limiter refuses
DISABLE_RATE_LIMIT=1 npm run dev

npm run smoke:api       # position, cap, restricted-state, referral, duplicate rules
npm run smoke:browser   # focus management, keyboard submit, reduced motion, a11y names
```

`DISABLE_RATE_LIMIT` only takes effect when `NODE_ENV` is not `production`, so
it cannot weaken a deployed instance.

Both suites are re-runnable against a database that already has rows — every
address is unique per run and positions are asserted relative to the count the
run starts from. They do leave test rows behind; `npm run db:reset` clears them.

## Notes

- `npm audit` reports 3 high advisories in `postcss` and `sharp`, both pulled in
  by Next itself. `audit fix --force` would downgrade Next; these need a Next
  patch release, not a local change.
- Rate limiting is in-process memory (`src/lib/rate-limit.ts`), which suits one
  Node process in front of one SQLite file. Multi-instance needs a shared store.
- Google renamed "Big Shoulders Display" to "Big Shoulders". The landing page's
  CSS still names the old family and falls back fine, but new work should use
  the current name — `next/font` only resolves the new one.
