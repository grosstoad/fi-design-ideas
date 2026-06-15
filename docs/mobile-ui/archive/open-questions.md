# Mobile UI Open Questions

These are the alignment questions that remain after reviewing and reorganizing the mobile UI Markdown files.

## Highest Priority

1. Should the assessment flow be 8 steps or 9 steps in mobile progress?

Current docs mention About You, Income, Properties, Liabilities, Expenses, New property, Review, and Results. The Results Paper prompt says `8 of 9`, which implies another step may exist or the count is stale.

2. Is New property a target-price step or a max-purchase scenario step?

The docs need a product decision on whether borrowers enter a desired purchase price, or whether Fundora calculates their max purchase price from serviceability and savings.

3. Where should `Capitalise purchase costs` live?

It appears naturally in Results assumptions, but it may also belong in New property if it affects the purchase scenario before calculation.

4. What is the MVP treatment for HELP/HECS?

Income says HELP usually belongs in Liabilities, while Liabilities excludes HELP from the borrower UI pass. We need one explicit MVP owner or an explicit decision to infer it from income/tax data later.

5. Which sections can be skipped?

Properties, Liabilities, and some Expenses categories allow continuing with no rows. The Review step needs rules for what blocks results versus what is optional.

## Step-Level Questions

### About You

- Should two applicants who are a couple always share one residential postcode?
- Should applicant names replace `Applicant 1` and `Applicant 2` once names are available?
- Are dependant ages definitely out of scope for MVP?

### Income

- Should Continue be disabled until at least one income source is saved, or should missing income be shown as validation after Continue?
- Can an income source be reassigned to another applicant during edit?
- Are optional employment components hidden behind disclosure by default, or visible as empty rows?

### Properties

- Is rental income required when a property is marked investment?
- Is custom ownership percentage needed in MVP, or is `Joint` enough for two applicants?
- Should postcode remain the production input, or should address search replace it before implementation?

### Liabilities

- Is closing-before-settlement in MVP, or only explored as a variation?
- Should child support, tax debts, BNPL/store finance, and HELP be excluded from borrower UI, or added as later liability types?
- Is `Total exposure` the right summary label for mixed credit limits and debt balances?

### Expenses

- What data source produces suggested expenses?
- What threshold triggers the low-confidence warning?
- Should rent/board be captured here only if it continues after settlement?
- Should the default two-applicant copy always be household-level?

### New Property

- Should state default from About You postcode?
- Are first home buyer concessions included in MVP?
- Should purchase price be optional, required, or absent?
- Does this step need a dedicated Paper prompt before design work starts?

### Review Before Results

- What exact summary rows should appear for each completed section?
- Which missing inputs are warnings and which block calculation?
- Should users be able to edit in-place from Review, or route back to each step?

### Results

- Should mobile results include funds-to-complete, or only max purchase price by lender for the first pass?
- Should the comfortable number/range be a first-class result below the maximum?
- Do lender detail rows need repayments, rate, loan amount, and LVR in MVP?
- Are result values static in the prototype, lightly reactive, or calculation-backed?
