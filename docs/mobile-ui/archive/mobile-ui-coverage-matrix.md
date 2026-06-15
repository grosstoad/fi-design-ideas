# Mobile UI Coverage Matrix

This matrix checks whether each mobile assessment step has a documented product model, fields, states, validation, keyboard behavior, and Paper execution guidance.

## Summary

| Step | Canonical plan | Product model | Inputs | States | Validation | Keyboard/pickers | Paper prompt | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| About You | `about-you-mobile-plan.md` | Yes | Yes | Yes | Yes | Yes | Yes | Good, now canonical |
| Income | `income-capture-mobile-plan.md` | Yes | Yes | Yes | Yes | Yes | Yes | Good |
| Properties | `properties-capture-mobile-plan.md` | Yes | Yes | Yes | Yes | Yes | Yes | Good |
| Liabilities | `liabilities-capture-mobile-plan.md` | Yes | Yes | Yes | Yes | Yes | Yes | Good |
| Expenses | `expenses-capture-mobile-plan.md` | Yes | Yes | Yes | Yes | Yes | Yes | Good |
| New property | `new-property-mobile-plan.md` | Partial | Partial | Partial | Partial | Partial | No | Needs alignment |
| Review before results | `review-before-results-mobile-plan.md` | Yes | Partial | Yes | Yes | N/A | No | Needs alignment |
| Results | `results-mobile-plan.md` | Yes | Partial | Yes | Partial | Partial | Yes | Needs alignment |

## Step Coverage Notes

### About You

Captured:

- Applicant count.
- One applicant marital status.
- Two applicant relationship.
- Two applicant not-couple individual marital statuses, dependants, and postcodes.
- Dependants options.
- Australian postcode validation.
- Keyboard and scroll behavior.
- Required and invalid-postcode validation.

Needs alignment:

- Whether two-applicant couples always share one postcode.
- Whether applicant names should replace generic applicant labels once known.
- Whether dependant ages are permanently out of scope.

### Income

Captured:

- Employment and other income source model.
- Applicant assignment for two applicants.
- Household gross annual income as the primary mobile total.
- Add/edit sheets.
- Saved review grouped by applicant.
- Optional employment components.
- Validation and keyboard/picker states.

Needs alignment:

- Whether HECS/HELP is excluded from Income and captured elsewhere.
- Whether Continue is disabled until income is saved or validation-triggered after Continue.
- Whether applicant reassignment is allowed in edit mode.

### Properties

Captured:

- Property-first model.
- Existing home loans attached to property records.
- Postcode as baseline, address as optional exploration.
- Owner-occupied/investment conditional fields.
- Ownership model.
- Home loan fields and split naming rules.
- Edit/delete and long-list states.

Needs alignment:

- Whether rental income is required for investment properties.
- Whether ownership custom percentages are in MVP.
- Whether address search should replace postcode before production.

### Liabilities

Captured:

- Application-level non-property commitments.
- Type-specific field model.
- Supported liability choices.
- Closing-before-settlement variation.
- Icon-led picker treatment.
- Review summary and dense stress state.

Needs alignment:

- Whether HELP, tax debt, child support, BNPL, and store finance stay out of the borrower UI for MVP.
- Whether closing-before-settlement is included in MVP or only an explored variation.
- Whether `Total exposure` is the right review summary label.

### Expenses

Captured:

- Household-level expenses.
- Double-counting exclusions.
- Suggested-expense starting point.
- Category model.
- Rent/board and childcare conditional treatment.
- Direct-edit, chip, and sheet-edit variations.
- Low-confidence warning.

Needs alignment:

- Source and threshold for suggested expenses.
- Whether rent/board is part of Expenses or New property when it stops after settlement.
- Whether two-applicant separated copy is ever used, or household copy is always preferred.

### New Property

Captured:

- State.
- Purpose.
- Savings.
- Optional target purchase price.
- Optional first home buyer.
- Recalculation and validation states.

Needs alignment:

- Whether this step asks for target price or only supports max-purchase calculation.
- Whether first home buyer concessions are implemented.
- Whether `Capitalise purchase costs` belongs here or only in Results assumptions.
- Whether state defaults from About You postcode.

### Review Before Results

Captured:

- Complete review.
- Edit affordance.
- Missing-section warning.
- Continue loading.
- Calculation failed/retry.

Needs alignment:

- Exact section summary rows.
- Which missing sections block results.
- Whether users can skip optional sections and still calculate.

### Results

Captured:

- Loaded, lender selected, assumptions editing, and recalculating Paper states.
- Fundora mobile visual direction.
- Max purchase price by lender.
- Scenario chips.
- Assumptions editing.

Needs alignment:

- Whether mobile Results is step 8 of 8, 8 of 9, or another progress count.
- Whether results values are static for MVP or update from assumptions.
- Whether comfortable range, lender detail, and funds-to-complete all appear on mobile.

## Documentation Health

Strengths:

- The middle capture steps are well documented and follow a repeatable pattern.
- Global mobile interaction behavior is unusually explicit, especially keyboard and CTA behavior.
- The docs correctly separate Paper annotations from in-phone user-facing UI.

Risks:

- About You was previously split between cleanup and Paper prompt docs; `about-you-mobile-plan.md` now fixes that.
- New property, Review, and Results need canonical plans before implementation starts.
- Some legacy naming still alternates between FundIQ and Fundora depending on context. Input-flow screens should use Fundora.
