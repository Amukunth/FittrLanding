# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: competitive, fitness-minded 18–30 year olds who already do push-ups, planks, wall-sits, or casual running. They arrive cold via TikTok, Reddit, or word of mouth, not through considered comparison-shopping against other fitness apps. They have about 3 seconds to decide "is this for me" before scrolling on. They are motivated by "beat your friends, win real money" — competition and stakes, not health/wellness framing.

## Product Purpose

A pre-launch waitlist landing page for an app (not yet built) that lets users wager real money on head-to-head or pooled physical skill contests — push-ups, planks, wall-sits, and running. This page's job is email capture to build the waitlist before launch. Success = visitors who fit the target profile give their email, not conversion to a paid product (there isn't one yet).

## Positioning

The product is a real-money skill-gaming app for physical exercises, differentiated from existing real-money skill-gaming competitors (Papaya, AviaGames/Pocket7Games, Skillz-powered apps) by how outcomes are verified: live phone-camera motion tracking for reps/holds, plus Apple Watch for running. Every tap-based arcade competitor in this category is currently in litigation over bots secretly playing against real users. Physical effort verified on camera or biometric wearable is structurally bot-proof in a way tap-based games can't be — competitors would have to abandon their entire product category to copy it. The verification mechanism *is* the product, not a supporting feature.

## Operating Context

Contest types at launch concept: push-ups, planks, wall-sits, running (head-to-head or pooled wagers). Verification happens via phone camera motion tracking (push-ups, planks, wall-sits) or Apple Watch (running). The waitlist page precedes the app; there is no product to demo, only the mechanism and hook to communicate.

## Capabilities and Constraints

- App does not exist yet — this is a marketing/waitlist surface only, not a functional product screen.
- Real-money wagering on physical performance is a regulated space; the page should not overstate legality, availability, or make claims the company can't back (e.g., "available in your state," specific payout guarantees) until confirmed.
- Contest set as briefed: push-ups, plank holds, wall sits and other short bodyweight challenges (camera-verified), plus running and cycling as an additional mode (Apple Watch-verified).
- Hero hook: no monetary incentive. The page sells the product (real money on camera-verified physical challenges) and the waitlist itself, nothing else. The $10 launch credit was withdrawn on 2026-09-21, briefly reinstated the same day, then withdrawn again — it is not advertised anywhere on the site, and Waitlist Terms §6 (Launch Bonus) stays deleted to match. Do not put a dollar figure back on the page without restoring §6 and getting legal sign-off.
- The $5 referral bonus and the referral programme were removed on 2026-09-21 and must not be reintroduced. `/r/[code]` still resolves so older links do not 404.
- Signup flow (built 2026-07-30 in `waitlist-app/`, phone added 2026-09-01): five question screens — email, age, name, phone, terms — all required. Two screens terminate the flow: under-18 (no data collected at all) and a restricted state (email captured to a notify-me list only, with no queue position).
- Hard 18+ gate, enforced both client-side and server-side.
- Waitlist position is the count of eligible, age-confirmed signups at the moment of insert; restricted-state signups hold no position.
- Undecided: pricing, rake/fee structure, state/age eligibility rules, exact contest catalog beyond those named.
- Placeholder, pending gaming counsel: the restricted-state list currently used is Arizona, Arkansas, Connecticut, Hawaii, Iowa, Louisiana, Montana, South Carolina, South Dakota, Tennessee, Utah. This is the brief's working set, not a legal determination.
- The referrer is still recorded in the database for links shared before the programme was withdrawn, but nothing on the site offers, displays or rewards a referral.

## Brand Commitments

**Name: Fittr** (confirmed 2026-07-29 in the landing-page brief; supersedes the earlier undecided candidates Mettle, Purse, and Contender).

Voice: bold, competitive, high-energy — the register of Nike crossed with DraftKings, explicitly not wellness or mindfulness. Frame everything as stakes and competition, never as health improvement.

No logo or logotype asset exists yet; the current wordmark is typographic (see DESIGN.md). Visual system decisions live in DESIGN.md, not here.

## Evidence on Hand

None. No real copy, pricing, testimonials, or press exist — the product hasn't launched and this page is the pre-launch waitlist itself. Do not fabricate testimonials, user counts, press logos, or specific payout figures; use structural/mechanism claims (verification, bot-proofing) rather than invented social proof.

## Product Principles

1. Speed of read beats depth of explanation — the 3-second scroller must grasp "wager real money on physical challenges" before anything else.
2. The verification mechanism is the trust argument — competitors' bot scandals are the implicit contrast; lead with "can't be faked," not with generic fitness-app language.
3. Stakes and competition over wellness — tone is "beat your friends," not "improve your health."
4. Design for cold acquisition (TikTok/Reddit) without inventing product functionality that doesn't exist.
5. Never invent legitimacy — no fake testimonials, press mentions, download counts, or availability/legal claims beyond what's confirmed.

## Accessibility & Inclusion

No product-specific requirement established yet. Standard accessibility baseline applies (contrast, motion-reduction for any competitive/kinetic animation, keyboard/focus support for the email form).
