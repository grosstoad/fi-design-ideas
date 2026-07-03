# FundIQ Results Page — Build Specification (Draft for review)

**Status:** DRAFT v1 — ready for owner review. Everything measurable is taken from the Results.html design export; judgement calls follow the recommendations in `docs/results-page-spec-review.md` §9 and are marked **[ADOPTED]** (override if wrong). Items requiring owner/business input are marked **🔶 FILL-IN #n** inline and collected in §14 as a checklist.

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
| A1 | Source of truth | Results.html direction (Hanken Grotesk, cream/forest). `design.md` results section to be rewritten. Two carry-backs from design.md: remaining-cash concept (§8) and disclaimer voice (§12). 🔶 FILL-IN #1 confirms. |
| A2 | Deposit maths | Usable-deposit model: savings fund costs first, remainder is deposit (§5.3). |
| A3 | Loan edits re-rank | Yes — editing loan details re-runs borrowing power and re-ranks the list live (§7.6). 🔶 FILL-IN #5 confirms engine support. |
| A4 | Mobile detail pattern | Bottom sheet (push variant dropped). Sheet gets a close ✕, snap points, dock suppression, URL sync (§10.4). |
| A5 | Hero | Answer-first: hero leads with the top-lender price on both platforms (§7.2, §10.2). |
| A6 | Sort | Cut for v1. Static "Sorted by max price" note only (§7.3). |
| A7 | Accent | Deep forest `#15362A`. Mint/amber reserved for illustration only. 🔶 FILL-IN #16 signs off. |
| A8 | Comparison bars | Per-lender colours from a fixed cycle assigned by initial rank; not brand-matched (§4.4). |
| A9 | Motion | Count-up/bar-fill on first render only; no re-animation on selection; `prefers-reduced-motion` renders final values instantly (§11). |
| A10 | Dead controls | "View product" cut for v1. "Menu" (mobile) replaced by "Save & exit". Progress bar removed from results. Sort cut (A6). "Edit financials" wired (§7.9). |
| A11 | Comparison rates | Published product comparison rate only, never client-adjusted (§5.6). |
| A12 | Naming | "Max property price" is the canonical term everywhere. |

---

## 3. Design tokens

### 3.1 Colour

```
--cream:      #F4F3ED   page background
--cream-2:    #EFEDE3   hover surfaces, bar tracks
--paper:      #FFFFFF   cards, sheets, modals
--field:      #F3F2EB   inset panels (tiles, edit-loan), input backgrounds
--ink:        #181A12   primary text
--ink-2:      #3C3E34   secondary strong text
--muted:      #76776C   body/support text
--muted-2:    #82826F   hints, ranks, sub-labels  ← darkened from #9C9C90 for contrast (review §6.5)
--line:       #E5E3D8   card borders
--line-soft:  #ECEAE0   internal dividers
--forest:     #15362B   headline banner, primary CTA
--err:        #C2462C   validation errors
--accent:     #15362A   [ADOPTED A7]
--accent-strong:      darken(accent, 16%)   focus rings, accent-mode bars
--accent-soft:        tint(accent, 80%)     selected-row bg, icon chips, input focus glow
--accent-text:        auto black/white on accent (luminance > 0.62 → #13332a, else #fff)
--accent-text-strong: darken(accent, 34%)   text links on light surfaces
```

Derivation formulas are normative: if the accent changes, derived tokens regenerate.

**Lender cycle palette** (assigned by rank at first render, stable for the session; cycles if > 8 lenders):
`#6E9BC4 · #E3B23C · #D98E63 · #C2462C · #5E8FB5 · #E59A3B · #7FA37A · #C98AB0`
🔶 FILL-IN #16b: confirm these 8 values (or supply brand-safe replacements). Rule: colours must NOT approximate lender brand colours.

### 3.2 Typography

Font: **Hanken Grotesk** (Google Fonts), weights 400/500/600/700/800. System-ui fallback. `font-variant-numeric: tabular-nums` on every dollar/percent value.

| Style | Desktop | Mobile | Weight / tracking |
| --- | --- | --- | --- |
| Hero figure | 56px / 1.0 | 44px / 1.0 | 800 / −0.035em |
| Hero support line | 16px / 1.55 | 15px / 1.5 | 400, `--muted`, bold spans `--ink` 700 |
| Section title ("Lenders") | 17px | 17px | 800 / −0.01em |
| Eyebrow | 12.5px | 12.5px | 700, `--muted` |
| Row lender name | 16.5px | 16px | 600 (rank-1 row: 800) |
| Row price | 18px | 17px | 800 / −0.02em |
| Detail product title | 21px | 17px | 800 / −0.02em |
| Banner value | 42px | 26px | 800 / −0.035em |
| Tile value | 23px | — | 800 / −0.025em |
| Tile label / row key | 12.5px / 14.5px | 14.5px | 600 / 400 |
| Body/lede | 16px | 15px | 400 |
| Form labels | 13.5px | 13.5px | 700 |
| Hints / fine print | 12px | 12px | 500 / 400 |

### 3.3 Shape, elevation, spacing

- Radii: cards/list containers 18–20px · rows 13px · inset panels/tiles 14px · inputs/segments 10–12px · sheets 26px (top corners) · pills/bars 99px.
- Borders: 1px `--line` on cards; 1.5px on selected rows and inputs.
- Shadows: detail card `0 1px 2px rgba(20,30,20,.04), 0 30px 60px -46px rgba(20,30,20,.4)`; sheet `0 -10px 40px -12px rgba(20,30,25,.4)`; modal `0 30px 80px -24px rgba(20,30,25,.55)`; primary CTA `0 10px 26px -14px rgba(20,40,30,.7)`.
- Spacing rhythm: card padding 22–30px; row padding 15–16px; stack gaps 12–18px; section gaps 24–28px.

### 3.4 Focus (global, new — review §6.1)

Every interactive element: `outline: 2px solid var(--accent-strong); outline-offset: 2px;` on `:focus-visible`. No element may suppress it.

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

- 70px tall, `--paper`, 1px `--line` bottom border, content padding 0 38px.
- Left: logo — 26px forest rounded square (8px radius) with 8px accent dot bottom-right + wordmark "fundiq" 20px/800/−0.035em.
- Right: **Save & exit** — ghost button, 14.5px/600 `--muted`; hover: `--cream-2` bg, `--ink` text; radius 9px, padding 8px 12px.
- **Save & exit behaviour [ADOPTED A10]:** opens a small modal — "Save your results" / email input / "Email me a link" primary / "Just exit" text — issuing a resume token. 🔶 FILL-IN #10: confirm mechanism (email link vs account vs silent local save) and destination after exit (marketing home?).
- No other nav. Logo click = same as Save & exit prompt if unsaved 🔶 FILL-IN #10b: or straight to home?

States: default · hover · focus-visible (§3.4) · modal open.

### 7.2 Hero (C2) — answer-first [ADOPTED A5]

Anatomy (left-aligned, max-width 760px, 26px bottom margin):
1. Eyebrow "Results".
2. **Hero figure**: top lender's `maxPrice`, 56px/800, count-up on first render (§11).
3. Support line 16px: `Your highest estimated property price — with **{topLender}**, the strongest of your **{n} lenders**. Select any lender to see the loan behind the number.` Bold spans `--ink`/700.
   - n = 1: `…with **{lender}**, the one lender that matched your profile.`
4. Disclaimer line 12.5px `--muted-2`: `Indicative estimates only — not loan offers. Rates as at {date}. How we estimate` (last two words are a link → 🔶 FILL-IN #17b: destination/methodology page or popover content).

Behaviour: hero figure and support line update (no re-animation; 300ms value crossfade) when re-ranking changes the top lender (§7.6). The hero always reflects **rank #1**, not the selected lender.

### 7.3 Lender list card (C3)

- White card, 1px `--line`, r20, padding 22px 22px 20px, width 468px, self-start (doesn't stretch).
- Head row: "Lenders" 17px/800 · right: "Sorted by max price" 13px `--muted-2`. **No sort button** [ADOPTED A6].
- Body: rows (§7.4), then view-all control (§7.5).

### 7.4 Lender row

Grid `22px | 1fr | 120px | max-content | 18px`, gap 14px, padding 15px 12px, radius 13px, rendered as `<button>`:

| Lane | Content |
| --- | --- |
| Rank | `1`…`n`, 14px/600 `--muted-2`, tabular |
| Name | lender name, 16.5px/600 (`800` on rank-1 row); truncate with ellipsis at one line, min 90px before the bar shrinks |
| Bar | 8px pill, track `--cream-2`; fill = lender cycle colour [A8]; `width % = maxPrice / (rank1.maxPrice × 1.08)` |
| Price | `maxPrice` fmt `$X.XXM`, 18px/800, right-aligned |
| Chevron | 16px `--muted-2`; selected: `--accent-text-strong` |

**States**

| State | Treatment |
| --- | --- |
| Default | transparent bg, 1.5px transparent border |
| Hover | bg `--cream`; transition 140ms |
| Pressed | bg `--cream-2` |
| Selected | bg `--accent-soft`, 1.5px `--accent` border, bar track `rgba(255,255,255,.6)` |
| Focus-visible | global ring (§3.4) |
| Recalculating | value + bar shimmer (§9.2); row not disabled |

**Interaction & semantics**
- Click/Enter/Space selects; exactly one row is always selected; clicking the selected row is a no-op (no deselect on desktop).
- Container: `role="listbox"` `aria-label="Lenders ranked by max property price"`; rows `role="option"` + `aria-selected`. Arrow Up/Down moves selection directly (selection follows focus). Each row's accessible name: `"{rank}. {name}, max property price {$X.XXM}"` — bar is `aria-hidden`.
- Selecting updates the detail card (§7.6) — announce via `aria-live="polite"` region: "Showing {lender} {product}".
- Selection resets the detail card's open disclosures to closed.

### 7.5 View all / show fewer

- Default shows top 6. Button full-width below list: `View all lenders ({n})` ⇄ `Show fewer lenders`; white, 1px `--line`, r14, 15px padding, 15px/700; hover `--cream`.
- Expanded: list region gets `max-height: 7 rows` + internal scroll (page doesn't grow) with top/bottom fade masks. Rows below rank 10 render **condensed** (no bar) 🔶 FILL-IN #22: confirm condensed treatment or keep bars on all rows.
- "Show fewer" resets internal scroll to top; if the selected lender is outside the top 6, it stays selected and a one-line note appears under the button: "{name} is selected · rank #{r}".
- Hidden entirely when n ≤ 6.

### 7.6 Lender detail card (C4)

White card, r20, shadow (§3.3), padding 28px 30px 30px. Contents update **in place** on selection (no remount animation, [A9]).

1. **Identity row**: 13px colour dot (lender cycle colour) · product title 21px/800 `{name} {product}` · sub-line 13.5px `--muted`: `{name} · {Purpose label} · {Repay label} · {Rate type label} · Rank #{r}`. ("View product" removed [A10].)
2. **Headline banner**: `--forest` block r16, padding 20px 22px; label `Max property price with {name}` 15px/600 `rgba(255,255,255,.72)` (verify contrast ≥ 4.5:1; bump to .78 if needed); value 42px/800 white = selected lender's `maxPrice`. Value changes animate 300ms count (only interior animation permitted on selection).
3. **Stat tiles** — grid 4×1fr, 12px gap; tile: `--field` bg, 1px `--line-soft`, r14, padding 16px:

| Tile | Value | Sub |
| --- | --- | --- |
| Loan amount | `maxLoan` `$X.XXM` | "borrowing power" |
| Monthly repayment | `$X,XXX` | "over {term} yrs" / "interest only" |
| Interest rate | `X.XX%` | "{comparisonRate}% comparison" (or "comparison n/a") |
| LVR | `XX%` | "{usableDeposit fmt $XXXk} deposit" |

   If `lmi > 0`, the LVR tile sub becomes "incl. LMI ${lmi fmt k}" 🔶 FILL-IN #7b: confirm LMI display slot.
4. **Edit loan details** disclosure (§7.7).
5. **Funds to complete** block (§8), separated by 1px `--line-soft` top border, 18px padding-top.
6. **CTA row** (§7.9).

### 7.7 Edit loan details (disclosure + panel)

- Trigger: text button, edit icon + "Edit loan details" + chevron, 14px/700 `--accent-text-strong`; chevron rotates 90° when open (200ms). `aria-expanded`, `aria-controls`.
- Panel: `--field` bg, 1px `--line-soft`, r14, padding 16px. Header eyebrow "EDITING LOAN" 11px/700 uppercase + product name 14.5px/800.
- Fields (2-col grid desktop, full-width segmented controls):

| Field | Options | Default |
| --- | --- | --- |
| Loan purpose (full row) | Owner-occupier · Investment | Owner-occupier |
| Rate type (full row) | Variable · Fixed 2yr · Fixed 3yr | Variable |
| Repayments | P&I · Interest only | P&I |
| Loan term | 25 yrs · 30 yrs | 30 yrs |

- Segmented control spec: container `--paper` bg, 1px `--line`, r10, 3px padding, 2px gap; option 13px/600, r7, 8px padding, min-height 44px on touch; active: `--accent` bg + `--accent-text` + subtle shadow. Semantics: `role="radiogroup"` with visible group label; options as radios, roving tabindex, arrow keys. (Prototype's `aria-pressed` buttons acceptable alternative; pick one and keep it.)
- **Scope [ADOPTED, review §1.2 D10]:** edits are **global** — they apply to all lenders and re-run the engine (A3). Therefore the panel header eyebrow reads "LOAN SETTINGS — APPLIES TO ALL LENDERS" instead of the prototype's per-product framing. 🔶 FILL-IN #5c: confirm global scope (alternative: per-lender overrides — meaningfully more complex).
- **On change:** debounce 300ms → engine re-run → list re-ranks with FLIP animation ≈250ms; affected values shimmer during flight (§9.2); selected lender **stays selected** and its new rank shows in the sub-line and, if changed, a transient chip "now #3 (was #1)" for 4s. Hero updates if rank 1 changed (§7.2).
- Settings persist for the session and round-trip through Save & exit. Reset affordance: text link "Reset to defaults" bottom-right of the panel.

### 7.8 Detail card — data edge cases

- `comparisonRate` null → tile sub "comparison n/a".
- `eligible: false` lenders never reach the list (§9.4) — the detail card never renders an ineligible lender.
- Selected lender becomes ineligible after an edit → selection moves to the nearest eligible rank; toast: "{name} can't lend under these settings — showing {newName}".

### 7.9 CTA row (C6)

- Layout: primary button + text secondary, 14px gap, margin-top 24px.
- **Primary "Connect with a broker"**: forest bg, white 16px/700, r15, padding 16px 30px, broker icon 19px; hover `#0f261e`; active translateY(1px); shadow per §3.3. Opens broker overlay (§13) with the *selected* lender prefilled.
- **Secondary "Edit financials"**: text button 15px/700 `--accent-text-strong`, hover underline. **Wired [A10]:** navigates to the flow's review step with all answers preserved; on completion returns to `/results` and recalculates (full loading treatment §9.1). 🔶 FILL-IN #11: confirm the review-step route and return contract.
- After a successful broker submission this row's primary becomes disabled-styled "Call back requested ✓" for the session (§13.6).

---

## 8. Funds to complete (C5) — revised per usable-deposit model [A2]

Replaces the prototype's breakdown (which double-counted the deposit).

**Collapsed (default):**
- Icon chip 34px `--accent-soft` r10 with info icon · title "Funds to complete" 14.5px/800 · note 13px `--muted`: `About {$XXXk} in cash needed to settle` where the figure = `savings` allocated (i.e., deposit + costs) — with the usable-deposit model this equals savings; if a buffer exists it reads `{savings − buffer}`.
- Right: text link "View breakdown" ⇄ "Hide". `aria-expanded`.

**Expanded rows** (13.5px key `--muted` / value 700 `--ink`, 9px gaps):

| Row | Value |
| --- | --- |
| Deposit toward purchase | `usableDeposit` |
| Stamp duty ({STATE}, est.) | engine value · trailing "change" link if state editable (🔶 #6) |
| Transfer & legal fees | engine value |
| Lender fees ({name}) | per-lender (🔶 #8) |
| LMI (if LVR > 80%) | engine value; row hidden when 0 |
| **Total funds to complete** | sum — divider above, 14.5px/700 |
| **Remaining cash after settlement** | `savings − total` — the verdict line, 700 |

**Verdict states:**
- Remaining ≥ 0: value in `--ink`, sub-note "kept aside from your savings".
- Shortfall (< 0): value `--err`, row label "Shortfall", plus a compact notice band under the block (r10, `--err` at 8% tint bg): "Your savings don't cover the costs at this price. Lower the price range or talk to a broker about options." with "Edit financials" link. *(With the usable-deposit model a shortfall shouldn't occur by construction — this state guards engine edge cases and future buffer settings.)*

Mobile: identical block inside the lender card, bg `#FBFAF5`, link label "View"/"Hide".

---

## 9. Page states (C8)

### 9.1 Initial loading — staged reveal
- Header + hero eyebrow render immediately; hero figure area shows a shimmer block.
- List card renders with title and 6 skeleton rows; caption above rows: `Checking {n} lenders against your profile…` Rows resolve top-down as results arrive (or in 120ms stagger if the engine returns in one batch), bars filling per §11.
- Detail card renders skeleton until rank-1 resolves, then populates and becomes the default selection.
- Budget: if the engine is client-side and < 300ms total, skip staging — render complete with the standard first-render animation. 🔶 FILL-IN #2 decides which path is real.

### 9.2 Recalculating (after loan edits)
Values (prices, bars, tiles, banner, hero) shimmer in place ≤ engine latency; layout never collapses; rows stay interactive. FLIP re-rank on resolve (§7.7).

### 9.3 Error
- Full failure: list card replaced by an error panel — icon, "We couldn't calculate your results" 17px/800, body "Something went wrong on our side. Your answers are saved.", primary "Try again" (re-runs), secondary "Edit financials". Detail card hidden.
- Partial failure (some lenders error): show successful lenders; footnote under the list: "{k} lenders couldn't be checked right now." 🔶 FILL-IN #23: confirm partial-tolerance vs all-or-nothing.

### 9.4 No eligible lenders
List card body: illustration-free panel — title "No lender matched this scenario" 17px/800; body explains the binding constraint when the engine can name it (`"Your deposit is below the minimum lenders accept."` / generic fallback "Based on your answers, no lender on our panel could offer a loan."); **primary: "Edit financials"**, secondary text: "Talk to a broker about low-deposit options" (opens §13 with lender = "No preference"). Hero shows an em-dash figure with support line "We couldn't find a match — yet." Dock CTA (mobile) relabels to "Talk to a broker".
🔶 FILL-IN #17c: sign off this copy set.

### 9.5 Few lenders (1–5)
Standard layout; view-all hidden; lede grammar per §7.2.

### 9.6 Returning user (saved link)
Results recalculate on open (rates may have moved). If any figure changed vs the saved snapshot by > 1%: dismissible banner "Rates have moved since you saved — your numbers are refreshed." 🔶 FILL-IN #21b: confirm snapshot-vs-recalc policy.

---

## 10. Mobile components

### 10.1 Header
- Row: circular back button 38px (`--cream` bg, arrow-left) · wordmark "fundiq" 19px/800 · right: **"Save & exit"** text button (replaces prototype "Menu" [A10]) — same flow as §7.1.
- Back from results → the flow's review step (same as "Edit financials") 🔶 FILL-IN #11b: confirm; alternative is Save & exit prompt.
- **No progress bar** on results [A10].

### 10.2 Hero (list screen)
- Eyebrow "Results" · hero figure 44px/800 (rank-1 `maxPrice`) · support line 15px (same template as §7.2) · disclaimer line.
- Canonical H1 for a11y/SEO: visually the figure leads; the `<h1>` is "Max property price" positioned as the eyebrow-adjacent label (screen-reader order: heading → figure → support).

### 10.3 Lender list
- Section head: "Lenders" + "Sorted by max price" note (no button).
- Container: 1px `--line`, r18, rows separated by `--line-soft`.
- Row grid `22px | 1fr | 92px | max-content | 16px`, padding 16px, min-height 56px. Bar 7px. Price 17px/800.
- States: hover/pressed `--cream`/`--cream-2`; active (sheet open for that row) `--accent-soft`. Same semantics as §7.4; tapping opens the sheet (§10.4).
- View-all identical to §7.5 (page grows on mobile instead of internal scroll — the page is the scroll container; expanded list simply lengthens).

### 10.4 Lender detail bottom sheet [A4]
- Scrim `rgba(20,26,18,.34)`, tap closes. Sheet: `--paper`, r26 top corners, shadow §3.3, max-height 90%.
- Structure: grab handle (40×5px pill, 12px padding zone) · **close ✕** 34px circular `--cream` button top-right (new, required) · body (scrollable): eyebrow "Selected lender" + lender card (§10.5) · footer (fixed): primary "Connect with a broker" + secondary "Edit financials", top border `--line-soft`.
- **Snap points:** opens at 65% viewport height; drag up → full (90%); drag down past 110px or velocity flick → dismiss; between snaps, settle to nearest (spring 300ms).
- Entrance: translateY slide-up 300ms ease-out (instant under reduced motion).
- While open: the docked CTA bar (§10.6) is hidden; body scroll locked; focus trapped; `role="dialog"` `aria-modal="true"` labelled by the lender name; Esc/close/scrim/back-button all dismiss and return focus to the originating row.
- Open state syncs `?lender=` (§4.1); switching lenders happens by dismissing and tapping another row (no in-sheet pager in v1) 🔶 FILL-IN #24: optional next/prev lender arrows in the sheet header — v1 or later? (Default: later.)

### 10.5 Lender card (inside sheet)
- Header band `--cream`, 18px padding: 11px dot + `{name} {product}` 17px/800 + sub 13px `{Purpose} · {Repay} · {Rate type} · Rank #{r}` (rank added for desktop parity).
- Big stat row: "Max property price" 14.5px/600 · value 26px/800.
- Key-value rows (14.5px/15.5px, `--line-soft` separators, 12px vertical padding): Rate `{x}% p.a.` · Comparison rate `{x}% p.a.` (or "n/a") · Loan amount · Monthly repayment ("(interest only)" suffix when IO) · LVR (+ "incl. LMI" per §7.6).
- Edit loan details disclosure — single-column panel, same fields/behaviour as §7.7 (global scope; re-rank is visible when the sheet closes; the card's own values update live).
- Funds to complete block per §8.

### 10.6 Docked CTA bar
- Fixed bottom, padding 14px 22px 26px (respect safe-area inset), bg gradient white 72% → transparent upward.
- Primary "Connect with a broker" full-width + secondary "Edit financials" text button beneath.
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
| hero.h1 (sr) | Max property price |
| hero.support | Your highest estimated property price — with {lender}, the strongest of your {n} lenders. Select any lender to see the loan behind the number. |
| hero.disclaimer | Indicative estimates only — not loan offers. Rates as at {date}. How we estimate |
| list.title / list.sortnote | Lenders / Sorted by max price |
| list.viewall / list.viewfewer | View all lenders ({n}) / Show fewer lenders |
| detail.banner | Max property price with {lender} |
| tiles.* | Loan amount · borrowing power / Monthly repayment · over {t} yrs · interest only / Interest rate · {x}% comparison / LVR · {d} deposit |
| editloan.eyebrow | Loan settings — applies to all lenders |
| editloan.reset | Reset to defaults |
| funds.title / funds.note | Funds to complete / About {x} in cash needed to settle |
| funds.rows | Deposit toward purchase / Stamp duty ({state}, est.) / Transfer & legal fees / Lender fees ({lender}) / LMI / Total funds to complete / Remaining cash after settlement |
| funds.shortfall | Your savings don't cover the costs at this price. Lower the price range or talk to a broker about options. |
| cta.primary / cta.secondary | Connect with a broker / Edit financials |
| cta.done | Call back requested ✓ |
| loading.checking | Checking {n} lenders against your profile… |
| empty.title / empty.body | No lender matched this scenario / Based on your answers, no lender on our panel could offer a loan. |
| error.title / error.body | We couldn't calculate your results / Something went wrong on our side. Your answers are saved. |
| rerank.toast | {lender} can't lend under these settings — showing {newLender} |
| saved.banner | Rates have moved since you saved — your numbers are refreshed. |

Broker strings in §13. 🔶 FILL-IN #17: overall copy sign-off (especially disclaimer, empty, shortfall — legal-sensitive).

---

## 13. Broker capture (C7)

Presentation: desktop centered modal 560px, r22; mobile bottom sheet ≤95% height with grab handle. Scrim `rgba(20,26,18,.42)`. `role="dialog"` `aria-modal`, focus trap, Esc + ✕ + scrim close, focus returns to trigger.

### 13.1 Header
Eyebrow "FUNDIQ BROKERS" (11.5px/700 uppercase, `--accent-text-strong`) · title "Connect with a broker" 23px/800 · ✕ 34px circle · lede: "A real mortgage broker, free to you, who can take this estimate to settlement."

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
Input spec: 1.5px `--line` border, r12, padding 12px 14px, 15px/500; focus `--accent` border + 4px `--accent-soft` glow; error `--err` border + 12.5px `--err` message below. Invalid submit scrolls to first error and focuses it.

### 13.3 Submit
"Request a call back" — primary style. On submit: disable + inline spinner ("Sending…"), single-flight guard.

### 13.4 Failure
Inline banner above submit (r10, err-tint bg): "That didn't send — please try again." Inputs preserved; button re-enabled. 🔶 FILL-IN #12c: lead API endpoint + payload. **Payload question:** form fields only, or attach the scenario (lender ranks, loan settings, financials)? Lede implies the estimate travels — users must be told what's shared (add a line under consent if scenario is attached).

### 13.5 Success
Replaces form: 60px accent-soft circle with check · "You're all set, {first}" 22px/800 · "A FundIQ broker will call you on **{mobile}** within one business day to talk through your **{lender}** option." (no-preference variant: "…to talk through your options.") · "Done" primary.

### 13.6 Post-success page state
CTAs (desktop row + mobile dock + sheet footer) become non-interactive "Call back requested ✓" for the session; re-open shows the success view. Prevents duplicate leads.

### 13.7 Fine print
Under submit, 12px centered `--muted-2`: "No credit check. We'll only use these details to arrange your call." (revise with #12).

---

## 14. FILL-IN checklist (owner answers required)

| # | Question | Where | Blocking? |
| --- | --- | --- | --- |
| 1 | Confirm Results.html direction as source of truth (+ design.md rewrite) | §2 A1 | **Yes — everything** |
| 2 | Engine integration: client lib vs API, latency | §4.3, §9.1 | **Yes — loading design** |
| 3 | Savings source field; 3b: retained-buffer feature in v1? | §4.3, §5.3 | Yes |
| 4 | Reconcile §5 calc definitions against `fundiq-serviceability-calculations` (exists/build per item) | §5 | **Yes — engine scope** |
| 5 | Loan edits re-run borrowing power (engine supports?); 5b rates as product lookups; 5c global vs per-lender edit scope | §7.7 | **Yes — core loop** |
| 6 | Stamp-duty engine (states, FHB, foreign); state editable on this page? | §5.2, §8 | Yes |
| 7 | LMI rules/table; 7b display slot | §4.3, §7.6 | Yes |
| 8 | Per-lender fee data source | §4.3, §8 | Yes |
| 9 | *(merged into #4)* | — | — |
| 10 | Save & exit mechanism + destination; 10b logo-click behaviour | §7.1 | No (stub OK) |
| 11 | Edit financials: review-step route + return contract; 11b mobile back target | §7.9, §10.1 | Yes |
| 12 | Broker lead: consent legal wording, 12b prefill availability, 12c API + payload (scenario attached?) | §13 | **Yes — compliance** |
| 13 | Privacy policy URL | §13.2 | Yes |
| 14 | Repayment frequency toggle? 14b fixed-term set; 14c term range | §4.4, §7.7 | No (defaults stated) |
| 15 | Analytics: tooling + event list sign-off (suggested: `results_viewed`, `lender_selected`, `loan_edited`, `funds_expanded`, `viewall_toggled`, `broker_opened/submitted/succeeded`, `save_exit`, `edit_financials`) | — | No |
| 16 | Accent `#15362A` sign-off; 16b lender cycle palette values | §3.1 | No (defaults stated) |
| 17 | Copy sign-off: full table §12; 17b "How we estimate" destination; 17c empty-state copy | §12 | Yes (legal lines) |
| 18 | Route path | §4.1 | No |
| 19 | Session/auth model, lifetime, resume | §4.1 | Yes |
| 20 | Breakpoint 1024px + tablet treatment | §4.2 | No (default stated) |
| 21 | Rates feed + "as at" timestamp; 21b saved-link recalc policy | §4.3, §9.6 | Yes |
| 22 | Condensed rows below rank 10 in expanded list? | §7.5 | No (default stated) |
| 23 | Partial engine failure: tolerate or all-or-nothing | §9.3 | No (default: tolerate) |
| 24 | Next/prev lender pager in mobile sheet | §10.4 | No (default: later) |

**Definition of ready for build:** #1, #2, #4, #5, #12 answered; everything else has a stated default an engineer can ship behind a flag or stub.
