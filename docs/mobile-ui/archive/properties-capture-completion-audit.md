# Properties Capture Completion Audit

Last updated: 2026-05-31

## Current Status

The Properties capture work is close, but the persistent goal is not yet proven complete because the Paper MCP timed out during the final canonical-board verification pass.

## Evidence Gathered

- Product docs updated:
  - `docs/mobile-ui/properties-capture-mobile-plan.md`
  - `docs/mobile-ui/properties-capture-paper-goal-prompt.md`
- Imagegen reference exists:
  - `output/imagegen/property-capture-icon-screen-reference.png`
- Fresh canonical Paper file exists:
  - `https://app.paper.design/file/01KSXN0H5ZRH0R4NDQWCC3MBQK/1-0`
- Previous Paper tree inspection showed a canonical state grid with 18 states:
  - Empty first visit
  - Add owner occupied
  - Add investment
  - Add home loan
  - Review single home loan
  - Review multiple loans
  - Investment review
  - Edit property
  - Edit home loan
  - Delete property confirmation
  - Delete home loan confirmation
  - Validation
  - Property value keyboard
  - Loan repayment keyboard
  - Loan purpose picker
  - Long review top
  - Long review mid scroll
  - Long review bottom actions
- Original Inputs page targets were screenshot-reviewed after patching:
  - Empty state: title `Add your existing properties`, no no-property CTA, no home-loans helper copy, enabled Continue.
  - Add property sheet: ownership visible label `Joint`, top-right `Cancel`, home-loan affordance scoped to the property.
  - Single-loan review: no net-equity hero, no `Loan split 1`, no isolated add-loan CTA, no duplicate total loan balance row.
  - Investment review: rent and expenses compacted under the `Investment · Joint` context.

## Product Rules Covered

- Empty state uses only `Add property` and enabled `Continue`.
- Home loans stay attached to properties, not liabilities.
- Visible ownership label is `Joint`, not `Joint 50/50`.
- Review uses existing property value, not net property equity.
- Single-loan review shows a single home-loan row without `Loan split 1`.
- Loan split labels are reserved for multiple loans against the same property.
- Review-level global CTA is `Add property`; additional home loans are added from property add/edit flow.
- Edit property, edit home loan, delete property, delete home loan, validation, keyboard, picker, and long-list states are represented in the canonical board.

## Remaining Verification Needed

When Paper responds again, verify and, if needed, patch:

- Canonical board title should read `Add your existing properties` or otherwise clearly frame the canonical state library around the updated empty-state title.
- Canonical investment review should match the cleaned original: rent and expenses compactly under `Investment · Joint`, not as oversized separate review rows.
- Canonical long-list top state should use the same compact investment treatment.
- Add or verify missing keyboard states beyond the currently exported value/repayment examples:
  - Postcode focused with numeric keyboard.
  - Loan balance focused with numeric keyboard.
  - Rental income focused with numeric keyboard, if rental income remains a required interaction state.
- Add or verify an edit investment property state with prefilled rent and expenses grouped under investment details.
- Add or verify `Loan purpose` in the edit home loan sheet, not only in the add home loan sheet.
- Strengthen long-list multi-loan rows so the property with multiple loans shows nested loan split rows, not only a summary.
- Remove `$0` from no-loan property rows; use `No home loan` alone or omit the row when it is not helpful.
- Expand validation coverage if the canonical board is meant to prove every inline rule:
  - Postcode validation.
  - Ownership validation, if no default is set.
  - Estimated value, current balance, and repayment validation.
- Review CTA color strength. The exported canonical board's mint CTAs can read muted/disabled; compare against the stronger teal treatment used elsewhere in the Fundora input-flow set.
- Export a fresh proof image after the final Paper pass; the existing download at `/Users/sarah/Downloads/Canonical comprehensive states - Properties.png` appears older than the most recent canvas edits.
- Call `finish_working_on_nodes` after the final Paper verification.

## Not Complete Until

The goal should only be marked complete after a fresh Paper screenshot or export proves:

- The original targets and the canonical state library no longer contradict each other.
- The canonical board covers every required state listed in the product docs.
- No stale `I do not own property`, `Joint 50/50`, `Net property equity`, review-level `Add loan split`, or single-loan `Loan split 1` patterns remain visible in the relevant property screens.
