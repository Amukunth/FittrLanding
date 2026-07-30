# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: competitive, fitness-minded 18–30 year olds who already do push-ups, planks, wall-sits, or casual running. They arrive cold via TikTok, Reddit, or a friend's referral link, not through considered comparison-shopping against other fitness apps. They have about 3 seconds to decide "is this for me" before scrolling on. They are motivated by "beat your friends, win real money" — competition and stakes, not health/wellness framing.

## Product Purpose

A pre-launch waitlist landing page for an app (not yet built) that lets users wager real money on head-to-head or pooled physical skill contests — push-ups, planks, wall-sits, and running. This page's job is email capture plus a referral mechanic to build the waitlist before launch. Success = visitors who fit the target profile give their email and share their referral link, not conversion to a paid product (there isn't one yet).

## Positioning

The product is a real-money skill-gaming app for physical exercises, differentiated from existing real-money skill-gaming competitors (Papaya, AviaGames/Pocket7Games, Skillz-powered apps) by how outcomes are verified: live phone-camera motion tracking for reps/holds, plus Apple Watch for running. Every tap-based arcade competitor in this category is currently in litigation over bots secretly playing against real users. Physical effort verified on camera or biometric wearable is structurally bot-proof in a way tap-based games can't be — competitors would have to abandon their entire product category to copy it. The verification mechanism *is* the product, not a supporting feature.

## Operating Context

Contest types at launch concept: push-ups, planks, wall-sits, running (head-to-head or pooled wagers). Verification happens via phone camera motion tracking (push-ups, planks, wall-sits) or Apple Watch (running). The waitlist page precedes the app; there is no product to demo, only the mechanism and hook to communicate.

## Capabilities and Constraints

- App does not exist yet — this is a marketing/waitlist surface only, not a functional product screen.
- Real-money wagering on physical performance is a regulated space; the page should not overstate legality, availability, or make claims the company can't back (e.g., "available in your state," specific payout guarantees) until confirmed.
- Referral mechanic is core to distribution — the page must support both a first-visit email-capture path and a referred-visit path (e.g., "so-and-so challenged you").
- Contest set as briefed: push-ups, plank holds, wall sits and other short bodyweight challenges (camera-verified), plus running and cycling as an additional mode (Apple Watch-verified).
- Hero hook (per 2026-07-29 brief): first 1,000 waitlist joiners get $20 credited at launch, no deposit required. Exact funding source, eligibility fine print, and what happens past 1,000 spots are not finalized — flagged as a placeholder in the markup until confirmed.
- Signup flow (built 2026-07-30 in `waitlist-app/`): seven question screens — email, age, state, name, challenge interests, referral source, terms — with interests and source optional. Two screens terminate the flow: under-18 (no data collected at all) and a restricted state (email captured to a notify-me list only, with no queue position and no bonus).
- Hard 18+ gate, enforced both client-side and server-side.
- Waitlist position is the count of eligible, age-confirmed signups at the moment of insert; restricted-state signups hold no position and so never consume a capped bonus spot.
- Undecided: pricing, rake/fee structure, state/age eligibility rules, referral bonus amount and structure, exact contest catalog beyond those named.
- Placeholder, pending gaming counsel: the restricted-state list currently used is Arizona, Arkansas, Connecticut, Hawaii, Iowa, Louisiana, Montana, South Carolina, South Dakota, Tennessee, Utah. This is the brief's working set, not a legal determination.
- Placeholder, pending confirmation: a $10 referral reward per friend who joins and downloads at launch. Referrals are currently counted only — no queue-position movement is implemented.

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
4. Design for two entry paths — cold acquisition (TikTok/Reddit) and warm referral (friend's link) — without inventing product functionality that doesn't exist.
5. Never invent legitimacy — no fake testimonials, press mentions, download counts, or availability/legal claims beyond what's confirmed.

## Accessibility & Inclusion

No product-specific requirement established yet. Standard accessibility baseline applies (contrast, motion-reduction for any competitive/kinetic animation, keyboard/focus support for the email + referral form).
