# New Property Spec

## Purpose

Design the mobile `New property` step for the borrowing-power flow. This step captures the future purchase scenario that affects stamp duty, loan purpose, available funds, purchase costs, and the Results calculation.

This step is separate from `Properties`, which only captures properties the borrower already owns.

## Flow Position

New property is step 6 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

## Inputs And Scope

Required now:

- Property state or territory.
- Loan purpose: `Owner occupied` or `Investment`.
- First home buyer status.
- Savings for deposit and costs.
- Capitalise purchase costs.

Optional now:

- Property price in mind.

Not now:

- Property type, such as apartment, townhouse, or house.
- New-build or construction status.
- A separate post-Budget/new-property date question.
- Existing property values or existing home loans. Those belong in `Properties`.
- Loan term, repayment type, product type, or rate type. Those belong in Results loan assumptions.

## Core Product Decisions

### Scenario-First Model

The first screen should feel like a clean financial-input step, not a calculator settings page.

Recommended framing:

- Title: `What are you looking to buy?`
- Controls: property state, loan purpose, first home buyer, savings, optional property price, capitalise purchase costs.

Use standard input rows for entered amounts. Do not show `Edit` inside fields in the resting form. `Edit` is only appropriate in a review state or a collapsed summary.

### Property State

State is required because stamp duty and purchase costs vary by jurisdiction.

Supported options:

- `NSW`
- `VIC`
- `QLD`
- `SA`
- `WA`
- `TAS`
- `ACT`
- `NT`

Use a simple picker row or select-style field in the form, opening a sheet with all eight options as separate rows. Do not bundle `TAS`, `ACT`, and `NT` together.

The user must select state explicitly. Do not default state from the About You postcode.

### Savings

Savings should be captured as a currency input.

Recommended label:

- `Savings for deposit and costs`

This avoids implying the entire amount becomes deposit only.

### Property Price In Mind

Property price should be visibly optional.

Recommended label:

- `Property price in mind`

Recommended optional marker:

- `Optional`

Use this field to contextualise the eventual maximum property price, but do not block progress if it is empty.

### Loan Purpose And First Home Buyer

Loan purpose uses a compact two-option segmented control:

- `Owner occupied`
- `Investment`

First home buyer should sit nearby because it affects stamp-duty concessions, but it is not itself the loan purpose.

### Capitalise Purchase Costs

Include `Capitalise purchase costs` on the New Property screen for now.

Use a switch with concise helper copy, without a heavy divider or separate section boundary. If more explanation is needed, open a small sheet or inline disclosure.

Plain-language explanation:

- `This means some purchase costs are added to the loan instead of paid from savings on settlement.`

Trade-off copy:

- `Less cash needed upfront`
- `Higher loan and repayments`

## State Model

### 1. Resting State

Show:

- Mobile step progress.
- Page title.
- Property state picker row.
- Loan purpose.
- First home buyer.
- Savings amount.
- Optional property price in mind.
- Capitalise purchase costs switch.
- Continue CTA anchored near the safe area.

### 2. Property State Picker Open

Show a mobile sheet or picker with all supported states and territories as separate rows.

The current selection should be visible, and the sheet should be easy to dismiss without changing the value.

### 3. Savings Focused

Show the numeric/currency keyboard.

Keep the field label, value, and deposit/cost context visible above the keyboard. Hide the bottom CTA if it would collide.

### 4. Optional Property Price Focused

Show the numeric/currency keyboard and keep the field visible.

The optional status should remain clear.

### 5. Purpose Or FHB Changed

Show owner-occupied/investment and first-home-buyer selected states.

If the change affects assumptions, show a lightweight recalculation note without adding dense explanatory copy inside the form.

### 6. Capitalise Purchase Costs Selected

Show selected and unselected switch states.

If selected, preserve the user's context and show the trade-off without adding a visual divider that makes it feel like a separate step.

### 7. Recalculating

When scenario values affect estimates, show a lightweight recalculating state.

Avoid a full-screen spinner for small assumption changes.

### 8. Validation

Validation appears after Continue is attempted.

Use specific inline errors:

- `Choose a state`
- `Enter savings`
- `Choose purchase purpose`

Do not require property price in mind.

## Required Mobile Interaction States

- Resting state.
- Property state picker open.
- Savings focused with numeric keyboard.
- Optional property price focused with numeric keyboard.
- Owner occupied selected.
- Investment selected.
- First home buyer selected and unselected.
- Capitalise purchase costs selected and unselected.
- Capitalise purchase costs explanation.
- Missing state validation.
- Missing savings validation.
- Missing purchase purpose validation.
- Stamp duty or purchase-cost recalculation.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`

Keep the screen compact, calm, and scenario-focused. Avoid dense calculator panels, dashboard charts, desktop report styling, dividers that split the form unnecessarily, and review-style `Edit` affordances in normal input fields.

## Take-Forward Recommendation

Use a scenario-first form:

- State picker.
- Purpose segmented control.
- First home buyer segmented control.
- Savings currency input.
- Optional property price input.
- Capitalise purchase costs switch with a small explanation path.

## Paper Prompt Status

Use `docs/mobile-ui/06-new-property-paper-goal-prompt.md` for the next Paper pass.
