# Paper Goal Prompt: Fundora Results Cathay-Card Selected Lender Pass

## Target Paper File

Work in:

https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0

Create one focused board named:

`Results v7 - Selected lender card + detail variations`

Place it near `Results v6 - Core states + detail variations`. Do not create multiple new boards.

## Required Setup

Before editing Paper:

- Load `get_guide({ topic: "paper-mcp-instructions" })`.
- Open the target file.
- Call `get_basic_info`.
- Call `get_selection`.
- Call `get_font_family_info` for `Helvetica Neue`, `System Sans-Serif`, and `IBM Plex Mono`.

Use:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/06-new-property-spec.md`
- `docs/mobile-ui/07-results-spec.md`
- `docs/mobile-ui/07-results-paper-goal-prompt.md`

## Context And Goal

This pass is not broad ideation. It is a focused correction and extension of the Results selected-lender experience after the Cathay Pacific card discussion.

The user liked:

- One clear selected item card.
- A small `View all` link to return to the wider list.
- A secondary action card underneath, similar to `Prepare all your travel documents`.

Translate that pattern into Fundora Results:

- Selected lender offer card.
- `View all lenders` return affordance.
- `Funds to complete` secondary action card after lender selection.
- `Connect with a broker` primary CTA.

## Product Decisions To Use

Primary CTA:

- `Connect with a broker`

Secondary details link:

- `Update details`

Details chooser rows:

- `Property details`
- `Loan details`
- `Financial inputs`

Subtle sort row:

- `Sorted by max property price`
- Small action: `Sort`

Sort must be visually and conceptually separate from `Update details`.

Use the 14-lender source of truth from:

`/Users/sarah/Code/fundiq-serviceability-calculations/src/lenders/assets.ts`

Supported lenders:

- ANZ
- Athena
- Bankwest
- Bendigo
- Bluestone
- CBA
- ING
- Macquarie
- NAB
- Resimac
- St George
- Suncorp
- ubank
- Westpac

## Generated Icon Assets

Use these image assets in the details chooser row variations, scaled down to 24-32px:

- Property details: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/property-details.png`
- Loan details: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/loan-details.png`
- Financial inputs: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/financial-inputs.png`

These icons follow the Fundora character-icon direction:

- Thick uneven black ink outline.
- Warm matte fills.
- Transparent background.
- No enclosing badge.
- No text.
- No mascot face.

Use them sparingly. They are for chooser rows or a compact supporting detail surface, not decorative lender rows.

## Board Structure

Build one board with these sections in order.

### 1. Goal Prompt Strip

Add a concise board header that states:

- This board explores selected-lender card/detail variations.
- It uses the Cathay-style selected-card pattern.
- It keeps all-lender comparison and sorting available.
- It places funds-to-complete after lender selection.

### 2. Core Flow Row

Create 393 x 852 phone states:

1. Default Results with ranked lender rows and subtle sort.
2. Selected lender as a Cathay-inspired card.
3. Selected lender with funds-to-complete action card underneath.
4. Details chooser using the three generated icons.
5. Sort sheet, clearly separate from details editing.

### 3. Selected-Lender Variation Row

Create at least five concrete 393 x 852 phone variations:

1. `A Cathay card`
   - Selected lender card under a `Selected lender` row.
   - `View all lenders` link on the same row.
   - Product detail inside one coherent card.

2. `B Inline expansion`
   - Selected lender expands inside the lender list.
   - Other lender rows remain visible and comparable.

3. `C Detail sheet`
   - Selected lender opens as a bottom sheet or panel.
   - Keep max property price context visible behind or above.

4. `D Funds-to-complete action`
   - Selected lender card plus a secondary card:
     `Funds to complete`
     `Estimate deposit, purchase costs and cash needed to settle.`

5. `E Non-top selected`
   - Example with CBA selected while Macquarie remains the top max-property-price lender.
   - Do not imply the borrower made a bad choice.
   - Use legitimate trade-off copy such as lower repayment, lower rate, product preference, or policy confidence.

### 4. All-Lender List Variation Row

Create at least four concrete 393 x 852 phone variations for showing all lenders beyond a horizontal max-price bar:

1. `Ranked price rows`
   - Rank, lender, max price, tiny delta from top.

2. `Selected-lender deltas`
   - After selecting CBA, other rows show differences such as `+$180k vs CBA`.

3. `Grouped price bands`
   - Groups such as `$3.0M+`, `$2.8M-$3.0M`, and below.

4. `Dot-on-scale rows`
   - Quiet scale position instead of full bars.

Optional fifth:

- `Compact ledger`
  - Top six with breathing room, remaining eight as a compact all-lender ledger.

### 5. Details Chooser Icon Row

Create at least three detail chooser variations:

1. Icon rows with generated icons at 28px.
2. Icon rows with generated icons at 32px and tighter labels.
3. No-icon control variation for comparison.

Rows must be:

- `Property details`
- `Loan details`
- `Financial inputs`

Use copy that makes clear:

- Property details and loan details change the calculation.
- Financial inputs navigate back to existing sections.
- Sorting only changes order.

## Mobile Screen Rules

Use:

- 393 x 852 phones.
- 32px mobile rails.
- Fundora top chrome and progress.
- White / Notion-neutral surfaces.
- Fine borders.
- Teal active controls only where meaningful.
- System UI / Helvetica Neue-like typography.
- One primary CTA plus a secondary text/link action.

Avoid:

- Dashboard table headers.
- Uppercase `LENDER / REACH / MAX`.
- Heavy card-on-card clutter.
- Generic teal icon sets.
- Made-up compare-lender destinations.
- Scenario chips in default loaded state.
- Copy saying `Macquarie has the highest estimate`.
- `comfortable number` copy.

## Required Selected Lender Detail

Every selected-lender card/sheet/inline expansion must include:

- Product name.
- Rate.
- Comparison rate.
- Loan amount.
- Monthly repayment.
- LVR.
- Max property price.
- `View all lenders` or equivalent return affordance.

Preferred example:

- `CBA Extra Home Loan`
- `CBA estimate`
- `$2.92M`
- Rate `6.18%`
- Comparison `6.42%`
- Loan amount `$2.61M`
- Monthly repayment `$16,920`
- LVR `76%`

## Funds To Complete

Show funds-to-complete only after lender selection.

Explore:

- Small action card beneath selected lender.
- Inline row inside selected lender detail.
- Receipt-style panel opened from the action card.

Keep copy plain:

- `Funds to complete`
- `Estimate deposit, purchase costs and cash needed to settle.`
- `View breakdown`

## QA Checklist

After meaningful sections, screenshot and fix:

- Does the selected lender card feel like one coherent offer?
- Is `View all lenders` obvious but not loud?
- Does funds-to-complete feel secondary but useful?
- Does CBA/ANZ selected while Macquarie remains top feel legitimate?
- Is sorting clearly separate from details editing?
- Do all-lender alternatives remain scannable on 393px?
- Do generated icons read clearly at 24-32px?
- Do rows align across lender name, value, and action lanes?
- Is copy calm and Fundora-like?
- Any clipping, low contrast, awkward wraps, or accidental empty gaps?

Call `finish_working_on_nodes` at the end.

## Final Response

State:

- The board name created.
- The icon assets used.
- The strongest selected-lender concept.
- The strongest all-lender list concept.
- Any honest gaps or Paper warnings.
