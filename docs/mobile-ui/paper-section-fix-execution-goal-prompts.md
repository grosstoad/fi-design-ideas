# Paper Section Fix Execution Goal Prompts

Date: 2026-06-07

Use these prompts to execute the accepted Paper fixes section by section.

## Shared Context

Main Paper file:

`https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0`

Canonical local docs:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/README.md`
- `docs/mobile-ui/paper-spec-alignment-audit.md`

Accepted user decisions:

- About You uses `Dependents`, not `Dependants`.
- Income uses `Employment type`, not `Employment arrangement`.
- Income empty state does not need to show `Gross annual income $0`.

Global Paper rules:

- Use Paper MCP. If Paper MCP is unavailable, report that as a blocker and do not pretend work was completed.
- Load `get_guide({ topic: "paper-mcp-instructions" })` before any other Paper tool.
- Open the main Paper file.
- Call `get_basic_info`, `get_selection`, and `get_font_family_info` before styling.
- Edit only the assigned board. Do not move/reorder the overall canvas or touch other sections.
- Preserve the existing Fundora mobile grammar: 393 x 852 phone states, top chrome, 7-step progress treatment, 32px rails, system-style typography, teal active controls, anchored safe-area CTAs, inline validation, and labels/notes outside phone artboards only.
- Prefer targeted edits, duplication, and additions over broad rebuilds.
- If Paper warns that further edits may cause data loss, stop and report the blocker.
- Screenshot after meaningful edits, critique spacing, typography, contrast, alignment, artboard fit, clipping, and state clarity, then fix issues.
- Call `finish_working_on_nodes` at the end.

## About You Prompt

Goal: Fix the About You Paper board so it matches the accepted spec decisions and becomes the canonical scaffold for the rest of the mobile flow.

Assigned board:

`Canonical comprehensive states - About You`

Spec:

`docs/mobile-ui/01-about-you-spec.md`

Accepted fixes:

- Keep `Dependents` as canonical spelling everywhere.
- Add an explicit labelled keyboard-dismissed state with CTA restored.
- Strengthen the two-applicant not-couple top viewport so Applicant 2 is clearly part of the same continuous screen.
- Show required-field validation preserving partially entered values, not just an all-empty form.
- Fix clipped/tight bottom annotation cards.
- Normalize status bar/battery rendering where it visibly varies.

Do not add suburb chooser, address lookup, dependent-age, postcode-only, or dependent-only states.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## Income Prompt

Goal: Fix the Income Paper board so it matches the accepted spec decisions and is usable as an implementation state library.

Assigned board:

`Canonical comprehensive states - Income`

Spec:

`docs/mobile-ui/02-income-spec.md`

Accepted fixes:

- Keep `Employment type` as canonical label.
- Do not add `Gross annual income $0` to the empty first-visit state.
- Add employer-name focused text-keyboard state.
- Add base-income focused numeric/currency-keyboard state.
- Add applicant-selector-open state for two-applicant flows.
- Add page-level validation for attempting to continue with no income source.
- Add very-large-income stress state.
- Split validation into realistic attempted-save/continue states.
- Keep `Base income` / `Enter base income` as canonical income amount language.
- Replace generic `Save income` copy with source-specific action copy such as `Save employment income` or `Save other income`.
- Archive, relabel, or visually demote `Variation A/B/C/D` framing once a canonical path is clear.

Do not add a generic `Add income` chooser. Do not add rental income.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## Properties Prompt

Goal: Expand and polish the Properties Paper board so it covers the required implementation states.

Assigned board:

`Canonical comprehensive states - Properties`

Spec:

`docs/mobile-ui/03-properties-spec.md`

Accepted fixes:

- Add keyboard states for postcode, property value, rental income, loan balance, and repayment.
- Add validation states for missing property value, missing loan balance, missing repayment, and ownership.
- Add picker/open states for loan purpose, lender, and ownership.
- Add prefilled edit states for property and home loan.
- Add delete confirmations for property and home loan.
- Add long-list stress states with multiple properties and multiple loans, including top/mid/bottom scroll positions.
- Add `Interest-only term` to home-loan sheet.
- Rename investment add/review language to `Property postcode`, `Rental income`, and `Property expenses`.
- Fix clipped/colliding add-property and add-home-loan sheet headers.

Do not add `I do not own property`, `Net property equity` as a hero total, or isolated `Add loan split` from the review screen.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## Liabilities Prompt

Goal: Correct the Liabilities Paper board so it matches MVP scope and the canonical mobile flow grammar.

Assigned board:

`Canonical comprehensive states - Other Liabilities`

Spec:

`docs/mobile-ui/04-liabilities-spec.md`

Accepted fixes:

- Enable `Continue` on the empty/no-liability state.
- Remove all `Total exposure` aggregate UI.
- Delete, archive, or clearly demote closing-before-settlement states and switches.
- Remove repayment values from saved review rows and modal backgrounds.
- Add explicit prefilled edit drawer state.
- Add validation variants for approved limit, current balance/outstanding balance, repayment, frequency, and commitment name.
- Standardize the board to the canonical 7-step progress treatment.
- Standardize font treatment to match the other mobile boards.
- Replace tiny monochrome liability glyphs with the warm illustrated 28-42px icon treatment specified in the Liabilities spec.
- Fix long-list value fit and remove-modal button spacing.
- Normalize `Amount owing` vs `Current balance` copy according to the type-specific fields in the spec.

Do not include HECS/HELP, tax debt, child support, BNPL/store finance, generic lease/hire purchase, or home loans in this Liabilities UI pass.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## Expenses Prompt

Goal: Correct the Expenses Paper board so it removes obsolete suggested-expense logic and matches the household-level expense spec.

Assigned board:

`Canonical comprehensive states - Expenses`

Spec:

`docs/mobile-ui/05-expenses-spec.md`

Accepted fixes:

- Remove, archive, or clearly demote all suggested-expense states and copy:
  - `Use suggested expenses?`
  - `Suggested monthly expenses`
  - `Continue with suggested`
  - `Suggested was $5,210`
- Remove low-confidence warning copy such as `This is much lower than the suggested estimate`.
- Replace two-applicant separated/applicant-group expense state with household/application-level copy for not-couple applicants.
- Add validation for `Enter at least three categories or a total above $0`.
- Add validation examples for rent/board and childcare/education enabled fields.
- Add a clear non-monthly normalized-value example in category review.
- Fix total widths so money values never wrap.
- Normalize category labels to the spec.
- Make rent/board conditional and visually separate from everyday living expenses.
- Remove visible in-phone design notes such as `CTA hidden while typing.`
- Confirm icons use cleaned transparent generated assets or replace placeholder-looking icons.
- Add clearer edit affordances to category review rows.

Do not add suggested expenses, bank transaction matching, notes, receipts, merchant-level detail, or applicant-level category duplication.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## New Property Prompt

Goal: Expand New Property v2 from a partial row into a complete canonical state library.

Assigned board:

`Canonical comprehensive states - New Property v2`

Spec:

`docs/mobile-ui/06-new-property-spec.md`

Accepted fixes:

- Add optional property price focused state with numeric keyboard.
- Add `Investment` selected state.
- Add first-home-buyer `No` state.
- Add capitalise-purchase-costs selected state in the main form.
- Add lightweight stamp-duty/purchase-cost recalculating state tied to state, purpose, first-home-buyer, or capitalise changes.
- Split validation examples or clearly label a combined all-errors screen.
- Clarify the resting baseline so state is explicitly selected, not silently defaulted from About You postcode.
- Improve capitalise helper copy in the resting form without turning it into a verbose explainer.
- Make picker/sheet states preserve enough underlying screen context to be useful implementation references.

Do not require property price in mind. Do not default state from postcode. Do not add loan-term/product/rate settings here.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- List states/copy fixed.
- Name any remaining gaps.

## Results Prompt

Goal: Expand Results v8 into a complete implementation-ready Results state library while preserving the clean selected-card direction.

Assigned board:

`Results v8 - Clean selected card + detail flow`

Spec:

`docs/mobile-ui/07-results-spec.md`

Accepted fixes:

- Add long lender-list scroll with sticky/accessible result summary.
- Add all-lenders expanded state behind `View all lenders`.
- Add recalculating state with stable header, skeleton lender rows, disabled CTA, and copy `Recalculating lender estimates...`.
- Add partial unavailable/error recovery with `Contact support` and `Update details`.
- Add property-edit validation examples: `Choose a state`, `Enter savings`, `Choose purchase purpose`.
- Tighten `Purpose` to `Purchase purpose`.
- Remove or soften implementation-facing copy like `Saving returns to Results...` and `Conditional terms appear only when they matter.`
- Keep `Policy fit` only if the calculation/product model supports it; otherwise remove or demote.
- Choose one selected-lender model to take forward and demote/archive extra strong-card explorations.
- Use dark Daria green-navy primary CTAs rather than pure black if consistent with nearby current boards.
- Check detail chooser icons against the no-badge, transparent-background, prop-icon rule.

Do not add explanatory copy saying the largest lender estimate is obvious. Do not use `CBA estimate`. Do not introduce a separate comfortable borrowing number or dashboard-like table header.

Expected final response:

- State whether Paper MCP was available and used.
- List the board edited.
- Name the selected-lender model taken forward.
- List states/copy fixed.
- Name any remaining gaps.
