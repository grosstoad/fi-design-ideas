# Results Spec

## Purpose

Design the mobile `Results` step for the borrowing-power flow. This step shows the maximum property price by lender, lets the user inspect lender/product detail, and gives access to assumption editing without turning the page into a dashboard.

The mobile result should feel like Fundora: calm, guided, useful, and easy to scan.

## Flow Position

Results is step 7 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

## Inputs And Scope

Results displays derived outputs and editable assumptions.

Core outputs:

- Maximum property price.
- Lender comparison list.
- Product and rate detail for a selected lender.
- Current editable assumption paths.
- Subtle sorting for lender order.

Secondary outputs:

- Monthly repayment estimate.
- Interest rate.
- Comparison rate.
- Loan amount.
- LVR.
- Funds to complete, as a secondary path only.

## Core Product Decisions

### Lender Results First

The first-class result is max property price by lender.

Use this heading:

- `Max property price by lender`

The page may include the answer-first statement:

- `You may be able to afford a property up to $3.10M`

Do not add explanatory copy such as `Macquarie has the highest estimate...`; the lender ranking already makes that obvious.

Do not introduce a separate `comfortable` number or range.

### Result Number Scale

The maximum price should be prominent but not so large that it dominates the entire screen.

Recommended mobile scale:

- Heading: 22-26px.
- Result amount: 34-38px.
- Lender section title: 16-18px.

### Lender Comparison

Use a compact lender list on mobile rather than a dense chart.

Default mobile direction:

- Prefer ranked price rows over a heavy chart when possible.
- Each row should make rank, lender name, max property price, and tap affordance clear.
- Horizontal bars may be used, but should be quiet and not read as a dashboard table.
- After a lender is selected, row-level deltas such as `+$180k vs CBA` may be used to help compare without implying a non-top lender is a bad choice.

Each lender row should show:

- Lender name.
- Max property price comparison treatment, such as a quiet bar, rank row, dot-on-scale, or delta.
- Max property price.
- Tap/expand affordance.

Supported first-pass lenders:

- Macquarie
- CBA
- NAB
- Westpac
- ANZ
- ING

Use `fundiq-serviceability-calculations/src/lenders/assets.ts` as the source of truth for supported lenders. If all 14 lenders are available, show the top 6 first with an affordance such as `Show all 14 lenders` or `View all lenders`.

### Sorting

Sorting is in scope, but should be subtle on mobile.

Show a quiet sentence-style row such as:

- `Sorted by max property price`
- Small action: `Sort`

Do not use a dashboard-like uppercase table header. Sorting changes lender order only; it does not change the underlying calculation. Assumption/input changes happen through `Update details`.

Mobile sort options may include:

- Max property price.
- Monthly repayment.
- Interest rate.
- Comparison rate.
- Loan amount.
- LVR.
- Funds to complete.
- Policy fit or confidence, if supported by the calculation/product model.

### Selected Lender Detail

Avoid presenting lender detail as a loose set of boxes. Prefer a compact product-detail panel or row stack that reads like one offer.

Explore two selected-lender models:

- Inline expansion: the selected lender expands inside the lender list so the borrower can keep comparing.
- Detail card or sheet: the selected lender appears as a focused offer card, with a `View all lenders` link to return to the list.

The detail card may borrow from travel itinerary patterns: one selected offer card near the top, a simple secondary action card underneath, and an easy return link such as `View all lenders`.

Selected lender detail should show:

- Product name.
- Rate.
- Comparison rate.
- Loan amount.
- Monthly repayment.
- LVR.

Possible detail layout:

- Product name and lender name as the detail header.
- Two-column rate row: `Rate` and `Comparison`.
- Compact row stack for loan amount, monthly repayment, and LVR.
- Optional note for product type, package/basic, variable/fixed, or IO/P&I.
- Secondary card or row for `Funds to complete` once a lender is selected.
- Primary CTA `Connect with a broker`.
- Return link `View all lenders`.

### Funds To Complete

Funds to complete is secondary on the default Results screen and should not compete with the max-property-price answer.

Preferred placement:

- Show `Funds to complete` after a lender has been selected.
- Present it as a simple action card or disclosure below the selected lender detail.
- Use the dedicated component spec: `funds-to-complete-component-spec.md`.
- Show the complete purchase funding equation: property price, stamp duty, fees and any other calculated purchase costs; loan amount; savings used; and residual savings or shortfall.
- Use concise compact-card copy such as `Purchase costs, loan funding and savings left after settlement.`
- Allow the borrower to open a full breakdown with purchase requirement rows, funding source rows, capitalised costs or LMI where relevant, and the savings outcome.

### Results Actions

Avoid pairing `Continue` and `Assumptions` as two heavy CTAs.

Preferred action model:

- One primary CTA: `Connect with a broker`.
- Secondary text action below it: `Update details`.

Use `Update details` because the chooser includes property details, loan details, and financial inputs. Avoid `Adjust property assumptions` when financial routes are included.

### Details Editing

Editable details should be reachable from Results through a focused chooser, not one long edit drawer.

Chooser options:

- `Property details`
- `Loan details`
- `Financial inputs`

Use small Fundora character-style prop icons in these chooser rows:

- Property details: house plus purchase document.
- Loan details: clipped loan document plus rate/term cue.
- Financial inputs: wallet, coins, or income/expense slip.

Icons should follow the existing Fundora icon language: thick black ink outline, warm matte fills, transparent background, no enclosing badge, no text, no mascot face, and readable at 24-32px.

Property details:

- State.
- Purchase purpose.
- First home buyer.
- Savings.
- Optional property price in mind.
- Capitalise purchase costs.

Loan details:

- Loan term.
- Repayment type: P&I or Interest only.
- Interest-only term, 1-5 years, only when Interest only is selected.
- Product type: Basic or Package.
- Rate type: Variable or Fixed.
- Fixed-rate term, only when Fixed is selected.

Financial inputs:

- Route back to earlier financial-input sections, such as Income, Expenses, Liabilities, and Existing properties.
- After saving a financial section, return to Results and recalculate.

### Recalculation

Changing assumptions should be based on the calculation engine when implementation is live. Static prototypes may use illustrative values, but production UI should reflect calculated results.

Changing assumptions should show a lightweight recalculating state with stable layout and skeleton lender rows.

Avoid clearing the screen or jumping the result layout.

## State Model

### 1. Results Loaded

Show:

- Fundora top nav.
- Mobile progress.
- Eyebrow `Results`.
- Heading `Max property price by lender`.
- Moderate result amount, for example `$3.10M`.
- Lender list.
- Primary CTA.
- Secondary text action: `Update details`.

Do not show scenario chips such as `NSW`, `Owner occupied`, or `Savings $356k` in the main loaded state.

### 2. Lender Selected

Show one selected lender expanded inline or in a compact detail panel.

Required detail:

- Product name.
- Interest rate.
- Comparison rate.
- Loan amount.
- Monthly repayment.
- LVR.

Keep the selected state compact so other lender rows remain understandable.

### 3. Lender List Scrolled

Show how the list behaves below the fold if more than six lenders are available.

Keep a small result summary sticky or otherwise accessible while scrolling.

### 4. Details Chooser

Show a bottom sheet or panel with:

- `Property details`
- `Loan details`
- `Financial inputs`

Actions:

- Secondary dismiss/cancel.

### 5. Property Assumptions Editing

Use the same input rhythm as New Property.

Controls:

- State.
- Purpose.
- First home buyer.
- Savings.
- Optional property price in mind.
- Capitalise purchase costs.

### 6. Loan Details Editing

Show:

- Loan term.
- Repayment type.
- Interest-only term when applicable.
- Product type.
- Rate type.
- Fixed-rate term when applicable.

### 7. Recalculating

Show:

- Stable header and result region.
- Loading copy: `Recalculating lender estimates...`
- Skeleton lender rows.
- Disabled primary action.

### 8. Error Or Unavailable

Show a recoverable state only for partial or temporary calculation problems. There should generally always be something calculated.

Keep `Contact support` and `Update details` visible so the borrower can recover. Avoid a dead-end no-result state unless the calculation service truly cannot produce any result.

## Required Mobile Interaction States

- Results loaded.
- Lender selected.
- Selected lender product detail.
- Long lender-list scroll state.
- All-lenders expanded state, if 14 lenders are shown.
- Details chooser.
- Property details editing.
- Loan details editing.
- Interest-only term visible.
- Fixed-rate term visible.
- Financial inputs route concept.
- Recalculating.
- Partial unavailable or support recovery.
- Secondary funds-to-complete entry point.

## Validation

Results should not introduce new field-level validation unless an assumptions panel allows editing.

Property assumptions validation:

- `Choose a state`
- `Enter savings`
- `Choose purchase purpose`

Do not require optional property price in mind.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/06-new-property-spec.md`

For mobile Results, prefer the SR5/Fundora input-flow aesthetic over the older FundIQ desktop report direction:

- iPhone 16, `393 x 852`.
- Fundora branding.
- White mobile surface.
- Teal active controls.
- Compact result hierarchy.
- Lender rows over dense charts.
- Product-detail rows over disconnected metric boxes.
- No desktop dashboard panels inside the phone.
- Avoid `comfortable number` messaging.

## Take-Forward Recommendation

Take forward a lender-results-first model:

- Heading: `Max property price by lender`.
- Moderate headline amount.
- Clean ranked lender rows or quiet lender bars with subtle sorting.
- Selected lender product detail, including both inline expansion and Cathay-inspired card/sheet variations.
- `Funds to complete` as a secondary card after lender selection.
- Single primary CTA `Connect with a broker`.
- Secondary text-link `Update details`.
- Details chooser split into Property details, Loan details, and Financial inputs, with Fundora character-style prop icons.

## Paper Prompt Status

Use `docs/mobile-ui/07-results-paper-goal-prompt.md` for the next Paper pass.
