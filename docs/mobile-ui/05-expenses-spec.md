# Expenses Spec

## Purpose

Design the mobile `Expenses` step for the borrowing-power flow. This step captures household living expenses and a small set of major recurring costs that affect serviceability but are not already captured in Income, Properties, or Liabilities.

The screen should feel like a calm budget check, not a full transaction-categorisation app. Let borrowers enter a clear monthly expense total or category amounts, and make it clear what has already been captured elsewhere.

## Flow Position

Expenses is step 5 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

## Core Product Decisions

### Household-Level Expenses

Do not assign everyday expenses to a person in the default mobile flow. Expenses should be captured at the household/application level.

Rationale:

- Most borrowers think about groceries, bills, transport, childcare, and rent as household costs.
- Applicant allocation adds UI weight without improving the first assessment pass.
- The serviceability layer can map the household total to lender policy later.

### Do Not Double-Count Existing Commitments

Do not ask for expenses that were already captured in earlier steps:

- Existing home-loan repayments belong in `Properties`.
- Rental income and investment property expenses belong in `Properties`.
- Credit cards, personal loans, car loans, tax debts, child support, BNPL/store finance, and other commitments belong outside Expenses.
- HECS/HELP is captured in `Income`.
- Future purchase repayments belong in `New property` or `Results`, not here.

The Expenses step may show a quiet reminder, but it should not ask the borrower to re-enter these items.

### Entry Model

Do not show suggested expenses in the UI. There is no suggested-expense data source for MVP and no low-confidence warning.

The borrower can continue when either:

- At least three categories have amounts entered.
- The total monthly expense amount is greater than `$0`.

Income and Expenses are the only input screens that should show a prominent total.

### Category Model

Use a compact category model, not a full budgeting taxonomy.

Recommended categories:

| Category | Capture | Notes |
| --- | --- | --- |
| Groceries and household | Monthly amount | Food, household basics, everyday supplies. |
| Utilities and bills | Monthly amount | Electricity, gas, water, phone, internet, subscriptions. |
| Transport | Monthly amount | Fuel, public transport, servicing, registration, parking. Do not include car-loan repayments. |
| Insurance | Monthly amount | Health, car, home, contents, life and other premiums. |
| Health and medical | Monthly amount | Out-of-pocket medical, dental, medication, therapy. |
| Childcare and education | Monthly amount | Childcare, school fees, tutoring. Show only if dependants exist, or keep available under `Add category`. |
| Recreation and personal | Monthly amount | Dining out, clothing, fitness, hobbies, pets, personal spending. |
| Rent or board | Monthly amount | Conditional. Ask only if the borrower pays rent or board that will continue during assessment. |
| Other regular expenses | Monthly amount | Catch-all for recurring expenses not captured elsewhere. |

Recommended frequency treatment:

- Show monthly normalized values clearly in summaries and totals.
- Explore direct editing of amount and frequency per category in the entry flow.
- Keep amount and frequency in the same visual group, using compact chips or inline controls so rows remain scannable.
- Default each category to monthly unless a category-specific frequency is selected.

### Applicant Copy Variants

Expenses remain household/application-level by default, but the Paper pass should explore how the screen reads for one applicant versus two applicants.

Explore these copy and grouping treatments:

- Single applicant: `Your expenses`.
- Two applicants together: `Your household expenses` or named household copy once names are known, with one household total.
- Two applicants not in a couple: still use household/application-level expense copy by default, not duplicated applicant groups.

Do not make separated applicant groups the default. Avoid duplicating every category for each applicant.

### Expense Category Icons

Use small generated bitmap icons for category recognition, not generic UI symbols. The icons should be supportive and quiet enough for form rows.

Icon requirements:

- Use the Fundora character-icon system from `CODEX_DESIGN_SYSTEM.md`: thick black ink outline, soft warm matte fills, slightly hand-drawn geometry, transparent background, no enclosing circle, badge, sticker, text, watermark, or shadow-heavy treatment.
- Use the `garthmcrae/lip-service` repo as content/tone reference. The current `main` branch contains semantic Fundora content and tone, not checked-in icon image assets; use it for calm, guided, trade-off-aware wording rather than direct icon copying.
- Generate one transparent PNG per category with `imagegen` when `OPENAI_API_KEY` is available.
- Save generated outputs under `output/imagegen/expense-category-icons/`.
- Use the cleaned alpha-backed versions in `output/imagegen/expense-category-icons/cleaned/` for Paper placement. Keep the original generations as source assets, but do not place baked checkerboard backgrounds in the mobile UI.
- Use icons in Paper sparingly: 24-28px in rows or category chips. Do not make the icon art dominate the form.

Recommended icon subjects:

| Category | Icon subject |
| --- | --- |
| Groceries and household | Grocery bag with one leafy item and a receipt edge. |
| Utilities and bills | Folded bill with a small lightning bolt and Wi-Fi line. |
| Transport | Simple car key and transit card. |
| Insurance | Policy document with a tiny umbrella mark. |
| Health and medical | Small medicine bottle and cross label. |
| Childcare and education | Lunchbox with pencil. |
| Recreation and personal | Coffee cup with small star on a tag. |
| Rent or board | House key with small tag. |
| Other regular expenses | Small clipped note with three dots. |

Imagegen batch prompt specs:

```jsonl
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Groceries and household expenses\nSubject: grocery bag with one leafy item and a receipt edge\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown, tiny muted green only if needed\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Utilities and bills expenses\nSubject: folded bill with a small lightning bolt and a Wi-Fi line\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Transport expenses\nSubject: simple car key and transit card\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Insurance expenses\nSubject: policy document with a tiny umbrella mark\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Health and medical expenses\nSubject: small medicine bottle with a cross label\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown, restrained red only on the cross if needed\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text except the cross mark; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Childcare and education expenses\nSubject: lunchbox with a pencil\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Recreation and personal expenses\nSubject: coffee cup with a small star on a tag\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Rent or board expenses\nSubject: house key with small blank tag\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
{"prompt":"Use case: logo-brand\nAsset type: mobile expense category icon\nPrimary request: Fundora category icon for Other regular expenses\nSubject: small clipped note with three dots\nStyle/medium: small transparent PNG illustration, thick uneven black ink outline, soft warm matte fills, slightly hand-drawn geometry, composed and credible\nComposition/framing: centered object, full object visible, designed to read at 24-28px in a mobile form row\nColor palette: neutral paper, warm gold, muted blue, soft brown\nConstraints: transparent background; no enclosing circle; no badge; no sticker border; no text except three dot marks; no logo; no watermark; no drop shadow; no cute cartoon face\nAvoid: generic flat icon, neon fintech green, glossy app icon, emoji style, detailed scene, stock illustration clutter","size":"1024x1024","quality":"high","background":"transparent","output_format":"png"}
```

## State Model

### 1. Expense Entry

Preferred first screen should show:

- Mobile step progress.
- Page title: `Your expenses`.
- All core expense categories in a direct-edit list.
- A visible monthly total block, using income-style summary language such as `$7,180 monthly total`.
- Per-category amount and frequency controls or chips.
- Direct action:
  - `Continue`
- Optional quiet reminder:
  - `Loan repayments and credit cards are already captured.`

Editing categories should be immediate and obvious rather than hidden behind a secondary path. If direct inline amount/frequency controls feel too dense, use an explicit row affordance such as `Edit`, a chevron, or a focused row state that opens the category sheet.

### 2. Category Review

Show a compact category list with monthly amounts.

Rows should include:

- Category icon.
- Category label.
- Amount.
- Frequency.
- Monthly normalized value if the selected frequency is not monthly.
- A clear edit affordance, unless amount and frequency are directly editable on the row.
- Optional tooltip/info affordance for category definitions. Keep this lightweight: one small info icon per row or a focused popover/sheet, not permanent explanatory copy under every row.

Stable lanes are important:

- Fixed icon lane.
- Flexible label/details lane.
- Fixed amount/frequency lane.
- Fixed edit/action lane.

### 3. Edit Category

Editing a category opens a bottom sheet.

Required layout:

- Sheet title uses the category name, such as `Groceries and household`.
- Amount field.
- Monthly context beside or below the amount.
- Short optional helper text only if useful.
- Save action anchored in the bottom safe area.

Do not show generic filler like `Included in monthly expenses`. Do not ask for notes, receipts, transaction matching, bank account, or merchant-level detail.

### 4. Rent Or Board

Rent or board should be conditional and visually separate from everyday living expenses.

Possible approaches:

- A simple toggle row: `I pay rent or board`.
- If enabled, reveal `Rent or board` amount.
- In review, show rent or board as a major recurring housing cost, not mixed into groceries/bills unless the variation is testing an all-in total.

Use a tooltip or help affordance to clarify that rent or board should be entered if it continues during the assessment period. Do not ask a separate question about whether rent or board will continue after settlement.

### 5. Childcare Or Education

If dependants exist, show `Childcare and education` as a prominent category.

If no dependants exist, either hide it by default or keep it available under `Add category`.

Childcare can materially affect serviceability, so do not bury it behind a generic `Other`.

### 6. Numeric Keyboard

When an amount field is focused:

- Keep the field label and input visible above the keyboard.
- Hide the bottom CTA if it would collide.
- Keep the monthly context visible with the amount.
- Show a keyboard `Done` affordance.

### 7. Validation

Validation should appear after save or continue is attempted.

Use specific inline errors:

- `Enter monthly expenses`
- `Enter amount`
- `Enter rent or board`
- `Enter childcare or education costs`
- `Enter at least three categories or a total above $0`

Do not validate optional categories that are intentionally left blank.

## Required Mobile Interaction States

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

## Recommended Variations To Explore

Create five mobile variations.

### Variation 1: All Categories Direct-Edit Ledger

Start with every core category visible, using compact amount and frequency controls in each row. Best current baseline because editing is immediate.

### Variation 2: Compact Amount/Frequency Chips

Use category rows with amount and frequency chips that can be edited quickly without opening a full sheet for every small change. Best for reducing tap depth while preserving row rhythm.

### Variation 3: Bottom-Sheet Edit Model

Rows remain compact, and tapping a row opens a polished bottom sheet for amount and frequency. Best for keyboard, validation, and focused-edit clarity.

Tooltip/help treatment:

- Prefer an unobtrusive info icon beside category names, especially for categories that are easy to misread, such as `Transport`, `Rent or board`, and `Other regular expenses`.
- A tap should reveal one sentence of practical inclusion/exclusion guidance.
- Do not make help text visible by default across the whole list.

### Variation 4: Applicant Copy Variants

Show the same expense model for single applicant, two applicants together, and two applicants separated. Best for deciding whether the copy should say `Your expenses`, `Your household expenses`, or applicant-specific groups.

### Variation 5: Dense And Validation Stress

Stress-test long categories, validation, numeric keyboard, frequency picker, and bottom CTA behavior.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`
- `docs/mobile-ui/03-properties-spec.md`
- `docs/mobile-ui/04-liabilities-spec.md`

Mobile screens should feel like polished Fundora iOS product UI:

- Calm, compact, and scan-friendly.
- User-facing UI only inside phone artboards.
- No state names or design commentary inside phone screens.
- Use sentence case.
- Use tabular numerals for money.
- Use generated category icons only where they improve scanning.
- Keep amount and monthly context in the same visual group.
- Hide the bottom CTA while the keyboard is open if it would collide.
- Avoid card-on-card layouts, loud gradients, heavy shadows, decorative fintech green, and generic budget-app styling.

## Take-Forward Recommendation

Take forward a direct-edit category entry as the likely baseline:

- First screen shows all categories and a household monthly total.
- Borrower can edit amount and frequency directly per row.
- Monthly normalized total remains visible.
- Rent/board and childcare/education remain prominent where relevant.
- Continue requires at least three categories or a total above `$0`.
- Bottom-sheet editing remains useful for focused keyboard, picker, and validation states.
