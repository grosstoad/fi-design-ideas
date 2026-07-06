# FundIQ Results Page — Build Specification (Draft for review)

**Status:** DRAFT v3 — ready for owner review. Everything measurable is taken from the **Paper artboard `18WZ-0` ("Results v8 — Clean selected card + detail flow")**, fetched and measured directly (mobile 393px frames; desktop values extrapolated, 🔶 #28). Judgement calls follow `docs/results-page-spec-review.md` §9 and are marked **[ADOPTED]** (override if wrong). Items requiring owner/business input are marked **🔶 FILL-IN #n** inline and collected in §14 as a checklist.

**v2 changes (owner direction from Paper designs, July 2026):** dual-stat headline (max property price + loan amount at equal hierarchy, §7.6/§10.5); interest rate and comparison rate at equal prominence and size everywhere — legal requirement (§7.6, §10.5, §12a); funds-to-complete breakdown now shows funds required *and* where they're sourced from (§8).

**v3 changes (Paper frames fetched and visually verified, 2026-07-04 — full artboard sweep of "Results v8 — Clean selected card + detail flow"):**
- The v2 forest-banner treatment for the dual stat is replaced with the actual built pattern from Paper — two `--field`-bg tiles side by side ("Capacity pair"), not a coloured block (§7.6, §10.5). Rate/Comparison confirmed at identical type treatment in every explored Paper variant (§7.6, §10.5, §12a).
- Funds-to-complete groups (§8) confirmed against the actual `4WM-0` "Funds chart card" screenshot: required-side rows are Property price / Stamp duty / Transfer + legal fees / Lender fees + setup; verdict is Funds required vs Available funds vs Remaining cash.
- **Design tokens replaced (§3):** the Paper frames are Helvetica Neue on white with teal accents (`#167D7F` links, `#85C7BE` progress/controls) and a black primary CTA (`#111111`) — not Hanken Grotesk on cream/forest. §3 now carries the Paper-verified palette and type scale; the old Results.html token set is retired. Resolves FILL-IN #16.
- **Sort reinstated (reverses A6):** the default Results screen has a "Sort" affordance opening a "Sort lenders" sheet (8 options, "Sorting changes the order, not your calculation"). §7.3a/§10.3.
- **"Update details" replaces "Edit financials" + the in-card edit-loan disclosure (revises A3/A10):** the secondary CTA opens a chooser (Property details / Loan details / Financial inputs) → dedicated sheets with explicit **"Save and recalculate"** — recalculation happens on save-and-return, not on a live 300ms debounce. §7.7 rewritten.
- **Board-note principles** (from the artboard's "Focused Paper pass" header) recorded in §2a: clean selected card, no redundant copy, separate controls (sort ≠ update), funds after selection — never the default headline.
- Non-top-selected treatment ("Compare footer") specced from cards "E Non-top selected" / "M4 Compare footer" (§7.8a).
- FILL-INs #6 (state editable — yes, via Update details → Property details), #16 (palette) resolved; #27 resolved (frames verified). Reference frames: Paper `01KSYP7T3MFEQHHED41F3PQB58/3-0` artboard `18WZ-0` (all five rows swept: Core flow 01–05, Header copy variations, Selected card hierarchy variations, Selected lender detail variations A–E, Detail editing destinations, Stronger selected-card variations M1–M5) and Paper `01KMVY07H2B05015VVNPYFHRWS` node `4WM-0` — the latter inspiration, not literal, per the owner's note.

**How to review this doc:** read top to bottom, correct any [ADOPTED] decision you disagree with, and answer the numbered FILL-INs (many are one-liners). Once §14 is answered, this spec is intended to be handed to an engineer or a coding agent verbatim.

**Companion docs:** `docs/results-page-spec-review.md` (rationale for every decision), `docs/design.md` (legacy system — superseded for this page per review §0/§9.1, pending owner confirmation 🔶 FILL-IN #1).

---

## 1. Purpose and scope

The results page is the final step (7 of 7) of the FundIQ affordability flow. It shows the user's **maximum property price per lender**, lets them explore each lender's loan behind that number, adjust loan settings, understand the cash needed to settle, and convert to a broker call-back.

In scope: results list, lender detail, loan-detail editing, funds-to-complete, broker capture, save/exit, loading/empty/error states, desktop + mobile.
Out of scope: the preceding form flow, broker CRM internals, authentication UI.

---

## 2. Adopted decisions (from review §9 — confirm or override)

| # | Decision | Adopted choice |
| --- | --- | --- |
| A1 | Source of truth *(revised v3)* | **Paper artboard `18WZ-0` ("Results v8") is the visual source of truth** — layout, tokens, type, copy voice, and interaction model, all verified in this doc. Results.html remains a secondary reference for desktop layout patterns only (Paper frames are mobile 393px; desktop extrapolates per §7). `design.md` results section to be rewritten. Two carry-backs from design.md stand: remaining-cash concept (§8) and disclaimer voice (§12). |
| A2 | Deposit maths | Usable-deposit model: savings fund costs first, remainder is deposit (§5.3). |
| A3 | Edits re-rank *(revised v3 per Paper)* | Yes — updating details re-runs borrowing power and re-ranks the list, but via explicit **"Save and recalculate"** in the Update details sheets, not live debounce (§7.7). On return, rows recalc in place ("stable recalculating lender rows" per the Paper frame note). 🔶 FILL-IN #5 confirms engine support. |
| A4 | Mobile detail pattern | Bottom sheet (push variant dropped). Sheet gets a close ✕, snap points, dock suppression, URL sync (§10.4). |
| A5 | Hero | Answer-first: hero leads with the top-lender price on both platforms (§7.2, §10.2). Support line per Paper: "You may be able to afford a property up to {$X.XXM}". |
| A6 | Sort *(reversed v3 per Paper)* | **Sort is in v1.** "Sort" text affordance in the list head opens a "Sort lenders" sheet (mobile) / popover (desktop): Max property price (default) · Monthly repayment · Interest rate · Comparison rate · Loan amount · LVR · Funds to complete · Policy fit. Caption: "Sorting changes the order, not your calculation." Sorting never triggers a recalc (§7.3a). |
| A7 | Accent *(revised v3 per Paper)* | Teal link/action accent `#167D7F`; mint `#85C7BE` for progress segments and toggle-on states; primary CTA near-black `#111111`. Forest/cream palette retired (§3.1). FILL-IN #16 resolved. |
| A8 | Comparison bars | Per-lender colours from a fixed cycle assigned by initial rank; not brand-matched (§4.4). |
| A9 | Motion | Count-up/bar-fill on first render only; no re-animation on selection; `prefers-reduced-motion` renders final values instantly (§11). |
| A10 | Dead controls *(revised v3)* | "View product" cut for v1. "Menu" (mobile) replaced by "Save & exit" (the Paper frames show a placeholder "Menu" — the decision to replace it stands). **Progress bar stays on results** (Paper frames consistently show the completed 7-segment bar, all segments filled mint). Sort reinstated (A6). "Edit financials" renamed **"Update details"** and wired to the chooser sheet (§7.7, §7.9). |
| A11 | Comparison rates | Published product comparison rate only, never client-adjusted (§5.6). |
| A12 | Naming | "Max property price" is the canonical term everywhere. |
| A13 | Capacity pair — dual stat *(owner direction, verified against Paper)* | Lender detail leads with max property price AND loan amount at the same hierarchy, as two `--field`-bg tiles side by side (not a coloured banner) — price left, loan right; stacked top/bottom where narrow (§7.6, §10.5). |
| A14 | Rate prominence *(owner direction — legal requirement, verified against Paper)* | Interest rate and comparison rate always identical in size, weight, and prominence, on every surface that shows a rate (§7.6, §10.5, §12a, landing proof card). |
| A15 | Funds sourced view *(owner direction, verified against Paper)* | Funds-to-complete "View breakdown" shows funds required (property price, stamp duty, transfer + legal fees, lender fees) and a funds-required/available-funds/remaining-cash summary (§8). Paper `4WM-0` is inspiration for the visual language (stacked bar + legend), not a literal target. |

### 2a. Design principles (from the Paper artboard's board note — normative)

The artboard's "Focused Paper pass" note states four principles that govern every judgement call below:

1. **Clean selected lender card** — "Cathay-style selected item: one crisp offer, quiet metadata, aligned detail rows." One card, no clutter, values right-aligned in consistent lanes.
2. **No redundant copy** — "No selected-lender explanation, no default scenario chips, no redundant lender-label wording." If a value is visible, don't restate it in prose.
3. **Separate controls** — "Sorting changes order. Update details changes inputs and recalculates." Sort and Update details are distinct affordances with distinct consequences; never blend them.
4. **Funds after selection** — "A compact action card and receipt treatment, never the default headline." Funds to complete appears only once a lender is selected, as a quiet row/action card, never competing with the price answer.

---

## 3. Design tokens — Paper-verified (v3; extracted from the `18WZ-0` frames via computed styles/JSX, not eyeballed)

### 3.1 Colour

```
--bg:         #FFFFFF   page background (white, not cream)
--field:      #F8F8F5   inset panels (capacity tiles, card header bands, conditional rows, back-button circle)
--ink:        #000000   primary text (Paper frames render pure black; #111111 acceptable)
--cta:        #111111   primary CTA background
--muted:      #5F5E58   body/support text, labels, secondary strings
--muted-2:    #8B8982   fine hints, corner labels ("Max price", "Rate" corner tags)
--line:       #D8D8D0   card borders (selected card border: #CFCFC8 on the M3 statement card)
--line-soft:  #E2E2DC   internal dividers, list row separators
--accent:     #167D7F   teal — text links ("View all lenders", "Sort", "View", "Update details"), selected-lender name in compare rows
--control:    #85C7BE   mint — progress-bar segments, toggle-on state, sort radio selected fill
--err:        #C2462C   validation errors (carried from v2; not present in the frames)
```

Notes: the forest/cream palette from Results.html is retired [A7 revised]. The derived-accent formula system is retired with it — the Paper palette is flat and explicit. Focus rings derive from `--accent` (§3.4).

**Lender cycle palette** (assigned by rank at first render, stable for the session; cycles if > 8 lenders) — as observed in the Paper "01 Default results" bars:
`#6E9BC4 (blue) · #D9C34A (gold) · #D98E7A (salmon) · #C2462C (red) · #5E8FB5 · #E59A3B (orange) · #7FA37A · #C98AB0`
🔶 FILL-IN #16b: confirm the exact 8 values from the Paper bars before build (the first four are sampled from the frame; the rest carry over from v2). Rule: colours must NOT approximate lender brand colours.

### 3.2 Typography

Font: **Helvetica Neue** (Bold + Regular), fallback `system-ui, sans-serif` — as used across every Paper frame. Weights observed: 700 (all headings, values, CTAs, links) and 400 (labels, support text) — no intermediate weights. `font-variant-numeric: tabular-nums` on every dollar/percent value.

Mobile column = measured from the 393px Paper frames (normative). Desktop column = extrapolated (Paper artboard is mobile-only); keep the same hierarchy ratios. 🔶 FILL-IN #28: desktop frames to be designed in Paper — until then desktop values below are provisional.

| Style | Mobile (Paper-verified) | Desktop (provisional) | Weight |
| --- | --- | --- | --- |
| Page H1 ("Max property price by lender") | 25px / 30px | 36px | 700 |
| Hero figure | 38px / 42px | 56px | 700 |
| Hero support line ("You may be able to afford…") | 14px / 19px `--muted` | 16px | 400 |
| Section head ("Lenders") / sheet titles | 18px / 25px (sheet titles 25px) | 20px | 700 |
| Eyebrow ("Results", "Property details") | 14px `--muted` | 14px | 400 |
| Row lender name | 15px (rank-1: 700) | 16.5px | 400/700 |
| Row price | 15px | 18px | 700 |
| Card product title ("CBA Extra Home Loan") | 18px / 22px | 21px | 700 |
| Card sub ("CBA · P&I · Variable") | 13px / 18px `--muted` | 13.5px | 400 |
| Capacity-pair tile value | 24px / 27px | 28px | 700 |
| Capacity-pair tile label | 11px / 14px `--muted` | 11.5px | 400 |
| Statement row key / value | 13px `--muted` / 14px `--ink` | 13.5px / 14.5px | 400 / 700 |
| Corner tag ("Max price") | 11px `--muted-2` | 11px | 400 |
| Funds row title / note | 14px 700 / 12px `--muted` | 14.5px / 13px | 700 / 400 |
| Text links (teal) | 14px (in-card "View": 16px) | 14–15px | 700 |
| Primary CTA label | 14px on 48px-tall button | 16px | 700 |
| Header wordmark | 17px | 20px | 700 |

### 3.3 Shape, elevation, spacing (Paper-verified where mobile)

- Radii: cards and sheets 8px (`rounded-lg` throughout the frames — the 13–26px system from Results.html is retired) · back-button circle 14px on 28px square · progress segments square-ended 4px tall · toggle pill full-round.
- Borders: 1px `--line` (`#D8D8D0`) on cards; 1px `--line-soft` (`#E2E2DC`) dividers; selected/emphasis cards may use `#CFCFC8`.
- Elevation: the Paper frames are flat — no card shadows on the results screen. Sheets: single soft shadow `0 -10px 40px -12px rgba(0,0,0,.25)` + scrim. Keep shadows to overlays only.
- Spacing rhythm: page side padding 32px on the 393px frame (≈8.1%; implement as 24–32px) · card padding 16px · row vertical padding 13–14px · stack gaps 10–14px · CTA height 48px.

### 3.4 Focus (global — review §6.1)

Every interactive element: `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible`. No element may suppress it.

---

## 4. Page architecture

### 4.1 Routing

- Route: `/results` 🔶 FILL-IN #18: confirm path and whether it nests under the flow (`/assessment/results`).
- Selected lender syncs to the URL: `/results?lender=<id>` (desktop selection and mobile sheet). Back button on mobile closes the sheet (history entry per open). Unknown/absent id → default selection (§7.4).
- Direct navigation without a completed flow → redirect to flow start with a toast "Finish a few questions to see your results". 🔶 FILL-IN #19: confirm session model (anonymous session token? account?), session lifetime, and resume behaviour.

### 4.2 Breakpoints

- **Desktop layout ≥ 1024px**: 1340px max content width, centered; master–detail grid `468px + 1fr`, 28px gap; body padding 40px top / 44px sides.
- **Mobile layout < 1024px**: single column, 22px side padding, docked CTA bar. (The design frames are 1340 and 392; everything between scales fluidly — list column may shrink to 400px minimum before collapsing to mobile.) 🔶 FILL-IN #20: confirm the 1024px collapse point and whether a distinct tablet treatment is wanted (default: no, mobile layout).

### 4.3 Data contract

**Scenario (input, from the completed flow + this page's edits):**

```ts
{
  savings: number,            // from flow           🔶 FILL-IN #3: exact source field(s)
  state: 'NSW'|'VIC'|'QLD'|'WA'|'SA'|'TAS'|'ACT'|'NT',  // from flow (postcode-derived?)
  firstHomeBuyer: boolean,    // from flow (affects duty concessions)
  loan: {
    purpose: 'oo' | 'inv',            // default 'oo'
    rateType: 'var' | 'fix2' | 'fix3',// default 'var'   🔶 FILL-IN #14b: fixed-term set final?
    repay: 'pi' | 'io',               // default 'pi'
    termYears: 25 | 30,               // default 30      🔶 FILL-IN #14c: allow 10–30 full range?
  },
  // household financials from the flow are opaque to this page; the engine consumes them
}
```

**Per-lender result (output of the serviceability engine):**

```ts
{
  id: string, name: string, product: string,
  maxLoan: number,          // borrowing power under current scenario.loan settings
  rate: number,             // % p.a., actual, for these settings
  comparisonRate: number,   // % p.a., PUBLISHED product figure [ADOPTED A11]
  monthlyRepayment: number,
  maxPrice: number,         // maxLoan + usableDeposit (see §5.3)
  lvr: number,              // maxLoan / maxPrice
  fees: { application: number, legal: number, other: number },  // 🔶 FILL-IN #8: per-lender data source
  lmi: number | 0,          // premium if lvr > 0.80                🔶 FILL-IN #7: LMI rules/table
  eligible: boolean,        // false → excluded from list (§9.4)
}
```

🔶 FILL-IN #2: engine integration — client-side library vs API? Typical latency? (Determines whether §9.1's staged loading is decorative or real.) Cross-reference `fundiq-serviceability-calculations` once accessible.
🔶 FILL-IN #21: rates feed — where do rate/product data come from, how fresh, and what "rates as at {date}" timestamp is shown (§12)?

### 4.4 Formatting rules (normative)

- Prices ≥ $1M: `$3.10M` (2dp, trailing zeros kept). Prices < $1M in list context: `$847k`.
- Exact money rows (funds breakdown, repayments): `$15,043` — `en-AU` grouping, no cents.
- Rates: 2dp + `%` (+ ` p.a.` in mobile key-value rows).
- LVR: whole percent.
- Repayments: monthly. 🔶 FILL-IN #14: add weekly/fortnightly toggle? (Default: no, v1 monthly only.)

---

## 5. Calculation definitions (engine-facing)

These define what the UI displays; formulas live in the serviceability engine. 🔶 FILL-IN #4: reconcile each against `fundiq-serviceability-calculations` — mark each as exists / build.

### 5.1 Borrowing power (`maxLoan`)
Per lender, under current `scenario.loan`. Changing purpose/repay/rateType/term re-runs it [ADOPTED A3].

### 5.2 Transaction costs
`costs = stampDuty(state, price, firstHomeBuyer, purpose) + transferFee(state) + lenderFees + legalFees (+ lmi if not capitalised)`
🔶 FILL-IN #6: stamp-duty engine per state incl. FHB concessions and foreign surcharge — exists or build? Is `state` user-visible/editable on this page? [ADOPTED: show a small "NSW · change" affordance in the funds block — cut if state must not be editable here.]

### 5.3 Usable deposit and max price [ADOPTED A2]
```
usableDeposit = savings − costs(price)        // solved iteratively with price
maxPrice      = maxLoan + usableDeposit
```
The prototype's `price = loan + savings` double-count is explicitly wrong; do not implement it.
🔶 FILL-IN #3b: optional retained cash buffer (user keeps $X aside) — v1 feature or not? (Default: not in v1; the funds block shows "remaining cash $0" semantics instead, see §8.)

### 5.4 Repayments
Standard P&I amortisation at `rate` over `termYears`; interest-only = `maxLoan × rate/12` during IO period.

### 5.5 Rate selection
Actual rate per lender/product/settings comes from the rates source, not client-side loadings. The prototype's `+0.30 inv / +0.20 io / −0.06 fix2 / +0.04 fix3` are placeholders. 🔶 FILL-IN #5b: confirm rates are product-table lookups.

### 5.6 Comparison rate [ADOPTED A11]
Published figure for the specific product/term. If unavailable: render `—` with tooltip "Not published for this product". Never arithmetically adjusted.

---

## 6. Component index

| ID | Component | Desktop | Mobile |
| --- | --- | --- | --- |
| C1 | Header | §7.1 | §10.1 |
| C2 | Hero | §7.2 | §10.2 |
| C3 | Lender list | §7.3–7.5 | §10.3 |
| C4 | Lender detail | §7.6–7.8 | §10.4–10.5 |
| C5 | Funds to complete | §8 | §8 |
| C6 | CTAs / dock | §7.9 | §10.6 |
| C7 | Broker capture | §13 | §13 |
| C8 | Loading / empty / error | §9 | §9 |

---

## 7. Desktop components

### 7.1 Header (C1)

- 70px tall, white, 1px `--line-soft` bottom border, content padding 0 38px.
- Left: wordmark "fundiq" 20px/700 (the Paper frames show a plain bold wordmark, no logo mark — drop the v2 forest logo square).
- Right: **Save & exit** — ghost button, 14.5px/400 `--muted`; hover: `--field` bg, `--ink` text; radius 8px, padding 8px 12px.
- **Save & exit behaviour [ADOPTED A10]:** opens a small modal — "Save your results" / email input / "Email me a link" primary / "Just exit" text — issuing a resume token. 🔶 FILL-IN #10: confirm mechanism (email link vs account vs silent local save) and destination after exit (marketing home?).
- No other nav. Logo click = same as Save & exit prompt if unsaved 🔶 FILL-IN #10b: or straight to home?

States: default · hover · focus-visible (§3.4) · modal open.

### 7.2 Hero (C2) — answer-first [ADOPTED A5, copy revised per Paper]

Anatomy (left-aligned, max-width 760px, 26px bottom margin):
1. Eyebrow "Results" 14px `--muted`.
2. **Page H1** "Max property price by lender" (25px/700 mobile per Paper; 36px desktop).
3. **Hero figure**: top lender's `maxPrice`, 38px/700 mobile per Paper (56px desktop), count-up on first render (§11).
4. Support line 14px `--muted` (verbatim from Paper "01 Default results"): `You may be able to afford a property up to {$X.XXM}.` — one plain sentence, no bold spans, no lender name (principle §2a-2: the list right below answers "which lender"). *(Replaces v2's longer "Your highest estimated property price — with {lender}…" template.)*
5. Disclaimer line 12.5px `--muted-2`: `Indicative estimates only — not loan offers. Rates as at {date}. How we estimate` (last two words are a link → 🔶 FILL-IN #17b: destination/methodology page or popover content).

Behaviour: hero figure and support line update (no re-animation; 300ms value crossfade) when recalculation changes the top lender (§7.7). The hero always reflects the **max-property-price leader**, regardless of selection or active sort (§7.8a).

### 7.3 Lender list card (C3)

- White card, 1px `--line`, r8, padding 20px, width 468px, self-start (doesn't stretch).
- Head row: "Lenders" 18px/700 · right: "Sorted by {active sort label}" 13px `--muted` + **"Sort"** text button 14px/700 `--accent` [A6 revised — verified in Paper "01 Default results"].
- Body: rows (§7.4), then view-all control (§7.5).

### 7.3a Sort control [A6 revised — verified against Paper "05 Sort sheet"]

- Desktop: "Sort" opens a small popover anchored to the button; mobile: bottom sheet (§10.4 chrome). Title "Sort lenders" 25px/700 (sheet) · caption 14px `--muted`: **"Sorting changes the order, not your calculation."** (verbatim from Paper — this line is normative copy; it enforces principle §2a-3).
- Options as a radio list (one per row, 1px `--line-soft` separators, right-aligned 20px radio, selected fill `--control`):
  1. Max property price (default)
  2. Monthly repayment
  3. Interest rate
  4. Comparison rate
  5. Loan amount
  6. LVR
  7. Funds to complete
  8. Policy fit 🔶 FILL-IN #29: "Policy fit" needs a definition (engine eligibility-strength score?) — cut this option if no such metric exists in v1.
- Selecting re-orders the list client-side (FLIP ≈250ms), updates the head-row note ("Sorted by monthly repayment"), closes the sheet/popover. **Never triggers an engine re-run.** Rank numbers re-derive from the active sort order; the hero always shows the max-property-price leader regardless of sort (see §7.8a for the non-top caption).
- Semantics: `role="radiogroup"`; persist choice for the session.

### 7.4 Lender row

Grid `22px | 1fr | 120px | max-content | 18px`, gap 14px, padding 15px 12px, radius 13px, rendered as `<button>`:

| Lane | Content |
| --- | --- |
| Rank | `1`…`n`, 14px/400 `--muted`, tabular |
| Name | lender name, 15px/400 (`700` on rank-1 row, per Paper "01 Default results"); truncate with ellipsis at one line, min 90px before the bar shrinks |
| Bar | 8px pill, track `--field`; fill = lender cycle colour [A8]; `width % = maxPrice / (rank1.maxPrice × 1.08)` |
| Price | `maxPrice` fmt `$X.XXM`, 15px/700, right-aligned |
| Chevron | 16px `--muted-2`; selected: `--accent` |

**States**

| State | Treatment |
| --- | --- |
| Default | transparent bg, rows separated by 1px `--line-soft` (per Paper — bordered container, hairline rows, no per-row border) |
| Hover | bg `--field`; transition 140ms |
| Pressed | bg `#EFEFEA` (one step darker than `--field`) |
| Selected | bg `--field`, lender name `--accent` 700 (teal name = selected cue per Paper "E Non-top selected" compare rows) |
| Focus-visible | global ring (§3.4) |
| Recalculating | value + bar shimmer (§9.2); row not disabled |

**Interaction & semantics**
- Click/Enter/Space selects; exactly one row is always selected; clicking the selected row is a no-op (no deselect on desktop).
- Container: `role="listbox"` `aria-label="Lenders ranked by max property price"`; rows `role="option"` + `aria-selected`. Arrow Up/Down moves selection directly (selection follows focus). Each row's accessible name: `"{rank}. {name}, max property price {$X.XXM}"` — bar is `aria-hidden`.
- Selecting updates the detail card (§7.6) — announce via `aria-live="polite"` region: "Showing {lender} {product}".
- Selection resets the detail card's open disclosures to closed.

### 7.5 View all / show fewer

- Default shows top 6. Button full-width below list: `View all lenders ({n})` ⇄ `Show fewer lenders`; white, 1px `--line`, r8, 14px padding, 15px/700; hover `--field`. (Paper shows the plain "View all lenders" label on the default screen and a teal "View all lenders" text link in the selected-lender state — both map to this control.)
- Expanded: list region gets `max-height: 7 rows` + internal scroll (page doesn't grow) with top/bottom fade masks. Rows below rank 10 render **condensed** (no bar) 🔶 FILL-IN #22: confirm condensed treatment or keep bars on all rows.
- "Show fewer" resets internal scroll to top; if the selected lender is outside the top 6, it stays selected and a one-line note appears under the button: "{name} is selected · rank #{r}".
- Hidden entirely when n ≤ 6.

### 7.6 Lender detail card (C4)

White card, r20, shadow (§3.3), padding 28px 30px 30px. Contents update **in place** on selection (no remount animation, [A9]).

1. **Identity band** (`--field` bg per Paper "M3 Statement card"): product title 21px/700 `{name} {product}` · sub-line 13.5px `--muted`: `{name} · {Repay label} · {Rate type label}` — no colour dot, no purpose, no rank string (Paper shows none; principle §2a-2). Rank context appears only via the compare footer (§7.8a). ("View product" removed [A10].)
2. **Capacity pair — dual stat [A13, verified against Paper `01KSYP7T…/3-0` "03 Capacity pair"]**: two tiles side by side, NOT a coloured banner — `--field` bg (`#F8F8F5`), r14, padding 14px, 12px gap between tiles, each tile `flex: 1`:
   - Left tile: label "Max property price" 11.5px/400 `--muted` · value = `maxPrice`, 24px/700 `--ink` tabular.
   - Right tile: label "Loan amount" 11.5px/400 `--muted` · value = `maxLoan`, 24px/700 `--ink` tabular.
   - Identical tile size, value type (size/weight/colour), and label treatment — position (price left, per owner direction) is the only precedence cue. Below ~360px of available card width the tiles stack (price above loan) rather than compress. Value changes animate 300ms count (only interior animation permitted on selection).
   - Reference frames (fetched and visually verified 2026-07-04): Paper `01KSYP7T3MFEQHHED41F3PQB58/3-0/19MF-0` ("M3 Statement card") shows the max-property-price row at large scale as a single hero stat; Paper `01KSYP7T3MFEQHHED41F3PQB58/3-0` card "03 Capacity pair" (same artboard, "Selected card hierarchy variations" row) is the closest built match for the *paired* tile layout and is what this spec now encodes, with loan and price swapped per the owner's explicit left/right instruction (Paper's built version has loan left, price right).
3. **Rate pair** — directly below the identity row (mobile) / beside the product name (desktop), a tight two-column mini key-value block, NOT full-width stat tiles: label 11.5–12px `--muted` over value 13–14px/700 `--ink` tabular, 4px gap between label and value, 16px gap between the two columns:

| Column | Value | Sub |
| --- | --- | --- |
| Rate | `X.XX%` (+ " p.a." on mobile rows) | — |
| Comparison | `X.XX%` (or "—" + "not published") | — |

   **[A14 — legal, verified against Paper]** Rate and Comparison use the identical class: same font size, weight, and colour, side by side, no visual precedence. This is confirmed directly in the built Paper frames (`19MF-0`, and card "01 Default results" / "02 Selected lender clean card" on the same artboard) — every variant explored keeps Rate and Comparison at the same type treatment. Never demote comparison to a sub-label, footnote, or smaller type.
4. **Supporting rows** — `Monthly repayment` and `LVR` as standard key-value rows (13px key / 14px/700 value), below the rate pair, separated by 1px `--line-soft`. If `lmi > 0`, the LVR row sub becomes "incl. LMI ${lmi fmt k}" 🔶 FILL-IN #7b: confirm LMI display slot.
5. **Funds to complete** row (§8), separated by 1px `--line-soft` top border — the last row inside the card, per Paper "M3 Statement card" ("funds nested as a row") and principle §2a-4.
6. **CTA row** (§7.9). *(There is no in-card edit affordance — Paper's cards contain no edit-loan disclosure; all input changes go through Update details, §7.7.)*

### 7.7 Update details (chooser + sheets) — replaces the v2 in-card "Edit loan details" disclosure [A3/A10 revised — verified against Paper "04 Update details sheet" and the "Detail editing destinations" row]

**Entry:** the page-level secondary CTA "Update details" (§7.9 / mobile dock §10.6). Desktop presents the same surfaces as centered modals; mobile as bottom sheets.

**Chooser sheet** — title "Update details" 25px/700 · sub 14px `--muted`: "Choose what changes the calculation." · three rows (icon 40px in a `--field` chip, anchored in-row; title 15px/700; description 13px `--muted`; trailing chevron):

| Row | Description (verbatim from Paper) | Destination |
| --- | --- | --- |
| Property details | State, purpose, savings and purchase costs. | Property sheet |
| Loan details | Loan term, repayment type, product and rate type. | Loan sheet |
| Financial inputs | Income, expenses, liabilities and existing properties. | Section chooser |

**Property sheet** — eyebrow "Property details" · title "Update purchase assumptions" · sub "Saving returns to Results and recalculates lender estimates." Fields as a bordered key-value card (each row opens its picker/input):

| Field | Example value | Notes |
| --- | --- | --- |
| State | NSW | resolves 🔶 #6: state IS user-editable here (not inline in the funds block — drop the "NSW · change" affordance from §8) |
| Purpose | Owner occupied | |
| First home buyer | Yes | |
| Savings | $356k | |
| Property price in mind | Optional | optional target-price input 🔶 FILL-IN #30: engine behaviour when set (cap results? show gap?) |
| Capitalise purchase costs | toggle (`--control` when on) | rolls costs into the loan — interacts with §5.2/§8 maths |

**Loan sheet** — eyebrow "Loan details" · title "Update loan assumptions" · sub "Conditional terms appear only when they matter." Same bordered key-value card; **conditional rows render on a `--field` tinted bg and appear only when applicable**:

| Field | Example | Conditional on |
| --- | --- | --- |
| Loan term | 30 years | — |
| Repayment type | P&I · Interest only | — |
| Interest-only term | 3 years | Repayment type = Interest only |
| Product type | Package · Basic | — |
| Rate type | Variable · Fixed | — |
| Fixed-rate term | 2 years | Rate type = Fixed |

   (This supersedes the v2 "Fixed 2yr/3yr" combined control — rate type and its term are separate fields with the term conditional. 🔶 FILL-IN #14b/c now = allowed value sets for term, IO term, fixed term, product type.)

**Financial inputs sheet** — eyebrow "Financial inputs" · title "Choose section to edit" · sub "You will return to Results after saving the selected section." Rows: Income ("Salary, variable income and other income.") · Expenses ("Living costs and recurring commitments.") · Liabilities ("Cards, personal loans and other debts.") · Existing properties ("Values, rents and current home loans."). Each routes into the corresponding flow section. Footer note (tinted panel): "After save, Results returns with stable recalculating lender rows." CTA "Back to Results". 🔶 FILL-IN #11: confirm the flow-section routes and return contract.

**Commit model [A3 revised]:** Property and Loan sheets end in a black primary **"Save and recalculate"** (48px) + text "Cancel". No live recalculation while editing; on save → return to Results → affected values shimmer in place (§9.2) → list re-ranks (FLIP ≈250ms) under the *active sort* (§7.3a). Selected lender stays selected; if its rank changed, transient chip "now #3 (was #1)" for 4s; hero updates if the max-price leader changed. Cancel discards.
**Scope:** edits are global by construction — the sheets edit the scenario, not a lender. (v2's FILL-IN #5c is resolved: global.)
Settings persist for the session and round-trip through Save & exit.

### 7.8 Detail card — data edge cases

- `comparisonRate` null → tile sub "comparison n/a".
- `eligible: false` lenders never reach the list (§9.4) — the detail card never renders an ineligible lender.
- Selected lender becomes ineligible after an edit → selection moves to the nearest eligible rank; toast: "{name} can't lend under these settings — showing {newName}".

### 7.8a Non-top selection — compare footer [verified against Paper "E Non-top selected" / "M4 Compare footer"]

When the selected lender is not the max-property-price leader (via sort or direct selection):
- The hero keeps the leader's figure (§7.2 — it always answers "your maximum").
- The selected card's sub-line may carry a neutral qualifier from the active sort (Paper example: "CBA · lower monthly repayment").
- Below the selected card, a **compare module**: two compact rows — the max-price leader and the selected lender (name · bar · price; selected row's name in `--accent` 700) — followed by a caption 13px `--muted`: "Sorted by {sort label}. {Leader} remains the highest max price." No scolding copy, no warning tone (Paper board note: "Non-top context without a scolding paragraph").
- Hidden when the selected lender is the leader.

### 7.9 CTA row (C6)

- Layout: primary button + centered text secondary beneath, 10px gap, margin-top 24px.
- **Primary "Connect with a broker"**: `--cta` (#111111) bg, white 14px/700 (16px desktop), r8, height 48px; hover `#000`; active translateY(1px); no shadow (§3.3 — flat). Opens broker overlay (§13) with the *selected* lender prefilled.
- **Secondary "Update details"**: text button 14px/700 `--accent`, centered under the primary (per every Paper frame). Opens the chooser (§7.7).
- After a successful broker submission this row's primary becomes disabled-styled "Call back requested ✓" for the session (§13.6).

---

## 8. Funds to complete (C5) — revised per usable-deposit model [A2]

Replaces the prototype's breakdown (which double-counted the deposit).

**Collapsed (default)** — per Paper "M3 Statement card" (row form) / "M5 Prep action stack" (action-card form; M3 row form is canonical since the funds row lives inside the statement card, §7.6):
- Title "Funds to complete" 14px/700 · note 12px `--muted`: `About {$XXXk} needed to settle` (Paper verbatim shape: "About $542k needed to settle") where the figure = `savings` allocated (deposit + costs); if a buffer exists it reads `{savings − buffer}`. Optional second line where space allows (M5): "Deposit, purchase costs and remaining cash buffer."
- Right: text link **"View"** ⇄ "Hide", 16px/700 `--accent`. `aria-expanded`.

**Expanded view [A15]** — two aligned groups then the verdict, inspired by Paper `01KMVY07H2B05015VVNPYFHRWS`'s node `4WM-0` ("Funds chart card") required-vs-sourced framing (adapted, not copied — the owner's explicit direction). Desktop: two columns side by side (equal width, 24px gutter); mobile and narrow cards: stacked groups, required first. Row style: 13.5px key `--muted` / value 700 `--ink` tabular, 9px gaps; group headers 12px/700 uppercase `--muted-2`.

*Verified against the actual `4WM-0` screenshot (2026-07-04):* the Paper reference is not two mirrored breakdown lists — it's one categorised breakdown (with a stacked-bar + coloured-dot legend: Property price, Stamp duty, Transfer + legal fees, Lender fees + setup, each with a % of total) followed by a three-figure summary strip: **Funds required** / **Available funds** / **Remaining cash (+ %)**. This spec adapts that into Group 1 (the categorised "what you'll need" breakdown, kept as a row list rather than a bar+legend to fit the card's existing row language) and a verdict strip carrying the same three figures, while keeping Group 2 ("where it comes from") as an addition beyond the reference — needed here because, unlike the `4WM-0` scenario (savings entered directly as an input), this page's "available funds" can come from multiple sources (§25) and showing them itemised is more transparent than a single number.

*Group 1 — "What you'll need":*

| Row | Value |
| --- | --- |
| Deposit toward purchase | `usableDeposit` |
| Stamp duty ({STATE}, est.) | engine value — no inline "change" link; state is edited via Update details → Property details (#6 resolved) |
| Transfer & legal fees | engine value |
| Lender fees ({name}) | per-lender (🔶 #8) |
| LMI (if LVR > 80%) | engine value; row hidden when 0 |
| **Total funds to complete** | sum — divider above, 14.5px/700 |

*Group 2 — "Where it comes from":*

| Row | Value |
| --- | --- |
| Savings | `savings` (from the flow) |
| Gift / family contribution | 🔶 #25 — only if captured in the flow |
| First Home Owner Grant | 🔶 #25 — only when eligible and captured |
| Proceeds of sale / other | 🔶 #25 |
| **Total available** | sum — divider above, 14.5px/700 |

In v1, if savings is the only captured source, Group 2 renders as the single Savings row + total (no empty placeholder rows). Rows in the two groups share a baseline grid so the totals align horizontally on desktop.

*Verdict strip (full width, below both groups)* — three figures in a row, matching the `4WM-0` reference's "Funds required / Available funds / Remaining cash" summary:

| Column | Value |
| --- | --- |
| Funds required | = Group 1 total, 13.5px label / 20px/700 value |
| Available funds | = Group 2 total, 13.5px label / 20px/700 value |
| **Remaining cash** | `Available funds − Funds required`, 13.5px label / 20px/700 value + inline `%` of available funds (matches `4WM-0`'s "$290K \| 8%" treatment) |

**Verdict states:**
- Remaining ≥ 0: value in `--ink`, sub-note "kept aside from your savings".
- Shortfall (< 0): value `--err`, row label "Shortfall", plus a compact notice band under the block (r8, `--err` at 8% tint bg): "Your savings don't cover the costs at this price. Lower the price range or talk to a broker about options." with "Update details" link. *(With the usable-deposit model a shortfall shouldn't occur by construction — this state guards engine edge cases and future buffer settings.)*

Mobile: identical block inside the lender card, bg `--field`, link label "View"/"Hide".

---

## 9. Page states (C8)

### 9.1 Initial loading — staged reveal
- Header + hero eyebrow render immediately; hero figure area shows a shimmer block.
- List card renders with title and 6 skeleton rows; caption above rows: `Checking {n} lenders against your profile…` Rows resolve top-down as results arrive (or in 120ms stagger if the engine returns in one batch), bars filling per §11.
- Detail card renders skeleton until rank-1 resolves, then populates and becomes the default selection.
- Budget: if the engine is client-side and < 300ms total, skip staging — render complete with the standard first-render animation. 🔶 FILL-IN #2 decides which path is real.

### 9.2 Recalculating (after "Save and recalculate" returns to Results)
Values (prices, bars, tiles, hero) shimmer in place ≤ engine latency; layout never collapses; rows stay interactive ("stable recalculating lender rows" — Paper frame note, verbatim). FLIP re-rank on resolve (§7.7).

### 9.3 Error
- Full failure: list card replaced by an error panel — icon, "We couldn't calculate your results" 17px/700, body "Something went wrong on our side. Your answers are saved.", primary "Try again" (re-runs), secondary "Update details". Detail card hidden.
- Partial failure (some lenders error): show successful lenders; footnote under the list: "{k} lenders couldn't be checked right now." 🔶 FILL-IN #23: confirm partial-tolerance vs all-or-nothing.

### 9.4 No eligible lenders
List card body: illustration-free panel — title "No lender matched this scenario" 17px/700; body explains the binding constraint when the engine can name it (`"Your deposit is below the minimum lenders accept."` / generic fallback "Based on your answers, no lender on our panel could offer a loan."); **primary: "Update details"**, secondary text: "Talk to a broker about low-deposit options" (opens §13 with lender = "No preference"). Hero shows an em-dash figure with support line "We couldn't find a match — yet." Dock CTA (mobile) relabels to "Talk to a broker".
🔶 FILL-IN #17c: sign off this copy set.

### 9.5 Few lenders (1–5)
Standard layout; view-all hidden; lede grammar per §7.2.

### 9.6 Returning user (saved link)
Results recalculate on open (rates may have moved). If any figure changed vs the saved snapshot by > 1%: dismissible banner "Rates have moved since you saved — your numbers are refreshed." 🔶 FILL-IN #21b: confirm snapshot-vs-recalc policy.

---

## 10. Mobile components

### 10.1 Header — per Paper frames
- Row: circular back button 28px (`--field` bg, chevron-left) · centered wordmark "fundiq" 17px/700 · right: **"Save & exit"** text button (the Paper frames show a placeholder "Menu"; the A10 decision to replace it stands) — same flow as §7.1.
- Back from results → the flow's review step 🔶 FILL-IN #11b: confirm; alternative is Save & exit prompt.
- **Progress bar stays** [A10 revised — every Paper frame shows it]: 7 segments, 4px tall, all filled `--control` (results = flow complete), full-width row under the header.

### 10.2 Hero (list screen) — per Paper "01 Default results"
- Eyebrow "Results" 14px `--muted` · H1 "Max property price by lender" 25px/700 (two lines OK) · hero figure 38px/700 (rank-1 `maxPrice`) · support line 14px `--muted` "You may be able to afford a property up to {$X.XXM}." · disclaimer line.
- The visible H1 is canonical for a11y/SEO (screen-reader order: eyebrow → heading → figure → support).

### 10.3 Lender list — per Paper "01 Default results"
- Section head: "Lenders" 18px/700 · right: "Sorted by {sort label}" 13px `--muted` + "Sort" 14px/700 `--accent` → sort sheet (§7.3a).
- Container: 1px `--line`, r8, rows separated by `--line-soft`.
- Row grid `22px | 1fr | 92px | max-content | 16px`, padding 14px 12px, min-height 52px. Bar 8px. Price 15px/700.
- States: pressed `--field`; active (sheet open for that row) `--field` + teal name. Same semantics as §7.4; tapping opens the sheet (§10.4).
- View-all identical to §7.5 (page grows on mobile instead of internal scroll — the page is the scroll container; expanded list simply lengthens).

### 10.4 Lender detail bottom sheet [A4]
- Scrim `rgba(0,0,0,.34)`, tap closes. Sheet: white, r16 top corners (Paper "05 Sort sheet" shows large top radius + centered grab bar), shadow §3.3, max-height 90%.
- Structure: grab handle (40×5px pill `--line`, 12px padding zone) · **close ✕** 34px circular `--field` button top-right (required) · body (scrollable): eyebrow "Selected lender" + lender card (§10.5) · footer (fixed): primary "Connect with a broker" + secondary "Update details", top border `--line-soft`.
- **Snap points:** opens at 65% viewport height; drag up → full (90%); drag down past 110px or velocity flick → dismiss; between snaps, settle to nearest (spring 300ms).
- Entrance: translateY slide-up 300ms ease-out (instant under reduced motion).
- While open: the docked CTA bar (§10.6) is hidden; body scroll locked; focus trapped; `role="dialog"` `aria-modal="true"` labelled by the lender name; Esc/close/scrim/back-button all dismiss and return focus to the originating row.
- Open state syncs `?lender=` (§4.1); switching lenders happens by dismissing and tapping another row (no in-sheet pager in v1) 🔶 FILL-IN #24: optional next/prev lender arrows in the sheet header — v1 or later? (Default: later.)

### 10.5 Lender card (inside sheet) — per Paper "M3 Statement card" / "02 Selected lender clean card"
- Header band `--field`, 16px padding: `{name} {product}` 18px/700 + sub 13px `--muted` `{name} · {Repay label} · {Rate type label}` · top-right corner tag "Max price" 11px `--muted-2` over the price (M3 keeps a compact max-price echo in the band corner).
- **Capacity pair [A13, verified against Paper "03 Capacity pair" card]**: two tiles stacked top/bottom on mobile width (side by side reflows to stacked below ~360px per §7.6) — "Max property price" (top) then "Loan amount" (bottom), `--field` bg tiles, r8, 12px gap, both label 11px/400 `--muted` + value 24px/700 tabular. Identical treatment for both; order (price first) is the only precedence cue.
- **Rate pair** — tight two-column mini block directly under the identity band (not full key-value rows): Rate and Comparison, both same label/value class. **[A14 — legal, verified against Paper]** No visual precedence between them — confirmed in every Paper variant inspected (`19MF-0` and the "Selected lender detail variations" row).
- Key-value rows (13px key `--muted` / 14px/700 value, `--line-soft` separators, 13px vertical padding): Monthly repayment ("(interest only)" suffix when IO) · LVR (+ "incl. LMI" per §7.6). Loan amount and the rate pair leave these rows — they're in the capacity pair / rate pair above.
- Funds to complete row per §8 (last row in the card).
- No in-card edit affordance — Update details is in the sheet footer / dock (§7.7).

### 10.6 Docked CTA bar
- Fixed bottom, padding 14px 22px 26px (respect safe-area inset), bg gradient white 72% → transparent upward.
- Primary "Connect with a broker" full-width (48px, `--cta`, r8) + secondary "Update details" 14px/700 `--accent` centered beneath (matches every Paper frame's CTA stack).
- Hidden while any sheet/overlay is open. List scroll area reserves 150px bottom padding.
- In the no-eligibility state the primary relabels "Talk to a broker" (§9.4).

---

## 11. Motion spec [A9]

| Element | Animation | Timing | When |
| --- | --- | --- | --- |
| Hero figure, prices, tile values | count-up 0→value | 850ms cubic-out | First render only |
| Comparison bars | width 0→pct | 900ms cubic-out | First render only |
| Banner value on selection | 300ms count from previous value | selection change |
| List re-rank | FLIP position transition | 250ms ease | After engine re-run |
| Disclosure chevron / panel | rotate 90° / height auto | 200ms ease | toggle |
| Sheet / modal | slide-up / fade+scale(0.98→1) | 300ms / 200ms ease-out | open; reverse on close |
| Hover/pressed surfaces | background | 140ms | — |

`prefers-reduced-motion: reduce` → all of the above render final state instantly (sheets may fade 100ms).
Numbers are announced to AT once, at final value (render final value into the accessible name immediately; animate visually only).

---

## 12. Copy table (canonical strings)

| Key | String |
| --- | --- |
| hero.eyebrow | Results |
| hero.h1 | Max property price by lender |
| hero.support | You may be able to afford a property up to {$X.XXM}. |
| hero.disclaimer | Indicative estimates only — not loan offers. Rates as at {date}. How we estimate |
| list.title / list.sortnote | Lenders / Sorted by {sort label} (default: Sorted by max property price) |
| list.sort / sort.title / sort.caption | Sort / Sort lenders / Sorting changes the order, not your calculation. |
| sort.options | Max property price / Monthly repayment / Interest rate / Comparison rate / Loan amount / LVR / Funds to complete / Policy fit (🔶 #29) |
| list.viewall / list.viewfewer | View all lenders ({n}) / Show fewer lenders |
| pair.price / pair.loan | Max property price / Loan amount |
| card.rows | Rate / Comparison rate / Monthly repayment / LVR |
| update.title / update.sub | Update details / Choose what changes the calculation. |
| update.rows | Property details · State, purpose, savings and purchase costs. / Loan details · Loan term, repayment type, product and rate type. / Financial inputs · Income, expenses, liabilities and existing properties. |
| update.property.title / .sub | Update purchase assumptions / Saving returns to Results and recalculates lender estimates. |
| update.loan.title / .sub | Update loan assumptions / Conditional terms appear only when they matter. |
| update.financial.title / .sub | Choose section to edit / You will return to Results after saving the selected section. |
| update.financial.note | After save, Results returns with stable recalculating lender rows. |
| update.save / update.cancel / update.back | Save and recalculate / Cancel / Back to Results |
| compare.caption | Sorted by {sort label}. {leader} remains the highest max price. |
| funds.title / funds.note | Funds to complete / About {x} needed to settle |
| funds.sub | Deposit, purchase costs and remaining cash buffer. |
| funds.view | View |
| funds.groups | What you'll need / Where it comes from |
| funds.rows | Deposit toward purchase / Stamp duty ({state}, est.) / Transfer & legal fees / Lender fees ({lender}) / LMI / Total funds to complete / Savings / Gift or family contribution / First Home Owner Grant / Proceeds of sale / Total available / Remaining cash after settlement |
| funds.shortfall | Your savings don't cover the costs at this price. Lower the price range or talk to a broker about options. |
| cta.primary / cta.secondary | Connect with a broker / Update details |
| cta.done | Call back requested ✓ |
| loading.checking | Checking {n} lenders against your profile… |
| empty.title / empty.body | No lender matched this scenario / Based on your answers, no lender on our panel could offer a loan. |
| error.title / error.body | We couldn't calculate your results / Something went wrong on our side. Your answers are saved. |
| rerank.toast | {lender} can't lend under these settings — showing {newLender} |
| saved.banner | Rates have moved since you saved — your numbers are refreshed. |

Broker strings in §13. 🔶 FILL-IN #17: overall copy sign-off (especially disclaimer, empty, shortfall — legal-sensitive).

### 12a. Rate display rule [A14 — legal requirement, verified against Paper 2026-07-04]

Wherever an interest rate appears — detail tiles, mobile rows, any future tooltip, marketing surfaces including the landing proof card — the comparison rate appears with it at **equal prominence**: same type size, weight, and colour, adjacent placement. Never as a sub-label, footnote, or hover-only detail. If the comparison rate is unavailable for a product, show "—" at the same size with an explanatory sub ("not published"). Confirmed directly against the built Paper frames: in every explored "Selected lender detail variations" card on `01KSYP7T3MFEQHHED41F3PQB58/3-0`, Rate and Comparison (or "Comp.") render with the identical Tailwind class — same size, weight, colour — with no exceptions found. 🔶 FILL-IN #26: compliance to confirm (a) the standard comparison-rate warning wording and where it must appear on this page, and (b) whether the rule extends to rates inside the broker success message or emails.

---

## 13. Broker capture (C7)

Presentation: desktop centered modal 560px, r22; mobile bottom sheet ≤95% height with grab handle. Scrim `rgba(20,26,18,.42)`. `role="dialog"` `aria-modal`, focus trap, Esc + ✕ + scrim close, focus returns to trigger.

### 13.1 Header
Eyebrow "FUNDIQ BROKERS" (11.5px/700 uppercase, `--accent`) · title "Connect with a broker" 23px/700 · ✕ 34px circle · lede: "A real mortgage broker, free to you, who can take this estimate to settlement."

### 13.2 Fields

| # | Field | Type | Validation (on submit; per-field clear on change) |
| --- | --- | --- | --- |
| 1 | First name / Last name | text, 2-col | required — "Enter your first name." / "Enter your last name." |
| 2 | Mobile | tel, placeholder `0400 000 000` | AU format: normalise `+61`, accept `04xx xxx xxx` — "Enter a valid Australian mobile number." |
| 3 | Email | email | RFC-ish — "Enter a valid email address." |
| 4 | Preferred lender | native select: each lender "Name — Product" + "No preference"; **prefilled from selected lender**; hint "Pre-filled from your selection" | optional |
| 5 | Where are you up to? | 2×2 chip group, single-select: Just researching / Actively looking / Found a property / Offer made / under contract | required — "Select where you are in the journey." |
| 6 | Anything else? | textarea rows 3, hint "Optional", placeholder "e.g. self-employed, looking in inner west, settling in March…" | optional, max 500 chars |
| 7 | **Consent** (new) | checkbox: "I agree that a FundIQ broker may contact me about my scenario. Privacy policy" (link) | required — "Please agree so a broker can contact you." 🔶 FILL-IN #12: legal wording; #13: privacy policy URL |

Prefill first/last/mobile/email from flow answers where collected 🔶 FILL-IN #12b: which are collected?
Input spec: 1.5px `--line` border, r8, padding 12px 14px, 15px/400; focus `--accent` border + 4px `rgba(22,125,127,.15)` glow; error `--err` border + 12.5px `--err` message below. Invalid submit scrolls to first error and focuses it.

### 13.3 Submit
"Request a call back" — primary style. On submit: disable + inline spinner ("Sending…"), single-flight guard.

### 13.4 Failure
Inline banner above submit (r10, err-tint bg): "That didn't send — please try again." Inputs preserved; button re-enabled. 🔶 FILL-IN #12c: lead API endpoint + payload. **Payload question:** form fields only, or attach the scenario (lender ranks, loan settings, financials)? Lede implies the estimate travels — users must be told what's shared (add a line under consent if scenario is attached).

### 13.5 Success
Replaces form: 60px `--field` circle with `--accent` check · "You're all set, {first}" 22px/700 · "A FundIQ broker will call you on **{mobile}** within one business day to talk through your **{lender}** option." (no-preference variant: "…to talk through your options.") · "Done" primary.

### 13.6 Post-success page state
CTAs (desktop row + mobile dock + sheet footer) become non-interactive "Call back requested ✓" for the session; re-open shows the success view. Prevents duplicate leads.

### 13.7 Fine print
Under submit, 12px centered `--muted-2`: "No credit check. We'll only use these details to arrange your call." (revise with #12).

---

## 14. FILL-IN checklist (owner answers required)

| # | Question | Where | Blocking? |
| --- | --- | --- | --- |
| 1 | ~~Confirm Results.html direction as source of truth~~ **RESOLVED 2026-07-06** — owner directed the update to the Paper frames; A1 now names Paper artboard `18WZ-0` as visual source of truth. design.md rewrite still pending as a follow-up task | §2 A1 | Resolved |
| 2 | Engine integration: client lib vs API, latency | §4.3, §9.1 | **Yes — loading design** |
| 3 | Savings source field; 3b: retained-buffer feature in v1? (Note: Paper's Property sheet shows Savings $356k as a directly editable field — partial answer) | §4.3, §5.3, §7.7 | Yes |
| 4 | Reconcile §5 calc definitions against `fundiq-serviceability-calculations` (exists/build per item) | §5 | **Yes — engine scope** |
| 5 | Edits re-run borrowing power (engine supports?); 5b rates as product lookups; ~~5c global vs per-lender scope~~ **RESOLVED** — global by construction: the Update details sheets edit the scenario, not a lender (§7.7) | §7.7 | **Yes — core loop** |
| 6 | Stamp-duty engine (states, FHB, foreign) — still open; ~~state editable on this page?~~ **RESOLVED** — yes, via Update details → Property details (Paper "Update purchase assumptions": State, Purpose, First home buyer rows) | §5.2, §7.7, §8 | Yes |
| 7 | LMI rules/table; 7b display slot | §4.3, §7.6 | Yes |
| 8 | Per-lender fee data source | §4.3, §8 | Yes |
| 9 | *(merged into #4)* | — | — |
| 10 | Save & exit mechanism + destination; 10b logo-click behaviour | §7.1 | No (stub OK) |
| 11 | Update details → Financial inputs: flow-section routes (Income/Expenses/Liabilities/Existing properties) + return contract; 11b mobile back target | §7.7, §10.1 | Yes |
| 12 | Broker lead: consent legal wording, 12b prefill availability, 12c API + payload (scenario attached?) | §13 | **Yes — compliance** |
| 13 | Privacy policy URL | §13.2 | Yes |
| 14 | Repayment frequency toggle? 14b/c *(revised per Paper)*: allowed value sets for Loan term (years), Interest-only term, Fixed-rate term, and Product type (Package/Basic) — the fields themselves are now fixed by the Paper Loan sheet (§7.7) | §4.4, §7.7 | No (defaults stated) |
| 15 | Analytics: tooling + event list sign-off (suggested: `results_viewed`, `lender_selected`, `sort_changed`, `update_details_opened`, `details_saved`, `funds_expanded`, `viewall_toggled`, `broker_opened/submitted/succeeded`, `save_exit`) | — | No |
| 16 | ~~Accent sign-off~~ **RESOLVED 2026-07-06** — Paper palette adopted: teal `#167D7F` / mint `#85C7BE` / CTA `#111111` (§3.1). 16b lender cycle palette values still to confirm against the Paper bars | §3.1 | No (defaults stated) |
| 17 | Copy sign-off: full table §12; 17b "How we estimate" destination; 17c empty-state copy | §12 | Yes (legal lines) |
| 18 | Route path | §4.1 | No |
| 19 | Session/auth model, lifetime, resume | §4.1 | Yes |
| 20 | Breakpoint 1024px + tablet treatment | §4.2 | No (default stated) |
| 21 | Rates feed + "as at" timestamp; 21b saved-link recalc policy | §4.3, §9.6 | Yes |
| 22 | Condensed rows below rank 10 in expanded list? | §7.5 | No (default stated) |
| 23 | Partial engine failure: tolerate or all-or-nothing | §9.3 | No (default: tolerate) |
| 24 | Next/prev lender pager in mobile sheet | §10.4 | No (default: later) |
| 25 | Funding sources beyond savings: are gifts, First Home Owner Grant, FHSS release, or sale proceeds captured in the flow (or planned)? Determines Group 2 of the funds breakdown — v1 default is Savings only | §8 | No (default stated) |
| 26 | Compliance: comparison-rate warning wording + placement, and scope of the equal-prominence rule (broker comms? emails?). The rule itself is adopted (A14), not in question | §12a | Yes — before launch |
| 27 | ~~Visual verification of §7.6 banner and §8 breakdown against Paper frames~~ **RESOLVED 2026-07-04** — both frames fetched and inspected directly (JSX + computed styles + screenshots). §7.6/§10.5/§8 rewritten to match the actual built patterns ("Capacity pair" tiles, verified rate/comparison equality, funds-required/available/remaining verdict strip). No longer blocking. | §7.6, §8 | Resolved |
| 28 | Desktop frames: the Paper artboard is mobile-only (393px); desktop type/layout values in §3.2/§7 are extrapolated. Design desktop frames in Paper or sign off the extrapolation | §3.2, §7 | No (extrapolation stated) |
| 29 | "Policy fit" sort option: what metric backs it? Cut from the sort sheet if no engine eligibility-strength score exists in v1 | §7.3a | No (default: cut if undefined) |
| 30 | "Property price in mind" (optional field, Property sheet): engine behaviour when set — cap displayed results at the target, show a gap indicator, or informational only? | §7.7 | No (default: informational only) |

**Definition of ready for build:** #2, #4, #5, #12 answered; everything else has a stated default an engineer can ship behind a flag or stub.
