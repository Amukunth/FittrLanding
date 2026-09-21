---
name: Fittr
description: A screenprinted fight card for real-money, camera-verified physical challenges.
colors:
  ink-black: "#0A0A0B"
  ink-black-deep: "#050506"
  voltage: "#C8FF2E"
  voltage-deep: "#A8DB16"
  voltage-shade: "#2E3A00"
  bone: "#EFE8D8"
  bone-dim: "#B3AC9B"
  bone-shade: "#96907F"
  bone-ink: "#4A463C"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Haettenschweiler', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.15rem, 14vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Big Shoulders Display', 'Haettenschweiler', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.25rem, 8.5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.02em"
  subhead:
    fontFamily: "'Big Shoulders Display', 'Haettenschweiler', 'Arial Narrow', sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 0.95
  numeral:
    fontFamily: "'Big Shoulders Display', 'Haettenschweiler', 'Arial Narrow', sans-serif"
    fontSize: "3.5rem"
    fontWeight: 900
    lineHeight: 0.8
  lead:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.16em"
  label-sm:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.16em"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
  "5xl": "128px"
components:
  button-primary:
    backgroundColor: "{colors.voltage}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "20px 32px"
  button-primary-hover:
    backgroundColor: "{colors.voltage-deep}"
    textColor: "{colors.ink-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  input-field:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "20px 18px"
  plate-bone:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "24px"
  plate-voltage:
    backgroundColor: "{colors.voltage}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Fittr

## Overview

**Creative North Star: "The Fight Card"**

Fittr is a bout, not a wellness journey. The system takes its material from the graphic tradition that already sells physical contests to exactly this audience: the screenprinted fight promotion poster and the tale-of-the-tape stat plate. Flat spot-color ink on black card stock. Condensed slab lettering set as large as the sheet allows. Bone-colored paper plates carrying the numbers. Nothing here is lit, glassy, or rounded, because none of those things happen on a printed sheet.

The second material is the Olympic sport pictogram — the strict circle-head, uniform-stroke figure system used by every athletic program of the last fifty years. Every human figure and every challenge icon in this product is drawn in that grammar, on a horizontal / vertical / 45° discipline. It is the reason the surface can show bodies mid-effort without photography, and the reason a push-up icon and the hero figure read as the same authored hand.

The accent behaves like **ink, not light**. Voltage green is a screen it prints, filling whole regions of the sheet — a full section, a full button, a full stat rail — never a glow, a halo, or a gradient. Depth comes from **registration offset**: a second ink layer sitting a few pixels off its plate, the way a two-color screenprint misregisters. This is the entire elevation model.

Confirmed rejections: no glow or neon bloom, no glassmorphism, no gradient text, no rounded corners, no soft drop shadows, no stock photography of gyms, no wellness/mindfulness register.

**Key Characteristics:**
- Black card stock ground, one acid ink, one bone paper — three materials, no more
- Condensed display lettering at poster scale, tightly stacked
- Zero corner radius everywhere; corners are cut, not curved
- Hand-authored SVG pictograms in Olympic sport-pictogram grammar
- Committed color: voltage fills regions, it does not accent edges
- Depth by print registration offset, never by blur

## Colors

A three-material palette borrowed from two-color screenprinting: black stock, one acid spot color, one bone paper.

### Primary
- **Voltage** (#C8FF2E): The single accent, and the product's whole chromatic identity. It is a spot ink. It fills the primary CTA, the step rail, the verification lock-on, and the payload words of headlines ("WIN REAL MONEY"). At 16.8:1 against the black ground it is also the highest-contrast element on the page, which is why it always marks the thing to do next.
- **Voltage Deep** (#A8DB16): The pressed/hover state of any voltage surface. Reads as more ink laid down, not as a dimmer light.
- **Voltage Shade** (#2E3A00): Secondary text *on* voltage regions. Derived from the accent hue so type on a green plate is never gray.

### Neutral
- **Ink Black** (#0A0A0B): The card stock. The default ground of every section.
- **Ink Black Deep** (#050506): The footer and the deepest inset plates; a heavier press of the same stock.
- **Bone** (#EFE8D8): Newsprint paper. Primary text on black, and the fill of every data plate in the tale-of-the-tape.
- **Bone Dim** (#B3AC9B): Secondary text on black (8.8:1). Tinted from bone, never a neutral gray.
- **Bone Shade** (#96907F): Tertiary and compliance text on black (6.2:1). The floor — nothing sits lighter than this.
- **Bone Ink** (#4A463C): Secondary text on bone plates (7.7:1).

### Named Rules
**The Ink-Not-Light Rule.** Voltage is a printed ink. It may fill a shape, offset behind a shape, or set type. It may never glow, bloom, blur, gradient, or emit. If an effect would be impossible on a printed sheet, it is not available to this color.

**The No-Gray Rule.** There is no neutral gray in this system. Every muted tone is a tint of bone or of voltage. A `#888` anywhere is a bug.

## Typography

**Display Font:** Big Shoulders Display (with Haettenschweiler, Arial Narrow fallback)
**Body Font:** Archivo (with Helvetica Neue, Arial fallback)

**Character:** Big Shoulders is a condensed American signage face — tall, athletic, built to be read across a room. It is the poster. Archivo is a squared-off grotesque with enough grit to sit under it without apologizing, and its tabular figures carry every count, timer, and position number in the product.

### Hierarchy

Every size in the build is a `--fs-*` custom property; no literal `font-size` exists outside `:root`. The ramp, smallest to largest:

`--fs-label-sm` 0.6875 · `--fs-label` 0.75 · `--fs-micro` 0.8125 · `--fs-btn` 0.875 · `--fs-body-sm` 0.9375 · `--fs-btn-lg` 1 · `--fs-body` 1.0625 · `--fs-lead` 1.1875 · `--fs-punch` 1.75 · `--fs-subhead` 2 · `--fs-punch-lg` 2.25 · `--fs-stat` 2.5 · `--fs-posn` 3 · `--fs-numeral` 3.5 · `--fs-numeral-lg` 4.5 (rem), plus four fluid display steps: `--fs-h3` clamp(2, 7.5vw, 3) · `--fs-h2` clamp(2.25, 8.5vw, 3.75) · `--fs-close` clamp(2.5, 11vw, 4.5) · `--fs-display` clamp(3.15, 14vw, 6), with `--fs-display-lg` clamp(4, 5.6vw, 6) taking over above 1080px.

- **Display** (800, `--fs-display`, lh 0.84, -0.02em, uppercase): Hero only. Stacked slabs, one thought per line, tight enough that the lines read as a single block of ink.
- **Headline** (800, `--fs-h2`, lh 0.88, uppercase): Section openers.
- **Subhead** (800, `--fs-subhead`, lh 0.95, uppercase): Step names, success heading.
- **Numeral** (900, `--fs-numeral`/`--fs-stat`/`--fs-posn`, tabular): Step ordinals, waitlist tally, queue position.
- **Title** (800, `--fs-body`, +0.02em, uppercase): Challenge names, plate headers.
- **Body** (400, `--fs-body`, lh 1.55, max 68ch): Explanatory copy. Never below 1rem.
- **Label** (700, `--fs-label`, +0.16em, uppercase, tabular-nums): Field labels, tape values, counters, compliance.

### Named Rules
**The Payload Rule.** In any display or headline block, the words naming the reward or the proof are set in voltage and the rest in bone. One payload per block, never two.

**The Tabular Rule.** Every number a visitor might compare or watch change — counts, seconds, positions, waitlist totals — uses `font-variant-numeric: tabular-nums`. Numbers in this product do not reflow as they tick.

## Layout

Mobile-first, single column, with a hard 20px gutter on phones and a 1180px max container from `lg` up. Full-page sections alternate material by background — black stock, bone plate, voltage region — so the scroll reads as a stack of printed sheets rather than a page with cards on it.

Rhythm uses an 8px base scale (4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128). Section vertical padding is `4xl` (96px) on phones and `5xl` (128px) from `md` up. Within a group, headings always take more space above than below — `xl` above, `md` below — so a heading belongs to the block beneath it.

Breakpoints: `sm` 480px, `md` 768px, `lg` 1080px. Several components restructure at `md`/`lg`, not only the tape: the hero moves from a stacked column to a two-column grid with the pictogram scene alongside the copy, the step rail's icon and copy move onto one row, and the tape rows gain a right-aligned verification column. The tape's restructure is the most visible because it is also the densest component — rows of ground-inked pictograms on phones, a wider row with the verification badge pinned right from `md` up.

Density varies deliberately across the scroll: the hero is open, the how-it-works rail is tight and rhythmic, the tape is dense data, the verification section is open and quiet again, the footer closes hard and heavy.

## Elevation & Depth

**This system has no shadows.** Nothing is lifted off a surface, because printed sheets do not float. Depth is conveyed by three print devices instead:

1. **Registration offset** — a voltage or bone layer duplicated behind an element at a hard diagonal offset with zero blur, imitating a misregistered second screen pass. The offset scales with the element it belongs to (2–3px on the wordmark and the sticky-dock CTA, 5px at rest on plates and the primary CTA, growing to 7px on hover) but is never soft: always hard-edged, always down-right, always zero blur.
2. **Halftone density** — a tiled dot field (`radial-gradient` on a small `background-size`, not a single `repeating-radial-gradient` — the latter rings outward from one anchor point and reads as a bullseye, not a print texture), used to darken or activate a region without introducing a new color.
3. **Material change** — a plate is "above" the ground because it is made of different stuff (bone paper on black stock), not because it casts a shadow.

### Shadow Vocabulary

Always hard-edged, zero blur, diagonal down-right, in the ink the element is *not* made of. The exact offset scales with the element (see rule 1 above); it is never a soft or colored glow.

- **Print offset, voltage plate** (`box-shadow: 5px 5px 0 var(--bone)`): On the voltage primary CTA. Grows to 7px on hover; collapses to 2px on `:active` while the button translates 3px down-right, so the press reads as the two layers meeting.
- **Print offset, bone plate** (`filter: drop-shadow(5px 5px 0 var(--voltage))`): On bone plates. A `filter` rather than a `box-shadow` because these plates carry a ticket notch, and `clip-path` would clip a box-shadow away.
- **Print offset, small ink marks** (`translate(3px,3px)` on the wordmark's duplicated layer; `3px 3px 0` on the sticky dock's CTA): the same device at a scale appropriate to a small mark, not a miniature shadow.

### Named Rules
**The Zero-Blur Rule.** Any `box-shadow` with a nonzero blur radius is outside this system. If depth is needed, offset a solid layer or change the material.

## Shapes

Corner radius is **0 everywhere**. Buttons, inputs, plates, badges, and regions are all hard rectangles.

The one recurring silhouette is **the ticket notch**: a 45° corner cut, applied via `clip-path`, referencing a torn fight-card stub. It appears at three depths, scaled to the element it cuts: 18px on large plates (the waitlist tally, the queue-position plate), 12px on the mid-size verification stamp, 10px on the small trust-stamp chips. The angle is always exactly 45°; only the depth scales with the element.

Rules are 2px solid — hairlines do not survive this material. Dividers inside bone plates drop to 1px of `bone-ink` at 30% because they are printed on the plate, not on the stock.

The second recurring geometry is the **shear**: a fixed −8° diagonal, used for the tripod's camera housing and the verification stamp's rotation. Every diagonal in this system is −8° or 45°. There are no other angles.

## Components

### Buttons
- **Shape:** Hard rectangle, zero radius, no border.
- **Primary:** Voltage fill, ink-black text, `--fs-btn` label typography, 20px/32px padding, full width on phones. Carries the bone print offset at rest.
- **Hover / Focus:** Fill shifts to voltage-deep and the offset grows to 7px. Focus-visible draws a 3px bone outline at 3px offset — outside the shape, never replacing the offset.
- **Active:** Translates 3px down-right and the offset collapses to 2px.
- **Ghost:** Transparent fill, 2px bone rule, bone text. Hover inverts to bone fill with ink-black text.

### Cards / Containers
There are no cards. There are **plates**: bone or voltage rectangles that carry data. A plate has zero radius, 24px internal padding, an optional ticket notch on its top-right corner, and no border unless it sits on its own material. Plates never nest. One exception, with no instance on the page since the referral region was removed: a plate set *against a voltage ground* is ink-black instead, because bone-on-voltage and voltage-on-voltage both lose the contrast that makes a plate read as a distinct object — ink-black is the only material that still pops.

### Inputs / Fields
- **Style:** Ink-black fill, 2px bone rule, zero radius, 20px/18px padding, bone text, bone-shade placeholder (6.2:1).
- **Focus:** Rule shifts to voltage and thickens to an effective 3px via `inset 0 0 0 1px` on top of the 2px border — never by animating `border-width`, which would shift layout. No glow, no ring.
- **Error:** Rule shifts to voltage, and an error line in voltage prints beneath the field naming both the problem and the fix. Error text is never red — this system has no red.
- **Disabled:** Rule and text drop to bone-shade; cursor not-allowed.

### Pictograms (signature)
Every figure and challenge icon is a hand-authored inline SVG in **Olympic sport-pictogram grammar**: a filled circle head, uniform round-capped strokes for limbs (26–30 units at hero scale, 8–9 at icon scale), and joints locked to horizontal, vertical, or 45°. Pictograms are drawn in a single color and inherit `currentColor`. No icon library, no outline-style line icons, no emoji. If a new icon is needed, it is drawn to this grammar or it is not shipped.

Two placements: **inked directly on the ground** (the tale-of-the-tape rows, ink-black on bone), or **knocked out of a bone plate** (the step rail — a 56px square, 72px from `md`, bone fill with an ink-black pictogram). The plate placement is what gives a list of steps its rhythmic left column without turning the steps into cards.

### Verification HUD (signature)
The proof device: a viewfinder frame of four voltage corner brackets that snap inward to lock onto a pictogram figure, a tabular rep counter that ticks, and a notched "VERIFIED" stamp that lands rotated −8°. This is the system's one authored *signature* motion, and it is deliberately played twice — once small in the hero (the pictogram being filmed), once large in the proof section (the same lock-on, as the argument) — because reusing one authored moment across two moments is the intended repetition, not scatter. It is distinct from the ambient/functional motion elsewhere: the phone's REC dot blinks continuously as a small always-on signal (not a "moment"), and the mobile dock's slide-in is ordinary UI chrome, not part of the authored set. All of it is fully static under `prefers-reduced-motion` except the REC dot, which stops blinking outright.

### Sticky dock and success state
Two small components without their own named section because they borrow every token from elsewhere: a mobile-only sticky dock (ink-black-deep, voltage top rule, small print-offset CTA) that appears once the hero CTA scrolls out of view; and the signup flow's post-submit state, a bone plate carrying the confirmed position under a notched voltage "CONFIRMED" stamp — no new plate, button, or type role, only the existing ones recombined. (A third, the voltage referral strip shown on a `?ref=` arrival, was removed with the referral programme.)

## Do's and Don'ts

### Do:
- **Do** fill whole regions with voltage. It is a committed color carrying 30–60% of a section, not a 4px accent border.
- **Do** set every diagonal at −8° or 45°, and every corner cut at exactly 45° (depth scales with the element: 18px large plates, 12px the verification stamp, 10px small chips).
- **Do** draw new icons in the sport-pictogram grammar (circle head, uniform round-capped strokes, H/V/45° joints).
- **Do** use `tabular-nums` on every number that changes or gets compared.
- **Do** tint muted text from bone or voltage, and check it clears 4.5:1 on its actual ground.
- **Do** keep every print offset hard-edged, zero-blur, and down-right — its size may scale with the element (2–7px), but its angle and crispness never do.

### Don't:
- **Don't** introduce a second accent color. One ink. Adding a red for errors or a blue for links breaks the press.
- **Don't** apply any `border-radius` above 0, anywhere, including avatars and badges.
- **Don't** use blur, backdrop-filter, glow, bloom, or a gradient fill as a color device. Two narrow exceptions, neither of which fills a shape with a color blend: a tiled `radial-gradient` dot pattern used as halftone texture (fixed small `background-size`, never `repeating-radial-gradient` from a single anchor — that rings outward and reads as a bullseye), and a `linear-gradient` used only as a `mask-image` to fade an existing texture toward transparent (an opacity fade, not a color fill).
- **Don't** use gradient text or a text-shadow glow for emphasis. Emphasis is weight, scale, or voltage.
- **Don't** ship gray. Every muted value is a bone or voltage tint.
- **Don't** stack a card inside a card, or add a card grid of equal icon-heading-text tiles. Data goes on plates and in the tape table.
- **Don't** substitute a stock photograph for an authored pictogram scene. If photography is introduced later it must be duotone-reduced to bone and voltage on black.
