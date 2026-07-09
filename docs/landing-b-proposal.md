# Landing B — "The Range" (proposal)

An alternative landing page, proposed on its own branch (`landing-b-the-range`). Synthesises three inputs: the **hero redraft** (Airbnb outcome / Apple subtraction / Up wit — `fundora-hero-redraft.md`), the **v3.2 brand system** (`results-page-spec.md` §3: Fundora, Inter, tiered teal, Grey Page surfaces, 10px), and the **illustration + motion language** (`illustration-style.md`). Supersedes the landing-a "The Number" concept if adopted.

**The one-line pitch:** the hero doesn't *show* the product — it *is* the product. A live lender-range module with one income slider; drag it and fourteen lenders' answers move under your finger. Everything below it is quiet.

---

## 1. Page map (five moments, nothing else)

| # | Section | Job | Visual weight |
| --- | --- | --- | --- |
| 1 | **Hero + live range module** | The promise and the proof, together | The interactive centrepiece; no hero illustration — the bars are the visual |
| 2 | **"Your real price ceiling"** | The one differentiating idea, alone | The page's single big illustration (T3) |
| 3 | **Three quiet supports** | Breadth without noise | Text only — one line each, no cards, no images |
| 4 | **Closing band** | Repeat the one action | Small T2 illustration, same CTA verbatim |
| 5 | **Footer compliance block** | Trust | Untouched conversion asset |

Cut entirely: feature grids, testimonial strips, stats rows, "how it works" steps (the hero module *demonstrates* how it works — the secondary CTA scrolls to the ceiling section instead), badge pills, and all descriptive rows under the bars. If a section can't say why it deserves scroll depth, it doesn't ship.

## 2. Copy (adopting the redraft nearly verbatim — it's right)

| Slot | Copy |
| --- | --- |
| Eyebrow | For Australian property buyers |
| H1 | Find the home you can really afford. |
| Subhead | Your borrowing power changes lender to lender. See all 14 numbers and search with a price range you trust. |
| Primary CTA | Find my range |
| Secondary | See how it works *(anchor-scrolls to §2's ceiling section)* |
| Trust line | Free. No impact on your credit score. |
| Module label | Your range, across the panel |
| Module wit line (once, on first settle) | The highest number isn't always the right one. We'll show you both. |
| Module fine print | Illustrative example — your numbers come from your details. |
| Social proof strip | 14 lenders. The ones most Australians actually borrow from. |
| §2 eyebrow / H2 | What you get / The number you actually shop with. |
| §2 feature | **Your real price ceiling.** The property price within reach, with your deposit, stamp duty, LMI and each lender's policy already in it. The figure you type into the price filter and trust. |
| Supports (one line each) | **Every lender, side by side.** See who gives you the most room, and why they differ. · **Suburbs and listings within reach.** Know where you can actually buy before you fall for somewhere you can't. · **Stress test any scenario.** Model a rate rise, a new baby, a career change. Watch your range move. |
| Closing band | Find the home you can really afford. / Your range is three minutes away. / Find my range |

One number everywhere: **14**. Voice rules per the redraft: no em dashes in product copy, no negative parallelisms, spread points at opportunity.

## 3. The range module (hero centrepiece) — full spec

### Anatomy (desktop, right of the headline; mobile, between subhead and CTA)

- White card on `--bg` (#FAFAFA), r10, 1px `--line`, 20px padding. Flat.
- Label row: "Your range, across the panel" 13px/400 `--muted` · right: the resolved range "**$820k – $969k**" 15px/700, tabular.
- **Six lender rows** (desktop; **five on mobile**), each a single 32px line — per the owner's direction, no pills, no badges, no description rows:
  - `name (13px/400, 72px column) | bar (flex) | price (14px/700, right, tabular)`
  - Bar: 8px, r-full, track `--field`, fill from the lender cycle palette, width ∝ price vs leader.
  - Leader row only: name at 600 weight. That's the entire hierarchy.
- Row 7: "+ 8 more lenders in your results" 12px `--muted` (carries the 14 without drawing 14 bars).
- **The income slider** (the one control — resist adding a deposit toggle; one input, one consequence):
  - Label "Household income" left · live value "$145,000" right (700, tabular).
  - Track: `--field`, 6px; filled portion `--teal`; thumb 28px circle `--teal`, white 2px ring. Range $60k–$300k, step $5k.
  - Full-width touch target ≥44px tall; keyboard: arrows ±$5k, Shift ±$25k; `aria-valuetext="$145,000 a year"`.
- Fine print: "Illustrative example — your numbers come from your details." 11px `--muted-2`.

### Interaction model (the part that must feel expensive)

- **During drag: direct manipulation at 60fps.** Bar widths, prices, and the range figure track the thumb 1:1 — transform/width + text swap, tabular-nums so nothing jitters. **Rank order is frozen while dragging** (re-sorting under the finger reads as chaos).
- **On release: the re-rank moment.** If order changed, rows FLIP to new positions (250ms); the range figure settles with a 300ms count. This release-beat is the demo of the product's core truth — different incomes crown different lenders.
- **First entrance** (in-view, once): bars grow in with 60ms stagger + prices count up (≈900ms, cubic-out). When they settle, the wit line fades in and stays. It never re-fires.
- Slider nudge affordance: after entrance, the thumb pulses once (2px, one cycle) to invite the drag. Never repeats.
- **Data honesty:** a small client-side illustrative model — per-lender coefficient curves precomputed from the fixture engine at build time (14 lenders × income steps), so the shapes are directionally real (some lenders flatten early, some reward income) without claiming precision. The fine-print line carries the caveat; CTA remains the path to real numbers.
- Reduced motion: everything renders final-state; slider still works, values swap instantly.
- The module IS the product demo — this is why there's no "how it works" section and no hero illustration competing with it.

### Mobile compression (owner's note addressed)

375px: module goes first-class, not squeezed — hero stacks *eyebrow → H1 → subhead → module → CTA → trust line* so the toy is above the fold and the CTA lands right after the user has played. Rows tighten to 28px, name column 64px, five bars + the "+ 8 more" line ≈ 200px total; slider 44px; whole module ≈ 320px tall. H1 at 32px (marketing scale can exceed the product's 25px).

## 4. Motion map (whole page — restraint budget per illustration-style §4.4)

| Moment | Motion | Source |
| --- | --- | --- |
| Range module entrance | bar grow + count-up, stagger, once | spec §11 language |
| Slider drag / release | direct manipulation / FLIP + count settle | above |
| Wit line | 300ms fade, once ever | redraft's "reserve the wit for when the bars resolve" |
| §2 ceiling illustration | sticker-place + one line boil on scroll-in, once | illustration-style §4.3 |
| §4 closing illustration | sticker-place only (no boil — one boil moment per page is enough) | " |
| Section reveals | 12px rise + fade, once per section, that's all | — |
| Buttons | bg-only hover (casual-client rule) | alignment C5 |

One idle micro-loop allowed on the page: none in v1. The slider is the life of the page; adding ambient motion would dilute it.

## 5. Image generation prompts (GPT Image; inked-sticker system)

Shared preamble — prepend to each (from `illustration-style.md` §5):

> Small flat illustration in a hand-inked sticker style: thick near-black ink outlines with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture on every fill; no gradients, no highlights, no 3D. Muted vintage palette only: paper cream, slate blue-grey, muted sage-teal, mustard gold, terracotta, warm brown. Gently tilted so it feels placed by hand, small soft grey blob shadow beneath, floating on a fully transparent background. Storybook-friendly, calm, slightly toylike; not corporate, not glossy, not emoji-like, no mascots, no faces, no text or numbers anywhere in the image.

1. **`ceiling-scene` (§2 feature, T3, ~2048×2048, object ~70% of frame):**
   *"…{preamble} A scene of a cream house with a muted sage-teal roof and mustard door, with an oversized swing-tag price label tied to its door handle by a short string, the tag blank cream with a mustard corner fold. Leaning against the house's side wall, a folded document with a signature squiggle. A small terracotta location pin stands in front. Composition sits on a subtle grey blob shadow, hero house filling most of the frame, tag clearly the focal accessory."*
2. **`ceiling-scene-boil-1` (motion frame):** append — *"Second frame of a stop-motion pair: the exact same drawing and composition, re-inked; every line subtly redrawn with different hand-wobble, fills and colours identical."*
3. **`closing-keys` (§4 band, T2, ~1024×1024):**
   *"…{preamble} A single house key with a rounded cream head and slate-blue shaft, lying across a small paper tag tied to it with string, one gold coin resting beside the tag. Two objects and a coin, nothing else, generous negative space."*
4. **`og-share` (social card, 1536×1024, landscape):**
   *"…{preamble} A wide composition on a warm paper-cream background (not transparent): the cream house with sage-teal roof and price tag from the brand set sits left of centre; to its right, five horizontal hand-inked bars of different lengths in slate blue, mustard, terracotta, sage and warm brown, each with rounded ends, arranged like a small bar chart drawn by hand. Balanced, calm, lots of breathing room."*

(Illustrations render ≤50% opacity grain intact — don't compress to JPEG. Supports section gets NO images, per the Apple subtraction.)

## 6. Build notes

- New route `/landing-b`, own scoped CSS (`landing-b.css`) on the **v3.2 tokens** — Inter 400/600/700, `--bg #FAFAFA`, white cards, tiered teal, teal primary buttons with black labels, 10px radius, no shadows. Nothing shared with the retired `landing-a.css`.
- The range module ships as one component with the slider model in a pure function (`estimate(income, lenderCoeffs)`) — unit-testable, and swappable for real engine output later.
- Accessibility: module is usable and *meaningful* with keyboard + screen reader (announce "Range $X to $Y" politely on release, not per-pixel); wit line `aria-hidden` (decorative voice).
- Analytics: `slider_engaged` (first drag), `slider_release_count`, `cta_after_slider` vs `cta_cold` — the whole thesis of this page is testable: do people who play convert more?

## 7. What I'd explicitly NOT do

- No second slider/toggle (deposit, rate). One control is the Apple move; more controls make it a calculator, and the calculator is the product's job.
- No live "14 lenders" logo wall — borrowed credibility, visual noise.
- No wit anywhere except the one reserved line.
- No parallax, no scroll-jacking, no ambient loops. The slider is the only toy.
- No numbers in the illustrations (they date, they conflict with the live module, and the style guide bans text in-image).
