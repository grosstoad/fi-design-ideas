# Income Capture Paper Goal Prompt

Use this prompt when asking an agent to create or improve the mobile Paper designs for the Income step.

```markdown
Goal: Create polished mobile Paper designs for the Fundora Income step.

Source of truth:
- Primary: `docs/mobile-ui/income-capture-mobile-plan.md`
- Also follow: `docs/mobile-ui/income-capture-ui-spec.md`, `docs/mobile-ui/mobile-assessment-interaction-states.md`, `docs/mobile-ui/fundora-about-you-paper-goal-prompt.md`, `CODEX_DESIGN_SYSTEM.md`, and `docs/design.md`.
- Visual source of truth: the current About You Paper screens. Match their 393 x 852 device, 32px content rail, status/nav/progress stack, system UI typography, teal active controls, bottom safe-area CTA, and adjacent out-of-phone state labels.

Paper context:
- Work in the existing Fundora/FundIQ Paper file/page used for input-flow explorations.
- If matching the About You setup, target the Inputs page: https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0
- Create the Income screens near the existing income-capture area.
- Phone artboards must contain only user-facing UI. Put notes outside artboards.

Brand and device:
- Use Fundora naming unless matching an existing FundIQ comparison area.
- Prefer iPhone 16, 393 x 852. Use 390 x 844 only if matching the local baseline.

Key decisions:
- Show one prominent `Gross annual income` total on mobile.
- Income sources belong to applicants; add/edit flows include applicant selection for two-applicant cases.
- First visit should make employment income immediately easy to add, with Applicant 1 selected by default.
- Use `Add employment income` and `Add other income`; never `Add Applicant 1 employment income` or generic `Add income`.
- Employment source fields/components and exclusions are defined in the plan. Follow them exactly.

Required mobile states:
- First visit / employment-first entry.
- Add employment income sheet.
- Add other income sheet.
- Saved review with one income source.
- Saved review with two applicants and multiple income sources.
- Edit employment income.
- Edit other income.
- Applicant selector open.
- Frequency picker open.
- Optional employment components expanded.
- Employer name focused with text keyboard.
- Base income focused with numeric/currency keyboard.
- Missing employer validation.
- Missing base income validation.
- Very large income value layout check.

Create five distinct mobile variations:

- Inline Starter.
- Bottom Sheet First.
- Sticky Total.
- Applicant Group Review.
- Progressive Components.

Visual guidance:
- Calm, compact, Mobbin-inspired iOS form flow.
- Income must look like the same product session as About You, not a separate income-module concept.
- Borrow compact headers, quiet grouped rows, bottom sheets, concise review rows, and one primary number. Do not copy screens directly.
- Use Fundora's calm workspace direction from `CODEX_DESIGN_SYSTEM.md`.
- Avoid loud gradients, heavy shadows, card-on-card layouts, decorative fintech green, and generic calculator styling.
- Use sentence case, tabular numerals for money, equal-sized controls where appropriate, and realistic keyboard/safe-area behavior.

Output:
- A comprehensive canonical Income state library in the About You visual system, with every required state visible and labelled outside the phone.
- Optional exploratory variation rows may remain, but they are secondary to the canonical library.
- If variation rows are created, each variation should include the core entry, add employment, add other income, review, and validation treatment.
- A short written recommendation naming which variation or hybrid should be taken forward.
- Explicitly state how the gross annual total is handled.
```
