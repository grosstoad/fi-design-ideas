# Paper Goal Prompt: Fundora New Property

## Target Paper File

Work in:

https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0

Create a clearly discoverable board or frame named:

`Canonical comprehensive states - New Property v2`

Place it near the existing Fundora input-flow boards. It must be visible on the main canvas and easy to find.

## Visual Source Of Truth

Use the existing About You, Income, Properties, Liabilities, and Expenses boards in the target Paper file:

- iPhone 16, `393 x 852`.
- 32px mobile rails.
- Fundora top chrome and progress.
- White phone surface.
- Teal active controls.
- Fine borders.
- Anchored bottom action.
- Sentence-case borrower-facing copy.
- External state labels outside phone artboards only.

## Product Scope

Design the New Property step as a standard financial input screen, not a review page.

Required now:

- Property state.
- Loan purpose: `Owner occupied` or `Investment`.
- First home buyer status.
- Savings for deposit and costs.
- Capitalise purchase costs.

Optional now:

- Property price in mind.

Do not include:

- Property type.
- New-build/construction status.
- A post-Budget/new-property date question.
- Existing properties or existing home loans.
- Loan term, repayment type, product type, or rate type.

## Copy

Use:

- Title: `What are you looking to buy?`
- Property state label: `Property state`
- Loan purpose label: `Loan purpose`
- First home buyer label: `First home buyer`
- Savings label: `Savings for deposit and costs`
- Optional property price label: `Property price in mind`
- Optional marker: `Optional`
- Capitalise label: `Capitalise purchase costs`
- Capitalise explanation: `This means some purchase costs are added to the loan instead of paid from savings on settlement.`

## Design Requirements

- Use normal input values, not `Edit` affordances, in the resting form.
- Show property state as a simple picker row/select-style field.
- The state picker sheet must list all eight states and territories separately: `NSW`, `VIC`, `QLD`, `SA`, `WA`, `TAS`, `ACT`, `NT`.
- Do not bundle `TAS`, `ACT`, and `NT`.
- Show property price in mind as optional and non-blocking.
- Do not use a heavy divider above Capitalise purchase costs.
- Keep capitalise costs as part of the same form rhythm.

## Required States

Create:

1. Resting form.
2. Property state picker sheet.
3. Savings focused with numeric keyboard.
4. Optional property price focused with numeric keyboard.
5. Investment and FHB changed state.
6. Capitalise purchase costs explanation.
7. Capitalise purchase costs on/off.
8. Required validation for missing state, purpose, and savings.
9. Lightweight recalculating state.

## Recommendation

The preferred New Property model is a compact scenario-first form with:

- State picker.
- Purpose segmented control.
- FHB segmented control.
- Savings currency input.
- Optional property price input.
- Capitalise switch plus small explanation path.
