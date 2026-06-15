# SR6 Income Capture Execution Plan

## Goal Prompt

Improve the Paper SR6 Income capture state library in `https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/SR6-0`.

Use these as source of truth:
- Product docs: `docs/mobile-ui/income-capture-mobile-plan.md`, `docs/mobile-ui/income-capture-ui-spec.md`
- Visual refs: `OHE-0` / `P1R-0` for simple employment component entry; `O8S-0` for review layout
- Style refs: `CODEX_DESIGN_SYSTEM.md`, `docs/design.md`

Core rules:
- Title stays `Add your income` on the main flow.
- Empty state has only `Add employment income` and `Add other income`.
- Employment fields: Applicant, Employer name, Employment type, Base salary, Bonus, Overtime, Commission, Allowances.
- Every amount has its own frequency in the same row or visual group.
- Use `Base salary`, not `Base salary / wages`.
- Do not include start date, source, rental income, shift/penalty rates, car allowance, notes, taxable toggles, or a generic add-income chooser.
- Other income fields only: Applicant, Income type, Amount, Frequency.
- HECS/HELP, if shown, is a single optional `HECS/HELP balance` field. No yes/no toggle.
- Add/edit sheet top-right action should be `Cancel`, not `Done`. Use `Done` only for read-only detail.
- Review rows show annualized totals on the right and the entered amount/frequency in row detail where useful.
- Applicant group labels should use `Subtotal $x per year`.
- Restore edit and delete flows for employment and other income.

Required SR6 states:
1. Empty / first visit: two action buttons only; explore icon-assisted button styling.
2. Add employment income: OHE/P1R-style sheet; compact base salary row, not oversized.
3. Employment components expanded: Base salary, Bonus, Overtime, Commission, Allowances.
4. Bonus frequency picker open: anchored to Bonus frequency control.
5. Overtime frequency picker open: anchored to Overtime frequency control.
6. Add other income: income type, amount, frequency only.
7. Other income frequency picker open.
8. Review: gross annual income, applicant subtotals per year, edit actions, annualized right-side totals.
9. Edit employment income: prefilled employment sheet with `Delete income`.
10. Edit other income: prefilled other-income sheet with `Delete income`.
11. Delete confirmation: shared pattern for income source removal.
12. Validation: missing employer, missing base salary, missing other-income type/amount/frequency.

Variations to show:
- A: OHE/P1R simple rows, recommended baseline.
- B: Slightly emphasized base salary, still compact.
- C: O8S-style review polish with annualized totals and balanced CTAs.
- D: Empty state with Fundora-style icons for the two add buttons.

Imagegen icon brief:
Generate two transparent UI prop icons in Fundora’s hand-drawn style: employment income as a tidy payslip or work badge; other income as coins plus a small document. Black ink linework, warm matte fills, muted teal/gold accents, readable at 32px, no enclosing circle, no text, no logos, no emoji, no gradients.

Execution:
- Read the docs first.
- Inspect `OHE-0`, `P1R-0`, `O8S-0`, and current `SR6-0`.
- Use Paper incrementally; write clean state labels outside phones.
- Screenshot-review spacing, typography, alignment, fit, and action consistency.
- Finish by calling Paper `finish_working_on_nodes`.
