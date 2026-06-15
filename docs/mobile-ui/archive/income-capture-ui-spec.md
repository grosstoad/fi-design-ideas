# Income Capture UI Spec

## Goal

Design a borrower-facing income-capture step for FundIQ across mobile and desktop.

The income step should feel like a focused product workflow, not a blank empty state or a stretched calculator. Most borrowers are expected to have employment income, so the first screen should immediately let them enter employment income.

## Flow Position

Income is step 2 in the broader borrowing-power flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

Desktop should include an elegant left-side wayfinder for these steps. Mobile can use compact step progress.

## Core UX Model

The income entry state is not a bare empty state. It is an employment-first capture surface.

The borrower should be able to start entering employment income immediately when they land on the Income step.

Direct actions:

- Add employment income
- Add other income

Do not use a generic "Add income" chooser that then asks the borrower to choose employment vs other income.

## Mobile States

Required mobile states:

1. Employment-first entry state
2. Add/edit employment income sheet
3. Add/edit other income sheet
4. Completed/review state
5. Validation treatment for missing required fields

No separate saved partial/in-progress state is needed. Unsaved entry is just the active entry state.

## Entry State

When the borrower lands on Income, show an inline employment-income capture surface.

Visible fields/actions:

- Employment arrangement:
  - Full-time
  - Part-time
  - Contract
  - Casual
- Employer name
- Base salary
- Frequency, defaulted to Yearly but editable
- Bonus + frequency
- Overtime + frequency
- Commission + frequency
- Allowances + frequency

Start date should be explored as optional, not assumed mandatory:

- Create one variant without start date.
- Create one variant with start date visible.

Primary action:

- Save employment income

Secondary/direct actions:

- Add employment income
- Add other income

## Employment Income Sheet

Clicking Add employment income or editing an existing employment income opens an employment-specific sheet directly.

Fields:

- Employment arrangement
- Employer name
- Optional start date variant
- Base salary
- Frequency
- Bonus + frequency
- Overtime + frequency
- Commission + frequency
- Allowances + frequency

The sheet should use the same field model as the entry state. It should be used for additional employment income and editing existing employment income.

## Other Income Sheet

Clicking Add other income opens an other-income-specific sheet directly.

Fields:

- Other income type
- Amount
- Frequency

Do not include rental income anywhere. Rental income belongs in the property step and should not appear or be explained in the income UI.

Do not include:

- Notes for lender review
- Borrower-facing non-taxable income toggle

If non-taxable behavior is needed later, represent it through income type or system-derived logic.

## Frequency Rule

Every amount field must show its frequency or basis in the same visual group.

Examples:

- Base salary + Yearly
- Bonus + Yearly
- Overtime + Monthly
- Commission + Yearly
- Allowances + Fortnightly
- Other income amount + Monthly

Do not hide frequency in a later step.

## Completed State

After saving, show a clear review state.

Must show:

- Gross annual income
- Employment income card or row
- Other income card or row if present
- Clear Edit action on each income source
- Add employment income
- Add other income
- Continue

Employment summary should show:

- Employer name
- Employment arrangement
- Annualized base salary
- Bonus, overtime, commission, and allowances if added
- Gross annual income for that income source

Other income summary should show:

- Income type
- Amount/frequency
- Annualized contribution

Other income capture should not ask for a separate source or description field in the core mobile flow. Use only income type, amount, and frequency unless a future lender-specific rule requires more.

Employment components are base salary, bonus, overtime, commission, and allowances. Do not add shift/penalty rates or separate car allowance rows unless the serviceability data model explicitly adds them.

If HECS/HELP is captured in this step, present it as one optional `HECS/HELP balance` amount field. Do not ask a yes/no question first.

## Validation

Validation should only appear when the borrower tries to save or continue with missing required information.

Likely required employment fields:

- Employment arrangement
- Employer name
- Base salary
- Base salary frequency

Likely required other income fields:

- Income type
- Amount
- Frequency

Validation should be inline, plain-language, and specific.

Examples:

- Enter employer name
- Enter base salary
- Choose a frequency
- Choose an income type

## Desktop Direction

Desktop should not be a wide stretched version of mobile.

Use a centered, reasonably narrow experience within the desktop viewport:

- Left: elegant wayfinder for the broader flow
- Middle: focused income experience
- Optional right-side helper/summary only if useful
- Generous whitespace on both sides
- Do not stretch form fields across the full width

The desktop should feel like a refined application page in a browser, not a huge dashboard.

The wayfinder should include:

- You
- Income
- Properties
- Liabilities
- Expenses
- New property
- Results

## Design Style

- Borrower-facing plain language
- Consistent sans typography
- No unexplained mono/debug labels
- Clean, calm, product-focused UI
- Buttons and chips should feel deliberate and consistent
- Prefer direct actions over generic chooser flows

## Recommended Direction

Take forward:

- Mobile: employment-first inline entry plus direct sheets
- Desktop: centered narrow layout with left wayfinder
- Employer name visible by default
- Start date explored as optional rather than mandatory
- Gross annual income prominent in completed state

## Paper MCP Goal For Five Variations

/goal Use Paper MCP to create five refined UI variations for the FundIQ income-capture step using this spec.

Create the screens near the existing income-capture Paper area.

Use the income-capture spec below as the source of truth.

Spec:

- Income is step 2 in this broader flow:
  1. You
  2. Income
  3. Properties
  4. Liabilities
  5. Expenses
  6. New property
  7. Results
- The income entry state must not be a bare empty state.
- Entry should immediately show an employment-income capture surface.
- Assume most borrowers have employment income.
- Employment arrangement options:
  - Full-time
  - Part-time
  - Contract
  - Casual
- Entry fields:
  - Employer name
  - Base salary
  - Frequency, default Yearly but editable
  - Bonus + frequency
  - Overtime + frequency
  - Commission + frequency
  - Allowances + frequency
- Explore start date as optional:
  - At least one variation without start date
  - At least one variation with start date visible
  - At least one variation where start date is hidden until edit/details
- Every amount field must show frequency/basis in the same visual group.
- Add employment income opens an employment-income sheet directly.
- Add other income opens an other-income sheet directly.
- Do not use a generic Add income chooser.
- Other income sheet fields:
  - Other income type
  - Amount
  - Frequency
- Do not include rental income anywhere.
- Do not include Notes for lender review.
- Do not include a borrower-facing non-taxable income toggle.
- Completed state must show:
  - Gross annual income
  - Employment income summary
  - Other income summary if present
  - Clear Edit actions
  - Add employment income
  - Add other income
  - Continue
- Employment summary should show employer, arrangement, annualized base salary, added bonus/overtime/commission/allowances, and gross annual income.
- Other income summary should show income type, amount/frequency, and annualized contribution.

Mobile deliverables:

- Create 5 distinct mobile variations.
- Each variation should include:
  - Employment-first entry state
  - Add/edit employment income sheet
  - Add/edit other income sheet
  - Completed/review state
  - Validation treatment for missing required fields
- Explore different mobile patterns:
  - Compact form
  - Sectioned form
  - Review-card form
  - Progressive rows
  - Bottom sticky gross-income summary

Desktop deliverables:

- Create 5 matching desktop variations.
- Do not create stretched wide dashboards.
- Use a centered, reasonably narrow desktop experience.
- Include an elegant left-side wayfinder with:
  - You
  - Income
  - Properties
  - Liabilities
  - Expenses
  - New property
  - Results
- Main content should sit in the middle with generous whitespace on both sides.
- Optional right-side helper/summary only if useful.
- Adapt the same income model thoughtfully for desktop instead of copying mobile screens.
- Explore different desktop patterns:
  - Narrow centered form
  - Left wayfinder + middle form + right gross-income summary
  - Ledger/review rows
  - Sectioned accordions
  - Review-first dashboard with focused edit panel

Output:

- Paper artboards/screens for all 5 mobile variations and 5 matching desktop variations.
- A short written recommendation.
- Mention which variation should be taken forward and why.
- Explicitly state whether start date should stay visible, stay optional, or be hidden in the default entry state.
