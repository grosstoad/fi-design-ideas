# Landing B, "The Range" (proposal)

Alternative landing page, on its own branch (`landing-b-the-range`). Pulls together the hero redraft (`fundora-hero-redraft.md`), the v3.2 brand tokens (`results-page-spec.md` §3) and the illustration and motion guides (`illustration-style.md`). If adopted it replaces the landing-a "The Number" concept.

The pitch in one line: the hero is the product. A live lender module with one income slider. Drag it and the lenders' numbers move. Everything under it stays quiet.

---

## 1. Page map

Five sections. Anything that can't justify its scroll depth is out.

| # | Section | Job | Weight |
| --- | --- | --- | --- |
| 1 | Hero with the range module | Promise and proof together | The interactive piece. No hero illustration, the bars are the visual |
| 2 | "Your real price ceiling" | The one differentiating idea | The page's single big illustration |
| 3 | Three supports | Breadth without noise | Text only, one line each |
| 4 | Closing band | Repeat the one action | Small illustration, same CTA wording as the hero |
| 5 | Compliance footer | Trust | Untouched |

Cut: feature grids, stat rows, testimonial strips, logo walls, "how it works" steps (the module does that job; the secondary CTA scrolls to section 2), badge pills, and the description rows under the bars.

## 2. Copy

Hero and section 2 come straight from the redraft. The module strings are new, and the earlier draft of this doc had weak ones, so each gets an alternate. Pick or rewrite.

| Slot | Proposed | Alternate |
| --- | --- | --- |
| Eyebrow | For Australian property buyers | |
| H1 | Find the home you can really afford. | |
| Subhead | Your borrowing power changes lender to lender. See all 14 numbers and search with a price range you trust. | |
| Primary CTA | Find my range | |
| Secondary CTA | See how it works | |
| Trust line | Free. No impact on your credit score. | |
| Module label | What each lender would offer you | Same you. 14 different answers. |
| Wit line, appears when the bars settle | The biggest number isn't automatically the best one. We show you both. | Borrowed from the creative brief's own character line. Alternate: cut it entirely and let the module speak |
| Module fine print | Example numbers. Yours come from your details. | |
| Overflow row | + 8 more in your results | |
| Slider label | Household income | |
| Social proof strip | The 14 lenders most Australians borrow from. | All four majors, plus ten more worth checking. |
| Section 2 | What you get / The number you actually shop with. / **Your real price ceiling.** The property price within reach, with your deposit, stamp duty, LMI and each lender's policy already in it. The figure you type into the price filter and trust. | |
| Supports | **Every lender, side by side.** See who gives you the most room, and why they differ. / **Suburbs and listings within reach.** Know where you can actually buy before you fall for somewhere you can't. / **Stress test any scenario.** Model a rate rise, a new baby, a career change. Watch your range move. | |
| Closing band | Find the home you can really afford. / Your range is three minutes away. / Find my range | |

One number everywhere: 14. Voice rules per the redraft: plain, warm, no em dashes, state the fact and stop.

## 3. The range module

### Anatomy

Desktop: right of the headline. Mobile: between the subhead and the CTA.

- White card on `--bg` #FAFAFA, r10, 1px `--line`, 20px padding, flat.
- Label row: module label 13px/400 `--muted`, with the resolved range right-aligned, "$820k – $969k", 15px/700 tabular.
- Six lender rows on desktop, five on mobile. Each is a single 32px line: name (13px/400, 72px column), bar (flex), price (14px/700, right, tabular). Bar is 8px, full-round, track `--field`, fill from the lender cycle palette, width proportional to the leader. The leader's name sits at 600. No pills, no badges, no rows of text under the bars.
- Overflow row: "+ 8 more in your results", 12px `--muted`. Carries the 14 without drawing 14 bars.
- Income slider: label left, live value right ("$145,000", 700, tabular). Track `--field` 6px, filled portion `--teal`, thumb 28px `--teal` with a white ring. Range $60k to $300k, step $5k. Touch target at least 44px tall. Keyboard: arrows move $5k, shift-arrows $25k. `aria-valuetext` reads "$145,000 a year".
- Fine print under the slider, 11px `--muted-2`.

### Interaction

- While dragging, everything tracks the thumb directly at 60fps: bar widths, prices, the range figure. Tabular numerals keep the text from jittering. Rank order stays frozen during the drag because re-sorting under someone's finger reads as chaos.
- On release, if the order changed, rows FLIP to their new positions (250ms) and the range figure settles with a short count. This release beat is the actual demo: different incomes put different lenders on top.
- First entrance, triggered in view: bars grow with a 60ms stagger and prices count up, about 900ms total. When they settle the wit line fades in and stays put. One entrance per page load.
- After the entrance the thumb pulses once to invite the drag. Once.
- Data: a small client-side model, per-lender coefficient curves precomputed from the fixture engine at build time. Directionally real (some lenders flatten early, some reward income) without claiming precision. The fine print carries the caveat and the CTA is the path to real numbers.
- Reduced motion: final states, instant swaps, slider still works.

### Mobile

At 375px the module comes before the CTA: eyebrow, H1, subhead, module, CTA, trust line. People play first and hit the button warm. Rows tighten to 28px, name column 64px. Five bars plus the overflow line runs about 200px; with the slider the whole module is roughly 320px tall. H1 at 32px (marketing scale can exceed the product's 25px).

## 4. Motion map

| Moment | Motion |
| --- | --- |
| Module entrance | Bar grow + count-up, staggered, one run |
| Slider drag / release | Direct manipulation, then FLIP and settle |
| Wit line | 300ms fade on first settle |
| Section 2 illustration | Sticker place + one line boil on scroll-in |
| Closing illustration | Sticker place only. One boil per page is the budget |
| Section reveals | 12px rise and fade, one run per section |
| Buttons | Background-colour hover only |

No idle loops in v1. The slider is the only toy on the page.

## 5. Image prompts (GPT Image, inked-sticker system)

Prepend the shared preamble from `illustration-style.md` §5 to each. Reminder from that doc: no text or numbers inside images, transparent background except the OG card, keep the grain (no JPEG).

1. **`ceiling-scene`** (section 2, ~2048×2048): "A scene of a cream house with a muted sage-teal roof and mustard door, an oversized swing-tag price label tied to its door handle with string, the tag blank cream with a mustard corner fold. A folded document with a signature squiggle leans against the side wall. A small terracotta location pin stands in front. Soft grey blob shadow, house filling most of the frame, the tag clearly the focal accessory."
2. **`ceiling-scene-boil-1`**: append "Second frame of a stop-motion pair: the exact same drawing and composition, re-inked; every line subtly redrawn with different hand-wobble, fills and colours identical."
3. **`closing-keys`** (closing band, ~1024×1024): "A single house key with a rounded cream head and slate-blue shaft, lying across a small paper tag tied to it with string, one gold coin beside the tag. Two objects and a coin, generous negative space."
4. **`og-share`** (1536×1024): "A wide composition on a warm paper-cream background (not transparent): the cream house with sage-teal roof and price tag sits left of centre; to its right, five horizontal hand-inked bars of different lengths in slate blue, mustard, terracotta, sage and warm brown, rounded ends, arranged like a small bar chart drawn by hand. Calm, plenty of breathing room."

## 6. Build notes

- New route `/landing-b`, own scoped `landing-b.css` on the v3.2 tokens: Inter 400/600/700, `--bg` #FAFAFA, white cards, tiered teal, teal primary buttons with black labels, 10px radius, no shadows. Nothing shared with the retired `landing-a.css`.
- The module ships as one component with the slider maths in a pure function, `estimate(income, lenderCoeffs)`. Unit-testable, swappable for real engine output later.
- Screen readers get "Range $X to $Y" announced politely on release, not per pixel. The wit line is `aria-hidden`.
- Analytics: `slider_engaged` (first drag), `slider_release_count`, and CTA clicks split by played vs didn't. The page has one thesis, that playing converts, and this makes it measurable.

## 7. Not doing

- A second control (deposit, rate). One input, one consequence. More controls make it a calculator, and the calculator is the product's job.
- A lender logo wall. Borrowed credibility, visual noise.
- Wit anywhere beyond the one reserved line.
- Parallax, scroll-jacking, ambient loops.
- Numbers inside illustrations. They date, they fight the live module, and the style guide bans them.
