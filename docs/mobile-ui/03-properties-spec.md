# Properties Spec

## Purpose

Design the mobile `Properties` step for the borrowing-power flow. This step captures existing owned properties, rental income and property expenses for investment properties, and the home loans secured against each property.

The model should feel property-first: a borrower adds a property, then adds the home loan attached to it. If a property has multiple loans, review rows can describe them as loan splits. Home loans should not be re-entered later as generic liabilities.

## Flow Position

Properties is step 3 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

`New property` remains separate. This step is only for properties the applicant already owns.

## Paper And Existing Design Review

Use the existing Paper input-flow direction on the `Inputs` page as the interaction baseline:

- About You screens establish the Fundora mobile frame: 393 x 852, compact progress, restrained header, anchored bottom CTA, and keyboard-aware variants.
- Income variations establish the add/edit pattern: compact first screen, direct bottom sheets, applicant segmented controls, picker-open states, validation states, and review rows.
- Income V4 shows useful applicant grouping for two-applicant review states.
- Income V5 shows progressive disclosure for complex optional fields. This is the closest pattern for optional attached home loans.
- Recommendation notes take forward a hybrid of sticky summary while editing and grouped review after saving.

For Properties, carry these patterns forward but organize the UI around properties rather than income sources.

## Core Product Decisions

### Source Of Truth

Existing home loans belong inside the relevant property record.

The `Liabilities` step should handle unsecured or non-property liabilities such as credit cards, personal loans, car loans, and other commitments. HECS/HELP is captured in Income from a UI perspective. Liabilities may show a quiet read-only reminder that home loans were captured with properties, but it should not ask for them again.

### Property-First Model

Each property can have:

- One property record.
- Zero or more associated home loans.
- Rental income and property expenses only when the property purpose is investment.

The borrower should be able to save an unencumbered property with no loans.

### Address Versus Postcode

Use postcode as the default low-friction input for the first design pass.

Address search may be considered later, but postcode is fine for MVP and the production first pass.

### Property Purpose

Use `Owner occupied` and `Investment` as the primary choices.

If a property is selected as `Investment`, reveal:

- Rental income + frequency, default weekly.
- Investment property expenses + frequency, default yearly.

Do not show rental income or investment expenses for owner-occupied properties. Rental income is not required for investment properties, but the field should be visible when `Investment` is selected.

### Property Type

Do not require property type in the default path.

Property type may appear as an optional detail or advanced field in one variation, but it should not block saving a property unless a later lender policy requirement proves it is necessary.

### Ownership

Ownership must be chosen or system-defaulted deliberately.

Recommended mobile model:

- One applicant: hide ownership and store `Applicant 1 owns 100%`.
- Two applicants: show an ownership segmented control defaulting to `Joint`.
- Other options: `Applicant 1` and `Applicant 2`.

Do not include custom ownership percentages in MVP. `Joint` means 50/50.

## Core Fields

### Property Fields

Required:

- Postcode or address.
- Property purpose: owner occupied or investment.
- Estimated property value.
- Ownership, if two applicants.

Optional or conditional:

- Property type, optional.
- Rental income + frequency, investment only.
- Investment property expenses + frequency, investment only.

Recommended labels:

- `Property postcode`
- `Property purpose`
- `Estimated value`
- `Ownership`
- `Rental income`
- `Property expenses`

### Home Loan Fields

Each property can have multiple home loans. Only use split labels when more than one loan is attached to the same property.

Required home loan fields:

- Loan limit.
- Current balance.
- Interest rate.
- Remaining loan term.
- Repayments + frequency.
- Loan purpose.

Optional home loan fields:

- Lender.
- Interest-only term.

Recommended labels:

- `Loan limit`
- `Current balance`
- `Interest rate`
- `Remaining term`
- `Interest-only term`
- `Repayment`
- `Loan purpose`
- `Lender`

Use `Loan split 1`, `Loan split 2`, and so on in review rows only when the borrower has more than one loan on the same property.

## State Model

### 1. No Existing Property

The first screen should be titled `Add your existing properties` and make it clear that this step is only for property the borrower already owns.

Recommended actions:

- `Add property`
- `Continue`

Do not include a separate `I do not own property` CTA. Borrowers who do not own property can simply continue with no properties added. Avoid helper copy such as `Home loans are captured here not in liabilities` on the empty state; the model should be implied by the property-first UI.

### 2. Add Property

Use a bottom sheet or full-height mobile sheet.

Required content:

- Property purpose segmented control.
- Postcode or address input.
- Estimated value amount field.
- Ownership selector for two applicants.
- Investment-only rental and expense fields.
- A clear section to add a home loan.

Recommended behavior:

- Let the borrower save the property without a home loan.
- Include `Add home loan` inside the property sheet or edit flow, visually attached to the property being edited. Use loan split language only once there are multiple loans against the same property.
- If the borrower says the property has a loan, open a home-loan sub-sheet or inline nested loan section.
- Use `Joint` as the visible ownership option label, not `Joint 50/50`. The stored/default meaning can remain equal ownership unless a custom ownership flow is introduced later.

### 3. Add Home Loan

Use a focused sheet launched from the property sheet or the saved property card.

Required content:

- Optional lender field at the top.
- Loan limit and current balance.
- Interest rate.
- Remaining term.
- Interest-only term, optional.
- Repayment amount + frequency.
- Loan purpose.
- Save home loan action.

The home loan sheet should be reusable for editing.

### 4. Saved Review

After saving at least one property, show a compact review state.

Do not show `Net property equity` as a hero total in this step. Keep review focused on what the borrower entered: existing property value, ownership/purpose, any investment rent/expenses, and attached home loan balances.

Saved property cards should show:

- Postcode or address.
- Purpose.
- Estimated value.
- Ownership.
- Rental income and expenses if investment.
- Total balance across home loans, only when more than one loan is attached to the property.
- Loan split rows only when there are multiple loans against the property.
- A single loan summary when there is only one loan against the property; do not label it `Loan split 1`.
- Edit property.

Do not offer `Add loan split` as an isolated CTA from the review screen. Adding or editing home loans should happen in the property add/edit flow so the borrower always understands which property the loan belongs to.

For two applicants, ownership should be visible on each property card rather than as a separate applicant grouping.

### 5. Long List State

Show a stress state with multiple properties and multiple home loans.

The UI should remain scannable:

- One card or grouped section per property.
- Home loan rows nested directly under the matching property. Use loan split labels only for properties with multiple loans.
- Stable trailing edit actions.
- No card-inside-card visual clutter.
- A bottom `Continue` CTA anchored to the safe area in resting scroll positions.
- Separate top, mid-scroll, and bottom states when the list is long enough to hide actions or context.

### 6. Edit And Delete

The canonical library must include edit and remove flows:

- Edit property sheet prefilled with saved values.
- Edit owner-occupied property with its single home loan attached.
- Edit investment property with rent and property expenses grouped under investment details.
- Delete confirmation for removing a property, including the effect that any attached home loans are removed with it.
- Delete confirmation for removing a home loan from a property when the home loan editor is open.

### 7. Validation

Validation appears only after save or continue is attempted.

Property validation:

- Enter postcode or address.
- Choose property purpose.
- Enter estimated value.
- Choose ownership, if two applicants and no default has been set.

Home loan validation:

- Enter loan limit.
- Enter current balance.
- Enter interest rate.
- Enter remaining term.
- Enter repayment.
- Choose loan purpose.

Use specific inline errors:

- `Enter property postcode`
- `Enter estimated value`
- `Choose ownership`
- `Enter current balance`
- `Enter repayment`

## Keyboard And Picker States

Required mobile interaction states:

- Property value focused with numeric keyboard.
- Postcode focused with numeric keyboard.
- Rental income focused with numeric keyboard.
- Loan balance or repayment focused with numeric keyboard.
- Property purpose selected as owner occupied.
- Property purpose selected as investment with rental fields visible.
- Ownership picker or segmented control for two applicants.
- Loan purpose picker open.
- Lender field open or filled, if shown.
- Validation with missing property value.
- Validation with missing loan balance or repayment.
- Long list review with multiple properties and multiple home loans.

When the keyboard is open:

- Keep the focused field and label visible.
- Hide the bottom CTA if it would collide with the keyboard.
- Keep amount and frequency in the same visual group.

## Recommended Variations To Explore

Create five mobile variations. Each variation should include first visit, add property, add home loan, saved review, and at least one validation or keyboard state. Include loan split labelling only in multi-loan states.

### Variation 1: Property Card Starter

First screen uses `Add your existing properties`, one `Add property` action, and an enabled `Continue` CTA for borrowers with no existing property. Saved cards become the main review surface. Best for clarity.

### Variation 2: Investment-Aware Sheet

The add property sheet changes visibly when `Investment` is selected, revealing rental income and property expenses in a compact `Investment` group near purpose and ownership. Best for proving conditional logic.

### Variation 3: Home Loans Nested

The property sheet includes a compact nested home-loan composer. Best for borrowers with one straightforward mortgage.

### Variation 4: Review Ledger

Saved state uses ledger-like rows: property value, loan limits, balances, rent, and expenses. Best for high-confidence review.

### Variation 5: Multi-Property Stress

Starts from a review state with two properties and three attached home loans. Best for testing density, edit actions, and repeated row alignment.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`

Mobile screens should feel like polished Fundora iOS product UI:

- Calm, compact, and scan-friendly.
- User-facing UI only inside phone artboards.
- No state names or design commentary inside phone screens.
- Use sentence case.
- Use tabular numerals for money.
- Use equal-width segmented controls for short choices.
- Use bottom sheets for focused add/edit actions.
- Avoid card-on-card layouts; use rows, dividers, and quiet grouped sections.
- Avoid loud gradients, heavy shadows, decorative fintech green, and generic mortgage calculator styling.

## Take-Forward Recommendation

Take forward a hybrid of Property Card Starter and Investment-Aware Sheet:

- The first screen stays simple: add a property or continue with none.
- Add/edit uses a property sheet with purpose-specific fields.
- Home loans are nested under the property and edited in a focused sub-sheet.
- Saved review uses compact property cards with loan rows and no net-equity hero.
