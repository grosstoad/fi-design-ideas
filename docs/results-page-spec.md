# Fundora Results Page — Product and Build Specification

**Status:** APPROVED REQUIREMENTS v3.6 — IMPLEMENTATION NOT YET VERIFIED (v3.5 + §16 owner-review amendments)

**Last updated:** 2026-07-11
**Owner decision:** the three desktop Paper states and the reconciliations in this document supersede every earlier results-page architecture, copy, spacing, and interaction instruction.

This is the single normative results-page document. Historical goal prompts and audits may explain how decisions were reached, but they must not be used to override this file.

---

## 0. Authority and source mapping

### 0.1 Approved Paper states

| State | Paper reference | Authoritative for | Explicitly superseded within that frame |
| --- | --- | --- | --- |
| Unselected desktop | [Full comparison](https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/01KMVY07H36M706X5HW9VW56B4/10W5-0) | Full-width columns, dense row grammar, 1180px rail, financial-value hierarchy | Replace its combined 58px title/header with the shared 46px + 38px header grid; add `Lender` and sort indicators; the leader is not styled as selected; the two CTA cards become the unified CTA band |
| Selected lender details | [Lender details](https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/01KMVY07H36M706X5HW9VW56B4/10OI-0) | Lender-detail information order, equal capacity tiles, product/action row, rates, repayment/LVR and loan metadata | The left panel, fractional half-widths, mixed `system-ui` typography, tab/header geometry and two CTA cards are replaced by the shared v3.5 shell |
| Selected cost breakdown | [Cost breakdown and unified next step](https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/01KMVY07H36M706X5HW9VW56B4/11QJ-0) | Equal-width shell, 84px shared divider baseline, compact lender lanes, cost hierarchy, spacing rhythm and unified CTA | `Purchase` becomes the canonical `Property`; bar segments must be data-proportional; the shared header rows are optically aligned as specified below |

### 0.2 Conflict order

When sources conflict, use this order:

1. Owner decisions recorded in this v3.5 spec.
2. The state-specific mapping above.
3. The Fundora/Casual Client brand system and shared application components.
4. Current implementation and tests.
5. Historical prompts, audits and older Paper explorations.

Current code is not proof of design compliance. A requirement is only verified when the implementation, automated coverage and visual evidence named in §14 exist.

Paper’s lender rosters and numbers are illustrative, not separate state data. Unselected and selected views use the same live eligible results. The eight-lender frames correctly show a `$2.21M` minimum; the 10-lender cost frame adds Bendigo and Ubank but fails to update its hero. Its visible `$2.04M` Ubank result makes `$2.04M–$3.09M` the correct range for that roster.

### 0.3 Locked reconciliations

- Canonical term: **Max property price**, never “max purchase price”.
- Selected secondary tab: **Cost breakdown**, not “Funds to complete”.
- Cost sections: **Purchase costs** and **Funding breakdown**.
- Hero: two-line label plus range, with an accessible sentence equivalent to “Your max property price is between {MIN} and {MAX}”.
- No rank numbers.
- Unselected desktop shows every eligible lender in normal document flow.
- Selected desktop is an in-page equal-width two-column layout after subtracting the gutter; it is never an overlay or slide-over.
- The compact lender comparison is identical on the Lender details and Cost breakdown tabs.
- One unified CTA band is used in every desktop state.
- Mobile keeps the shared responsive sheet/dialog, with content parity across both tabs.

---

## 1. Purpose and scope

The results page is the final step of the Fundora affordability flow. It must let a user:

1. Understand their property-price range across eligible lenders.
2. Compare the lending result behind each maximum.
3. Inspect the complete loan setup for a selected lender.
4. Understand how the purchase is funded and what savings remain.
5. Update inputs and recalculate.
6. Connect with a broker to discuss options and next steps.

In scope: results, sorting, selection, lender details, cost breakdown, Update details, broker capture, loading/recalculation/error/empty states, desktop and mobile.

Out of scope: the preceding financial-input flow, production serviceability implementation, authentication UI and broker CRM internals.

---

## 2. Non-negotiable product and design rules

1. **Answer first.** Do not show a `Results` eyebrow, repeated H1, single-lender hero number, support paragraph, disclaimer block or `How we estimate` link in the primary results header.
2. **No implied selection.** The unselected table has no tinted/teal row. If the leader needs explanation later, use an explicit text badge rather than selected-state styling.
3. **One layout transition.** Selecting a lender reflows the desktop page from one full-width table into two adjacent cards. Deselecting returns to the table.
4. **One selected shell.** Switching tabs changes only the right card body. Left-card title, column labels, rows, height, width and scroll position remain stable.
5. **Equal financial prominence.** Max property price and loan amount are equal capacity tiles. Rate and comparison rate always use identical typography, colour and placement.
6. **No duplicate comparison.** Do not render a compare footer, repeated lender bars, “View all” control, hidden-row count or viewport-derived row count.
7. **Exact data.** Hero range and cost bars derive from displayed eligible data. Funding values reconcile exactly.
8. **Stable action hierarchy.** `Connect with a broker` is primary. `Update details` is secondary. Their location does not jump when selection or tabs change.
9. **Precise alignment.** Do not approximate equal halves, header baselines or numeric lanes with content-dependent gaps.
10. **Inter only.** All results UI text uses Inter 400/600/700; do not mix in `system-ui` for individual components.

---

## 3. Data and calculation contract

### 3.1 Scenario input

```ts
type ResultsScenario = {
  savings: number;
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  firstHomeBuyer: boolean;
  capitalisePurchaseCosts: boolean;
  loan: {
    purpose: 'oo' | 'inv';
    productType: 'package' | 'basic';
    repaymentType: 'pi' | 'io';
    interestOnlyYears?: 1 | 2 | 3 | 4 | 5;
    rateType: 'variable' | 'fixed';
    fixedYears?: 1 | 2 | 3 | 4 | 5;
    termYears: number; // 10–30 inclusive
  };
  // Household financials remain opaque to this page and are consumed by the engine.
};
```

Conditional values are invalid when their parent choice is inactive: no `interestOnlyYears` for P&I and no `fixedYears` for Variable.

### 3.2 Per-lender result

```ts
type LenderResult = {
  id: string;
  name: string;
  product: string;
  maxLoan: number;
  maxPrice: number;
  rate: number;
  comparisonRate: number | null;
  monthlyRepayment: number;
  lvr: number;
  fees: {
    transfer: number;
    application: number;
    legal: number;
    other: number;
  };
  funds: {
    propertyPrice: number;       // equals maxPrice
    stampDuty: number;
    legalAndOtherCosts: number;  // transfer + application + legal + other
    lmi: number;
    totalPurchaseCost: number;
    loanAmount: number;          // actual settlement funding, after capitalisation choices
    depositUsed: number;
    savingsAvailable: number;    // equals scenario.savings
    savingsLeft: number;         // negative means shortfall
  };
  eligible: boolean;
};
```

`funds` is the canonical reconciled display view model. The engine may maintain more detailed internal fee/capitalisation data, but the UI does not infer capitalisation or rebuild these values from incomplete fields.

Only eligible lenders appear. The visible hero range is always:

```ts
rangeMin = Math.min(...visibleEligibleLenders.map(lender => lender.maxPrice));
rangeMax = Math.max(...visibleEligibleLenders.map(lender => lender.maxPrice));
```

The range is independent of the current sort. Therefore, the 10-lender example shown in the approved selected-cost frame would require a `$2.04M–$3.09M` range; `$2.21M–$3.09M` is only correct for the eight-lender example.

### 3.3 Calculation definitions

```text
legalAndOtherCosts = fees.transfer
                   + fees.application
                   + fees.legal
                   + fees.other

funds.propertyPrice       = maxPrice
funds.legalAndOtherCosts  = legalAndOtherCosts
funds.totalPurchaseCost   = funds.propertyPrice
                          + funds.stampDuty
                          + funds.legalAndOtherCosts
                          + funds.lmi
funds.depositUsed         = funds.totalPurchaseCost − funds.loanAmount
funds.savingsAvailable    = scenario.savings
funds.savingsLeft         = funds.savingsAvailable − funds.depositUsed
```

- The production engine owns borrowing power, iterative price-dependent costs and whether costs/LMI are capitalised into `funds.loanAmount`.
- The UI displays `funds.loanAmount` as Loan amount and never substitutes `maxLoan` when those values differ.
- `monthlyRepayment` is the engine-provided repayment for the displayed `funds.loanAmount` and active settings. P&I uses standard amortisation; interest-only uses `funds.loanAmount × rate / 12` during the IO period. The UI never recomputes it from `maxLoan`.
- Actual and comparison rates come from product data. Never derive a comparison rate with client-side adjustments.
- If `comparisonRate` is unavailable, show `—` at the same prominence as Rate and provide accessible explanatory text.

### 3.4 Formatting

- Range/max-price values: `$3.09M`; retain two decimals only where required by the established formatter.
- Exact values and repayments: `$3,299,712`, `$16,223`; `en-AU`, no cents.
- Full-table repayment: `$16,223/mth`.
- Detail rate: `6.09% p.a.`; full table may use `6.09%` where the heading provides context.
- LVR: whole percentage.
- Every dollar, percentage and repayment value uses tabular numerals.

---

## 4. Visual system

### 4.1 Typography

Font stack: `Inter, ui-sans-serif, system-ui, sans-serif`; weights 400, 600 and 700 only.

| Role | Size / line-height | Weight | Notes |
| --- | --- | --- | --- |
| Wordmark | 20 / 24 | 700 | `Ask Fundora` |
| Header action | 14 / 20 | 400 | muted |
| Hero label | 18 / 24 | 600 | muted |
| Hero range | 32 / 38 | 700 | `-0.02em` tracking |
| Panel title / lender identity | 24 / 30 | 700 | exactly equal across adjacent cards |
| Compact column labels / tabs | 14 / 20 | 400 inactive, 600 active | one line only |
| Compact lender row | 13 / 16 | 400; selected 600 | price 700 |
| Full-table column label | 12 / 17 | 400 | sort button keeps full text visible |
| Full-table row | 14 / 18 | 400 | max price 700 |
| Capacity label | 13 / 17 | 700 | muted |
| Capacity value | 24 / 29 | 700 | equal tiles |
| Product name | 18 / 23 | 700 | same row as Update loan details |
| Metric label / value | 13 / 16; 16 / 21 | 400; 700 | Rate and comparison rate identical |
| Metadata label / value | 13 / 16; 14 / 20 | 400; 600 | two-column rows |
| Cost total label / value | 14 / 20; 28 / 34 | 700; 700 | value `-0.02em` |
| Cost section heading | 17 / 22 | 700 | Purchase costs / Funding breakdown |
| Cost legend label / value | 13 / 20 | 400; 600 | fixed amount lane |
| CTA heading / support | 20 / 26; 13 / 19 | 700; 400 | heading stays one line |
| Button label | 14 / 20 | 700 | no wrapping |

### 4.2 Colour tokens

Use shared tokens, not per-node Paper near-duplicates:

```css
--results-bg: #FFFFFF;
--results-card: #FFFFFF;
--results-field: #F3F3F0;
--results-selected: #F5F6F3;
--results-ink: #111111;
--results-muted: #5F5E58;
--results-muted-2: #666660;
--results-line: #D6D3D1;
--results-line-soft: #E3E3DF;
--results-track: #ECECEA;
--results-teal: #2DD4BF;
--results-teal-dark: #0F766E;
--results-cta-surface: #E9F8F5;
--results-cta-line: #CBE9E4;
--results-positive-surface: #D8F4F0;
--results-error: #C2462C;
```

Paper contains close per-node approximations: CTA `#2FCDBD`, dark teal `#127C74`, card border `#D7D7D3`, field `#F2F2EF` and legend text `#555550`. The shared tokens above intentionally normalize those values and win in implementation.

Lender bar cycle, stable by initial result order and repeated only after ten lenders:

```text
#7BA5C9 · #D8C342 · #D78973 · #C34B32 · #6594B5
#E09B3A · #7DA079 · #BC86A9 · #6D9B75 · #8D7BB8
```

Cost/funding keys:

```text
Property price #1687C7 · Stamp duty #F0D228
Legal and other costs #E43E34 · LMI #C88BB9
Loan #1687C7 · Deposit #48CFC2
```

Colour must not be the only association: every segment has an adjacent text label and matching dot.

### 4.3 Shape, borders and focus

- Main cards: 12px radius, 1px `--results-line` border, no shadow.
- Unified CTA band: 12px radius, 1px `--results-cta-line` border, no shadow.
- Total/verdict tiles: 10px radius.
- CTA buttons: 8px radius, 46px desktop height.
- Close: 34×34 circular field button.
- Comparison tracks: 4px radius.
- Focus-visible: 2px `--results-teal-dark` outline with 2px offset. Never remove focus without a replacement.
- Interactive rows use background plus the 3px selected edge; colour alone is insufficient.

### 4.4 Spacing primitives

The primary rhythm is 4, 8, 9, 10, 12, 16, 18, 20, 22 and 26px. Do not substitute arbitrary values where an exact component measurement is specified below.

---

## 5. Page shell and responsive frame

### 5.1 Desktop reference frame

At 1440×900:

- Header: 64px high, 1px bottom border.
- Header content: `Ask Fundora` left and `Save & exit` right; the header may stick at the top but must not cast a shadow.
- Header, hero and content share one 1180px rail: 130px from either edge. Older frames with a 72px header inset are incorrect.
- Hero/answer region: 122px high; 36px top padding, 4px label/range gap, 20px bottom padding.
- Main content begins at y=186.
- Main card-to-CTA gap: 18px.
- Content bottom padding: 26px minimum.

Use a centered `max-width: 1180px` rail with at least 16px viewport gutters below 1212px.

### 5.2 Short desktop

The following values are a responsive reconciliation to be verified in the required 1280×800 capture; they are not measurements from the 1440×900 Paper frames. For desktop viewports at or below 820px high, compact whitespace rather than hiding lenders or introducing viewport-derived row counts:

- Hero: 98px high, with 20px top and 12px bottom padding around the unchanged 24px label, 4px gap and 38px range.
- Main-card/CTA gap: 12px.
- Unified CTA remains 112px high so the 82×80px illustration slot fits without clipping.
- Bottom padding: 8px.

This produces an exact 800px stack: `64 + 98 + 506 + 12 + 112 + 8`. If the unselected dataset contains more than eight lenders, showing every lender in normal flow takes priority over keeping the CTA above the fold.

### 5.3 Breakpoint

- Equal-width in-page desktop layout: `min-width: 1212px`, which preserves the 1180px rail plus 16px minimum gutters.
- Compact comparison + responsive sheet layout: below 1212px.
- No third interaction model is introduced for tablet. This rail-driven breakpoint is an approved responsive reconciliation pending device testing, not a Paper measurement.

---

## 6. Desktop comparison states

### 6.1 Unselected full-width table

With no valid `?lender=`, render one full-width comparison card. Nothing is selected.

Card structure:

1. Title row: 46px, 20px horizontal inset, `Max property price by lender`.
2. Column-heading row: 38px, 20px horizontal inset, top and bottom soft dividers.
3. A lender-row region with a 420px minimum for eight or fewer lenders. Rows flex to fill it with a 52px minimum and 70px maximum; eight rows become 52.5px each and six rows become 70px each. With fewer than six lenders, leave intentional space below the rows rather than creating oversized targets. With more than eight lenders, the region grows in normal document flow.

The 46px + 38px header and 52.5px eight-row reconciliation preserve the selected state’s 506px card/CTA position while adding the separately requested panel title and column headings. It intentionally supersedes 10W5’s measured 58px combined header + eight 56px rows.

Columns:

```text
Lender + bar | Max property price | Loan amount | Rate
| Comparison rate | Monthly repayment | Chevron
```

At the 1180px reference width, preserve the approved lanes:

```text
300px | 180px | 150px | 130px | 150px | 170px | 20px | 38px end space
```

Within the 300px lender lane: name 110px, 18px gap, bar track 145×8px. The explicit 38px end space absorbs the remaining inner width after 20px card insets; it is not a content-dependent gap. Keep every column in a fixed lane across every row; long lender names truncate with an accessible full name.

Sorting:

- Every sortable heading is a text button with a subtle paired up/down indicator.
- `aria-sort` identifies the active column and direction.
- Clicking an inactive heading applies its default direction; clicking the active heading reverses it.
- The accessible name includes the column and action; do not rely on the triangles alone.
- Rate and Comparison rate headings/cells are identical in style.

Rows:

- No rank.
- No internal vertical scroll, fade, “View all” or “Show fewer”. The page grows normally.
- The unselected leader uses neutral text/background like every other row.
- Hover/focus may use `--results-selected`; the teal edge and teal lender name are reserved for an actual selection.
- Each row exposes one keyboard activation target and a trailing chevron.

### 6.2 Selected equal-width composition

With a valid `?lender=`, the 1180px rail becomes:

```text
581px comparison | 18px gutter | 581px selected-lender card
```

Each card is `(rail width − 18px gutter) / 2`; at 1180px this is exactly 581px. Use equal explicit grid tracks (`581px 581px` at the reference width, otherwise `repeat(2, minmax(0, 1fr))`). “50/50” means equal columns after subtracting the gutter, not two 50%-wide cards plus a gutter. Do not use unequal fractions or `round(50%)` widths that create drift.

Both cards are 506px high and share the same two header tracks:

```text
46px title row + 38px column/tab row = divider at exactly 84px
```

Alignment contract:

- Both 24/30 titles share the same top position and text baseline.
- Both selected-card title rows use a 22px horizontal inset; compact lender rows retain their separate 18px lane inset.
- Left column labels and right tabs share the same 14/20 vertical position.
- The line below the column headings and the line below the tabs are the same y-coordinate.
- The right card must not reintroduce the current Paper frame’s 2px title offset or 4px tab offset.

### 6.3 Compact selected comparison

Title: `Max property price by lender`.

Columns: `Lender` and `Max property price`, each on one line.

Reference row lanes inside the 579px inner width:

```text
18px inset | lender 112px | bar 235×7px | price 140px | chevron 25px | 31px end space | 18px inset
```

- The explicit 31px end space absorbs the remaining inner width; it is not a content-dependent gap.
- Row minimum height: 42px.
- The rows region is 420px in the 506px reference card.
- Rows use flex growth between 42px and 70px to fill the region. With fewer than six lenders, leave intentional space below them. This fill/overflow rule is an approved responsive reconciliation beyond the static Paper frame.
- When the total minimum row height exceeds 420px, only the rows region scrolls vertically.
- Focusing or selecting an off-screen row scrolls it into view.
- No full-card scroll and no hidden-row affordance.
- Selected row: soft background, 3px teal leading edge, teal 600 lender name.
- Track `#ECECEA`, 4px radius; bar width is proportional to the largest eligible result in the complete list, independent of scroll viewport and active sort.

The compact card is the same component on both right-panel tabs. Tab changes must not reset its scroll; selecting a different lender updates selection and resets the right tab to Lender details.

### 6.4 Selection and URL behaviour

- Select row → push/update `/results?lender=<id>` and show the in-page composition.
- Select another row → update the right card in place.
- Close → clear the lender query, restore focus to the originating row where possible and return to full width.
- Unknown lender id → unselected full-width state; never silently select rank one.
- Browser Back reverses the user’s selection history sensibly.

---

## 7. Selected lender details

### 7.1 Shared right-card header

- Card: 581×506, 22px horizontal content inset, 12px radius, 1px border.
- Title row: 46px, lender name 24/30/700, close 34×34.
- Tabs row: 38px, `Lender details` / `Cost breakdown`, 26px gap.
- Active tab: 600 ink text with teal underline integrated into the shared bottom divider.
- Use true `tablist`, `tab` and `tabpanel` semantics, roving focus and Left/Right arrow navigation.
- A new lender always opens `Lender details`.

### 7.2 Lender details body

Order is fixed:

1. Equal capacity tiles.
2. Product name and `Update loan details` on one row.
3. Rate and Comparison rate.
4. Monthly repayment and LVR.
5. Loan purpose and Repayment type.
6. Loan term and Rate type.

The detail body begins 20px below the shared header divider and uses a 20px vertical gap between each of the six groups above. With the specified group heights (81, 30, 55, 41, 40 and 40px), the final row ends at y=491 inside the 506px card, leaving a deliberate 15px bottom inset. This is the locked v3.5 breathing-room reconciliation; 10OI measured 16px gaps beneath its older, deeper header.

Capacity tiles:

- Two equal flexible tiles, 81px high, with a 12px gap. At the exact 535px content width they are 261.5px each; treat 262px as a rounded design-tool measurement, not a CSS width.
- 15px vertical / 16px horizontal padding; 12px radius; field background.
- Labels and values use identical treatment in both tiles.
- Max property price remains left only as a reading-order convention, not additional prominence.

Product/action row:

- 30px high.
- Product name 18/23/700 left.
- `Update loan details` 14/20/600 teal right; it opens Update details directly at the Loan step.
- No divider immediately above or below the product row.

Rates:

- Two equal lanes.
- Rate and Comparison rate labels 13/16; values 16/21/700.
- They are identical in size, weight, colour and vertical position.
- The metrics row may carry the single soft divider beneath it.

Remaining pairs:

| Left | Right |
| --- | --- |
| Monthly repayment | LVR |
| Loan purpose | Repayment type |
| Loan term | Rate type |

- Monthly repayment label/value: 13/16 and 16/21/700.
- LVR label/value: 13/16 and 15/21/600.
- Loan metadata labels/values: 13/16 and 14/20/600.

Display rules:

- Purpose: `Owner occupied` or `Investment`.
- Repayment: `P&I` or `Interest only ({N} years)`.
- Rate type: `Variable` or `Fixed ({N} years)`.
- Loan term: `{N} years`.
- LVR: `{N}%`; if applicable append ` · incl. {$X} LMI` without obscuring LVR.
- Do not show separate IO-term, fixed-term or generic product-type rows.
- Do not render another bar chart or compare footer inside this card.

---

## 8. Cost breakdown

The Cost breakdown tab replaces only the right-card body. It does not open another overlay.

### 8.1 Vertical spacing contract

All measurements are relative to the 84px shared header divider:

- Total tile begins 10px below the divider and is 535×72px.
- Purchase costs heading begins 16px below the total tile.
- Section heading → bar: 9px.
- Bar → legend: 9px.
- Legend row gap: 7px.
- Purchase legend container: 65px high. Its two 20px rows plus 7px row gap leave 18px of internal bottom breathing room.
- Purchase legend container → Funding group: 9px, producing 27px visible space from the final purchase row to the Funding heading.
- Deposit row → Savings verdict: 18px clear space.
- Savings verdict: 535×50px.

Do not collapse the 16px tile-to-heading space, 27px last-purchase-row-to-funding-heading space or 18px deposit-to-verdict space. The verdict ends at y=475 inside the 506px card, leaving approximately 30px of inner bottom breathing room; do not turn it into another content slot.

### 8.2 Total purchase cost

- One cream/field tile, 10px radius, 12px vertical / 16px horizontal padding.
- Left: `Total purchase cost`.
- Right: exact total, 28/34/700.
- This is the only total purchase cost display.

### 8.3 Purchase costs

- Heading `Purchase costs`, 17/22/700.
- Bar: 535×12px, 6px outer radius, no decorative gaps.
- Legend: two columns (approximately 255px / 245px), two rows each.
- Dots: 9×9px circles; label 13/20; amount 13/20/600.
- Rows: Property price; Estimated stamp duty; Legal and other costs; LMI only when non-zero.
- `Legal and other costs` combines transfer/legal and lender application/other fees for this presentation.

Bar geometry is data, not decoration:

```ts
segmentWidth = segmentValue / totalPurchaseCost * availableWidth;
```

Every non-zero category receives at least a 2px visible segment; take any minimum-width adjustment from the largest segment so the full bar remains exactly 535px. The current Paper mock’s manually exaggerated legal/LMI shares are not normative.

### 8.4 Funding breakdown

- Heading `Funding breakdown`, 17/22/700.
- Matching 535×12px proportional bar.
- Rows:
  - `Loan from {lender} ({XX}% LVR)`
  - `Your deposit (from your {$SAVINGS} savings)`
- Values are `funds.loanAmount` and `funds.depositUsed`.
- Segments use the same proportional/minimum-width rule.

### 8.5 Verdict

- Positive: `Savings left over` and positive amount on the mint surface.
- Negative: `Savings shortfall` and absolute shortfall amount on an error-tint surface, followed by concise recovery guidance outside the strip if needed.
- Do not show Cash needed to settle, Funds required, Available funds, Total available or duplicate totals.

Required invariant:

```text
funds.loanAmount + funds.depositUsed = funds.totalPurchaseCost
funds.depositUsed + funds.savingsLeft = funds.savingsAvailable
purchase-cost legend sum = funds.totalPurchaseCost
```

Allow a maximum ±$1 difference after whole-dollar rounding; reconciliation tests fail outside that tolerance.

---

## 9. Actions and editable details

### 9.1 Unified desktop CTA band

Use the approved unified band in every desktop state:

- 1180×112px at the 1440×900 reference frame.
- 18px below the comparison component.
- Mint surface, 1px mint border, 12px radius, 16px vertical / 20px horizontal padding.
- Illustration slot 82×80; asset 70×70, static, transparent, Casual Client sticker style.
- Copy block has 10px left inset and flexible width.
- Headline: `Make sense of your lender options`, 20/26/700, one line.
- Support: `A broker can help you compare the trade-offs, sense-check the costs and decide which lender fits your situation.`, maximum two lines.
- Action group: 358×46px with 22px internal left padding and a 12px button gap. The 22px is not an extra flex gap between copy and actions.
- Secondary `Update details`: 135×46px, white, teal border/text.
- Primary `Connect with a broker`: 189×46px, teal fill, ink text.

The CTA band does not change when a lender is selected or tabs switch. Broker prefill uses the selected lender; without a selection it uses the max-property-price leader.

The coffee-mug **subject, slot and static treatment** are approved and described in `docs/illustration-style.md`; the final implementation asset still requires export/generation and visual approval. It is a deliberate exception to the otherwise austere results data surfaces. No illustration appears in the hero, lender table, detail metrics or cost bars.

### 9.2 Update details

`Update details` opens a chooser:

| Choice | Description | Destination |
| --- | --- | --- |
| Property details | State, purpose, savings and purchase costs. | Property sheet |
| Loan details | Loan term, repayment type, product and rate type. | Loan sheet |
| Financial inputs | Income, expenses, liabilities and existing properties. | Section chooser |

Use the Casual Client category stickers at approximately 40px, directly in each row without a thumbnail box.

Property fields: State, Purpose, First home buyer, Savings, optional Property price in mind, Capitalise purchase costs.

Loan fields: Loan term 10–30 years; Repayment type; conditional IO term 1–5 years; Product type; Rate type; conditional fixed term 1–5 years.

Property and Loan flows end with `Save and recalculate`. Edits remain local until save; Cancel discards. Saving returns to Results, preserves selection where eligible and re-ranks under the active sort.

`Update loan details` in the lender card bypasses the chooser and opens the Loan step. It edits the same global scenario as `Update details`; only the entry path is different. No loan edit is lender-specific.

### 9.3 Broker capture

Desktop: centered modal. Mobile: shared responsive bottom sheet. Require focus trap, labelled dialog, Esc/close/scrim dismissal and focus return.

Fields: first/last name, AU mobile, email, preferred lender, buying stage, optional notes, required contact consent. Preferred lender is prefilled from the selected lender or leader.

Submit: `Request a call back`; preserve inputs on failure; prevent duplicate submissions. Success locks page CTAs to `Call back requested ✓` for the session.

Production consent copy, privacy URL, lead endpoint and payload remain open in §13.

---

## 10. Mobile, states, accessibility and motion

### 10.1 Mobile/tablet

- Single-card compact comparison below 1212px. Hide Loan amount, Rate, Comparison rate and Monthly repayment columns; render only lender, bar, max property price and chevron.
- Hero retains the same label/range and exact min/max invariant.
- Compact rows show lender, bar, max property price and chevron; no rank.
- Sorting uses an explicit Sort control/sheet when columns collapse.
- Selecting a lender opens the shared responsive dialog/bottom sheet.
- Sheet content uses the same two tabs and the same lender/cost data as desktop.
- Desktop-only fixed widths/heights in §§7–8 are removed inside the sheet: tiles and bars use `width: 100%`, panel height is content-driven within a scrollable sheet body, and cost legend columns stack to one column when two columns would compress labels or values.
- Capacity tiles may stack below 360px; Rate and Comparison rate remain adjacent/equal whenever space permits and otherwise stack with identical styling.
- The page dock contains primary Connect with a broker and secondary Update details; hide it while a modal/sheet is open.

### 10.2 Page states

- **Loading:** stable hero/table skeleton; do not imply a selected lender.
- **Recalculating:** values shimmer in place; layout and row controls remain stable.
- **Partial failure:** show successful lenders plus a quiet count of lenders that could not be checked.
- **Full error:** clear message, Try again and Update details.
- **No eligible lenders:** range becomes an em dash; primary Update details, secondary broker path.
- **Selected lender becomes ineligible:** select the nearest eligible result and announce the change, or return to unselected if none remain.
- **Returning user:** recalculate and disclose materially changed results once saved-state behaviour exists.

### 10.3 Accessibility

- Logical heading order; only one page H1.
- Visual range has an accessible sentence using “between” and “and”, not an en dash alone.
- Sort buttons expose `aria-sort` and meaningful names.
- One keyboard activation target per lender row; Enter/Space works.
- Selection is conveyed by text/semantics plus background/edge treatment.
- Tabs implement standard arrow-key behaviour and visible focus.
- Internal selected-list scroll keeps focused rows visible and does not trap page scrolling.
- Close restores focus.
- Comparison rate is never hidden, demoted or hover-only.
- All dialogs use labelled focus management and background inertness.
- Colour-dot legends remain readable without colour.
- Minimum contrast is WCAG AA.

### 10.4 Motion

- Initial number/bar animation runs once only.
- Recalculation may shimmer and re-rank with a short FLIP transition.
- Selection reflows in place; do not animate an overlay from the right.
- Tabs use an immediate or ≤140ms content transition without layout movement.
- `prefers-reduced-motion` renders final states immediately.
- Accessible values are announced at their final value, not every animation frame.

---

## 11. Canonical copy

| Key | String |
| --- | --- |
| brand | Ask Fundora |
| hero.label | Your max property price |
| hero.range.a11y | Your max property price is between {MIN} and {MAX}. |
| comparison.title | Max property price by lender |
| comparison.columns | Lender / Max property price / Loan amount / Rate / Comparison rate / Monthly repayment |
| detail.tabs | Lender details / Cost breakdown |
| detail.capacity | Max property price / Loan amount |
| detail.metrics | Rate / Comparison rate / Monthly repayment / LVR |
| detail.metadata | Loan purpose / Repayment type / Loan term / Rate type |
| detail.updateLoan | Update loan details |
| costs.total | Total purchase cost |
| costs.groups | Purchase costs / Funding breakdown |
| costs.rows | Property price / Estimated stamp duty / Legal and other costs / LMI / Loan from {LENDER} ({LVR}% LVR) / Your deposit (from your {SAVINGS} savings) |
| costs.verdict | Savings left over / Savings shortfall |
| cta.title | Make sense of your lender options |
| cta.body | A broker can help you compare the trade-offs, sense-check the costs and decide which lender fits your situation. |
| cta.primary | Connect with a broker |
| cta.secondary | Update details |
| update.save | Save and recalculate |
| broker.done | Call back requested ✓ |

Do not add a results disclaimer to the hero. Any legally required comparison-rate warning belongs in a single dedicated compliance footnote outside the primary answer/comparison composition; exact wording remains open.

---

## 12. Broker form detail

| Field | Requirement |
| --- | --- |
| First / last name | Required; minimum sensible text validation |
| Mobile | Required AU number; normalise `+61` and `04` formats |
| Email | Required valid email |
| Preferred lender | Optional; prefilled from selection/leader; includes No preference |
| Buying stage | Required single choice: researching / actively looking / found a property / offer or contract |
| Notes | Optional, 500 characters |
| Consent | Required, with real privacy-policy link before launch |

Invalid submit focuses the first error. Submitting is single-flight. Failure preserves the form. Success states which phone number and lender option will be discussed.

---

## 13. Open production decisions

| Area | Outstanding decision | Blocking |
| --- | --- | --- |
| Engine | Integration method and reconciliation against the production serviceability engine | Production |
| Savings | Exact upstream source field(s) | Production |
| Rates | Product/rate feed and freshness timestamp | Production |
| Stamp duty | State/FHB/foreign-buyer engine | Production |
| LMI | Calculation rules and capitalisation treatment | Production |
| Fees | Per-lender legal/application/other data source | Production |
| Save & exit | Persistence model, destination and wordmark behaviour | Product |
| Financial edits | Production routes and return contract | Product |
| Broker | API endpoint, payload, consent language and scenario-sharing disclosure | Launch |
| Privacy | Real privacy URL | Launch |
| Compliance | Exact comparison-rate warning and communication scope | Launch |
| Analytics | Tooling and final event contract | Product |
| Tablet | Confirm the rail-driven 1212px breakpoint after device testing | Product |
| Empty states | Final legal/product copy | Launch |

Prototype defaults may remain fixture-backed and session-only, but must be explicitly labelled in the implementation README.

---

## 14. Verification and definition of done

### 14.1 Automated requirements

- Typecheck and production build pass.
- Unit tests cover range min/max, formatters and exact cost reconciliation.
- Interaction tests cover sorting/direction, select/deselect, lender swap, tab reset and arrow-key tab navigation.
- Detail tests cover purpose, repayment, loan term, rate type, IO/fixed conditional formatting and LMI.
- Cost tests cover optional LMI, savings-left and shortfall.
- Accessibility tests cover sort buttons, tabs, close/focus return and the mobile dialog—not merely an axe scan of isolated happy-path components.
- E2E covers unselected full width, both selected tabs and mobile sheet.

### 14.2 Visual evidence

Capture and compare against the approved Paper states:

1. 1440×900 unselected, eight eligible lenders.
2. 1440×900 selected Lender details.
3. 1440×900 selected Cost breakdown.
4. 1280×800 selected with the complete CTA visible.
5. 393×852 mobile on both tabs.
6. Fixed + interest-only metadata.
7. LMI omitted and present.
8. Savings-left and shortfall outcomes.
9. More than ten selected-state lenders proving internal row scrolling.

For the equal-width selected states, verify with coordinates—not eyesight alone:

- equal outer widths;
- 18px gutter;
- title and tab/column baselines;
- shared divider at 84px;
- fixed row lanes and right-aligned values;
- unchanged left card across tabs.

### 14.3 Current verification status

The current implementation appears to contain the major reflow, tabs, richer detail data and two-bar cost structure, but v3.5 is **not yet verified** against the three approved Paper states. In particular, do not claim complete until the accessibility cases, arithmetic invariant, conditional visual states and selected-list overflow behaviour above are evidenced.

### 14.4 Definition of done

- The three approved desktop states form one consistent system.
- All spacing and alignment contracts in §§5–9 are met.
- Hero/list/cost data reconcile.
- No stale overlay, duplicate compare bars, rank, viewport row count or split CTA remains.
- Mobile has content and interaction parity.
- Automated and visual evidence in this section exists and is reviewable.

---

## 15. Documentation governance

Keep as live documentation:

- `docs/results-page-spec.md` — this canonical product/design/build contract.
- `src/pages/results/README.md` — implementation architecture, commands, prototype defaults and verified deviations.
- `docs/results-page-icon-prompts.md` — auxiliary icon rules only.
- `docs/illustration-style.md` — shared illustration system and the CTA exception.

Historical execution records must carry a superseded banner and must not be listed as read-first material. Once this spec and README have been accepted, the deletion proposal is:

| File | Why it can be deleted | Content retained elsewhere |
| --- | --- | --- |
| `docs/results-page-codex-goal-prompt.md` | Initial build prompt for a retired component/state model | Engine boundary, states and verification rules are in §§3, 10 and 14 |
| `docs/results-page-implementation-guide.md` | Duplicates the spec and prescribes View all, compare footer, default selection and old typography. Before deletion, retarget the comments in `useResults.ts`, `lib/fillIns.ts` and `dev/StatesGallery.tsx` to this spec | Evergreen architecture is in this spec and the live README |
| `docs/results-page-spec-review.md` | Pre-implementation divergence audit; conclusions were superseded through several owner rounds | Approved decisions are in §§0–2 |
| `docs/results-visual-refresh-goal-prompt.md` | Execution log for the retired v3.4 slide-over | No unique current requirement |
| `docs/results-selected-detail-rework-goal-prompt.md` | Its owner decisions are now fully merged; its completion claims are not sufficient verification | Requirements are in §§5–10; evidence standard is §14 |
| `output/imagegen/fundora-sr5-max-purchase-results-brief.md` | Obsolete mobile variation brief using a different IA and typography direction | Current desktop/mobile contract is in §§5–10 |
| `output/imagegen/fundora-sr5-results-completion-audit.md` | Audit of a different Paper file and Assessment route | No current results requirement |
| `output/imagegen/results-v7-core-flow/results-v7-execution-audit.md` | Exploration manifest containing retired View-all/compare-footer concepts | Approved Paper sources are indexed in §0 |

Deletion is intentionally not performed as part of the v3.5 consolidation. Preserve them until the owner approves cleanup or move them to an external decision archive if provenance is required.

---

## 16. v3.6 owner-review amendments (2026-07-11) — normative overrides

The owner reviewed the running v3.5 build. Each item below OVERRIDES the corresponding earlier section where they conflict. Nothing else in v3.5 changes.

### 16.1 Comparison table (amends §6.1)
- **Chevron affordance:** fixed ~20px column sitting flush against the row's right padding (row right padding = card left padding); exactly one 16px gap between it and the Monthly repayment column. No flexible gutter around the chevron.
- **Card head crowding:** the card title "Max property price by lender" STAYS (owner decision). Fix the crowding instead: card head gets a 20–24px block padding and a clear baseline relationship to the sort control; title never sits within 16px of the card border.
- **Column headers:** one consistent style — 12.5px / 600 / muted, right-aligned exactly over their right-aligned values (Lender header left-aligned); sort glyphs one step lighter than the label so they read as affordance, not content. Headers deliberately smaller than values (metadata vs data) — do not enlarge.
- **Repayment format:** values render `$16,223` — NO `/mth` suffix; the "Monthly repayment" header carries the unit. (§3.4 amended: the `/mth` suffix applies only on surfaces without a column header naming the unit, e.g. the landing module.)

### 16.2 Lender details body (amends §7.2)
Readability through affordances, not new copy (owner: no tier names in-UI, no ranking lines, no added text):
- The four decision figures — Rate, Comparison rate, Monthly repayment, LVR — render as a **2×2 grid of `--field`-background stat tiles**, same visual family as the capacity pair above (smaller: label 11px muted / value 16px 700), uniform size within the grid. Rate and Comparison keep identical treatment (§2 legal rule).
- The remaining loan metadata — Loan purpose, Repayment, Loan term, Rate type — renders as a quiet uniform two-column key/value grid beneath: ALL at one size (13px key muted / 14px 600 value). The current mixed sizing (some values large, some small) is the defect; the tile/flat split above replaces it with a deliberate structure.
- No other content changes; the product/action row, capacity tiles and metadata order are unchanged.
- **Height-neutral constraint:** the restyled body must preserve the v3.5 card geometry (506px card, 15px bottom inset) — choose tile padding so the tile grid replaces the former rates + repayment/LVR groups (55 + 41 + 20px gap = 116px) at ~116px, and let the uniform metadata grid absorb any remainder. Tab switches stay height-stable per §2 rule 4.

### 16.3 Mobile sheet height parity (amends §10.1)
The bottom sheet keeps ONE height across the "Lender details" and "Cost breakdown" tabs — sized to the taller tab (or a fixed snap), with the shorter tab's content top-aligned and the sheet body scrolling internally when needed. Switching tabs never changes the sheet height.

### 16.4 Header (amends §5.1 shell)
- **Back affordance:** a circular back button (28px, `--field` bg, chevron-left) leads the wordmark; it returns to the flow's review step (history back when same-origin). Present on desktop and mobile.
- **"Save & exit" becomes a secondary button** — `--field` background, 38px min-height, 12px radius, 14px/600 ink — not a bare text link floating in the nav.
- **About / Learn are deliberately OMITTED from the results header** (owner-reviewed decision): results is an application flow, not a marketing surface; its header carries only back · wordmark · Save & exit. Marketing nav lives on the landing/site pages.

### 16.5 Broker dialog (amends §12)
- Preferred-lender options are **lender names only** ("NAB") — no em dashes, no product names.
- **Field trim:** remove "Anything else?"; Email becomes optional or is removed (phone callback product). Target set: First name, Last name, Mobile, Preferred lender, "Where are you up to?", consent, CTA.
- **Sticky dialog footer:** consent + "Request a call back" are always visible; content scrolls behind them. The CTA must never require scrolling to reach, at any viewport in the supported matrix.

### 16.6 NEW below the CTA band: "How we worked this out" FAQ
A quiet, container-width section after the action band (before the footer):
- Section title: **"How we worked this out"**. Accordion of four items (canonical copy, §11 additions):
  1. **"How did we work this out?"** — the assumptions summary (scenario inputs, current advertised rates, engine caveat) — this becomes the canonical home of the assumptions content.
  2. **"Is this a credit check?"** — "No. Nothing here touches your credit file. These are estimates from the details you entered."
  3. **"Why do lenders give different numbers?"** — one short paragraph on policy/rate/assessment differences.
  4. **"How accurate are these numbers?"** — indicative-estimates caveat; also the permanent home of the comparison-rate warning statement (placeholder wording until compliance supplies it — open decision #26).
- Styling: no card per item; 1px `--line-soft` separators, chevron rotation, 44px min touch targets, `aria-expanded`; content 14px muted. One item open at a time is acceptable; all-closed default.
- This section does NOT add illustrations, testimonials, or marketing content (owner-reviewed scope limit).

### 16.7 Copy additions (amends §11)
faq.title "How we worked this out" · faq.q1–q4 + faq.a1–a4 as above (a4 ends with the comparison-rate warning placeholder marked [COMPLIANCE TO CONFIRM]).
