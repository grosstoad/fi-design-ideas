# Review Before Results Mobile Plan

## Purpose

Design the mobile `Review` step that lets borrowers check their assessment inputs before results are calculated.

This screen should not feel like a second form. It should be a compact confidence check with clear edit routes and obvious handling for missing required sections.

## Flow Position

Review is step 7 in the broader assessment flow:

1. You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Review
8. Results

## Inputs And Scope

Review does not collect new primary data. It summarizes previous sections and lets the borrower return to edit them.

Sections:

- About You
- Income
- Properties
- Liabilities
- Expenses
- New property

Do not show every raw field. Each section should show enough information for the borrower to recognize whether it is correct.

## Core Product Decisions

### Summary-First

Each section should be a compact row or grouped panel with:

- Section name
- Completion state
- One or two key values
- Edit action

### Missing Sections

Missing required sections should block calculation.

Missing optional sections should show a quiet warning or `None added` state and still allow results.

Recommended default:

- About You: required
- Income: required
- Properties: optional
- Liabilities: optional
- Expenses: required, but suggested values may count as complete
- New property: required

### Edit Routing

Tapping Edit should route back to the relevant step, preserving saved progress.

For MVP, avoid in-place editing on Review. The previous steps already contain the correct sheets, keyboards, validation, and picker behavior.

## State Model

### 1. Complete Review

Show all sections complete with concise summary values.

Example summaries:

- `You`: `Two applicants, 0 dependants, NSW`
- `Income`: `$185,000 gross annual`
- `Properties`: `1 property, $640,000 value`
- `Liabilities`: `$42,000 exposure`
- `Expenses`: `$7,180 monthly`
- `New property`: `NSW, owner occupied, $3.56M savings`

### 2. Section Edit Affordance

Show a clear edit action for each section.

Use an icon or compact text button, but keep row lanes stable so the list remains scannable.

### 3. Missing Required Section

Show missing required sections with inline warning treatment.

Use practical copy:

- `Add income before calculating`
- `Choose a purchase state`

Do not use alarming error styles unless calculation is blocked.

### 4. Optional Empty Section

Show optional empty sections calmly:

- `No properties added`
- `No liabilities added`

These should not block calculation.

### 5. Continue Loading

After tapping the calculate CTA, show a loading state that keeps the review context stable.

Recommended CTA copy:

- `Calculating...`

### 6. Calculation Failed

Show a recoverable retry state if calculation fails.

Recommended copy:

- `We could not calculate your range`
- `Try again`

Keep edit access available.

## Required Mobile Interaction States

- Complete review.
- Missing required section warning.
- Optional empty section state.
- Edit affordance state.
- Continue loading.
- Calculation failed/retry.
- Long review stress state.

## Validation

Review validation checks should rely on each step's completion status rather than revalidating field-level rules.

Use section-level messages:

- `Complete About You`
- `Add income`
- `Choose a purchase state`
- `Enter savings`
- `Review expenses`

## Visual Guidance

Follow:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/mobile-assessment-interaction-states.md`
- `docs/mobile-ui/about-you-mobile-plan.md`

Review should feel like a tidy receipt, not a dashboard. Use rows, dividers, and quiet grouped sections instead of nested cards.

## Take-Forward Recommendation

Use a section-summary list:

- One row per assessment step.
- Key values only.
- Edit routes back to the original step.
- Required missing sections block calculation.
- Optional empty sections remain visible and non-blocking.

## Open Questions

- Are the required/optional defaults above correct?
- Should Review show lender-sensitive warnings before Results, or save those for Results?
- Should users be able to skip Expenses by accepting suggested values automatically?
