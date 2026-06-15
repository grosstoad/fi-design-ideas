# About You Cleanup Plan

Use this as the working goal prompt for the current Paper correction pass.

```markdown
Goal: Clean up the Fundora About You Paper state library so it is logically correct, visually polished, and easy to review.

Paper target:
- File/page: https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0
- Primary section: Canonical comprehensive states - About You
- Reference: the older V2 not-couple screen at MKC-0 is closer to the desired one-screen structure than the newer SVW-0/SXI-0/SYN-0/T0A-0 states.

Product rules:
- Change all applicant relationship/marital copy from `Married/couple` to `Couple`.
- One applicant asks marital status: Single/Couple, dependents, residential postcode.
- Two applicants who are a couple ask relationship: Couple/Not couple, shared household dependents, shared residential postcode.
- Two applicants who are not a couple stay on one About You screen and ask:
  - applicant 1 marital status: Single/Couple
  - applicant 1 dependents
  - applicant 1 residential postcode
  - applicant 2 marital status: Single/Couple
  - applicant 2 dependents
  - applicant 2 residential postcode
- Dependents are never a standalone page in the canonical flow.
- Postcodes are never standalone pages in the canonical flow.
- Keyboard states must be same-screen focused variants with the full About You context still visible and a real numeric keypad rendered.
- The two-applicant not-couple flow needs both a top-of-form view and a lower scrolled view; do not represent applicant 2 as a separate postcode-only or applicant-2-keyboard page.
- Validation states are required:
  - required-field validation after tapping Continue with missing required values
  - invalid Australian postcode validation after entering an invalid postcode

Paper cleanup requirements:
- Keep the canonical About You section as one clear section, not scattered duplicates.
- Rename or remove obsolete/deprecated dependents-only and postcode-only canonical cards.
- Replace the current two-applicant not-couple card if needed so it follows the older one-screen MKC-0 structure plus the new separate marital-status controls.
- Update labels/annotations outside the phone so reviewers understand which state each screen represents.
- Use the existing About You visual system: 393 x 852 device, 32px rails, system UI typography, teal active controls, compact segmented controls, anchored bottom CTA, and external state labels.
- Do not add new decorative styling or explanatory copy inside the phone.

QA:
- Screenshot the corrected About You section.
- Confirm no `Married/couple` copy remains in the corrected canonical About You section.
- Confirm the not-couple top and scrolled screens together show both applicants' marital status, dependents, and postcodes as one continuous screen.
- Confirm keyboard states show numeric keypads and are not misleading standalone pages.
- Confirm no applicant-2-postcode-only keyboard card remains in the canonical section.
- Confirm required-field and invalid-postcode validation states remain in the canonical section as full About You screens.
- Because the Paper file is already over the safe size limit, prefer targeted text/style/deletion edits over broad rebuilding.
```
