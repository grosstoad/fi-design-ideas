# Mobile UI Specs

This folder contains one canonical spec per Fundora mobile assessment step.

## Canonical Specs

| Step | Spec |
| --- | --- |
| 1. About You | `01-about-you-spec.md` |
| 2. Income | `02-income-spec.md` |
| 3. Properties | `03-properties-spec.md` |
| 4. Liabilities | `04-liabilities-spec.md` |
| 5. Expenses | `05-expenses-spec.md` |
| 6. New Property | `06-new-property-spec.md` |
| 7. Results | `07-results-spec.md` |

## Component Specs

| Component | Spec |
| --- | --- |
| Funds to complete | `funds-to-complete-component-spec.md` |

There is no separate Review before Results step in the canonical flow. The user goes from New Property to Results.

## Paper Orientation

Use this table at the top of cleaned Paper files and cleanup prompts.

| Area | What to use | Status |
| --- | --- | --- |
| LIVE - Current mobile flow | Canonical borrower mobile flow, ordered 01-07 | Source for implementation |
| DESKTOP | Current desktop work only, under the matching step | Reference where available |
| VARIATIONS | Worth-keeping explorations, grouped by step | Secondary, not canonical |
| ARCHIVE | Old boards, superseded prompts, experiments | Historical only |

Canonical local docs are this README and specs `01-07`. There is no Review step. Archived prompts are reference only.

## Archive

Older Paper prompts, QA notes, completion audits, and superseded planning docs are archived in `archive/`. They are reference material only; the numbered specs above are the source of truth.

## Spec Standard

Each step spec should cover:

- Purpose
- Flow position
- Inputs and scope
- Product decisions
- State model
- Required mobile interaction states
- Validation rules
- Keyboard, picker, sheet, and safe-area behavior
- Visual guidance
- Paper prompt status, if a dedicated prompt is still needed
