# Landing B — build goal prompt + image generation prompts

Two things in one file: the goal prompt for building/iterating `/landing-b`, and the four image prompts to run through GPT Image. Generated images go in `public/landing-b/` with the exact filenames below; the page picks them up automatically (it shows labelled placeholder boxes until then, and the boil animation arms itself only once its frame exists).

---

## Part 1 — Goal prompt

> Build `/landing-b`, the "The Range" landing page, exactly to `docs/landing-b-proposal.md`, on the v3.2 design tokens (`docs/results-page-spec.md` §3: Inter 400/600/700, page `#FAFAFA`, white flat cards, tiered teal with teal-fill/black-label primary buttons, one 10px radius, no shadows). Motion follows the proposal's motion map and the restraint rules in `docs/illustration-style.md` §4.
>
> The page is five sections: hero with the live range module, the price-ceiling feature, three text-only supports, the closing band, and the compliance footer. Nothing else. No pills, no badges, no description rows under the bars, no logo wall, no idle animation loops.
>
> The range module is the whole point and gets the care:
> - Six rows of name / bar / price only. Income slider beneath ($60k–$300k, $5k steps, default $145k). Fine print under the slider.
> - While dragging: widths, prices and the range figure track the thumb 1:1 at 60fps, tabular numerals, and rank order stays frozen.
> - On release: rows FLIP to their new order (250ms) and the range settles with a short count.
> - First scroll into view: bars grow with a 60ms stagger and prices count up (~900ms), then the wit line fades in and stays. One run per page load.
> - The slider maths is a pure exported function (income × per-lender multiplier with a soft cap) so it is unit-testable and swappable for real engine output.
> - Keyboard: arrows ±$5k, shift ±$25k, `aria-valuetext` in dollars a year. Screen readers hear "Range $X to $Y" politely on settle, never per pixel. The wit line is aria-hidden.
> - `prefers-reduced-motion`: all final states, slider still fully works.
>
> Mobile (≤720px): hero stacks eyebrow → H1 → subhead → module → CTA → trust line, so the module is played before the button. Rows tighten to 28px and the lowest-ranked bar drops (five visible); the range figure still covers all six.
>
> Verify by running the dev server and playing with it: drag through the full income range and watch for rank flips around $160–175k; check the release FLIP, the one-time entrance, tab-through with a keyboard, a 375px viewport, and reduced-motion. `npm run build` must pass. Iterate until every item in the checklist below is true, then stop.

### Acceptance checklist

- [ ] Route `/landing-b` renders; nothing outside its scoped CSS touched
- [ ] All copy comes from the proposal's table (proposed column), one "14" everywhere
- [ ] Module: 6 rows name/bar/price, no pills/badges/descriptions; overflow line; fine print
- [ ] Drag = live values + frozen rank; release = FLIP re-rank + range settle
- [ ] Entrance runs once; wit line appears once; thumb invites once
- [ ] Keyboard + SR behaviour as above; reduced-motion clean
- [ ] Mobile stack order correct; five bars at 375px; module ≈ 320px tall
- [ ] Sections 2/4 show image placeholders until assets land, then sticker-place entrance (section 2 also gets the single line-boil)
- [ ] Build passes; no console errors

---

## Part 2 — Image prompts (run these, drop results in `public/landing-b/`)

All four share the same style base. Copy the full block per image. PNG only (JPEG kills the grain).

### 1. `ceiling-scene.png` — section 2 feature (square, 2048×2048 or 1024×1024)

> Small flat illustration in a hand-inked sticker style: thick near-black ink outlines with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture on every fill; no gradients, no highlights, no 3D. Muted vintage palette only: paper cream, slate blue-grey, muted sage-teal, mustard gold, terracotta, warm brown. Gently tilted so it feels placed by hand, small soft grey blob shadow beneath, floating on a fully transparent background. Storybook-friendly, calm, slightly toylike; not corporate, not glossy, not emoji-like, no mascots, no faces, no text or numbers anywhere in the image.
>
> A scene of a cream house with a muted sage-teal roof and a mustard door. An oversized swing-tag price label is tied to its door handle with string, the tag blank cream with a mustard corner fold. A folded document with a signature squiggle leans against the side wall of the house. A small terracotta location pin stands in the foreground. The house fills most of the frame and the tag is clearly the focal accessory.

### 2. `ceiling-scene-boil-1.png` — stop-motion second frame (same size as #1)

> [Repeat the entire prompt from #1, then append:]
>
> This is the second frame of a stop-motion pair: the exact same drawing and composition as the first frame, re-inked. Every outline is subtly redrawn with different hand-wobble; fills, colours, object positions and proportions are identical.

*(If your tool supports image-to-image, feed it `ceiling-scene.png` with just the appended instruction — that gives a much tighter pair.)*

### 3. `closing-keys.png` — closing band (square, 1024×1024)

> Small flat illustration in a hand-inked sticker style: thick near-black ink outlines with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture on every fill; no gradients, no highlights, no 3D. Muted vintage palette only: paper cream, slate blue-grey, muted sage-teal, mustard gold, terracotta, warm brown. Gently tilted so it feels placed by hand, small soft grey blob shadow beneath, floating on a fully transparent background. Storybook-friendly, calm, slightly toylike; not corporate, not glossy, not emoji-like, no mascots, no faces, no text or numbers anywhere in the image.
>
> A single house key with a rounded cream head and a slate-blue shaft, lying across a small paper tag tied to it with string. One gold coin rests beside the tag. Two objects and a coin, nothing else, generous negative space.

### 4. `og-share.png` — social card (landscape, 1536×1024)

> A wide flat illustration in a hand-inked sticker style: thick near-black ink outlines with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture; no gradients, no highlights, no 3D; no mascots, no faces, no text or numbers anywhere in the image. Muted vintage palette: paper cream, slate blue-grey, muted sage-teal, mustard gold, terracotta, warm brown.
>
> On a warm paper-cream background (not transparent), a cream house with a muted sage-teal roof and a swing-tag price label on its door sits left of centre. To its right, five horizontal hand-inked bars of different lengths in slate blue, mustard, terracotta, sage and warm brown, with rounded ends, arranged like a small bar chart drawn by hand. Calm composition, plenty of breathing room.

### After the images land

Drop the PNGs into `public/landing-b/`, reload, and check: section 2 does one sticker-place + line-boil on scroll-in (needs both #1 and #2 present), the closing band does sticker-place only, and every placeholder box is gone. If any image fails the "line it up next to the wallet and clipboard" test from `illustration-style.md`, regenerate before shipping.
