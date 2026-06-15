# Liabilities Spec

## Purpose

Design the mobile `Liabilities` step for the borrowing-power flow. This step captures the non-property liabilities currently represented in the FundIQ serviceability input model and exposed in the borrower UI.

The screen should feel like a focused assessment workflow, not a bank-calculator dump of every possible lender field. The borrower chooses a liability type first, then sees only the fields that matter for that type.

## Flow Position

Liabilities is step 4 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

Existing home loans belong in `Properties` and should not be re-entered here. Do not explain this with in-screen helper copy; the product model should be implied by the available actions.

## Core Product Decisions

### Application-Level Commitments

Do not assign liabilities to a person in the default mobile flow. Treat commitments at application level.

Rationale:

- Most lender serviceability workflows consider household/application commitments.
- Borrowers often do not think of joint facilities as belonging cleanly to one applicant.
- Applicant assignment adds UI weight without improving the first assessment pass.

### Type-Specific Field Model

Do not use one generic `Limit` field for every liability. The drawer should adapt after type selection.

Use this simplified UI assessment model:

| Liability type | Capture | Serviceability treatment | DTI / debt treatment |
| --- | --- | --- | --- |
| Credit card | Credit limit | System can derive an assessed repayment from limit | Use limit |
| Overdraft | Approved limit | System can derive an assessed repayment from limit | Use limit |
| Personal loan | Current balance, repayment + frequency | Use declared repayment | Use current balance |
| Car loan | Current balance, repayment + frequency | Use declared repayment | Use current balance |
| Novated lease | Current balance, repayment + frequency | Use declared repayment | Use current balance |
| Margin loan | Current balance or facility limit, repayment if required | Usually stress/interest treatment is lender-specific; show as debt exposure in MVP | Use balance or limit, whichever is captured |
| Other commitment | Repayment + frequency, optional balance | Use declared repayment | Use balance only if captured |

Do not include HECS/HELP, tax debt / ATO payment plan, child support / maintenance, buy now pay later / store finance, or generic lease / hire purchase as separate choices in this Liabilities UI pass. HECS/HELP is captured in Income from a UI perspective.

### Icon-Led Entry Treatment

Use small illustrated icons to make the entry state more compelling without adding copy. Icons should follow the Fundora character-icon system: thick black ink outline, warm matte fills, no enclosing badge, no text, no mascot face, and readable at 28-42px.

Current generated/vectorized asset set:

- `output/imagegen/liability-icons/credit-card.svg`
- `output/imagegen/liability-icons/personal-loan.svg`
- `output/imagegen/liability-icons/car-loan.svg`
- `output/imagegen/liability-icons/overdraft.svg`
- `output/imagegen/liability-icons/novated-lease.svg`
- `output/imagegen/liability-icons/margin-loan.svg`
- `output/imagegen/liability-icons/other-commitment.svg`

Balanced Paper-ready set:

- `output/imagegen/liability-icons-balanced/credit-card.svg`
- `output/imagegen/liability-icons-balanced/personal-loan.svg`
- `output/imagegen/liability-icons-balanced/car-loan.svg`
- `output/imagegen/liability-icons-balanced/overdraft.svg`
- `output/imagegen/liability-icons-balanced/novated-lease.svg`
- `output/imagegen/liability-icons-balanced/margin-loan.svg`
- `output/imagegen/liability-icons-balanced/other-commitment.svg`

Use the balanced set in Paper layouts. These variants share a consistent `64 x 64` viewBox, stroke weight, and optical footprint so icon tiles do not look uneven when rendered at 28-42px.

Generation prompt direction:

```text
Create a cohesive set of seven small illustrated transparent-background icons for a mobile finance assessment UI: credit card, personal loan document with coin, car loan car key, overdraft wallet, novated lease car with tag, margin loan line chart, other commitment receipt. Thick uneven black ink outline, warm matte fills, subtle paper texture, slightly off-kilter geometry, composed and credible, matching a Notion-like Australian borrowing power app. No enclosing circles, badges, stickers, shadows, logos, UI text, labels, watermarks, faces, mascots, letters, or numbers.
```

### Required Versus Optional Detail

Required fields should be the minimum needed to assess the liability type.

Do not require:

- Interest rate.
- Remaining term.
- Existing lender.
- Account owner.

Interest rate, remaining term, and existing lender may appear under `More details` in one variation only. They should be optional.

### Closing Before Settlement

Do not include closing-before-settlement in MVP.

Archive note for later: if this returns, the design should consider how closing liabilities affect funds-to-complete. For example, Results may need to show some available funds allocated to paying out debt so the borrower understands why the commitment is excluded or reduced.

### Frequency

For any repayment amount, show frequency in the same visual group.

Default repayment frequency to monthly, but keep it editable.

Allowed frequencies:

- Weekly
- Fortnightly
- Monthly
- Yearly

## Liability Type Picker

Selecting a liability type opens an overlay drawer or bottom sheet. In review states, `Add another liability` can open the same picker.

Use one flat, scannable list. Do not split choices into `Common` and `More liabilities`.

For the first empty entry state, do not show a generic `Add liability` CTA. Show the supported liability types directly as equal-height tappable rows with balanced icons; selecting any row starts that liability's add flow. Once at least one liability has been saved, the review state can show `Add another liability`.

Available choices:

- Credit card
- Personal loan
- Car loan
- Overdraft
- Novated lease
- Margin loan
- Other commitment

The list is short enough that a grouped picker or search field adds unnecessary weight.

Visual QA rules:

- Every picker row uses a fixed icon lane, fixed text lane, and fixed trailing chevron lane so labels cannot collapse or wrap vertically.
- Icons must render at the same optical size, even when the source SVG viewboxes differ.
- The picker must show all supported liability types without clipping.

## Core Fields By Type

### Credit Card

Required:

- Credit limit

Optional:

- Lender, future only

Do not ask for repayment in MVP.

### Overdraft

Required:

- Approved limit

Optional:

- Current balance, in one advanced variation only

Treat overdrafts visually like credit cards: limit-first, not repayment-first.

### Personal Loan

Required:

- Current balance
- Repayment amount + frequency

Optional:

- Remaining term, advanced only
- Interest rate, advanced only
- Existing lender, future only

### Car Loan

Required:

- Current balance
- Repayment amount + frequency

Optional:

- Remaining term, advanced only
- Interest rate, advanced only
- Existing lender, future only

### Novated Lease

Required:

- Current balance or payout amount
- Repayment amount + frequency

Use the borrower-facing label `Amount owing` if `Current balance` feels too bank-specific.

### Margin Loan

Required:

- Loan balance or facility limit

Optional:

- Repayment amount + frequency, if the borrower has a required payment
- Security value, future only

Recommended MVP label:

- `Margin loan balance or limit`

This is intentionally simplified. Full margin-lending treatment is lender-specific and can be handled later through policy mapping.

### Other Commitment

Required:

- Commitment name
- Repayment amount + frequency

Optional:

- Amount owing

## State Model

### 1. Empty Liabilities

First screen should ask whether the borrower has existing liabilities.

Recommended actions:

- `Add an existing liability`
- `Continue`

Do not include an `I do not have liabilities` CTA. A borrower with no liabilities can continue without adding any rows.

### 2. Liability Type Picker

The first drawer state shows liability types.

Keep it scannable:

- One flat list.
- No explanatory paragraphs inside the phone screen.
- Short helper text only if needed: `Choose the closest match.`

### 3. Add / Edit Liability

After choosing a type, the same drawer changes into a type-specific form.

Required behavior:

- Title uses the selected type, such as `Add credit card`, `Add personal loan`, or `Add car loan`.
- Only relevant fields are visible.
- Repayment frequency sits beside or directly under repayment amount.
- When repayment and frequency sit side by side, the pair must consume the full content width. For the 393 px phone sheet with 20 px side padding, use a 353 px row, 8 px gap, and two 172.5 px columns.
- Save action is anchored in the bottom safe area and must not sit directly under the first field on short forms like credit card.
- Edit uses the same drawer prefilled.

### 4. Saved Review

After saving at least one liability, show compact review rows.

Review row examples:

- `Credit card` with `$12,000` on the right and `Credit limit` in muted supporting text.
- `Overdraft` with `$8,000` on the right and `Approved limit` in muted supporting text.
- `Personal loan` with `$18,200` on the right and `Current balance` in muted supporting text.
- `Car loan` with `$28,500` on the right and `Current balance` in muted supporting text.
- `Novated lease` with `$12,600` on the right and `Amount owing` in muted supporting text.
- `Margin loan` with `$45,000` on the right and `Balance or limit` in muted supporting text.
- `Other commitment` with optional amount on the right and `Amount owing` in muted supporting text.

Saved rows should use the same principle as Income review rows: liability type on the left, limit/balance/exposure amount on the right, and the exposure label in grey supporting text below the title. Do not show repayment amounts or repayment frequencies in the saved review cards.

Do not show a `Total exposure` or aggregate liability total in the UI.

### 5. Long List Stress State

Show a stress state with at least:

- Credit card
- Overdraft
- Personal loan
- Car loan
- Novated lease
- Margin loan
- Other commitment

The UI should remain scannable:

- Stable row lanes.
- Fixed trailing edit actions.
- No nested cards.

### 6. Validation

Validation appears only after save or continue is attempted.

Use specific inline errors:

- `Enter credit limit`
- `Enter approved limit`
- `Enter current balance`
- `Enter outstanding balance`
- `Enter repayment`
- `Choose a frequency`
- `Enter commitment name`

Do not validate optional rate, term, or lender fields.

## Keyboard And Picker States

Required mobile interaction states:

- Empty liabilities state.
- Liability type picker open.
- Add credit card sheet.
- Add personal loan sheet.
- Add car loan sheet.
- Add overdraft sheet.
- Add margin loan sheet.
- Add novated lease sheet.
- Add other commitment sheet.
- Credit limit focused with numeric keyboard.
- Repayment focused with numeric keyboard.
- Frequency picker open.
- Saved review with several liabilities.
- Validation for missing limit, balance, outstanding balance, or repayment.
- Remove liability confirmation.

When the keyboard is open:

- Keep the focused field and label visible.
- Hide the bottom CTA if it would collide with the keyboard.
- Keep amount and frequency in the same visual group.

## Recommended Variations To Explore

Create three mobile variations. Each variation should include type selection, add/edit, saved review, and at least one validation or keyboard state.

### Variation 1: Type-First Drawer

Start with an empty liabilities screen and a bottom-sheet type picker. The selected type transforms into a focused form. Best for clarity and low cognitive load.

### Variation 2: Icon-Led Flat Picker

Use an icon-led flat picker with all supported liability types visible together. Best for making the empty and entry states more inviting without introducing artificial `Common` / `More` hierarchy.

### Variation 3: Dense Review Ledger

Start from a populated review with credit card, overdraft, personal loan, car loan, novated lease, margin loan, and other commitment. Best for testing row density, alignment, and whether the summary model still feels understandable.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`
- `docs/mobile-ui/03-properties-spec.md`

Mobile screens should feel like polished Fundora iOS product UI:

- Calm, compact, and scan-friendly.
- User-facing UI only inside phone artboards.
- No state names or design commentary inside phone screens.
- Use sentence case.
- Use tabular numerals for money.
- Use equal-width segmented controls where appropriate.
- Use bottom sheets for focused add/edit actions.
- Avoid card-on-card layouts; use rows, dividers, and quiet grouped sections.
- Avoid loud gradients, heavy shadows, decorative fintech green, and generic mortgage calculator styling.

## Take-Forward Recommendation

Take forward a hybrid of Type-First Drawer and Icon-Led Flat Picker:

- Empty state stays simple: add a liability, or continue without adding one.
- Type picker uses one flat list of the supported UI liability types.
- Add/edit forms are type-specific.
- Credit cards and overdrafts ask for limit only.
- Personal loans, car loans, and novated leases ask for balance and repayment.
- Margin loans use a simplified balance-or-limit field in MVP.
- Saved review uses compact rows with one or two assessment-relevant values per row.
- No aggregate liability total is shown.
