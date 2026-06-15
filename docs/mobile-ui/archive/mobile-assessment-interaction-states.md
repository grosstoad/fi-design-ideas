# Mobile Assessment Interaction States

## Purpose

This document is the review checklist for Fundora mobile assessment designs in Paper. Legacy Paper file names may still mention FundIQ, but new mobile input-flow screens should use Fundora naming and the Fundora input-flow scaffold.

As we iterate, Paper should not only show the polished resting screens. It should also show the awkward states where mobile products usually break: keyboard open, field focused near the bottom, validation errors, sticky CTAs, autocomplete sheets, loading, disabled actions, and long content inside a short viewport.

The goal is to make interaction risk visible before implementation.

## Review Principle

For every meaningful mobile step, create design variants for:

1. Resting state
2. Active/focused state
3. Keyboard or sheet open state
4. Validation or error state
5. Completed/review state where applicable

If a screen has any input below the vertical midpoint, it needs a keyboard-open variant.

## Canonical Paper Scaffold

Use the current `About You` Paper designs as the visual source of truth for all Fundora mobile input steps. Income, Properties, Other Liabilities, Expenses, New property, and later input steps should feel like they belong to the same product session, not separate design explorations.

Canonical mobile frame:

- Device: iPhone 16, `393 x 852`.
- Phone UI only inside phone artboards. State names, rationale, implementation notes, and recommendation copy must sit outside the phone as adjacent annotations.
- Top chrome: `54px` status bar, `50px` top nav, `24px` progress region.
- Content rail: `32px` left and right padding, producing a `329px` usable content width.
- Header: 13px muted step eyebrow, then a 30px / 36px bold question or action title.
- Form labels: 16px / 20px semibold.
- Body/help text: 14-15px, 20-22px line height, muted but legible.
- Primary controls: equal-width segmented controls where choices are short; active state uses the About You teal.
- Inputs: `48px` height, 14-15px radius, quiet border, no heavy shadow.
- Bottom action: `122px` resting action area with a `54px` high primary CTA and `34px` bottom safe-area padding.
- Two-action bottom stacks may use `154px` height, with the primary action first and the secondary action immediately below it.

Canonical colour and type:

- Use system UI typography for mobile Paper screens unless matching an existing production component requires otherwise.
- Primary text: near-black.
- Muted text: neutral grey.
- Active input/primary action: the same teal used by About You.
- Inactive progress, disabled CTAs, and secondary surfaces: quiet neutral greys.
- Avoid black primary buttons in input flows unless the whole flow is deliberately redesigned; they currently make Properties, Liabilities, and Expenses feel detached from About You.

Canvas organisation:

- Create a canonical comprehensive state library for each major input step, not only one representative screen or one sample row.
- The library must include every required state for the step: empty/resting, valid, focused keyboard, picker or sheet open, validation, saved/review, edit, remove/delete where relevant, and long-content stress.
- Group the library by step in this order: About You, Income, Properties, Other Liabilities, Expenses, New property, Results.
- Label each visible state with a separate annotation next to or below the phone, using the pattern `[Step] - [state]`.
- Notes should explain why the state exists, not restate the UI.
- Existing exploratory variants can remain for comparison, but the comprehensive canonical library is the review source for implementation decisions.

## Paper Naming Convention

Use consistent names so the canvas can be scanned quickly.

Recommended pattern:

`Mobile assessment - [step] - [state]`

Examples:

- `Mobile assessment - About you - resting`
- `Mobile assessment - About you - postcode focused`
- `Mobile assessment - About you - postcode keyboard overlap check`
- `Mobile assessment - About you - postcode scrolled above keyboard`
- `Mobile assessment - About you - validation`
- `Mobile assessment - Income - salary keyboard`
- `Mobile assessment - Liabilities - add credit card sheet`

When testing a risky interaction, keep both the failing/overlap version and the proposed corrected version if useful. The contrast makes the decision easier to review.

## Global Mobile Behaviours

### Viewport And Keyboard

Mobile keyboards reduce the usable visual viewport. They do not behave like ordinary page content.

Design implications:

- Any field near the bottom can be covered by the keyboard.
- Fixed bottom CTAs can collide with the keyboard.
- Scroll positions that are impossible when the keyboard is hidden can become possible once the viewport shrinks.
- The focused field should remain visible with comfortable space above the keyboard.
- The screen needs extra bottom inset or padding while editing so `scrollIntoView` has room to work.

Paper variants to show:

- Keyboard hidden
- Keyboard open with current layout, to expose overlap risk
- Keyboard open with corrected scroll position
- Keyboard dismissed, CTA restored

Implementation intent:

- Use a scrollable screen container, not a fully fixed layout.
- Add keyboard-aware bottom padding while an input is focused.
- Hide the fixed CTA while editing, or move it above the keyboard only when that remains visually calm.
- Scroll the focused field into view after the keyboard opens.

### Sticky CTA Bar

The bottom CTA is helpful when the keyboard is hidden, but risky while typing.

Default behaviour:

- Resting screen: CTA is fixed or visually anchored to the bottom.
- Field focused: CTA is hidden while the keyboard is open.
- Keyboard dismissed: CTA returns.
- Validation after tapping CTA: CTA remains visible if no keyboard is open.

Paper variants to show:

- CTA visible at rest
- CTA hidden during keyboard entry
- CTA visible with validation errors
- Disabled CTA if required fields are incomplete and we choose disabled-first behaviour

### Safe Areas

Design for iPhone safe areas and browser chrome.

Check:

- Top navigation does not clash with status bar.
- Bottom CTA has enough bottom inset when the keyboard is hidden.
- Keyboard states do not depend on exact device height.
- Shorter devices still show the focused field and label.

Use the canonical `393 x 852` iPhone 16 frame for input-flow artboards. Include at least one short-height stress variant for dense steps when needed, but do not use stress frames as the default canvas.

### Scroll Behaviour

The form content should scroll independently of fixed nav or fixed CTA regions.

Expected behaviour:

- Top nav and progress can stay visible if they do not steal too much vertical space.
- Field groups scroll under the top region.
- On focus, the input and label should be visible, not only the input value.
- Avoid placing the focused field flush against the keyboard. Leave a small breathing gap.

Paper variants to show:

- First field focused
- Last visible field focused
- Bottom-most field focused with keyboard
- Same screen after keyboard dismissal

### Input Formatting

Financial fields should format for comprehension without making editing hostile.

States to show:

- Empty placeholder
- Partially typed value
- Formatted value
- Focused value, if formatting changes while editing
- Error value

Examples:

- Currency resting: `$125,000`
- Currency focused: `125000` or `$125,000`, depending on implementation choice
- Postcode resting: `2010`
- Postcode focused: `2010` with numeric keyboard and `Done`

### Validation

Validation should appear after an attempted continue/save, not before the user has interacted.

Show:

- Missing required field
- Invalid format
- Conflicting values
- Error recovery after the field is fixed

Validation design rules:

- Keep the error near the field.
- Preserve the user's entered value.
- Do not cover the error with the keyboard.
- If the invalid field is below the fold, scroll to it.
- Keep the CTA available after the user understands what needs fixing.

### Loading And Calculation

The assessment should feel responsive even when calculations are not instant.

States to show:

- Button loading state
- Screen-level loading between steps if needed
- Inline recalculating state for dependent values
- Calculation failed or retry state, if relevant

Avoid blocking the whole screen for small local updates.

### Autocomplete, Pickers, And Sheets

Mobile dropdowns often become sheets or searchable overlays.

Create separate Paper states for:

- Closed field
- Picker open
- Search/filter text entered
- Option selected
- Empty results
- Dismissed with no change

If a picker opens from a field near the bottom, show how it avoids the keyboard and CTA.

## Step-Specific State Inventory

### About You

Core inputs:

- Number of applicants
- Marital status for one applicant
- Relationship between applicants for two applicants
- Individual marital status for each applicant when two applicants are not a couple
- Dependents
- Residential postcode

Required Paper states:

- One applicant, single
- One applicant, couple
- Two applicants, couple
- Two applicants, not couple, with applicant 1 marital status, applicant 2 marital status, applicant 1 dependents, applicant 2 dependents, applicant 1 postcode, and applicant 2 postcode on the same screen
- Dependents 4+ selected within the relevant full About You screen
- Same-screen postcode focused with numeric keyboard
- Two applicants, not couple, lower scroll position showing applicant 2 marital status, dependents, and postcode at full size
- Required-field validation after tapping Continue with missing values
- Invalid postcode validation after entering a non-valid Australian postcode

Postcode behaviour:

- Tapping the postcode field opens the numeric keyboard.
- The page scrolls so the postcode label and field remain visible above the keyboard.
- The focused postcode field should sit clearly above the keyboard with a visible breathing gap; it should not collide with, touch, or feel pinned to the keyboard surface.
- The fixed CTA hides while the keyboard is open.
- A keyboard accessory or system `Done` action dismisses the keyboard.
- On dismissal, the CTA returns.
- Validate postcode as a valid Australian postcode only.
- Do not add suburb confirmation, suburb chooser, or suburb lookup states to About You.
- Do not add separate dependents-only, postcode-only, applicant-2-postcode-only, or applicant-2-keyboard-only pages to the canonical flow.
- Required-field and invalid-postcode states are required, but they must remain full About You screens with inline errors, not standalone error pages.

### Income

Core inputs:

- Employment arrangement
- Employer name
- Base salary
- Frequency
- Bonus, overtime, commission, allowances if included
- Add other income

Required Paper states:

- Employment-first resting entry
- Employer name focused with text keyboard
- Salary focused with numeric keyboard
- Frequency picker open
- Optional income expanded
- Add employment income sheet
- Add other income sheet
- Saved income review state
- Missing employer validation
- Missing salary validation
- Very large income value layout check

Keyboard notes:

- Text keyboard for employer name.
- Numeric/currency keyboard for salary and amounts.
- Salary rows must remain visible above the keyboard.
- Frequency controls should not be hidden by the keyboard when editing amounts.

### Properties

Core inputs:

- Existing property ownership
- Property postcode or address
- Property purpose: owner occupied or investment
- Property value
- Ownership split
- Rental income if investment property
- Investment property expenses if investment property
- Associated home-loan splits
- Loan split limit, balance, rate, term, repayment, and purpose
- Optional lender and interest-only term

Required Paper states:

- No existing property
- Existing property added
- Add/edit property sheet
- Add/edit loan split sheet
- Investment property selected, with rental and expense fields visible
- Property postcode focused with numeric keyboard
- Property value numeric keyboard
- Loan balance focused with numeric keyboard
- Loan repayment focused with numeric keyboard
- Ownership selector open, for two-applicant flows
- Loan purpose picker open
- Validation for missing property value
- Validation for missing loan balance
- Validation for missing repayment
- Long property list, if multiple properties are supported
- Multi-loan-split review, if split loans are supported

Property behavior:

- Existing home loans belong inside the relevant property record.
- The Liabilities step should not ask for home loans again.
- A property can be saved without a loan split if it is unencumbered.
- Rental income and investment expenses are hidden unless the property purpose is investment.
- For one applicant, ownership can be stored as Applicant 1 100% without showing a control.
- For two applicants, ownership should default to Joint 50/50 but remain visible as a deliberate choice.

### Liabilities

Core inputs:

- Credit cards
- Personal loans
- Car loans
- HECS/HELP
- Other commitments

Required Paper states:

- Empty liabilities state
- Liability added review state
- Add liability sheet
- Liability type picker
- Limit/balance/payment numeric keyboard
- Remove liability confirmation
- Validation for missing amount
- Long list stress state

### Expenses

Core inputs:

- Direct-edit expense categories
- Amount and frequency per category
- Entry title: `Your expenses`
- Monthly total summary, such as `$7,180 monthly total`
- Rent or board, if applicable
- Childcare or other major recurring costs
- Applicant-copy variants for single applicant, two applicants together, and two applicants separated

Required Paper states:

- All categories visible on entry
- Category amount/frequency editing
- Tooltip or category-help affordance, if used
- Frequency picker open
- User-edited expenses
- Numeric keyboard
- Helper text expanded, if used
- Validation or low-confidence warning
- Continue with estimate state
- Dense long-list stress state

### New Property

Core inputs:

- Buying state
- Purchase purpose
- Deposit/savings
- Desired purchase price or borrowing target
- First home buyer, if relevant

Required Paper states:

- Resting state
- State picker open
- Savings focused with numeric keyboard
- Purchase price focused with numeric keyboard
- Owner occupied vs investment selected
- First home buyer toggle selected/unselected
- Validation for missing savings or state
- Stamp duty/loading recalculation state

### Review Before Results

Core function:

- Let the user check assumptions before results.

Required Paper states:

- Complete review
- Section edit affordance
- Missing section warning
- Continue loading
- Calculation failed/retry

### Results On Mobile

Core function:

- Show borrowing power and lender comparison in a compact, readable format.

Required Paper states:

- Results loaded
- Lender detail expanded
- Scenario input focused with keyboard
- Lender comparison scrolled
- Assumptions sheet open
- Recalculating after scenario change
- Error or unavailable lender state

## Component State Checklist

### Buttons

Show:

- Default
- Pressed/active
- Disabled
- Loading
- Destructive, if applicable

### Segmented Controls

Show:

- Default selected option
- Alternate selected option
- Wrapping or overflow check on small width
- Disabled option, if applicable

### Text Inputs

Show:

- Empty
- Focused
- Filled
- Error
- Disabled/read-only
- With helper text
- With long value

### Numeric Steppers

Show:

- Minimum value
- Decrement disabled
- Normal value
- Incremented value
- Error or max reached, if applicable

### Sheets And Modals

Show:

- Closed/resting trigger
- Open sheet
- Keyboard inside sheet
- Validation inside sheet
- Save loading
- Dismiss confirmation if unsaved changes matter

## Paper Review Checklist

Before treating a mobile Paper screen as ready, check:

- Does the screen have a keyboard-open state for any low input?
- Is the focused field visible above the keyboard?
- Is the field label visible too?
- Is the CTA hidden or safely repositioned while typing?
- Can the user dismiss the keyboard?
- Are validation messages visible without being covered?
- Does the screen work on a shorter viewport?
- Does long text or a large number break the layout?
- Are pickers/sheets shown, not just implied?
- Is the completed state shown after the interaction?

## Minimum Variant Set Per Screen

For each assessment step, create at least:

1. Resting screen
2. One primary input focused
3. Lowest input focused with keyboard open
4. Validation after continue
5. Completed or review state

For high-risk screens like About You, Income, New Property, and Results, also create:

1. Keyboard overlap check
2. Corrected scrolled-above-keyboard state
3. Picker or sheet open state
4. Short viewport stress state

## Notes From Postcode Review

The current About You resting layout places the postcode field immediately above the fixed CTA.

Observed risk:

- If the numeric keyboard opens without scroll compensation, it covers the postcode field and CTA.

Desired state:

- On postcode focus, the screen gets keyboard-aware bottom space.
- The form scrolls upward so the postcode label and field remain visible.
- The CTA hides while editing.
- The numeric keyboard shows a clear `Done` affordance.
- After `Done`, the keyboard dismisses and the CTA returns.

This exact interaction should stay represented in Paper as the postcode design evolves.
