# Funds To Complete Component Spec

## Purpose

`Funds to complete` explains the full funding equation for a property purchase.

It should show:

- The amount components needed to complete the purchase.
- How those amounts are funded by the loan and the buyer's savings.
- Any residual savings left after the purchase, or any shortfall if the funding does not cover the purchase requirement.

This component is not just a cash-needed-at-settlement receipt. It is a complete purchase funding summary.

## Product Definition

Funds to complete means:

> The total purchase requirement, the funding sources used to meet it, and the buyer's leftover savings position.

Use this term consistently for the component title:

- `Funds to complete`

Supporting copy can vary by context:

- `Purchase costs, loan funding and savings left after settlement.`
- `How the purchase is funded, including costs and remaining savings.`
- `Property price, purchase costs, loan amount and savings buffer.`

Avoid defining funds to complete as only:

- Deposit.
- Cash needed to settle.
- Purchase costs only.
- Remaining cash only.

Those are sub-values inside the component, not the whole concept.

## Core User Question

The component should answer:

> What does this purchase cost in total, how is it funded, and how much savings do I still have?

Secondary questions:

- How much of the total is the property price versus purchase costs?
- How much is covered by the loan?
- How much savings are used?
- Will I have savings left over after settlement?
- If purchase costs are capitalised, which costs moved from savings into the loan?

## Required Sections

### 1. Purchase Requirement

Show all calculated amount components needed for the purchase.

Required rows:

- Property price.
- Stamp duty.
- Transfer, registration and legal fees.
- Lender fees and setup costs.

Conditional rows:

- LMI, if applicable.
- Government fees, if split separately from stamp duty.
- Other purchase costs, if calculated separately.
- Debt payout at settlement, if supported later.

Each row should include:

- Label.
- Amount.
- Optional percentage of total purchase requirement.

The property price will usually dominate the total. Keep percentages useful but do not let the property price visually erase smaller cost rows.

### 2. Funding Sources

Show how the purchase requirement is funded.

Required rows:

- Loan amount.
- Savings used.

Conditional rows:

- Grant or contribution.
- Equity released or sale proceeds.
- Capitalised purchase costs, if shown as a funding treatment.

`Savings used` means the portion of the buyer's available savings applied to the purchase. It is not the same as total savings available.

### 3. Savings Position

Show the resulting savings outcome.

Required rows:

- Available savings before purchase.
- Savings used.
- Residual savings.

If funding is insufficient, show:

- Shortfall.

Residual savings is an outcome, not a purchase cost.

## Calculation Model

Use these names in specs, prompts and implementation where possible.

```js
purchaseRequirement =
  propertyPrice +
  stampDuty +
  transferLegalFees +
  lenderSetupFees +
  upfrontLmi +
  otherPurchaseCosts

totalFunding =
  loanAmount +
  savingsUsed +
  grantsOrCredits +
  otherFundingSources

residualSavings = availableSavings - savingsUsed

shortfall = Math.max(0, purchaseRequirement - totalFunding)
surplusFunding = Math.max(0, totalFunding - purchaseRequirement)
```

`totalFunding` should reconcile to `purchaseRequirement` unless the scenario intentionally shows a shortfall or surplus.

If the buyer has enough savings:

```js
savingsUsed = purchaseRequirement - loanAmount - grantsOrCredits - otherFundingSources
residualSavings = availableSavings - savingsUsed
```

If the buyer does not have enough savings:

```js
savingsUsed = availableSavings
shortfall = purchaseRequirement - loanAmount - grantsOrCredits - otherFundingSources - availableSavings
residualSavings = 0
```

## Capitalised Purchase Costs

Capitalised purchase costs are still part of the purchase requirement.

The component should show that capitalisation changes the funding source, not whether the cost exists.

When purchase costs are capitalised:

- Keep the relevant purchase cost rows visible under Purchase Requirement.
- Increase or annotate the loan amount as covering capitalised costs.
- Reduce savings used where appropriate.
- Add a plain-language note: `Some purchase costs are added to the loan instead of paid from savings.`

Possible display rows:

- Loan amount.
- Includes capitalised costs.
- Savings used.
- Residual savings.

Do not hide stamp duty or fees just because they are capitalised.

## LMI Treatment

If LMI applies, show it based on how it is funded:

- If paid upfront, show LMI under Purchase Requirement and fund it from savings.
- If capitalised, show LMI under Purchase Requirement and annotate the loan amount as including capitalised LMI.
- If not applicable, omit the row.

Do not bury LMI in a generic fees row if the calculation model can identify it.

## Default Visual Model

Use a two-sided funding equation rather than a pure cost chart.

Recommended structure:

1. Header:
   - Title: `Funds to complete`.
   - Summary value: total purchase requirement.
   - Supporting line explaining loan, savings and residual savings.

2. Purchase requirement:
   - Stacked bar or compact row list showing property price and purchase costs.
   - Rows include label, amount and optional percentage.

3. Funding sources:
   - Loan amount and savings used, shown as the sources that fund the requirement.
   - A small equation or paired bars can make this clearer:
     - `Purchase requirement = Loan amount + Savings used + Other funding`

4. Savings outcome:
   - Available savings.
   - Savings used.
   - Residual savings or shortfall.

For compact mobile layouts, use progressive disclosure:

- Closed card shows total purchase requirement, loan amount, savings used and residual savings.
- Open state shows the full row breakdown.

## Mobile Placement

On Results, funds to complete should remain secondary to the max property price answer.

Preferred placement:

- Show the compact card after a lender has been selected.
- Let the user open the full breakdown as a sheet or expanded detail section.
- Keep the selected lender context visible because loan amount and LVR affect the funding equation.

Compact card example:

- Title: `Funds to complete`
- Primary value: `$3.27M purchase requirement`
- Detail line: `$2.55M loan + $720k savings used`
- Outcome line: `$290k savings left`

Full detail example:

- Purchase requirement: `$3.27M`
- Property price: `$3.10M`
- Stamp duty: `$125k`
- Transfer + legal fees: `$29k`
- Lender fees + setup: `$18k`
- Loan amount: `$2.55M`
- Savings used: `$720k`
- Available savings: `$1.01M`
- Residual savings: `$290k`

## Desktop Placement

On desktop, funds to complete can appear beside lender comparison if there is enough space.

The desktop component may use:

- A horizontal stacked purchase requirement bar.
- A funding source bar below it.
- A compact savings outcome strip.

Avoid making the component look like a generic accounting table. It should read as a buyer-friendly explanation of the purchase scenario.

## States

### Healthy Residual Savings

Use when `residualSavings > 0`.

Tone:

- Calm.
- Positive but not celebratory.
- Emphasise the remaining buffer.

Example:

- `Savings left after purchase`
- `$290k`

### Low Residual Savings

Use when residual savings is positive but below the product-defined comfort threshold.

Tone:

- Cautious.
- Not alarmist.

Example:

- `Low savings buffer after purchase`

### Shortfall

Use when `shortfall > 0`.

Tone:

- Clear.
- Restrained warning.

Example:

- `Shortfall to complete`
- `$42k`

Do not show negative residual savings as the primary label. Prefer a positive `Shortfall` amount.

### Recalculating

Use when loan amount, property price, state, savings, purpose or capitalisation changes.

Keep previous values visible if possible, with a small loading state. Avoid blanking the whole component.

## Copy Rules

Use:

- `Purchase requirement`
- `Loan amount`
- `Savings used`
- `Available savings`
- `Residual savings`
- `Savings left`
- `Shortfall`
- `Purchase costs`
- `Capitalised costs`

Avoid:

- `Available funds` when it only means savings.
- `Remaining cash` if the product means savings.
- `Cash needed to settle` as the main definition of funds to complete.
- `Total cost` without clarifying whether loan funding is included.

`Available funds` may be used only if the product has a broader funding model that includes savings, grants, equity and other sources. If the value is just the buyer's savings, call it `Available savings`.

## Accessibility And Formatting

- Currency values should be readable by screen readers.
- Do not rely on colour alone to distinguish costs, funding sources and outcomes.
- Keep row labels visible in the expanded state.
- Ensure small purchase cost rows remain legible even when their percentages are tiny.
- Use consistent currency rounding across rows and totals.
- Include exact values in accessible text or row labels when the visual chart rounds to `$k` or `$M`.

## Design Checks

Before using this component in a design, confirm:

- Property price and purchase costs are all visible.
- Loan amount is shown as a funding source.
- Savings used is distinct from available savings.
- Residual savings is shown as an outcome.
- Shortfall is shown instead of negative savings when the scenario does not fund.
- Capitalised costs remain visible as costs and are also explained as loan-funded.
- The compact state still answers: total requirement, loan, savings used and savings left.
