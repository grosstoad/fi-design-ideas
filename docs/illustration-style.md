# FundIQ illustration style — "Inked sticker" imagery

The Paper designs carry a distinctive illustration system used for category imagery across the input flow and the Results Update-details chooser. This doc defines the style so new pieces stay on-system, records where every existing asset lives, and provides generation prompts. Verified directly against the assets in Paper file `01KSYP7T3MFEQHHED41F3PQB58` (2026-07-07).

**Relationship to the icon doc:** `docs/results-page-icon-prompts.md` covers functional line glyphs (chevrons, close, check, alerts). This doc covers *pictorial category imagery*. The rule for choosing between them: **chrome and state-signalling = line glyph; "what kind of thing is this row about" = inked-sticker illustration.** Never mix the two treatments within one row list.

---

## 1. The style, precisely

Each asset is a small object illustration with the character of a hand-inked storybook sticker:

- **Outline:** every shape carries a thick, near-black ink outline (`~#1A1A1A`), uniform weight relative to the object (reads ~2–3px at 40px render), with rounded corners and slightly organic, hand-drawn edges — not vector-perfect.
- **Fills:** flat colour, no gradients, with a visible **paper-grain / risograph speckle texture** across every fill. This grain is the signature — a flat-vector version reads instantly off-system.
- **Shading:** minimal. At most one flat darker plane (e.g. the wallet's side) and a small soft grey blob shadow under the object. No highlights, no 3D, no perspective beyond a gentle ¾ tilt.
- **Composition:** one hero object plus one or two supporting props that tell a tiny story — house + contract + location pin; clipboard + % sheet + clock tab; wallet + receipt + spilling coins; car key + licence card. Props overlap the hero. Objects sit at a slight rotation (2–8°) so they feel placed, not mounted.
- **Canvas:** square-ish, transparent background, object filling ~65–75% of frame, exported PNG at 724×724 (some crops smaller). Rendered in-UI at roughly 40px.

### Palette (sampled from the assets — approximate, the grain modulates everything)

| Role | Colour | Seen on |
| --- | --- | --- |
| Ink outline | `#1A1A1A` | everything |
| Oatmeal / cream paper | `#F0E9D8` | documents, house walls, bottle caps |
| Slate blue-grey | `#5B7285` | clipboard clip, key card, clock tab |
| Muted teal-sage | `#5E8778` | house roof, card stripe |
| Mustard gold | `#E4B54A` | door, coins, page folds, yellow documents |
| Terracotta / brick | `#C0604A` | location pin, medical cross |
| Warm brown | `#8B5E3C` | wallet, paper bag, bottle |
| Cool grey | `#8E8E8E` | key head, metal details |

Warm, muted, slightly vintage — nothing saturated, nothing neon, and **no FundIQ UI teal** (`#167D7F`): the illustrations deliberately live in their own warmer world so they read as content, not controls.

---

## 2. Usage rules (from the frames)

1. **Anchored directly in rows — no chip, no thumbnail box.** The Update-details frame carries the literal note "Generated icons are anchored directly in rows, no empty thumbnail boxes." The illustration sits on the row's white background at ~40px, vertically centred. (This corrects spec §7.7's earlier "`--field` chip" wording.)
2. One illustration per row, always leading (left), text block beside it, chevron trailing.
3. Same rendered size within a list — the compositions vary, the bounding box doesn't.
4. They appear where a user is *choosing a category* (income types, expense categories, liability types, update-details areas). They do not appear beside plain data values, in the lender list, in the statement card, or in CTAs.
5. Export: transparent PNG (or WebP) at 2× render size minimum; never SVG-flatten them (the grain dies).

## 3. Existing asset inventory (reuse, don't regenerate)

Codex: pull these via the Paper integration rather than generating fresh — regeneration risks style drift. Node IDs are from file `01KSYP7T3MFEQHHED41F3PQB58`, page `3-0`.

| Asset | Subject / story | Used for | Example node |
| --- | --- | --- | --- |
| House with green roof | house + contract page + terracotta location pin | Property details (Update-details chooser); property contexts | `1949-0` |
| Stylized clipboard | clipboard + % document + slate clock tab | Loan details (Update-details chooser) | `194F-0` |
| Brown wallet | wallet + receipt + green card + gold coins | Financial inputs (Update-details chooser) | `194L-0` |
| Name tag | name-badge | Employment income | `YSW-0` |
| Green document | document sheet | Other income | `YT1-0` |
| Car key | key + slate licence/registration card | Car loan / transport | `11T8-0` |
| Yellow document | mustard document | Liability / statement category | `11TG-0` |
| Brown paper bag | grocery bag | Expenses category | `11TE-0` |
| Blue & white lunchbox | lunchbox | Food / everyday expenses | `11TI-0` |
| Coffee cup | takeaway cup | Lifestyle expenses | `1301-0` |
| Blue umbrella document | document + umbrella | Insurance | `12Z4-0` |
| Brown bottle with cross | medicine bottle, cream cap, brick cross | Health / medical expenses | `12ZF-0` |
| Stylized key | house key | Rent / housing | `130C-0` |
| Binder clip paper | clipped paper stack | Admin / other commitments | `130N-0` |

## 4. Master generation prompt (for NEW pieces only)

Prepend to every subject prompt:

> Small flat illustration of {SUBJECT}, in a hand-inked sticker style: thick near-black ink outlines (#1A1A1A) with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture on every fill; no gradients, no highlights, no 3D rendering. Muted vintage palette only — oatmeal cream #F0E9D8, slate blue-grey #5B7285, muted teal-sage #5E8778, mustard gold #E4B54A, terracotta #C0604A, warm brown #8B5E3C. Composition: one hero object with one or two smaller supporting props overlapping it, tilted 2–8 degrees, small soft grey blob shadow beneath, floating on a fully transparent background, object filling about 70% of a square canvas. Storybook-friendly, calm, slightly toylike; not corporate, not glossy, not emoji-like. Square PNG, 724×724, transparent background.

**Consistency check for any new piece:** put it at 40px beside the wallet and the clipboard — if its line weight, grain, or saturation stands out, redo it.

### Subject prompts for pieces the results experience may need next

| Slug | Use | Subject line (append to master prompt) |
| --- | --- | --- |
| `broker-call` | Broker capture header / success | a friendly telephone handset resting on a small notepad with a scribbled note, a tiny terracotta location pin beside it |
| `funds-stack` | Funds-to-complete education / empty moments | a short stack of gold coins leaning against a folded cream receipt with a mustard corner fold |
| `income-salary` | Income section (if illustrated later) | a cream pay envelope with a slate window, one gold coin slipping out |
| `existing-home` | Existing properties section | a small house with a mustard door and a slate key resting against its wall |
| `savings-jar` | Savings contexts | a glass jar with a cream lid holding gold coins, a small hand-written label on the front |
| `no-match` | Empty state, only if §9.4's "illustration-free" call is ever reversed | an open cream envelope, empty, with a slate magnifying glass leaning on it |

## 5. Where illustrations must NOT go (unchanged spec decisions)

- Results hero, lender list rows, statement/capacity/rate rows — data stays unadorned (spec §2a).
- Empty state §9.4 is explicitly "illustration-free" (copy does the work) unless the owner reverses it.
- CTAs and text links — never.
- Sort sheet rows — plain radio rows per the Paper frame.
