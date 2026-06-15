# Expenses Capture Paper Goal Prompt

Pasteable goal prompt for the redone Expenses Paper pass. Keep the prompt body under 4000 characters for Codex goal entry.

```markdown
Goal: Redesign the Fundora mobile Expenses flow in Paper as a pixel-perfect, implementation-grade state library.

Paper:
- Add the new/redone Expenses work to the lighter canonical input-flow file:
  https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58
- Use the old Expenses work only as audit/reference material, not as the target to patch:
  https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/SR9-0
  https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/RU4-0
- Place the new section near About You, Income, Properties, and Other Liabilities.

Docs to follow/update:
- `docs/mobile-ui/expenses-capture-mobile-plan.md`
- `docs/mobile-ui/mobile-assessment-interaction-states.md`
- `CODEX_DESIGN_SYSTEM.md`, `docs/design.md`
- Update relevant MD if the design direction changes while working.

Visual source of truth:
- Match About You/SR5 exactly: 393 x 852 iPhone frame, 32px rails, status/nav/progress stack, system type, teal controls, 48px inputs, anchored safe-area CTA, and notes outside phone frames only.

Product direction:
- Entry screen should test showing all expense categories immediately, with easy direct editing of amount and frequency per category.
- Baseline entry title is `Your expenses`, not `Your monthly expenses`.
- Show an income-style total summary as `$7,180 monthly total`; do not lead with `Suggested monthly total`.
- Expenses are still household/application-level by default. Do not double-count home loans, investment property expenses, rent from properties, credit cards, personal/car loans, HECS/HELP, or other liabilities captured earlier.
- Categories: Groceries and household, Utilities and bills, Transport, Insurance, Health and medical, Childcare and education, Recreation and personal, Rent or board, Other regular expenses.
- Use cleaned alpha PNG category icons from `output/imagegen/expense-category-icons/cleaned/` at 24-28px; no baked checkerboard backgrounds.
- Make Rent or board conditional/separate. Make Childcare prominent when dependants exist.
- Low declared expenses should show a warning, not a hard block.

Applicant/copy variations to explore:
- Single applicant: copy like `Your expenses`.
- Two applicants together: copy like `Your household expenses` or `Sarah and Alex's expenses`, with one household total.
- Two applicants separated: explore grouped copy for `Applicant 1` and `Applicant 2`, but keep the total clearly household-level and avoid making every category feel painfully duplicated unless the variation proves useful.

Required states:
- Direct-edit category entry with all categories visible.
- Category row amount/frequency editing or a clear edit affordance.
- Edit category bottom sheet.
- Amount focused with numeric keyboard and corrected scroll position.
- Frequency picker open.
- Rent or board enabled.
- Childcare and education prominent.
- Single-applicant copy.
- Two-applicant together copy.
- Two-applicant separated copy.
- User-edited summary/total.
- Continue with suggested/default values.
- Low-confidence warning.
- Missing amount validation.
- Dense long-list stress state.

Variations to create:
1. All categories direct-edit ledger, recommended baseline.
2. Direct-edit with compact amount/frequency chips.
3. Bottom-sheet edit model with bottom-anchored `Save category`, no generic included-in-suggestion filler.
4. Applicant copy: single vs two-together vs two-separated.
5. Dense/stress, tooltip/help, validation/keyboard states.

Quality bar:
Pixel-perfect only. Screenshot-review every state full-size and zoomed in. Compare against About You/SR5 for frame, rails, top chrome, progress, type, row rhythm, border radii, CTA position, safe-area spacing, notes, and color. Fix all clipping, wrapping, overlaps, uneven padding, cramped text, misaligned values, broken sheets, CTA/keyboard collisions, and inconsistent rows. Do not leave `good enough` states.

Finish by calling `finish_working_on_nodes` and report the new Paper section/artboards plus any caveats.
```
