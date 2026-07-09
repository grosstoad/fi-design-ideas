# FundIQ illustration & motion style — "Paper, inked"

v2 — reworked from a consistency spec into an art-direction system. The bar: work that earns recognition (Awwwards/site-of-the-day class) while staying calm enough for a financial product. Verified against the assets in Paper file `01KSYP7T3MFEQHHED41F3PQB58` (2026-07-07).

**Relationship to other docs:** `docs/results-page-icon-prompts.md` covers functional line glyphs (chevrons, close, check, alerts). `docs/results-page-spec.md` §11 owns data motion (count-up, bar fill, FLIP) — nothing here overrides it. The rule for imagery: **chrome and state-signalling = line glyph; "what kind of thing is this about" or "how does this moment feel" = illustration.** Never both treatments in one row list.

---

## 0. The concept (read this before any rule)

Buying a home is the most paperwork-dense, least human-feeling financial moment in most people's lives. FundIQ's interface answers that with two deliberately opposed voices:

- **The system voice** — white space, Helvetica Neue, black and teal, exact numbers. Calm, precise, institutional competence.
- **The human voice** — small hand-inked objects from the life the numbers are about: the coffee cup, the lunchbox, the car key, the house with the crooked location pin. Warm, imperfect, domestic.

The style exists to keep the second voice alive inside the first. Every illustration is a **belonging, not an icon** — a thing from the user's actual life, drawn like a sticker in a well-kept notebook. That's the point of view. When judging any new piece or motion idea, ask: *does this feel like a belonging placed into a precise document?* If it feels like a mascot, an emoji, or a tech-brand blob character, it's off-concept no matter how well it matches the palette.

The tension between the two voices IS the identity. Protect both: never let illustration warm up the data surfaces (the numbers must stay austere), and never let the system voice flatten the illustrations (no recolouring them teal, no vector-cleaning the ink line).

---

## 1. The craft (what makes a piece on-style)

- **Ink line:** thick, near-black, rounded, slightly organic — visibly drawn by a hand, not a path tool. Uniform weight within a piece.
- **Fills:** flat colour carrying a **paper-grain / risograph speckle** across every surface. The grain is the signature; a flat-vector version reads instantly off-system.
- **Shading:** at most one flat darker plane per object plus a small soft blob shadow. No gradients, highlights, or 3D.
- **Composition:** one hero object + one or two supporting props that tell a tiny story (house + contract + pin; wallet + receipt + escaping coins). Props overlap the hero. A gentle tilt so pieces feel *placed*, not mounted — treat ~2–8° as the default posture, not a law; a deliberately straight piece is allowed when stillness is the point.
- **Palette:** warm, muted, vintage — built from families, not hexes: *paper cream, slate blue-grey, sage-teal, mustard gold, terracotta, warm brown, cool grey*, outlined in near-black. (Anchors if needed: `#F0E9D8 / #5B7285 / #5E8778 / #E4B54A / #C0604A / #8B5E3C / #1A1A1A` — but match by eye against the wallet and clipboard; the grain modulates everything.) Two hard rules only: nothing saturated/neon, and **never the UI teal `#167D7F`** — illustrations must read as content, not controls.
- **The consistency check (the only test that matters):** place the new piece at its render size beside the wallet and the clipboard. If its line weight, grain, saturation, or personality stands out, redo it. This check outranks every numeric rule above.

## 2. Scale system (new in v2 — where the style is allowed to perform)

One size was the v1 doc's biggest constraint. Three tiers, each with its own licence:

| Tier | Render size | Where | Licence |
| --- | --- | --- | --- |
| **T1 Functional** | ~40px | Category rows (Update-details chooser, flow category lists) | Tightest: single object + ≤2 props, anchored directly in the row (no chip/thumbnail box — per the Paper frame's own note), uniform bounding box within a list, no motion beyond entrance |
| **T2 Feature** | 96–160px | Broker success, Save & exit moment, section intros, "how we estimate" popover, error panel | Richer composition (up to 4 props), may hold ONE idle micro-loop (§4.3), may sit asymmetrically in its container |
| **T3 Hero** | 200px+ | Marketing/landing, share cards, first-run moments | Full scene licence: multiple objects composing a vignette, may break the container — overlap a card edge, tuck behind a headline, crop off-canvas. This is where award work happens; it must never appear inside the results data column |

Layout interplay rules for T2/T3: illustrations may overlap card boundaries and sit behind/among type, but never behind *numbers*; text never wraps around an illustration (place, don't flow); one T2+ piece per viewport.

**Tonal axis:** for serious moments (shortfall, error), stay in the same craft but shift the cast — more slate and cool grey, less mustard, props at rest (nothing spilling or bouncing). Never draw sad objects; the calm of the composition carries the tone.

## 3. Existing asset inventory (reuse, don't regenerate)

Codex: pull these via the Paper integration rather than generating fresh — regeneration risks style drift. Node IDs from file `01KSYP7T3MFEQHHED41F3PQB58`, page `3-0`. All are T1 pieces.

| Asset | Subject / story | Used for | Example node |
| --- | --- | --- | --- |
| House with green roof | house + contract + terracotta location pin | Property details (chooser) | `1949-0` |
| Stylized clipboard | clipboard + % document + slate clock tab | Loan details (chooser) | `194F-0` |
| Brown wallet | wallet + receipt + green card + gold coins | Financial inputs (chooser) | `194L-0` |
| Name tag | name-badge | Employment income | `YSW-0` |
| Green document | document sheet | Other income | `YT1-0` |
| Car key | key + slate licence card | Car loan / transport | `11T8-0` |
| Yellow document | mustard document | Liability / statement | `11TG-0` |
| Brown paper bag | grocery bag | Expenses | `11TE-0` |
| Blue & white lunchbox | lunchbox | Food / everyday | `11TI-0` |
| Coffee cup | takeaway cup | Lifestyle | `1301-0` |
| Blue umbrella document | document + umbrella | Insurance | `12Z4-0` |
| Brown bottle with cross | medicine bottle + brick cross | Health | `12ZF-0` |
| Stylized key | house key | Rent / housing | `130C-0` |
| Binder clip paper | clipped paper stack | Admin / other | `130N-0` |

Export: transparent PNG/WebP at ≥2× render size; never SVG-flatten (the grain dies).

## 4. Motion — "stop-motion paper" (new in v2)

### 4.1 Philosophy: three layers, one owner each

1. **Data motion** (owned by spec §11, unchanged): count-ups, bar fills, FLIP re-rank, shimmer. The precise voice. Runs once, never re-animates on selection, reduced-motion renders final values.
2. **Illustration motion** (this doc): the human voice. Illustrations move like physical stickers and stop-motion paper cutouts — never like CSS objects (no fades-only, no linear slides, no infinite spins).
3. **Transition motion** (spec §10.4/§11): sheets, modals, springs. Already specced; illustrations ride these transitions, they don't add their own.

The layers must not fire simultaneously in the same region: when numbers are counting, illustrations hold still. **One animated thing at a time, per viewport.** Restraint is the craft — a jury should remember one moment, not notice ten.

### 4.2 The signature move: line boil

At moments of arrival, an illustration's ink line "boils" — the drawing is redrawn for 2–3 alternate frames at **8–12fps** (stop-motion cadence, deliberately below UI frame rates), then settles to the still frame. Like a hand-drawn title card coming alive for half a second. This is the single most distinctive motion available to this style — and it's cheap: 2–3 PNG frame swaps or a short Lottie, no rigging.

Where it fires: entrance of T1 rows in a freshly opened sheet (once), a T2 piece appearing (once), and on direct touch/hover of an illustrated row (one boil cycle, ~250ms, then still). Never loops idly. Never fires during data motion.

### 4.3 The vocabulary (complete list — resist inventing more)

| Move | Spec | Used for |
| --- | --- | --- |
| **Sticker place** (entrance) | scale 0.92→1 with ≤2° rotation overshoot, spring ~350ms; chooser rows stagger 50ms top-down | Any illustration entering: sheet open, panel reveal |
| **Line boil** | 2–3 frames @ 8–12fps, ≤400ms total, then still | Arrival accent + touch/hover acknowledgement |
| **Prop micro-loop** (idle) | ONE prop, ≤2px travel or ≤3° sway, cycle ≥3s, ease-in-out | T2 pieces only, one per screen: steam wisp off the coffee cup, the wallet's top coin settling, the clipboard clock tab ticking once |
| **Press acknowledgement** | scale 0.97 on press, spring back on release (rides the row's own press state) | Illustrated rows/cards |
| **Success beat** | sticker place + one boil + props land with 60ms stagger (coins drop into wallet) | Broker success, save confirmation — the one celebratory moment; ≤900ms total, runs once |

### 4.4 Craft constraints (what keeps it award-grade instead of gimmicky)

- Durations: entrances 300–450ms; acknowledgements ≤250ms; nothing over 900ms ever.
- Physics: springs for placement (things *land*), ease-out for reveals. Nothing linear, nothing bouncing more than one overshoot.
- Performance: transform/opacity only for placement moves; boil frames are pre-rendered images (no filters, no canvas redraws); 60fps or the move gets cut.
- Motion never blocks input, never delays data, never gates navigation. If a user acts mid-animation, jump to final state.
- `prefers-reduced-motion`: every move in §4.3 renders its final still frame instantly. Boil frames never swap. (Matches spec §11's contract.)
- **The restraint budget:** per screen — one signature moment, one idle loop maximum, everything else still. When in doubt, still.

### 4.5 Implementation notes for codex

- Boil + place ship as a tiny `<Sticker>` component: takes the PNG frame set (1–3 frames), handles entrance spring, boil timer, press scale, reduced-motion. All illustration motion goes through it — no bespoke keyframes scattered in components.
- Frame sets: export `{slug}.png`, `{slug}-boil-1.png`, `{slug}-boil-2.png` from the source assets (the boil frames are the same drawing re-inked — generate per §5's prompt note, or ship v1 with place/press only and add boil frames when assets exist; the component API shouldn't change).
- The prototype's states gallery gets a "motion" cell showing each vocabulary move on the wallet asset, plus its reduced-motion still.

## 5. Generating new pieces

Master prompt (prepend to every subject):

> Small flat illustration of {SUBJECT}, hand-inked sticker style: thick near-black ink outlines with rounded, slightly organic hand-drawn edges; flat colour fills with a visible paper-grain risograph speckle texture on every fill; no gradients, no highlights, no 3D. Muted vintage palette drawn from: paper cream, slate blue-grey, muted sage-teal, mustard gold, terracotta, warm brown. Composition: one hero object with {N} smaller supporting props overlapping it, gently tilted so it feels placed by hand, small soft grey blob shadow beneath, floating on a fully transparent background, object filling about 70% of a square canvas. Storybook-friendly, calm, slightly toylike; not corporate, not glossy, not emoji-like, no mascots, no faces. Square PNG, 724×724, transparent background.

For **boil frames**, append: *"Second frame of a stop-motion pair: the exact same drawing and composition, re-inked — every line subtly redrawn with different hand-wobble, fills and colours identical."*

For **T2/T3 pieces**, append scale licence: *"Richer vignette: up to four supporting props arranged as a small scene"* (T2) or describe the full scene and its crop (T3).

Ready subjects the results experience may want: `broker-call` (telephone handset on a notepad with a scribbled note, terracotta pin beside it — the broker success T2 piece, gets the Success beat), `funds-stack` (gold coins leaning on a folded receipt), `savings-jar` (glass jar of coins with a handwritten label), `existing-home` (house with mustard door, slate key against the wall), `income-salary` (pay envelope with a slipping coin), `no-match` (open empty envelope with a magnifying glass — only if spec §9.4's "illustration-free" call is reversed by the owner).

## 5a. The character — scoped exception to "no faces" (C4, owner 2026-07-08)

casual-client's `CREATIVE_BRIEF.md` defines a Fundora **character** — a helpful-friend avatar, "Daria realism + Dora helpfulness", never a mascot. The owner ruled the two systems coexist, scoped:

- **Objects remain the category imagery** — rows, sheets, choosers, everything in §3. The master prompt's "no mascots, no faces" still governs every object piece.
- **The character may appear ONLY at interpretive moments**, per the brief's own limits: contextual insights after a result, short interpretive notes, onboarding/first-run empty states, comfort-check reframes. Never in tables, charts, forms, dense data, nav, or as a logo; never repeated on one screen; no floating assistant bubbles; no reaction to every action.
- **Craft condition:** the character must pass the same line-up test as any piece — identical ink line, grain, palette (§1), and the wallet/clipboard check. If the character reads as a different illustrator's work, it doesn't ship. Its design is an open task; no asset exists yet.
- Motion: the character gets the same §4 vocabulary and budget — no extra moves, no idle chatter loops.

## 6. Where the style must hold back

The data surfaces stay austere — that's half the concept (§0): results hero, lender list rows, statement/capacity/rate rows, sort sheet rows, CTAs and text links. Spec §9.4's empty state remains illustration-free per the owner's standing decision (the `no-match` prompt above exists for the day that's reversed — a T2 moment there is this page's best award opportunity, worth an explicit owner call; note first-run/onboarding empty states are exactly where the character (§5a) is licensed, so that reversal now has a natural occupant).

## 7. The award lens (checklist before shipping any new piece or moment)

- [ ] Does it express the concept — a belonging placed into a precise document — or is it decoration?
- [ ] Would it survive the wallet/clipboard line-up test at render size?
- [ ] Is there exactly one signature motion moment on this screen, and is everything else still?
- [ ] Does the serious-moment version stay calm (cast shift, props at rest) rather than going grey or sad?
- [ ] Screenshot the screen: would it read as FundIQ with the logo removed? (Palette tension + grain + austere numbers = yes.)
