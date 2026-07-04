# Landing Concept A — Asset Generation Prompts

Each placeholder in `src/pages/LandingANumberPage.jsx` carries a `data-asset` id. Generate with GPT-5.5 (or any image model), then swap the placeholder for the file. Keep every output brand-aligned via the shared style block below — paste it at the end of every prompt.

**Shared style block (append to all prompts):**

> Style: soft watercolour and gouache on warm cream paper (#F4F3ED), editorial and minimal, generous negative space. Palette limited to deep forest green (#15362B), sage and eucalyptus greens, warm sand (#E3B23C) used sparingly as the only warm accent, soft blue-grey. Loose confident brushwork, no outlines, no gradients-as-lighting, matte finish. Absolutely no text, no numbers, no logos, no people's faces, no photorealism, no 3D render look, no neon. Composition must stay quiet at small sizes and sit behind or beside UI without competing.

**Technical requirements for all assets:** export PNG with transparent or cream background as noted; also request a 2x size; target ≤ 120 KB after squoosh/oxipng compression (these are the performance budget for the page); no alpha halos on cream.

---

## 1. `pillar-price` — "A price, not a loan figure" (card art, 4:3, ~640×480)

> Minimal watercolour illustration of a single Australian house silhouette (simple gable roof, veranda hint) resting on a horizontal brush-stroke baseline, with a small stack of three coins dissolving into the baseline to its left — implying costs already absorbed. One object group, centred, lots of cream space. Forest green house, sand-coloured coins.

## 2. `pillar-lenders` — "Every lender, ranked" (card art, 4:3, ~640×480)

> Minimal watercolour of four horizontal brush-stroke bars of descending length, stacked with even gaps, like a quiet bar chart painted by hand. Top bar deep forest green and slightly bolder; the others sage, blue-grey, and pale sand. No axis, no labels. Centred, generous margins.

## 3. `pillar-sliders` — "Move the sliders, watch it move" (card art, 4:3, ~640×480)

> Minimal watercolour of two horizontal slider tracks — thin soft grey-green lines — each with a round forest-green knob at a different position, and above them a short arc suggesting motion (a single curved brushstroke with a subtle sand-coloured tip). Abstract, calm, centred.

## 4. `pillar-settle` — "Cash-to-settle, spelled out" (card art, 4:3, ~640×480)

> Minimal watercolour of a house key lying beside a small neat stack of two or three paper notes rendered as soft green-grey rectangles, on cream. A tiny sand-coloured circle nearby suggests a coin. Composition like a flat-lay painted from above, objects grouped bottom-left, space top-right.

## 5. `final-band-suburb` — final CTA band backdrop (wide, ~2400×900, sits behind white text on forest green)

> Aerial watercolour of an Australian suburb at dusk painted in deep forest greens and near-black greens: winding streets, rooftops, tree canopies, a hint of coastline in one corner. Very low contrast, tonal, almost a texture — the entire image must stay dark enough that white 40px text remains readable anywhere on top. Darkest at the centre, softly lighter at the far edges. No focal point, no landmarks.

*Placement note:* apply as `background-image` on `.lpa-final-art` with `background-size: cover`, keep the existing radial washes as an overlay, and verify white-on-image contrast ≥ 4.5:1 across the band.

## 6. `hero-proof-frame` — optional hero garnish (only if the plain card feels bare)

The hero proof visual is a live component, not an image. If art direction wants atmosphere behind it:

> A very faint watercolour wash halo, eucalyptus green fading to nothing, roughly elliptical, on transparent background — intended to sit behind a white UI card at 15–20% opacity to lift it off a cream page. No shapes, no detail, pure soft wash.

*Placement note:* absolutely no imagery inside the card; behind it only, and skip entirely on mobile.

## 7. OG / social share image (1200×630)

> Composition on cream paper: left two-thirds empty (headline is overlaid in code/Figma later), right third a quiet stack of four descending watercolour bars (as in pillar-lenders) with the top bar forest green. Bottom edge carries a barely-visible aerial-suburb wash in pale sage.

*Note:* overlay "Know the most you can spend on a home." + wordmark in Hanken Grotesk 800 in a design tool — never ask the image model to render text.

---

## Swap checklist (per asset)

1. Compress (target ≤ 120 KB, 2x variant ≤ 250 KB).
2. Drop into `src/assets/landing-a/`.
3. Replace the placeholder: pillar art = `<img>` inside `.lpa-pillar-art` with empty `alt` (decorative) and `loading="lazy"`; final band = CSS `background-image`.
4. Check the section at 360px and 1440px; confirm the reveal animation still reads.
5. Re-run Lighthouse — the page budget is: LCP element stays the H1/proof card (not an image), CLS 0 (placeholders and images share identical aspect-ratio boxes), total image weight < 600 KB.
