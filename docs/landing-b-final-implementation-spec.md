# Fundora Landing Page — Final Implementation Specification

**Status: IMPLEMENTED — see §10 (v1.1: header/footer/tokens transcribed from the live amplify site 2026-07-10).** Source directives: `/Users/sarah/Downloads/Fundora_Landing_Page_Strong_Model_Planning_Handoff.md` (the "handoff"); everything below reconciles it against the real branch state.

Audience: a less capable coding model. Follow this document literally. Where this spec and older docs (`landing-b-proposal.md`, `landing-b-goal-prompt.md`, `landing-b-iteration-plan.md`) conflict, THIS FILE WINS. Do not re-plan, do not redesign, do not invent copy.

Branch: `landing-b-the-range`. Page: `/landing-b`. Main files: `src/pages/LandingBRangePage.jsx` (~762 lines), `src/landing-b.css` (~1650 lines), `src/pages/landing-b/model.js` (+ tests), `src/components/ResponsiveDialog.jsx`, `e2e/landing-b.spec.ts`. Visual source of truth for nav/footer/type/colour/buttons: the Casual Client build at https://main.d2shr8dw0vjdmh.amplifyapp.com/ — open it side by side while implementing; local reference repo at `/Users/sarah/Code/casual-client`.

---

## 1. Existing feature-branch context (what is already true)

Reviewed: `docs/landing-b-proposal.md`, `docs/landing-b-goal-prompt.md`, `docs/landing-b-iteration-plan.md` (now an execution record), `docs/lender-logo-sources.md`, the page/css/model sources, `e2e/landing-b.spec.ts`.

Already present and KEPT:
- Components inside `LandingBRangePage.jsx`: `RangeModule` (hero comparison + income slider), `LenderProof` (logo carousel), `HowItWorks` (3-step, currently selectable-stage), `InputPreview` (step-1 form visual), `MiniComparison` (step-2 visual), `FundsCard` (funding breakdown), `PropositionGrid`, `ResultStat`, plus shared `ResponsiveDialog` (modal/bottom-sheet, already used by "How we worked this out").
- Pure model in `src/pages/landing-b/model.js` with unit tests: per-lender illustrative estimates (income × multiplier, soft cap), fixed global bar scale (monotonic — keep), income range to $1,000,000 with stepped increments (keep), loan amount / rate / comparison rate / repayment derivation, 14-colour palette keyed by lender id.
- Copy already correct: H1 "Find the home you can really afford."; CTAs "Run your scenario" / "See how it works"; trust line "Free. No impact on your credit score."; module label "Your purchase power range"; "How we worked this out" opens ResponsiveDialog (keep this pattern).
- Lender logo assets in `src/assets/buying-range/lenders/` (see `docs/lender-logo-sources.md`).
- Playwright e2e (`e2e/landing-b.spec.ts`) and unit tests — extend, don't delete.

Conflicts with the handoff that MUST change (line numbers approximate):
- "Example comparison" string (JSX ~L211) — remove.
- "Est. monthly" (~L225) — rename to "Monthly repayment", values formatted `$11,323/mth`.
- "View all 14 lenders" (~L314) — remove.
- "Pause logos" control (~L384) and any hover-pause on the carousel — remove.
- Standalone price-ceiling section (~L724, id used by "See how it works" anchor) — remove entirely; FundsCard survives only inside HowItWorks step 3. Repoint the secondary CTA anchor to the HowItWorks section.
- Hero heading oversized; comparison not above the fold — compact per §3.2.
- Any lender-row click/selection/hover detail (incl. `LenderDetail` usage in step 2) — remove; rows become purely presentational everywhere.
- HowItWorks selectable-stage pattern — replace with three always-visible columns + connected numbered line (§3.5).
- Fixed-scale implementation note, min/max income labels, coloured dots beside lender names, surplus hairlines — remove.
- Footer is two anchor links — replace with Casual Client footer pattern.
- Nav missing "Ask Fundora" and full label set — match Casual Client (§3.1).

## 2. Final page architecture

```text
LandingBRangePage                     (src/pages/LandingBRangePage.jsx)
├── GlobalHeader                      (match Casual Client: wordmark · nav labels incl. Ask Fundora · primary CTA)
├── HeroSection
│   ├── HeroCopy                      (compact H1 + supporting copy)
│   ├── HeroActions                   (Run your scenario · See how it works · trust line)
│   └── RangeModule                   (lender comparison preview — presentational + income slider)
├── LenderProof                       (logo carousel, continuous, gutter-bound)
├── HowItWorks                        (3 visible steps + ConnectedStepLine)
│   ├── SectionHeader                 ("From your details to a number you can use.")
│   ├── ConnectedStepLine             (numbered markers on a progress line)
│   ├── Step1: InputPreview           ("Add your details")
│   ├── Step2: MiniComparison         ("Compare lender results")
│   └── Step3: FundsCard              ("Understand your costs")
├── PropositionGrid                   ("A borrowing number you can trust." — 3 borderless columns)
├── FinalCTA                          (closing band)
└── GlobalFooter                      (match Casual Client)
```

Component names above already exist in the branch — reuse them; only `ConnectedStepLine` and the Casual-Client-matching header/footer are new work.

## 3. Component-by-component specification

### 3.1 GlobalHeader — transcribed from the LIVE amplify home (2026-07-10; this is now exact, not aspirational)
Live markup: `<header class="sticky top-0 z-20 w-full bg-white border-b border-stone-300"><nav class="page min-h-16 flex items-center justify-between gap-5" aria-label="Main">…`
- **Structure:** sticky top, white background, 1px bottom border `stone-300` (#d6d3d1); inner `<nav aria-label="Main">` inside the shared `.page` container; min-height **64px**; flex, space-between, 20px gap (16px on mobile).
- **Wordmark (left): "Ask Fundora"** — it is the site wordmark, NOT a nav item. 18px / bold / black, links to home. (Note: our page currently says "Fundora"; adopt "Ask Fundora" to match the live brand site.)
- **Nav (right group): About → Learn** (that order on the live site), each 14px / semibold(600) / black, `transition-colors` hover; hrefs `/about`, `/learn` (placeholders `#` acceptable in this repo).
- **Primary CTA:** `btn btn-primary` → our `/assessment`; label **"Run your scenario"** at ≥sm, swapping to **"Start"** below sm (the live site does exactly this label swap — copy it).
- **No hamburger at any width** — the live site keeps wordmark + 2 links + CTA inline on mobile with tighter gaps.
- **Button spec (live `.btn` / `.btn-primary`):** inline-flex, min-height 38px, padding-inline 16px, border-radius 12px, 14px semibold, no border; default bg `stone-100`, black label; primary bg `teal-400`, black label; background-colour-only transition. Use these values for every CTA on the page.
- **Acceptance:** side-by-side screenshot vs the live header at 1440px and 375px is structurally identical (wordmark text, link set/order, heights, CTA shape, mobile label swap).

### 3.2 HeroSection (compact, above-the-fold guarantee)
- **Copy (exact):** H1 "Find the home you can really afford." · support "Compare what you could borrow across 14+ lenders, based on real lender rules, rates and purchase costs." · primary "Run your scenario" · secondary "See how it works" (anchor-scrolls to HowItWorks) · trust "Free. No impact on your credit score."
- **Layout:** keep the branch's centred composition; reduce H1 to the Fundora scale (~`clamp(32px, 3.2vw, 44px)`); tighten hero vertical padding so that at 1440×900 AND 1280×800 the viewport shows nav + H1 + support + both CTAs + at least the RangeModule header and first two lender rows. This is a hard acceptance criterion.
- **Motion (one-time, on load):** (1) heading+support fade in, translateY 8–12px→0; (2) CTAs ~80ms later; (3) RangeModule fades/rises last. `--ease-out: cubic-bezier(0.23,1,0.32,1)`, 280–420ms. Never re-runs on scroll. No scale-from-zero, no bounce, no parallax.

### 3.3 RangeModule (lender comparison preview)
- **Nature:** presentational. The income slider is the ONLY interaction.
- **Remove:** "Example comparison" text; "View all 14 lenders"; fixed-scale note; min/max income labels; coloured dots beside lender names; row hover styles; any click/selection/expansion/tooltip on rows (`pointer-events: none` on rows is acceptable); hairlines above column headings, directly below column headings, between list and slider, above the module's bottom area (use spacing; subtle row separators may stay if needed).
- **Header (exact):** "Your purchase power range" + beneath, regular weight: "The maximum property price you could afford." + the live range figure.
- **Columns:** Lender · Max property price (bar + value) · Loan amount · Interest rate · Comparison rate · Monthly repayment. Interest rate and Comparison rate MUST be identical size/weight/colour (legal, spec §12a). Numerals right-aligned, tabular-nums; headers aligned over their columns. Rename any "Est. monthly" → "Monthly repayment"; format `$11,323/mth`.
- **Scrolling:** internal list scroll allowed; NO scroll trap — when the inner list hits its top/bottom, page scroll continues naturally (do not set `overscroll-behavior: contain`). Hidden scrollbar + small edge fades OK; whole rows visible at rest (no half-cut row).
- **Slider:** on change, range figure, bars, loan amounts and repayments update; ordering may change only as the model dictates. Keep fixed global bar scale (monotonic). Motion: bars 220–300ms ease-out; numbers 180–250ms; row reorder 300–400ms ease-in-out; no bounce, no table flash. Optional one-time autoplay demo before first touch; first user touch stops autoplay permanently.
- **Accessibility:** rows `aria-hidden` with a text summary alternative; slider keyboard steps preserved; range announced politely on settle only.

### 3.4 LenderProof (logo carousel)
- **Lenders (min):** CommBank, NAB, Westpac, ANZ, Macquarie, ING, Athena, AMP, Bankwest, Suncorp Bank, Bendigo Bank (+ existing BOQ/HSBC/ubank fine). Correct Australian marks, symbol + name treatment, transparent bg, consistent optical height (`docs/lender-logo-sources.md` tracks sources; replace any wrong/placeholder marks).
- **Behaviour:** continuous linear loop, seamless join; does NOT pause on hover; remove the "Pause logos" button entirely; keyboard-focus pause MAY remain (a11y). Sits inside the shared content max-width and gutters — never edge-to-edge; subtle edge fades.
- **Reduced motion:** static wrapping row (all logos visible, no animation).
- **Heading above strip:** keep "Compare how much you can borrow across 14 lenders" (15–16px, weight 400–500, muted), same background as the strip, no divider lines.

### 3.5 HowItWorks (rebuild interaction pattern)
- **Replace** the current selectable-stage pattern with **three always-visible equal columns** + a horizontal **ConnectedStepLine**: numbered markers (1·2·3) sitting ON the line; neutral line at rest; teal progress fill sweeps 1→3 as the sequence plays; active marker fills teal; completed markers keep a subtle done state. No glow, no bouncing.
- **Section header (exact):** title "From your details to a number you can use." · support "See what you could borrow, compare lender results and understand the full cost of buying." Centre-aligned.
- **Step 1 "Add your details"** — copy: "Tell us about your income, savings and the property you are planning to buy." Visual: `InputPreview` compact Fundora form (Annual income, Buying purpose, Property location, Savings) using real Fundora field styling. Motion (once, in view): income focused → value selected → new value typed → purpose dropdown opens → "Home to live in" selected → savings updates → settle.
- **Step 2 "Compare lender results"** — copy: "Compare borrowing calculations across 14+ lenders and counting." Visual: `MiniComparison` (purchase-power range, several rows, bars, repayment values). Rows NOT clickable — remove `LenderDetail` usage; delete the component if orphaned. Motion: range appears → bars expand → values update → list scrolls slightly → settle. No per-lender stagger theatrics, no loop.
- **Step 3 "Understand your costs"** — copy: "See the property costs, how the purchase is funded and what remains after settlement." Visual: `FundsCard` (§3.6). Motion: total appears → cost segments assemble → funding breakdown appears → loan+deposit segments assemble → savings-left-over last. Story: what it costs → how it is funded → what remains.
- **Sequence:** plays once when section enters viewport, step 1→3 over ~5–7s total, final states persist, never loops. Optional: clicking a visual replays ONLY that visual (no expand/modal/navigation). Reduced motion: no sequence; all three final states shown.
- **Responsive:** desktop three columns + horizontal line; mobile stacked with a vertical line, same order, visuals kept legible (no tiny screenshots).

### 3.6 FundsCard (funding breakdown — lives ONLY in step 3)
- **Copy (exact):** heading "You could afford a $760,000 home" · total "$795,400 in total property costs" · cost legend: Property price / Stamp duty / Legal and other costs, each with a colour identifier matching its bar segment · second group heading "Funding breakdown" (renamed from "Where the funds are sourced from") · rows: "Loan from CBA (79% LVR)" — exactly that: CBA not CommBank, parentheses not a middle dot, no separate LVR fragment — and "Deposit" (renamed from "Your savings used") · final row "Savings left over" ($14,600, green-dark).
- **Structure:** one card; remove hairlines between "Legal and other costs" and "Funding breakdown" and above "Savings left over" — separate zones with spacing/background instead. Numbers must reconcile (760,000+30,000+5,400 = 795,400 = 600,000+195,400).

### 3.7 PropositionGrid
- **Remove** "More than one number". **Heading (centre, exact):** "A borrowing number you can trust." · support "Fundora brings lender calculations, real purchase costs and scenario modelling into one clear view."
- **Three borderless columns (exact copy):** 1) "Compare every lender side by side" / "Compare borrowing calculations across 14+ lenders and counting." 2) "Built on real lender calculations" / "See estimates informed by lender policies, rates and the costs of purchasing a home." 3) "Test changes before you make them" / "Adjust your income, deposit or plans and see how your borrowing range responds."
- **Visuals:** current proposition images are too large — reduce to small product-derived accents (~50% current size), no numbering, no hover interactions, no cards/borders.

### 3.8 FinalCTA
- **Copy:** "Find the home you can really afford." · "Your personalised borrowing range is only a few minutes away." · button "Run your scenario" (same styling as hero/nav CTAs).
- **Layout:** aligned to the main grid; proportionate (small) illustration; NOT an oversized card; page background stays consistent (no cream band).

### 3.9 GlobalFooter — transcribed from the LIVE amplify home
Live markup: `<footer class="page flex justify-between gap-[18px] pt-8 pb-11 text-stone-500 text-sm max-sm:flex-col"><p>© 2026 Ask Fundora</p><p>Not financial advice</p></footer>`
- **Structure:** single row inside `.page`, space-between, 18px gap, padding-top 32px / padding-bottom 44px, 14px `stone-500` text; stacks to a column below sm.
- **Content:** left "© 2026 Ask Fundora" · right "Not financial advice". That is the whole footer — do NOT build link columns.
- Our page's longer compliance/disclaimer paragraph moves to a short block immediately above this footer (same `.page` width, 12px `stone-500`), keeping the two-slot footer itself identical to the live site.

### 3.10 Page-level typography, background, grid — concrete tokens from the live site
- **Container (`.page`):** max-width **1180px**, `padding-inline: 16px` (12px below sm), centred. Every section including the carousel uses it.
- **Type scale (Tailwind steps the live site uses):** hero H1 60/48/36px at desktop/lg/sm with line-height 1.02 — but OUR hero must stay compact per §3.2, so use the 48px step at desktop and 36px at mobile; section H2s ~30px; lede/support 18px `stone-500` line-height 1.6; body 16px; labels/small 14px; fine print 12px. Choose these exact steps; do NOT apply a global 0.9 multiplier.
- **Cards:** border-radius 12px, 1px `stone-300` border, white bg, 24px padding (live `.card`). Align our module/cards to this.
- **Colours:** black text `#111`ish, muted `stone-500`, borders `stone-300`, surfaces `stone-100`/white, primary `teal-400` fills — do not invent new colours.
- One page background (white) throughout; sections separated by spacing/contained surfaces/subtle borders, not alternating background colours.

## 4. File-level change plan

| File | Action |
| --- | --- |
| `src/pages/LandingBRangePage.jsx` | Edit heavily: remove "Example comparison", "View all 14 lenders", "Pause logos", min/max income labels, coloured name-dots, standalone price-ceiling section (~L724); rename "Est. monthly"→"Monthly repayment"; strip all row click/hover/`LenderDetail` wiring; rebuild `HowItWorks` to 3-visible-columns + `ConnectedStepLine`; new GlobalHeader/GlobalFooter markup; hero compaction; FinalCTA per §3.8 |
| `src/landing-b.css` | Edit: type-scale pass (§3.10), hairline removals, header/footer styles matching Casual Client, ConnectedStepLine styles, carousel gutter containment + edge fades, remove pause-button + row-hover styles, dead-rule sweep afterwards |
| `src/pages/landing-b/model.js` (+ `model.test.js`) | Keep. Verify it exposes loan amount, interest rate, comparison rate, monthly repayment per lender; add repayment formatter `$X,XXX/mth` if missing; keep fixed-scale + monotonicity tests |
| `src/pages/landing-b/LandingBRangePage.test.jsx` | Update assertions for removed/renamed strings; add: rows have no click handlers; carousel has no pause button |
| `e2e/landing-b.spec.ts` | Update: above-the-fold check (nav+hero+CTAs+module top at 1440×900 and 1280×800); slider recalcs values; internal scroll hands off to page; reduced-motion static carousel |
| `src/components/ResponsiveDialog.jsx` | Reuse as-is for "How we worked this out" |
| `LenderDetail` (inside page file) | Delete if orphaned after step-2 rework |
| `src/assets/buying-range/lenders/*` | Audit against §3.4 lender list + `docs/lender-logo-sources.md`; replace incorrect/placeholder marks; consistent optical height |
| `public/landing-b/proposition-*` | Keep files; render smaller per §3.7 (regeneration handled separately — see iteration-plan §8 chroma-key prompts) |
| `docs/landing-b-proposal.md`, `docs/landing-b-goal-prompt.md` | No longer normative; add a one-line pointer to this spec at top of each (optional) |

## 5. Ordered implementation tasks

1. GlobalHeader + GlobalFooter to Casual Client parity (open the live site; copy labels incl. Ask Fundora).
2. Page grid/typography/background pass (§3.10) — shared max-width, gutters, type-scale step-down, single background.
3. Hero compaction + above-the-fold guarantee + hero entrance motion (§3.2).
4. RangeModule corrections (§3.3): copy, columns/labels/alignment, removals, non-interactive rows, scroll handoff, slider motion timings, optional autoplay.
5. LenderProof (§3.4): remove Pause control + hover pause, gutters, logo audit/replacement, reduced-motion row.
6. Remove standalone price-ceiling section; repoint "See how it works" anchor to HowItWorks.
7. Rebuild HowItWorks (§3.5): three visible columns, ConnectedStepLine, per-step visuals + one-time sequence; delete LenderDetail if orphaned.
8. FundsCard copy/structure revisions (§3.6).
9. PropositionGrid rework (§3.7).
10. FinalCTA (§3.8).
11. Motion polish pass against the timing table (§6 of handoff / below) + button press feedback; ensure no `transition: all`.
12. Reduced-motion audit (§7 criteria).
13. Tests: update unit + e2e; run `npm run build`, unit, e2e; visual QA (§8).

Motion timing table (normative): CTA press 120–150ms · hover colour 150–180ms · field focus 140–180ms · dropdown 160–220ms · number update 180–250ms · bar update 220–300ms · product-state transition 280–420ms · row reorder 300–400ms · cost-bar assembly 400–650ms · HowItWorks sequence 5–7s · carousel slow/linear/continuous. Easings: `--ease-out: cubic-bezier(0.23,1,0.32,1)`; `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`. Button press: `transform: scale(0.97)` @140ms ease-out.

## 6. Explicit non-goals

Do not: make lender rows clickable · add lender hover interactions · retain the standalone price-ceiling section · redesign the navigation or footer · create new Fundora colours · turn HowItWorks into tabs · hide two steps while one is active · add parallax or mouse-follow tilt · loop explanatory animations continuously · use placeholder/approximate lender logos · alternate section backgrounds · run the carousel edge-to-edge · apply a blanket global font scale factor · use `transition: all` · re-run the hero entrance on scroll.

## 7. Acceptance criteria (all testable)

1. **Above the fold** at 1440×900 and 1280×800: nav, H1, support copy, both CTAs, trust line, and RangeModule header + ≥2 lender rows all visible without scrolling.
2. **Header/footer parity:** labels (incl. Ask Fundora), heights, type, colours, states match the amplify reference side-by-side.
3. **RangeModule labels:** "Your purchase power range" + "The maximum property price you could afford."; no "Example comparison"; column headers aligned over right-aligned tabular values; "Monthly repayment" with `$X,XXX/mth` format; Interest rate and Comparison rate visually identical in size/weight/colour.
4. **Slider:** moving it updates range figure, bars, loan amounts, repayments; bar widths never shrink when income increases; reorder animates 300–400ms; autoplay (if built) stops permanently on first touch.
5. **Rows inert:** clicking/tapping/hovering any lender row (hero or step 2) produces no visual or state change and no pointer cursor.
6. **Scroll handoff:** wheel/touch scrolling the inner lender list continues into page scroll at list bounds; nothing traps.
7. **Carousel:** continuous linear loop, seamless wrap; hover does NOT pause; no pause button; strip respects page gutters; correct AU lender marks at consistent height.
8. **HowItWorks:** three columns always visible (desktop), numbered markers on a connecting line with teal progression; sequence plays once on viewport entry over 5–7s and final states persist; mobile stacks vertically with a vertical line.
9. **FundsCard:** exact strings from §3.6 incl. "Loan from CBA (79% LVR)", "Deposit", "Funding breakdown"; no hairline between costs and funding groups nor above "Savings left over"; numbers reconcile.
10. **Propositions:** "A borrowing number you can trust." centred; three borderless columns; visuals visibly smaller than current; no hover effects.
11. **Reduced motion:** hero/HowItWorks/counters render final states; carousel becomes a static wrapping row; slider still functional; no information lost.
12. **Build/tests:** `npm run build` clean; unit + e2e suites green.

## 8. Visual QA checklist

At 1440px, 1280px, 768px (tablet), 375px (mobile): alignment to the shared grid · typography steps match the Fundora scale · consistent gutters (carousel included) · no horizontal overflow · no layout shift while animations play · no trapped scrolling · animations reach correct final states · no cursor:pointer on non-interactive elements (lender rows) · reduced-motion behaves per §7.11 · header/footer match reference · single consistent page background.

## 9. Open issues (genuine blockers only)

1. ~~Exact nav label set~~ **RESOLVED 2026-07-10** by transcribing the live amplify home: "Ask Fundora" is the WORDMARK; nav is About → Learn; CTA "Run your scenario"/"Start". §3.1 is now exact. (The GitHub commit `1ace0e5` the owner referenced contains `tailwind/home.html` etc. as saved snapshots of github.com's marketing page — structural templates only, zero Fundora content; the live site remains the truth and has been transcribed.)
2. ~~Ask Fundora destination~~ **RESOLVED**: it is the wordmark, linking to the page root. About/Learn link `#` placeholders in this repo.
3. ~~Lender logo accuracy~~ **RESOLVED 2026-07-11**: all 14 marks were checked against current official Australian identity references in `docs/lender-logo-sources.md`; the low-resolution watermarked NAB tile was replaced with official vector artwork. Trademark approval remains a release-governance decision, not an implementation blocker.
4. **Autoplay demo (§3.3) is optional:** build it only if it fits the schedule; not required for acceptance.

---
**Status: IMPLEMENTED — all §5 tasks and §7 acceptance criteria are complete.**

## 10. Implementation status (maintained by the implementation agent)

| §5 task | Status | Commit | Notes |
| --- | --- | --- | --- |
| 1. Header/footer parity | done | `98c1af1` | Build and 30 unit tests pass. Live/local captures verified at 1440×900 and 375×812 in `tmp/landing-b-final/task-01/`. |
| 2. Page grid/typography/background | done | `9fd882d` | Shared 1180px grid, 16px/12px gutters, white background, 30px section headings and 12px card radius verified at 1440×900 and 375×812. Build and 30 unit tests pass. |
| 3. Hero compaction and motion | done | `c9ebc32` | Exact support copy, 32–44px H1 and staged 360/400ms entrance verified. At 1440×900 and 1280×800 the second row ends at 577px and 574px respectively. Build and 30 unit tests pass. |
| 4. RangeModule corrections | done | `625580e` | Only the slider and assumptions disclosure remain interactive. Rows are inert, labels/copy/repayments match the spec, the fixed bar domain is monotonic for all 14 lenders, and wheel handoff moved page scroll 440→1140. Build and 31 unit tests pass; desktop/mobile captures are in `tmp/landing-b-final/task-04/`. |
| 5. LenderProof | done | `383dd4a` | 14 sourced marks use consistent 28px optical height and symbol-name lockups; the watermarked NAB tile is replaced by official vector artwork. The contained 112s loop stays running on hover, both rails measure 2424px, and reduced motion renders a static wrap. Build and 31 unit tests pass. |
| 6. Remove standalone price ceiling | done | `3b19647` | The duplicate section, legacy `#ceiling` target and dead layout rules are removed. “See how it works” targets `#how-it-works`; FundsCard is reserved for step 3. Build and 31 unit tests pass; desktop/mobile transition captures are in `tmp/landing-b-final/task-06/`. |
| 7. Rebuild HowItWorks | done | `5a51791` | Three persistent columns and connected markers now run once through phases 1→4→6→8 over 6.1s and persist. Rows are inert, mobile uses one 351px column with a vertical line, and reduced motion starts at phase 8. Build and the 31 in-scope unit tests pass; captures are in `tmp/landing-b-final/task-07/`. |
| 8. FundsCard revisions | done | `9bfdee3` | Exact cost and funding labels render with matching colour keys; the card reconciles $795,400 = $600,000 + $195,400 and leaves $14,600. Both group borders and the verdict border compute to 0px. Build and 31 in-scope unit tests pass; captures are in `tmp/landing-b-final/task-08/`. |
| 9. PropositionGrid rework | done | `38c34e2` | Exact trust-led heading/support and three proposition pairs render without numbers, borders, pointer cursors or transforms. All three 768px assets load at a 168px desktop width and compact to 92px mobile accents. Build and 32 in-scope unit tests pass. |
| 10. FinalCTA | done | `d7f0a5f` | Exact copy renders in a transparent, borderless 820px layout with a 150px illustration; mobile compacts to 351px with an 88px illustration. The page background remains white and the CTA reuses the shared button. Build and 33 in-scope unit tests pass. |
| 11. Motion polish | done | `922b57f` | Computed timings: CTA 0.16s/0.14s with matrix(0.97) press, range bar 0.26s, number 0.22s, row reorder 360ms, product state 0.42s and cost assembly 0.56s. No `transition: all`; obsolete walkthrough/detail CSS is removed. Build and 33 in-scope unit tests pass. |
| 12. Reduced-motion audit | done | `13716c4` | At 1440px and 375px the hero has no animation, HowItWorks starts at final phase 8 with three complete states, the carousel is a one-rail static wrap, and all transition probes return 0s. The slider remains functional and updates $798k–$1.00M to $1.06M–$1.79M. Build and 33 in-scope unit tests pass. |
| 13. Tests and visual QA | done | `9a0698b` | Final gate: clean build; 11 unit files / 39 tests pass; Playwright 11 pass / 1 intentional mobile-project skip; four-width QA has zero overflow, zero clipped lender names, zero unloaded images, zero pointer rows, 64px headers and CLS ≤0.0002. Captures are in `tmp/landing-b-final/task-13/`. |

### Deviations and blockers

- A Git commit cannot contain its own final hash. Each tracker row records the task commit's short hash in the immediately following task commit; task 13's hash will be recorded in the final status-only commit.
- Task 1 consolidates the pre-existing uncommitted landing-B implementation and its required local dependencies so that its commit is independently buildable. Unrelated working-tree changes remain uncommitted.
- During task 7, concurrent results-page work temporarily introduced four out-of-scope token-test failures. Its owning work corrected the file read; the final full suite passes 39/39 without landing-B modifying results-page files.

### Acceptance criteria results (§7)

| # | Result | Evidence |
| --- | --- | --- |
| 1 | PASS | At 1440×900 and 1280×800 the second lender row ends at 583px and 580px; nav, hero copy, both CTAs, trust line and module header are visible. |
| 2 | PASS | Header/footer labels, 64px rendered header, 1180px grid, live teal/stone tokens and mobile label swap match the live Amplify captures in `tmp/landing-b-final/`. |
| 3 | PASS | Exact range title/subtitle and six column labels render; old copy is absent; repayments match `$X,XXX/mth`; both rates share one metric style. |
| 4 | PASS | Playwright proves range, bars, loans and repayments update; all 14 fixed-domain bar ratios remain monotonic; row movement computes to 360ms. |
| 5 | PASS | Both comparison surfaces contain zero row buttons, `pointer-events: none`, default cursors and no lender detail state. |
| 6 | PASS | Playwright wheel testing at the list bottom hands page scroll from 440px to 1140px. |
| 7 | PASS | Rails are equal width (2424px), loop is linear/running before and after hover, no pause control exists, 14 eager marks load, and the strip stays inside the page gutters. |
| 8 | PASS | Three equal desktop columns and numbered line complete phases 1→4→6→8 over 6.1s, persist, and become one vertical 351px mobile column. |
| 9 | PASS | Exact labels render; both separator borders compute to 0px; $795,400 reconciles to $600,000 + $195,400 with $14,600 remaining. |
| 10 | PASS | Exact centred trust copy renders in three borderless, inert columns with 168px desktop / 92px mobile accents. |
| 11 | PASS | Reduced motion starts in final phase 8, removes hero/counter transitions, converts the carousel to one static wrapping rail and preserves slider recalculation. |
| 12 | PASS | `npm run build` clean; 11/11 unit files and 39/39 tests pass; Playwright 11 pass with one intentional mobile-project skip of the desktop-only fold test. |

### Visual QA results (§8)

| Viewport | Overflow | CLS | Header | Lender clipping | Layout result |
| --- | --- | --- | --- | --- | --- |
| 1440×900 | 0px | 0 | 64px | 0 | Three-column walkthrough/propositions; row footer. |
| 1280×800 | 0px | 0 | 64px | 0 | Three-column walkthrough/propositions; row footer. |
| 768×900 | 0px | 0.0002 | 64px | 0 | Vertical walkthrough; single-column propositions; row footer. |
| 375×812 | 0px | 0.0001 | 64px | 0 | Vertical walkthrough; compact propositions; column footer; assumptions dialog is a bottom sheet. |

No open visual QA items.
