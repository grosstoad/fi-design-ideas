# Paper Spec Alignment Audit

Date: 2026-06-07

Main Paper file: `https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0`

Prompt source: `docs/mobile-ui/paper-spec-alignment-audit-goal-prompts.md`

## Canonical Spec Locations

The canonical design specs are:

- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`
- `docs/mobile-ui/03-properties-spec.md`
- `docs/mobile-ui/04-liabilities-spec.md`
- `docs/mobile-ui/05-expenses-spec.md`
- `docs/mobile-ui/06-new-property-spec.md`
- `docs/mobile-ui/07-results-spec.md`

Use `docs/mobile-ui/README.md` as the index. Archived prompts and older UI docs in `docs/mobile-ui/archive/` are reference only.

## Executive Summary

Every audited Paper board is partially aligned, not fully aligned.

The main issue is not that the visual direction is completely wrong. The larger issue is that the boards are inconsistent as implementation references: several specs require explicit keyboard, validation, edit, delete, picker, long-list, recalculation, and error states that are either missing or only implied.

Most urgent fixes:

1. Remove or archive spec-contradicting states in Expenses and Liabilities.
2. Bring all boards to the same 7-step progress/top-chrome grammar.
3. Expand New Property and Results from polished samples into full implementation state libraries.
4. Add missing keyboard, validation, edit/delete, and long-list stress states across Income, Properties, Liabilities, Expenses, New Property, and Results.
5. Clean canonical language: `Dependents`, `Employment type`, `Base income`, `Purchase purpose`, and no obsolete suggested-expense or closing-before-settlement copy.

## Audit Matrix

| Step | Paper board | Verdict | Main gap |
| --- | --- | --- | --- |
| 1. About You | `Canonical comprehensive states - About You` | Partially aligned | Mostly canonical, but copy/state polish remains. |
| 2. Income | `Canonical comprehensive states - Income` | Partially aligned | Missing keyboard/applicant-selector states and canonical labels. |
| 3. Properties | `Canonical comprehensive states - Properties` | Partially aligned | Missing edit/delete, keyboard, validation, and long-list coverage. |
| 4. Liabilities | `Canonical comprehensive states - Other Liabilities` | Partially aligned | Contains forbidden aggregate/closing logic and wrong progress grammar. |
| 5. Expenses | `Canonical comprehensive states - Expenses` | Partially aligned | Contains obsolete suggested-expense and low-confidence logic. |
| 6. New Property | `Canonical comprehensive states - New Property v2` | Partially aligned | Too small; missing key selected, keyboard, validation, and recalculation states. |
| 7. Results | `Results v8 - Clean selected card + detail flow` | Partially aligned | Stronger direction, but missing recalculation, error, long-list, all-lenders, and validation states. |

## 1. About You

Verdict: partially aligned, closest to canonical.

Missing:

- Explicit labelled keyboard-dismissed state with CTA restored.

Mismatches:

- Use `Dependents` / `dependent` as the canonical product copy.
- Two-applicant not-couple top state only weakly shows that Applicant 2 continues below.
- Required validation does not clearly show preservation of partially entered values.

Visual issues:

- Status bar/battery rendering varies between states.
- Bottom annotation cards are tight/clipped.

Priority fixes:

- Keep user-facing and annotation copy as `Dependents`.
- Add dismissed-keyboard state.
- Strengthen the long two-applicant continuation cue.
- Adjust artboard/grid height to avoid clipped annotations.

Keep/archive:

- Keep as canonical base. No visible deprecated variation set needs archiving.

## 2. Income

Verdict: partially aligned.

Missing:

- Employer-name focused text keyboard.
- Base-income focused numeric/currency keyboard.
- Applicant selector open.
- Page-level validation for `Add at least one income`.
- Optional: first-visit state may omit the gross annual income total rather than showing `$0`.
- Very-large-income stress state.

Mismatches:

- Keep `Employment type` as the canonical product label.
- Uses `Base salary` / `Enter base salary`; spec says `Base income` / `Enter base income`.
- Validation CTA says `Save income`, reintroducing generic income language.
- `HECS/HELP balance optional` is slightly off because blank or `$0` should imply none.

Visual issues:

- Mostly follows mobile grammar, but sheet states can feel cramped.
- Validation suite reads like an audit compilation rather than a realistic attempted-save state.

Priority fixes:

- Add missing keyboard and applicant-selector states.
- Do not add `Gross annual income $0` to the empty first-visit state.
- Split validation into real attempted-save/continue states.
- Rename employment/base copy to canonical labels.
- Remove generic `Save income`.

Keep/archive:

- Keep main add employment, expanded components, add other income, review, edit, delete, and long-review states.
- Archive or relabel `Variation A/B/C/D` framing once the canonical path is chosen.

## 3. Properties

Verdict: partially aligned.

Missing:

- Keyboard states for postcode, property value, rental income, loan balance, and repayment.
- Validation states for missing property value, loan balance, repayment, and ownership.
- Picker/open states for loan purpose, lender, and ownership.
- Prefilled edit states and delete confirmations for property and home loan.
- Long-list stress with multiple properties and multiple loans.

Mismatches:

- Add home loan sheet omits `Interest-only term`.
- Investment add sheet uses `Postcode` instead of `Property postcode`.
- Investment review compresses `Rental income` / `Property expenses` to `Rent` / `Expenses`.
- Sheet headers visually collide in add property and home loan states.

Visual issues:

- Core frames, teal controls, and progress are broadly consistent.
- Bottom-sheet states lose or obscure progress and have cramped top spacing.

Priority fixes:

- Add missing interaction and validation states.
- Add full edit/remove flows.
- Add long-list top/mid/bottom stress states.
- Fix clipped sheet headers.
- Add `Interest-only term`.
- Normalize labels to spec language.

Keep/archive:

- Keep existing seven states as a starter row.
- Expand in place; no extra variations are currently causing major ambiguity.

## 4. Liabilities

Verdict: partially aligned.

Missing:

- Explicit prefilled edit state.
- Full validation set beyond credit card limit: approved limit, current balance/outstanding balance, repayment, frequency, and commitment name.

Mismatches:

- Empty state disables `Continue`; no-liability users must be able to continue.
- Saved review and long-list states show `Total exposure`, which the spec forbids.
- Car loan and margin loan include `Closing before settlement`, which is out of MVP.
- Closing/no-closing review variants should be archived.
- Remove-confirmation background shows `$620 monthly`, conflicting with the rule to avoid repayment values in saved review.
- Personal-loan keyboard uses `Amount owing` while the add sheet/spec use `Current balance`.

Visual issues:

- Progress appears as 5 segments, not the canonical 7-step flow.
- Typography mixes system UI and Host Grotesk.
- Liability icons read like tiny monochrome UI glyphs rather than the warm illustrated icon system.
- Long-list total wraps awkwardly.
- Remove modal button text/spacing is cramped.

Priority fixes:

- Enable empty-state `Continue`.
- Remove all aggregate exposure UI.
- Delete/archive closing-before-settlement states and switches.
- Add missing validation variants.
- Add one edit/prefilled drawer state.
- Standardize progress, font, and icon treatment.

Keep/archive:

- Keep flat picker, type-specific add sheets, keyboard states, frequency picker, saved review, remove confirmation, validation shell, and long-list stress as base material.
- Archive closing/no-closing review states and any variation preserving aggregate totals or disabled no-liability continue.

## 5. Expenses

Verdict: partially aligned.

Missing:

- Two-applicant not-couple household/application copy.
- Validation for `Enter at least three categories or a total above $0`.
- Validation examples for rent/board and childcare/education.
- Clear non-monthly normalized value example in category review.

Mismatches:

- Contains forbidden suggested-expense states/copy: `Use suggested expenses?`, `Suggested monthly expenses`, `Continue with suggested`, `Suggested was $5,210`.
- Contains forbidden low-confidence warning: `This is much lower than the suggested estimate`.
- Uses shortened labels such as `Groceries`, `Utilities`, `Health`, `Recreation`, `Rent`, `Other` instead of canonical labels.
- Rent appears mixed into the baseline list, but spec says rent/board should be conditional and visually separate.
- Visible in-phone design note: `CTA hidden while typing.`

Visual issues:

- Several total values wrap final digits onto a new line.
- Category icons look supportive but may be placeholder-like rather than confirmed cleaned transparent PNG assets.
- Some category review rows lack a clear edit affordance.
- Dense money/frequency lanes are vulnerable to wrapping.

Priority fixes:

- Remove/archive suggested-expense and low-confidence states.
- Replace separated-applicant state with household/application copy for not-couple applicants.
- Fix total widths so money never wraps.
- Normalize category labels and rent/board behavior.
- Add missing validation states.

Keep/archive:

- Keep direct edit baseline, compact chips, edit sheet, keyboard, frequency picker, rent enabled, childcare prominent, single applicant, two applicants together, edited summary, missing amount validation, and dense stress.
- Archive or rebuild suggested-expense, low-confidence warning, and two-applicants-separated states.

## 6. New Property

Verdict: partially aligned.

Missing:

- Optional property price focused with numeric keyboard.
- Investment selected state.
- First home buyer unselected state.
- Capitalise purchase costs selected in the main form.
- Lightweight stamp-duty/purchase-cost recalculation state.
- Separate validation examples; current board has one combined validation screen.

Mismatches:

- Resting form shows `NSW` selected, which can imply a default. Spec says state must be explicitly selected and not inferred.
- `Purpose or FHB changed` behavior is not represented.
- Capitalise helper copy is compressed in resting state.

Visual issues:

- Individual phone states are clean and consistent.
- Board is much smaller than the other comprehensive boards, so it reads as a partial row rather than a canonical library.
- Picker/explainer overlays heavily ghost the underlying screen, which makes implementation reference weaker.

Priority fixes:

- Add optional property price keyboard.
- Add selected variants for `Investment`, FHB `No`, and capitalise costs enabled.
- Add recalculating state tied to assumption changes.
- Split validation or label the combined all-errors screen clearly.
- Add blank baseline or clarify the current screen as prefilled after selection.

Keep/archive:

- Keep `New Property v2` as the current base.
- Mark incomplete until interaction states are added.

## 7. Results

Verdict: partially aligned.

Missing:

- Long lender-list scroll with sticky/accessible result summary.
- Expanded all-lenders state behind `View all lenders`.
- Recalculating state with stable header, skeleton rows, disabled CTA, and `Recalculating lender estimates...`.
- Partial unavailable/error recovery with `Contact support` and `Update details`.
- Property-edit validation examples: `Choose a state`, `Enter savings`, `Choose purchase purpose`.

Mismatches:

- Tighten `Purpose` to `Purchase purpose`.
- Remove or soften implementation-facing copy like `Saving returns to Results...` and `Conditional terms appear only when they matter.`
- Keep `Policy fit` only if the calculation/product model supports it.

Visual issues:

- Strong 393 x 852 framing, 32px rails, progress treatment, teal active states, anchored CTA, and external labels.
- Pure black primary CTAs differ from the newer Fundora direction preferring dark Daria green-navy.
- Detail chooser icons should be checked against the no-badge, transparent-background, prop-icon rule.

Priority fixes:

- Add recalculating and unavailable/error states.
- Add long-scroll and all-lenders behavior.
- Add validation variants for editable property details.
- Choose one take-forward selected-lender model and demote extra variants.
- Clean product-facing microcopy.

Keep/archive:

- Keep core flow row, clean selected card, inline expansion, funds receipt, non-top selected, and M5 prep action stack.
- Archive or move extra strong-card explorations after the selected-lender model is chosen.

## Suggested Execution Order

1. Expenses cleanup: remove/archive suggested-expense and low-confidence states.
2. Liabilities cleanup: remove aggregate totals and closing-before-settlement logic; fix disabled continue.
3. About You polish: `Dependents`, dismissed keyboard, annotation fit.
4. New Property expansion: add missing state coverage.
5. Results expansion: add recalculation/error/all-lenders/validation states.
6. Income expansion: add keyboard/applicant-selector states and copy cleanup.
7. Properties expansion: add edit/delete, validation, picker, keyboard, and long-list states.

## Agent Passes

Each spec was reviewed by a separate read-only sub-agent against the main Paper file:

- About You: `019e9f79-c256-7ab2-b194-bc6ba2034cd5`
- Income: `019e9f79-d940-7e01-b4e7-6751e6007cac`
- Properties: `019e9f79-f729-7ff1-aa0d-bda0fd75ac5a`
- Liabilities: `019e9f7a-0aae-7fe0-b5c4-38bb02880b30`
- Expenses: `019e9f7a-27ab-70c3-a206-7c188c62578f`
- New Property: `019e9f7a-3cd0-7800-9106-dfa622cda4bf`
- Results: `019e9f7a-661e-79c3-84e3-8ab15c34c632`
