# About You Spec

## Purpose

Design the mobile `About You` step for the borrowing-power flow. This step captures applicant count, relationship or marital status, dependents, and residential postcode with the least possible friction.

About You is also the canonical visual scaffold for the rest of the Fundora mobile input flow. Income, Properties, Liabilities, Expenses, New property, and Results should feel like the same product session.

## Flow Position

About You is step 1 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

## Inputs And Scope

Supported applicant modes:

- One applicant
- Two applicants

Core inputs:

- Number of applicants
- Marital status for one applicant: `Single`, `Couple`
- Relationship between two applicants: `Couple`, `Not couple`
- Individual marital status for each applicant when two applicants are not a couple
- Dependents
- Residential postcode

Dependents options:

- `0`
- `1`
- `2`
- `3`
- `4+`

Treat `4+` as four for now.

Do not include:

- Dependent ages
- Suburb confirmation
- Suburb chooser
- Address lookup
- Separate dependent-only pages
- Separate postcode-only pages
- Applicant 2 as a separate postcode-only or keyboard-only page

## Core Product Decisions

### One Applicant

Ask:

- Marital status: `Single` or `Couple`
- Dependents
- Residential postcode

Use `Couple`, not `Married/couple`.

### Two Applicants, Couple

Ask:

- Relationship between applicants: `Couple` or `Not couple`
- Shared household dependents
- Shared residential postcode

Do not ask individual marital status for a two-applicant couple.

Two applicants who are a couple always share one residential postcode for MVP.

### Two Applicants, Not Couple

Keep the flow on one continuous About You screen.

Ask:

- Applicant 1 marital status: `Single` or `Couple`
- Applicant 1 dependents
- Applicant 1 residential postcode
- Applicant 2 marital status: `Single` or `Couple`
- Applicant 2 dependents
- Applicant 2 residential postcode

The canonical library needs both a top-of-form state and a lower scroll position state for this longer form.

Use generic labels such as `Applicant 1` and `Applicant 2` for now. Once names are collected elsewhere, replace these labels with names, but do not add name capture to this step.

### Postcode

Postcode is a numeric input and validates as a valid Australian postcode only.

Do not add suburb lookup, suburb matching, or suburb confirmation to this step.

## State Model

### 1. One Applicant, Single

Show the complete About You form with:

- Applicant count set to one.
- Marital status set to `Single`.
- Dependents.
- Residential postcode.
- Bottom Continue action anchored near the safe area.

### 2. One Applicant, Couple

Show the same one-applicant form with marital status set to `Couple`.

The screen still captures one applicant's residential postcode and dependent count.

### 3. Two Applicants, Couple

Show:

- Applicant count set to two.
- Relationship set to `Couple`.
- Shared household dependents.
- Shared residential postcode.

### 4. Two Applicants, Not Couple

Show one continuous form with applicant-specific fields for both applicants.

The top state should show the first applicant fields and enough context that the second applicant fields are clearly part of the same screen.

The lower scroll state should show applicant 2 marital status, dependents, and postcode at full size.

### 5. Dependents 4+ Selected

Show `4+` selected within the relevant full About You screen.

Do not create a dependents-only screen.

### 6. Postcode Focused

When the postcode field is focused:

- Show a real numeric keypad.
- Keep the field label and input visible above the keyboard.
- Leave visible breathing space between the input and keyboard.
- Hide the bottom Continue CTA while the keyboard is open if it would collide.
- Show a keyboard `Done` affordance.
- Restore the Continue CTA after keyboard dismissal.

### 7. Required-Field Validation

After tapping Continue with missing required values, show inline errors on the same full About You screen.

The screen should preserve all entered values and make the missing fields easy to find.

### 8. Invalid Postcode Validation

After entering an invalid Australian postcode and attempting to continue, show an inline postcode error on the same full About You screen.

Do not route to a postcode-only error page.

## Required Mobile Interaction States

- One applicant, single.
- One applicant, couple.
- Two applicants, couple.
- Two applicants, not couple top position.
- Two applicants, not couple lower scroll position.
- Dependents `4+` selected inside a full About You screen.
- Same-screen postcode focused with numeric keyboard.
- Required-field validation.
- Invalid postcode validation.
- Keyboard dismissed with CTA restored.

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/README.md`

Use the established Fundora mobile input scaffold:

- iPhone 16, `393 x 852`.
- `32px` content rails.
- System UI typography.
- Quiet white mobile surfaces.
- Teal active controls.
- Compact segmented controls.
- Anchored bottom safe-area CTA in resting states.
- State labels and implementation notes outside phone artboards only.

## Take-Forward Recommendation

Take forward one clean canonical About You section:

- Keep all variants in a single state library.
- Remove deprecated dependents-only, postcode-only, and suburb chooser states.
- Use `Couple`, not `Married/couple`.
- Treat the two-applicant not-couple journey as one continuous screen with a lower scroll state.
- Keep postcode keyboard and validation states represented as full-form states.

## MVP Decisions

None for MVP.
