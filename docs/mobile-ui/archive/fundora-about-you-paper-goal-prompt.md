# Fundora About You Paper Goal Prompt

Use this prompt when asking an agent to improve or extend the Fundora `About you` mobile Paper designs.

```markdown
Goal: Improve the Fundora Paper mobile UI states for the "About you" applicant input flow.

Paper context:
- Work in this Paper file/page: https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0
- Target page ID: 3-0
- Page name: Inputs
- Use this original mobile concept as visual inspiration, but do not copy its old FundIQ branding or outdated field logic: https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/01KMVY07H36M706X5HW9VW56B4/GZ1-0
- Preserve the non-phone review/logic map if useful, but update it for Fundora and the latest rules.
- Improve, replace, or delete the current V2 phone artboards as needed. Do not keep flawed frames just because they already exist.
- Remove any obsolete artboards, especially suburb confirmation/chooser states or phone screens containing design commentary.

Use the existing Fundora design direction, but raise the polish substantially. The result should feel like a compact, Mobbin-inspired iOS onboarding/form flow: tidy, calm, scan-friendly, and production-realistic. Prioritize equal sizing, consistent typography, clean control hierarchy, and realistic mobile interaction states.

Cross-step consistency:
- About You is the canonical visual reference for all Fundora mobile input steps.
- Preserve its 393 x 852 device size, 32px rails, status/nav/progress stack, typography hierarchy, teal active controls, bottom safe-area CTA rhythm, and adjacent out-of-phone state annotations.
- When reviewing Income, Properties, Other Liabilities, or Expenses, make them look like siblings of this About You set rather than separate visual directions.
- Also follow the canonical Paper scaffold in `docs/mobile-ui/mobile-assessment-interaction-states.md`.
- The Paper page must contain a comprehensive canonical state library, not just one preferred screen. Every required state should be visible and labelled outside the phone.
- The About You state library must be a single clean section. Do not create scattered duplicate sections or separate mini-flows for dependents or postcodes.

Hard requirements:
- Brand name is Fundora, never FundIQ.
- If targeting iPhone 16, phone artboards must be 393 x 852 logical iPhone dimensions.
- Use 390 x 844 only if the brief explicitly asks for the common generic iOS baseline.
- Phone artboards must contain only user-facing UI that an applicant would actually see.
- Do not put explanatory review notes, design commentary, state labels, or implementation descriptions inside phone screens.
- Any design notes or state explanations must sit outside or below the phone artboards as separate annotation text.
- Avoid stretched, awkward, or multi-row headings/controls unless absolutely necessary.
- Keep headings, labels, helper text, field text, and button text visually consistent.
- Postcode requires validation only. Do not add suburb confirmation or suburb chooser states.

Data requirements:
- Ask for number of applicants: one or two.
- If two applicants, ask relationship between applicants:
  - Couple
  - Not couple
- If one applicant, ask marital status for that applicant:
  - Single
  - Couple
- If two applicants and couple, ask dependents once for the household.
- If one applicant, ask dependents for that applicant.
- If two applicants and not couple, ask marital status individually for applicant 1 and applicant 2, using Single/Couple controls.
- If two applicants and not couple, ask dependents individually for applicant 1 and applicant 2.
- Dependents options are exactly: 0, 1, 2, 3, 4+.
- Treat 4+ as four for now.
- Ask residential postcode.
- If two applicants are not a couple with each other, collect postcodes separately for applicant 1 and applicant 2.
- Validate postcode as a valid Australian postcode only.
- No age of dependents is required.
- Dependents and postcodes are not separate pages in this flow. They live on the relevant About You screen.

Required Paper states/artboards:
1. One applicant, single.
2. One applicant, couple.
3. Two applicants, couple.
4. Two applicants, not couple, with applicant 1 marital status, applicant 2 marital status, applicant 1 dependents, applicant 2 dependents, applicant 1 postcode, and applicant 2 postcode on the same screen.
5. Same-screen postcode focused with numeric keyboard; the screen remains recognisably the full About You form, not a postcode-only page.
6. Two applicants, not couple, lower scroll position showing applicant 2 marital status, dependents, and residential postcode at the same full-size rhythm as the top state.
7. Dependents 4+ selected within the relevant full About You screen, not on a separate dependents-only page.
8. Required-field validation after tapping Continue with missing required values; errors stay inline on the same About You screen.
9. Invalid postcode validation after entering a non-valid Australian postcode; do not add suburb lookup or suburb confirmation.

Interaction/design guidance:
- Prefer segmented controls or equal-width button groups for short mutually exclusive choices.
- For two-option controls, use compact equal-width segmented buttons.
- For dependents, use a compact 5-option segmented control: 0, 1, 2, 3, 4+.
- Use input fields for postcode with numeric keyboard behavior.
- Keep CTAs consistent across states.
- In resting states, the primary CTA must sit in a bottom action area anchored to the bottom safe area, not directly after the last form field unless the form content genuinely fills the screen.
- The CTA area should feel integrated into the screen. Do not add a horizontal separator line above the CTA by default; only use one if the CTA is intentionally sticky over scrollable content and the divider is visually subtle.
- If content is short, use flexible vertical space between the final field and the bottom CTA so the CTA lands near the bottom of the screen.
- If content is long, the form can scroll behind/above a bottom CTA, but the CTA should remain visually pinned to the bottom safe area in resting states.
- Maintain comfortable bottom padding below the CTA for the iOS home indicator/safe area.
- Hide or remove the bottom CTA while the keyboard is open if it would collide with the keyboard.
- Keyboard states should show the actual numeric keypad, not placeholder text.
- When the postcode field receives focus, show the page repositioned so the field and label sit clearly above the keyboard with a visible breathing gap, not touching the keyboard edge.
- Avoid large gaps, oversized labels, and unnecessary helper text.
- Use user-facing copy only: concise, plain, and useful.
- Make the flow feel like a real mobile assessment screen, not a design review board.
- If a screen needs explanation, add a small annotation outside the artboard.

QA checklist:
- The About You library covers every current required state: applicant combinations, dependents, the standard postcode focused keyboard, the lower scroll position for the long two-applicant not-couple form, required-field validation, and invalid-postcode validation.
- All iPhone 16 phone artboards are exactly 393 x 852 unless the brief explicitly chooses another device size.
- Every phone artboard contains only user-facing UI.
- No state names, design notes, or explanatory comments appear inside phone screens.
- Brand says Fundora everywhere.
- No FundIQ references remain.
- No suburb confirmation or suburb chooser states exist.
- "Who is applying?" or equivalent heading fits cleanly on one row.
- Controls are equal-sized where appropriate.
- Typography is consistent: labels, values, helper text, and errors use a clear hierarchy.
- In resting states, the Continue CTA is anchored near the bottom safe area, not floating halfway up the screen.
- The Continue CTA does not have an unnecessary separator line above it.
- Short forms use flexible empty space above the CTA, so the CTA still feels like the screen's bottom action.
- Long forms preserve access to the CTA without covering form content.
- No text bleeds outside containers.
- No UI overlaps or clips on any artboard.
- Keyboard states keep the focused postcode field visible.
- Keyboard states leave comfortable white space between the focused postcode input and the keyboard.
- Keyboard states do not leave the CTA hidden behind the keyboard.
- Long two-applicant not-couple content has a separate scrolled-down view showing applicant 2 fields at full size.
- Single applicant states ask marital status.
- Two-applicant states ask relationship between applicants.
- Two couple applicants share dependents and postcode.
- Two not-couple applicants have separate dependents and postcodes.
- Two not-couple applicants also have separate marital status controls for applicant 1 and applicant 2.
- No dependents-only or postcode-only screens appear in the canonical section.
- Dependents options are exactly 0, 1, 2, 3, 4+.
- Do not create a separate applicant-2-postcode keyboard artboard for About You. Use the lower scroll position for the long form, and keep keyboard coverage to the standard full-form postcode focused state unless the product flow explicitly changes.
- Required and invalid-postcode validation states are required in the canonical About You section. Keep them as full-form About You screens, not standalone error pages.
- Screens look polished enough to review as realistic mobile product UI.
```
