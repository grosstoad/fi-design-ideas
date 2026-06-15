# Paper Inputs Comprehensive QA Goal

Use this goal when reviewing the Fundora/FundIQ Paper Inputs page after creating or polishing the mobile state libraries.

```markdown
Goal: Perform a comprehensive quality pass on the Paper Inputs page across About You, Income, Properties, Other Liabilities, and Expenses.

Paper source:
- File/page: https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0
- Use the About You canonical screens as the visual source of truth.

Success criteria:
- Every major step has a comprehensive canonical state library, not just one preferred screen or one sample variation.
- Required states from `docs/mobile-ui/mobile-assessment-interaction-states.md` are represented as visible, labelled Paper screens.
- State labels and annotations sit outside the phone artboards.
- Phone artboards contain only applicant-facing UI.
- Income, Properties, Other Liabilities, and Expenses match About You across device size, content rails, header/progress treatment, typography, control sizing, padding, keyboard behavior, validation styling, CTA treatment, and annotation style.
- Primary actions and active controls use the About You teal unless a full-flow redesign explicitly changes the system.
- No black primary buttons remain in the canonical input-flow states.
- No FundIQ labels remain inside Fundora input screens unless the surrounding page is intentionally legacy/reference material.
- No text clips, overlaps, floats awkwardly, or appears inside the wrong container.
- Keyboard states keep focused fields visible, hide bottom CTAs when needed, and include explicit overlap/corrected-scroll checks for high-risk screens.
- Properties splits focused postcode, property value, loan balance, loan repayment, and validation states into separate labelled screens.
- Other Liabilities is labelled as `Other liabilities`, and home loans stay in Properties.
- Expenses remains household/application-level and does not duplicate property or liability capture.

Recommended deployment:
- Use independent audit threads for state coverage, visual consistency, and documentation consistency.
- Compare each audit against the Paper page and apply only targeted central edits.
- If Paper warns that the file is too large, avoid broad rebuilding in the current file. Document the limitation and continue expansion in a fresh duplicate file.

Deliverable:
- A polished Paper page that a first-time reviewer can scan confidently.
- Updated docs describing the canonical visual system and exact required state coverage.
- A concise QA report naming what changed, what passed, and any remaining file-size or coverage risks.
```
