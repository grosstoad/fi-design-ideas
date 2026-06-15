# Borrowing Power Results Page Plan

## Goal

Create a polished FundIQ results page that appears after a user clicks **Calculate my purchasing power** on the landing page. For this MVP, the landing page CTAs will route to `/assessment`, and `/assessment` will become the borrowing power results page.

The page should feel like a natural continuation of the current landing page aesthetic: quiet, precise, cream/white surfaces, soft borders, restrained shadows, useful charts, and dense-but-readable financial detail.

## Core User Story

As a property buyer, I want to adjust my purchase scenario and immediately understand:

- My maximum purchase price by lender.
- Which lender gives me the strongest purchase outcome.
- How my savings are used across property price, stamp duty, fees, and setup costs.
- Whether I still have cash left after the purchase.

This is a results page, not a marketing page. It should lead with useful outputs and let the user manipulate assumptions without feeling like they have entered a heavy calculator.

## Route And Entry

- Use existing route: `/assessment`.
- Update all landing page **Calculate** CTAs that already point to `/assessment` to land on this new results experience.
- The existing old assessment/share-card page can be replaced for now.
- Keep a simple nav back to `fundiq` home.

## Page Layout

### Desktop Composition

Use a centered page container with a maximum width around `1180-1240px`.

Top-level structure:

1. Header/nav
2. Results hero summary
3. Purchase scenario controls
4. Main results grid
5. Explanation/assumptions strip or compact note

### Header

Keep the current FundIQ landing-page nav language:

- Left: `fundiq`
- Right: small links like `How it works`, `Learn`, `Contact`, and a primary action such as `Recalculate`

The header should not feel like a different product from the landing page.

### Results Hero Summary

Purpose: orient the user quickly.

Suggested content:

- Eyebrow: `Your result`
- H1: `You can buy up to $3.10M`
- Supporting copy: `Best result from Macquarie Bank, based on your purchase scenario.`
- Small metrics row:
  - `Best lender: Macquarie`
  - `Available funds: $3.56M`
  - `Remaining cash: $290K`

Keep this section compact. The charts and controls are the main experience.

## Purchase Scenario Controls

Place this in a full-width panel directly below the hero summary.

### Required Inputs

1. **Savings amount**
   - Numeric input.
   - Default: `$3,560,000`.
   - Format as currency while preserving editability.
   - Helper text: `Cash available for deposit and purchase costs.`

2. **State**
   - Select or segmented dropdown.
   - Default: `NSW`.
   - Options: `NSW`, `VIC`, `QLD`, `SA`, `WA`, `TAS`, `ACT`, `NT`.
   - Helper text: `Used for stamp duty and purchase cost assumptions.`

3. **Loan purpose**
   - Segmented control matching the reference.
   - Options:
     - `Owner occupied`
     - `Investment`
   - Default: `Owner occupied`.

4. **Capitalise purchase costs**
   - Switch matching the reference.
   - Label: `Capitalise purchase costs`
   - Helper text: `Roll stamp duty and fees into the loan amount.`
   - Default: off.

### Control Layout

Desktop:

- Row 1: Savings amount, State, Loan purpose.
- Row 2: Capitalise purchase costs switch spanning full width.

Mobile:

- Stack all controls vertically.
- Segmented controls should remain tappable and not overflow.

### Interaction Rules

For this MVP, controls can update local UI state and lightly adjust displayed values, but do not need a real lender engine.

Minimum expected interactions:

- Savings amount is editable.
- State changes selection.
- Loan purpose toggles between the two options.
- Capitalise purchase costs switch toggles on/off.
- Updated values should not break chart layout.

Nice-to-have if quick:

- If savings amount changes, update `Available funds` in the funds chart and summary.
- If capitalise purchase costs is on, show a small badge/note explaining that upfront cash required is lower but loan amount is higher.

## Main Results Grid

Use a two-column grid on desktop:

- Left: **Max purchase price by lender**
- Right: **Funds to complete**

On narrower screens, stack charts vertically.

## Chart 1: Max Purchase Price By Lender

This should reuse the landing page’s lender-comparison aesthetic but become a richer results chart.

### Content

Title: `Max purchase price by lender`

Subtitle: `Compare estimated property budgets across lenders`

Headline value: `$3.10M`

Caption: `Best result from Macquarie Bank`

Lenders:

- Macquarie: `$3.10M`
- CBA: `$2.92M`
- NAB: `$2.78M`
- Westpac: `$2.64M`
- ANZ: `$2.48M`
- ING: `$2.32M`
- Bankwest: `$2.12M`
- Bendigo: `$1.98M`

### Visual Style

Use vertical bars similar to the reference:

- Rounded top corners.
- Soft muted colours, not a rainbow.
- Macquarie should stand out with the strongest blue.
- Other bars can use muted sand, clay, blue-grey, sage, and warm neutrals.
- Labels below each bar.
- Values can appear on hover or as small labels if the layout remains clean.

### UX Details

- Highlight the best lender with a subtle badge or darker bar.
- Use tooltip on hover/focus with lender name and value.
- Keyboard focus should reveal the same information if feasible.
- Avoid gridlines unless needed; the chart should feel editorial and clean.

## Chart 2: Funds To Complete

This chart explains where the buyer’s funds go.

### Content

Title: `Funds to complete`

Subtitle: `What you need to complete this purchase`

Stacked bar categories:

- Property price: `$3,100,000`, `94.8%`
- Stamp duty: `$125,300`, `3.8%`
- Transfer + legal fees: `$29,300`, `0.9%`
- Lender fees + setup: `$18,400`, `0.6%`

Summary metrics:

- Funds required: `$3.27M`
- Available funds: `$3.56M`
- Remaining cash: `$290K | 8%`

### Visual Style

- Use a horizontal stacked bar.
- The largest property price segment should be a deep muted blue.
- Cost segments should be muted clay, sand, and sage.
- Legend rows should include coloured dots, label, amount, and percentage.
- Bottom metric row should be separated by a thin divider.

### UX Details

- If `Capitalise purchase costs` is toggled on, the chart can visually note:
  - `Purchase costs capitalised`
  - `Upfront funds required reduced`
- If savings amount is changed, update available funds and remaining cash.
- If remaining cash becomes negative, show it in a restrained warning style.

## Page Visual Language

Reuse the FundIQ landing page aesthetic:

- Background: off-white/cream.
- Cards: white or near-white panels.
- Borders: `#d8d8d0` style soft grey.
- Radius: around `8-10px`.
- Shadows: subtle, used for key cards only.
- Typography: same landing-page font stack and weight.
- Avoid large decorative hero treatments.
- Keep spacing compact and deliberate.

Do not make this feel like a generic dashboard. It should feel like a premium financial result report.

## Component Plan

Likely components:

- `ResultsPage`
- `ScenarioControls`
- `SavingsInput`
- `StateSelect`
- `LoanPurposeToggle`
- `CapitaliseCostsSwitch`
- `LenderPurchaseChart`
- `FundsToCompleteChart`
- `MetricSummary`

Implementation can live in `src/pages/AssessmentPage.jsx` for the MVP, with CSS in `src/styles.css` under a new namespace such as `.results-page`.

## State Model

Initial state:

```js
{
  savingsAmount: 3560000,
  state: "NSW",
  loanPurpose: "owner-occupied",
  capitalisePurchaseCosts: false
}
```

Derived values:

```js
fundsRequired = propertyPrice + stampDuty + transferLegalFees + lenderFees
availableFunds = savingsAmount
remainingCash = availableFunds - fundsRequired
remainingCashPercent = remainingCash / availableFunds
```

For MVP chart values, lender outputs can be static unless we decide to add light sensitivity later.

## Accessibility Requirements

- All inputs must have visible labels.
- Segmented controls must use buttons with `aria-pressed`.
- Switch must use a button with `role="switch"` and `aria-checked`.
- Charts need text equivalents:
  - Lender chart can include hidden list of lender values.
  - Funds chart can include visible legend with amounts and percentages.
- Hover-only information should also be accessible by focus.

## Acceptance Criteria

- Clicking **Calculate my purchasing power** from the landing page opens the results page.
- User can edit savings amount.
- User can change state.
- User can switch loan purpose.
- User can toggle capitalise purchase costs.
- Page displays a lender max purchase chart.
- Page displays a funds to complete chart.
- Layout works cleanly at 1440 desktop.
- Mobile stacks controls and charts without overlap.
- Styling feels consistent with the current FundIQ landing page.
- Build passes with `npm run build`.

## Open Design Decisions

- Whether `/assessment` should remain the route long term, or whether we later rename to `/results`.
- Whether chart values should stay static for this MVP or update based on user inputs.
- Whether advanced assumptions should be a modal on this page, similar to the reference image.
- Whether lender logos should appear in this result page chart or only plain names.

