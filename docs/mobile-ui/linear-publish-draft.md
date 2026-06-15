# Fundora Mobile Assessment UI Specs

This Linear document is the index for the canonical Fundora mobile assessment UI specs.

Source of truth lives in the repo under `docs/mobile-ui/`. The archived prompts and planning notes in `docs/mobile-ui/archive/` are reference material only and should not be treated as canonical.

## Canonical Flow

1. About You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New Property
7. Results

There is no separate Review step. The canonical flow goes from New Property directly to Results.

## Important Product Decisions

- No separate Review step. Flow goes New Property -> Results.
- HECS/HELP is captured in the Income UI as `HECS/HELP balance`.
- Properties and Liabilities can be skipped by continuing without adding rows.
- Expenses can continue when at least 3 categories have amounts entered, or when total monthly expenses are greater than `$0`.
- Do not show suggested expenses in the UI.
- Do not show a low-confidence expenses warning.
- Do not show an aggregate liability total in the UI.
- Closing-before-settlement is not MVP.
- New Property includes desired property price, selected state, first home buyer, and capitalise purchase costs.
- Results is max purchase price by lender first.
- Results lender detail requires weekly repayment, interest rate, comparison rate, loan amount, and LVR.
- Funds-to-complete is secondary, not first-class on the first Results screen.
- Avoid `comfortable number` messaging.

## 1. About You

Canonical source: `docs/mobile-ui/01-about-you-spec.md`

Purpose: Capture applicant count, relationship or marital status, dependants, and residential postcode with the least possible friction.

Scope:

- One applicant or two applicants.
- One-applicant marital status: `Single` or `Couple`.
- Two-applicant relationship: `Couple` or `Not couple`.
- Dependants: `0`, `1`, `2`, `3`, `4+`.
- Residential postcode as a numeric Australian postcode input.

Key decisions:

- About You is the visual scaffold for the rest of the Fundora mobile input flow.
- Use `Couple`, not `Married/couple`.
- Two applicants who are a couple share one residential postcode for MVP.
- Two applicants who are not a couple stay on one continuous screen with applicant-specific fields.
- Do not include dependant ages, suburb lookup, suburb confirmation, address lookup, or separate postcode-only pages.
- Postcode validation happens inline on the full About You screen.

Required mobile states:

- One applicant, single.
- One applicant, couple.
- Two applicants, couple.
- Two applicants, not couple top position.
- Two applicants, not couple lower scroll position.
- Dependants `4+` selected.
- Postcode focused with numeric keyboard.
- Required-field validation.
- Invalid postcode validation.
- Keyboard dismissed with CTA restored.

## 2. Income

Canonical source: `docs/mobile-ui/02-income-spec.md`

Purpose: Capture employment income and other income in a compact workflow that is fast to enter and easy to review.

Scope:

- Income sources belong to an applicant, but the mobile UI is organized around income sources.
- Employment income fields include applicant, employer, employment arrangement, base income and frequency, optional bonus/overtime/commission/allowances, and HECS/HELP balance.
- Other income fields include applicant, income type, amount, and frequency.

Key decisions:

- Use an income-source flow with applicant assignment.
- Show direct actions for `Add employment income` and `Add other income`; do not use a generic `Add income` chooser.
- For two applicants, every add/edit flow includes an applicant selector.
- For one applicant, hide the selector or show ownership only as quiet context.
- Show one primary total: household gross annual income.
- Applicant subtotals may appear only as secondary context in saved review groups.
- HECS/HELP stays in Income as a single `HECS/HELP balance` amount field; blank or `$0` means none.
- Do not include rental income; rental income belongs in Properties.
- Do not include borrower-facing taxable/non-taxable toggles.

Required mobile states:

- First visit / employment-first entry.
- Add employment income sheet.
- Add other income sheet.
- Saved review grouped by applicant where useful.
- Edit existing source.
- Employer name focused with text keyboard.
- Base income focused with numeric/currency keyboard.
- Frequency picker open.
- Applicant selector open for two-applicant flow.
- Optional employment components expanded.
- Validation states.
- Very large income value layout check.

## 3. Properties

Canonical source: `docs/mobile-ui/03-properties-spec.md`

Purpose: Capture existing owned properties, rental income and property expenses for investment properties, and the home loans secured against each property.

Scope:

- Existing properties only. New purchase assumptions belong in New Property.
- Each property can have zero or more attached home loans.
- Rental income and property expenses appear only for investment properties.
- Existing home loans are captured inside the relevant property record and should not be re-entered in Liabilities.

Key decisions:

- Use a property-first model: add a property, then add home loans attached to it.
- Borrowers can continue without adding existing property.
- Borrowers can save an unencumbered property with no loans.
- Use postcode as the low-friction property location input for MVP.
- Use `Owner occupied` and `Investment` as property purpose choices.
- One applicant stores `Applicant 1 owns 100%`; two applicants default to `Joint` with `Applicant 1` and `Applicant 2` as alternatives.
- Do not require property type in the default path.
- Do not show net property equity as a hero total.
- Do not offer `Add loan split` as an isolated review-screen CTA.

Required mobile states:

- No existing property.
- Add property sheet.
- Add home loan sheet.
- Saved review.
- Long list with multiple properties and multiple loans.
- Edit property.
- Edit home loan.
- Delete property confirmation.
- Delete home loan confirmation.
- Property value, postcode, rental income, and loan amount keyboard states.
- Purpose, ownership, loan purpose, and lender picker states.
- Validation states.

## 4. Liabilities

Canonical source: `docs/mobile-ui/04-liabilities-spec.md`

Purpose: Capture non-property liabilities in a type-specific borrower UI.

Scope:

- Credit card.
- Personal loan.
- Car loan.
- Overdraft.
- Novated lease.
- Margin loan.
- Other commitment.

Key decisions:

- Liabilities are application-level commitments in the default mobile flow.
- Existing home loans belong in Properties, not Liabilities.
- HECS/HELP belongs in Income, not Liabilities.
- Use a type-first model so each liability type shows only relevant fields.
- Do not include tax debt / ATO payment plan, child support / maintenance, BNPL/store finance, or generic lease / hire purchase as separate choices in this UI pass.
- Do not include closing-before-settlement in MVP.
- Do not require interest rate, remaining term, existing lender, or account owner.
- Do not show repayment amounts or frequencies in saved review rows.
- Do not show an aggregate liability total in the UI.

Required mobile states:

- Empty liabilities state.
- Liability type picker open.
- Add credit card sheet.
- Add personal loan sheet.
- Add car loan sheet.
- Add overdraft sheet.
- Add margin loan sheet.
- Add novated lease sheet.
- Add other commitment sheet.
- Numeric keyboard states for limits, balances, and repayments.
- Frequency picker open.
- Saved review with several liabilities.
- Validation states.
- Remove liability confirmation.

## 5. Expenses

Canonical source: `docs/mobile-ui/05-expenses-spec.md`

Purpose: Capture household living expenses and recurring costs that affect serviceability but are not already captured in Income, Properties, or Liabilities.

Scope:

- Household/application-level expenses.
- Compact category model, not a full budgeting taxonomy.
- Monthly normalized totals.

Recommended categories:

- Groceries and household.
- Utilities and bills.
- Transport.
- Insurance.
- Health and medical.
- Childcare and education.
- Recreation and personal.
- Rent or board.
- Other regular expenses.

Key decisions:

- Do not assign everyday expenses to individual applicants in the default mobile flow.
- Do not double-count items already captured in earlier steps.
- Do not show suggested expenses.
- Do not show a low-confidence warning.
- Continue is allowed when at least three categories have amounts entered, or total monthly expenses are greater than `$0`.
- Income and Expenses are the only input screens that should show a prominent total.
- Rent or board is conditional and visually separate from everyday living expenses.
- Childcare and education should be prominent when dependants exist.

Required mobile states:

- Direct-edit category entry with all categories visible.
- Category review with generated category icons.
- Category row amount and frequency editing.
- Edit category bottom sheet.
- Amount focused with numeric keyboard.
- Frequency picker open.
- Rent or board enabled.
- Childcare and education prominent for dependants.
- Single-applicant copy.
- Two-applicant together copy.
- Two-applicant not-couple household/application copy.
- User-edited expenses.
- Validation for missing amount.
- Dense category review stress state.

## 6. New Property

Canonical source: `docs/mobile-ui/06-new-property-spec.md`

Purpose: Capture the target purchase assumptions that affect stamp duty, loan purpose, deposit use, and results.

Scope:

- Buying state or territory.
- Purchase purpose.
- Savings or deposit available.
- Desired property price.
- First home buyer status.
- Capitalise purchase costs.

Key decisions:

- New Property is separate from Properties, which only captures properties the borrower already owns.
- The first screen should feel like a purchase scenario, not a calculator settings page.
- State is required because stamp duty and purchase costs vary by jurisdiction.
- The user must select state explicitly; do not default from About You postcode.
- Use `Savings for deposit and costs` as the savings label.
- Include desired property price.
- Include first home buyer status.
- Include capitalise purchase costs with plain trade-off helper copy.

Required mobile states:

- Resting state.
- State picker open.
- Savings focused with numeric keyboard.
- Desired property price focused with numeric keyboard.
- Owner occupied selected.
- Investment selected.
- First home buyer selected and unselected.
- Capitalise purchase costs selected and unselected.
- Missing state validation.
- Missing savings validation.
- Stamp duty or purchase-cost recalculation.

## 7. Results

Canonical source: `docs/mobile-ui/07-results-spec.md`

Purpose: Show max purchase price by lender, let the user inspect lender detail, and provide funds-to-complete as a secondary path.

Scope:

- Maximum purchase price.
- Best lender.
- Lender comparison list.
- Scenario assumptions.
- Lender detail rows.
- Funds to complete as secondary path.

Key decisions:

- The first-class result is max purchase price by lender.
- Do not introduce a separate `comfortable` number or range.
- If the UI shows a range, it should be the lender result spread.
- Use a compact lender list instead of a dense chart.
- Supported first-pass lenders: Macquarie, CBA, NAB, Westpac, ANZ, ING.
- Assumptions are editable from Results in a focused panel or sheet.
- Changing assumptions should show a lightweight recalculating state with stable layout and skeleton lender rows.
- Funds-to-complete is secondary, not first-class on the first Results screen.

Required lender detail rows:

- Weekly repayment.
- Interest rate.
- Comparison rate.
- Loan amount.
- LVR.

Required mobile states:

- Results loaded.
- Lender selected.
- Lender detail rows.
- Assumptions editing.
- Savings focused with numeric keyboard.
- Desired property price focused with numeric keyboard.
- State picker open.
- Recalculating.
- Calculation failed or unavailable.
- Long lender-list scroll state, if more lenders are shown.
- Secondary funds-to-complete entry point.

## Recommended Linear Placement

Preferred placement is a project document if a relevant FUN project exists, such as:

- Fundora Mobile Assessment.
- Borrowing Power Flow.
- Mobile UI.

If no relevant project exists, create or use a team-friendly project for this work and attach this as the main project document.

Recommended document title:

`Fundora Mobile Assessment UI Specs`

Recommended child documents, if Linear project docs support the preferred structure:

- `Fundora Mobile UI Spec: About You`
- `Fundora Mobile UI Spec: Income`
- `Fundora Mobile UI Spec: Properties`
- `Fundora Mobile UI Spec: Liabilities`
- `Fundora Mobile UI Spec: Expenses`
- `Fundora Mobile UI Spec: New Property`
- `Fundora Mobile UI Spec: Results`

If a single-document structure is preferred, use this document as the full project spec index and keep links/references to the canonical repo files.
