# Income Spec

## Purpose

Design the mobile Income step for the borrowing-power flow.

The screen should feel like a compact financial product workflow: fast to enter, easy to review, and never like a verbose bank calculator.

## Inputs And Scope

Income belongs to an applicant, but the mobile UI should be organized around income sources.

Supported source types:

- Employment income
- Other income

Supported applicants:

- One applicant
- Two applicants

Employment income fields:

- Applicant
- Employer name
- Employment type: full-time, part-time, contract, casual
- Base income + frequency
- Bonus + frequency
- Overtime + frequency
- Commission + frequency
- Allowances + frequency
- HECS/HELP balance

Other income fields:

- Applicant
- Income type
- Amount + frequency

Do not include:

- Start date
- Industry
- Occupation
- Employer ABN
- Notes for lender review
- Rental income
- Source field for other income
- Borrower-facing taxable or non-taxable toggles

HECS/HELP is captured in Income from a UI perspective. Keep it alongside employment income as a single `HECS/HELP balance` amount field. Do not use a yes/no toggle; a blank or `$0` balance means none.

Paper references:

- Employment income with HELP treatment: https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0/XZ1-0
- Filled state with total treatment: https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0/Y93-0

## Core Product Decisions

Use an income-source flow with applicant assignment.

The first screen should make employment income feel immediately available, but it should not say `Add Applicant 1 employment income`. Use a compact inline employment composer or an employment-first source area with an applicant selector defaulting to Applicant 1.

Primary actions:

- Add employment income
- Add other income

There should be no generic `Add income` chooser.

For two applicants, every add/edit flow must include an applicant selector at the top. For one applicant, hide the selector or show applicant ownership only as quiet context.

## Gross Annual Total Decision

On mobile, show one primary total: household gross annual income.

Use `Gross annual income` as the main number in the header, sticky summary, or review area. Avoid an always-visible three-total block for Applicant 1, Applicant 2, and Household.

Applicant subtotals are allowed only as secondary context when reviewing saved income sources. For example, a small `Subtotal $120,000` in an Applicant 1 group header is acceptable, but it should not compete with the household gross annual total.

Rationale:

- Mobile space is tight.
- The user needs confidence that the total has updated.
- Applicant grouping matters for review, but not enough to dominate every state.
- A single total keeps the screen from reading like a spreadsheet.

## State Model

### 1. First Visit / Employment-First Entry

Show a compact Income screen with:

- Mobile step progress
- Page title: `Income`
- One prominent `Gross annual income` total once income has been added; the empty first-visit state does not need to show `$0`.
- A compact employment-first composer
- Applicant selector defaulted to Applicant 1 if two applicants exist
- Direct action to add employment income
- Direct action to add other income
- Continue button requires at least one income source

The employment composer may be inline, but keep it deliberately small. It should not expose every optional pay component before the user has committed to the source. A good first-entry pattern is:

- Applicant selector
- Employment type
- Employer name
- Base income + frequency
- `Add bonus, overtime, commission or allowances` disclosure
- `HECS/HELP balance` field
- Save employment income

### 2. Add Employment Income

Use a bottom sheet or full-height mobile sheet.

Required layout:

- Sheet title: `Employment income`
- Applicant selector at the top for two-applicant flows
- Employer name
- Employment type segmented control
- Base income + frequency in the same visual group
- Optional employment components:
  - Bonus + frequency
  - Overtime + frequency
  - Commission + frequency
  - Allowances + frequency
- HECS/HELP balance
- Save action

Optional employment components means bonus, overtime, commission, and allowances. Hide them behind a disclosure by default so the base employment flow stays compact. HECS/HELP should remain available in the employment-income form alongside these fields.

Do not split base, bonus, overtime, commission, and allowances into separate saved income sources. They are components of one employment source.

### 3. Add Other Income

Use a bottom sheet or full-height mobile sheet.

Required layout:

- Sheet title: `Other income`
- Applicant selector at the top for two-applicant flows
- Income type
- Amount + frequency in the same visual group
- Save action

Recommended income type options:

- Investment income
- Interest income
- Government income
- Maintenance income
- Other

Do not include rental income. Rental income belongs in the Properties step.

Do not include a non-taxable toggle. If needed later, taxable treatment should be inferred from income type or handled by system mapping.

### 4. Saved Review

After at least one source is saved, the page becomes a compact review state.

Show:

- One prominent household gross annual total
- Saved income sources grouped by applicant
- Small applicant subtotal only inside applicant group headers if helpful
- Employment source rows
- Other income source rows
- Edit action on each source
- Add employment income
- Add other income
- Continue

Source rows should be concise.

Employment row content:

- Employer name
- Employment type
- Annualized gross amount for that source
- Small details line only if components exist, such as `Base, bonus, allowances`

Other income row content:

- Income type
- Amount/frequency
- Annualized contribution

Avoid showing every component in the review row by default. Use detail only when it helps distinguish sources.

For review rows, show the entered amount/frequency on the left-side detail line and the annualized gross contribution on the right. For example, `Investment income` with `$450 monthly` on the detail line and `$5,400` on the right. For employment rows, show the employer name and employment arrangement, with the annualized gross contribution on the right.

### 5. Edit Existing Source

Editing opens the same sheet used to add the source, prefilled.

The applicant can be changed only if the product model allows reassignment. If reassignment creates calculation or audit complexity, keep applicant locked in edit mode and require deleting/re-adding for rare corrections.

Allow reassignment in edit mode for MVP, most likely through the same applicant segmented control used in add mode. It is expected to be uncommon, but it should be possible.

### 6. Validation

Validation should appear only after save or continue is attempted.

Employment validation:

- Choose applicant, if two applicants exist
- Enter employer name
- Choose employment arrangement
- Enter base income
- Choose base income frequency

Other income validation:

- Choose applicant, if two applicants exist
- Choose income type
- Enter amount
- Choose frequency

Page-level validation:

- At least one income source must be saved before continuing.

Use specific inline errors:

- `Enter employer name`
- `Choose an applicant`
- `Enter base income`
- `Choose a frequency`
- `Choose an income type`
- `Add at least one income`

### 7. Keyboard And Picker States

Required mobile interaction states:

- Employer name focused with text keyboard
- Base income focused with numeric/currency keyboard
- Frequency picker open
- Applicant selector open for two-applicant flow
- Optional employment components expanded
- Missing employer validation
- Missing base income validation
- Very large income value layout check

When the keyboard is open:

- Keep the focused field visible.
- Hide or move any bottom CTA that would collide with the keyboard.
- Keep amount and frequency together.

## Recommended Variations To Explore

Create five mobile variations. Each variation should include first visit, add employment, add other income, saved review, and at least one validation state.

### Variation 1: Inline Starter

Compact inline employment composer on first visit. Best for speed and the user's preferred direction.

### Variation 2: Bottom Sheet First

First screen shows a small employment source area and opens a focused employment sheet immediately from `Add employment income`. Best for consistency.

### Variation 3: Sticky Total

Household gross annual total is sticky near the bottom action area and updates as sources are saved. Best for keeping the total visible without cluttering the form.

### Variation 4: Applicant Group Review

Saved review is grouped by applicant with small subtotals in group headers. Best for two-applicant clarity.

### Variation 5: Progressive Components

Employment sheet starts with base income only and progressively reveals bonus, overtime, commission, and allowances. Best for reducing first-screen density.

## Mobbin Reference Signals

Use Mobbin as directional inspiration, not as something to copy directly.

Reference screens searched:

- Monzo finance flow: https://mobbin.com/screens/42466c81-d177-44ac-a342-0b9bb7aa8d9b
- Affirm finance flow: https://mobbin.com/screens/d4c33225-1747-47b5-8d82-daaf657fb92d
- Chime finance flow: https://mobbin.com/screens/5bf2200d-8486-442a-b7f2-ab9bca3ab3f8
- Acorns finance flow: https://mobbin.com/screens/8c08564c-43a8-48e0-a83b-bce54b9c1eb9
- Acorns finance flow: https://mobbin.com/screens/76b24eef-f14e-45e0-afc3-df877cf500b2
- Rocket Money finance flow: https://mobbin.com/screens/f8e44cf7-4c03-4f09-bef2-d9107a46eb9a

Patterns to borrow:

- Compact headers with one important number.
- Quiet grouped rows rather than card-heavy dashboards.
- Bottom sheets for focused add/edit actions.
- Short labels and restrained helper text.
- One primary action per state.
- Review rows that show enough to verify without becoming verbose.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`

Mobile screens should feel like polished iOS product UI:

- Calm, compact, and scan-friendly.
- User-facing UI only inside phone artboards.
- No state labels or design commentary inside phone screens.
- Use sentence-case labels.
- Use tabular numerals for money.
- Keep controls equal width where choices are short.
- Keep the Continue action anchored near the bottom safe area in resting states.
- Do not overuse cards; use rows, sections, dividers, and quiet grouping.
- Do not use loud gradients, heavy shadows, decorative fintech green, or generic mortgage calculator styling.

## Take-Forward Recommendation

Take forward a hybrid of Variation 1 and Variation 4:

- First visit uses a compact inline employment composer with Applicant 1 selected by default.
- Add/edit flows use reusable sheets.
- Saved review groups income sources by applicant.
- The only prominent total is household gross annual income.
- Applicant subtotals appear only as quiet review context.
