# Paper Spec Alignment Audit Goal Prompts

Use these prompts to audit the current Fundora Paper mobile flow against the canonical numbered specs.

## Source Of Truth

- Main Paper file: `https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0`
- Canvas start: `START HERE - LIVE canvas map`
- Canonical spec index: `docs/mobile-ui/README.md`
- Shared design system: `CODEX_DESIGN_SYSTEM.md`
- Shared visual guide: `docs/design.md`

The canonical flow has seven steps:

1. About You
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New Property
7. Results

There is no separate Review step before Results.

## Accepted Product Copy Overrides

- About You uses `Dependents`, not `Dependants`.
- Income uses `Employment type`, not `Employment arrangement`.
- Income empty state does not need to show `Gross annual income $0`.

## Paper Boards To Audit

| Step | Spec | Paper board |
| --- | --- | --- |
| 1. About You | `docs/mobile-ui/01-about-you-spec.md` | `Canonical comprehensive states - About You` |
| 2. Income | `docs/mobile-ui/02-income-spec.md` | `Canonical comprehensive states - Income` |
| 3. Properties | `docs/mobile-ui/03-properties-spec.md` | `Canonical comprehensive states - Properties` |
| 4. Liabilities | `docs/mobile-ui/04-liabilities-spec.md` | `Canonical comprehensive states - Other Liabilities` |
| 5. Expenses | `docs/mobile-ui/05-expenses-spec.md` | `Canonical comprehensive states - Expenses` |
| 6. New Property | `docs/mobile-ui/06-new-property-spec.md` | `Canonical comprehensive states - New Property v2` |
| 7. Results | `docs/mobile-ui/07-results-spec.md` | `Results v8 - Clean selected card + detail flow` |

## Per-Spec Audit Prompt

Goal: Review one Fundora mobile Paper board against its canonical spec and report what is missing, inconsistent, or not aligned.

Inputs:

- Read `docs/mobile-ui/README.md`.
- Read the assigned `docs/mobile-ui/0X-...-spec.md`.
- Read relevant shared guidance from `CODEX_DESIGN_SYSTEM.md` and `docs/design.md`.
- Open the main Paper file: `https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0`.
- Inspect the assigned Paper board only. Do not edit Paper.

Mandatory Paper workflow:

- Load `get_guide({ topic: "paper-mcp-instructions" })` first.
- Call `get_basic_info`.
- Call `get_selection`.
- Use screenshots and tree/node inspection as needed.
- Call `finish_working_on_nodes` before finishing, even though this is read-only.

Audit checklist:

- Does the Paper board include every required state in the spec?
- Are any obsolete states, labels, or flow assumptions present?
- Does the board match the shared mobile grammar: 393 x 852 phone states, top chrome, progress treatment, 32px rails, typography, teal active controls, safe-area CTA, validation styling, keyboard/sheet behavior, and external labels?
- Does the board avoid forbidden copy or fields from the spec?
- Does it use the right product language and borrower-facing labels?
- Are variations worth keeping, or are they causing ambiguity?
- Are there obvious fit, clipping, contrast, spacing, or alignment problems?

Return format:

1. Alignment verdict: `aligned`, `partially aligned`, or `not aligned`.
2. Missing required states.
3. Spec mismatches or obsolete states/copy.
4. Visual-system inconsistencies.
5. Highest-priority fixes.
6. Keep/archive recommendation for variations.
7. Notes on Paper limitations, missing access, or confidence.
