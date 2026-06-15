# Paper Goal Prompt: Fundora Results v8 Clean Cathay Card Pass

## Target

Work in the Paper file:

`https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0`

Create one focused board only:

`Results v8 - Clean selected card + detail flow`

Place it near the latest Results boards. Do not create several boards.

## Mandatory Paper Workflow

- Load `get_guide({ topic: "paper-mcp-instructions" })` first.
- Open the target Paper file.
- Call `get_basic_info`.
- Call `get_selection`.
- Call `get_font_family_info` before typographic styling.
- Build in Paper, not prose.
- Use 393 x 852 mobile phone states inside the board.
- Screenshot after the core flow row and after the variation row; critique and fix spacing, typography, contrast, alignment, clipping, repetition, and artboard fit.
- Call `finish_working_on_nodes` at the end.

## Required Source Docs

Read these before designing:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/06-new-property-spec.md`
- `docs/mobile-ui/07-results-spec.md`
- `docs/mobile-ui/07-results-paper-goal-prompt.md`
- `docs/mobile-ui/07-results-cathay-card-paper-goal-prompt.md`

Use the existing About You / Income / New Property mobile Paper visual grammar as the implementation reference.

## User Feedback To Correct

The prior v7 image pass was too sloppy. Fix these specifically:

- Do not include the sentence `The largest lender estimate is $3.10M. Your selected lender can still be the better fit.`
- Do not add explanatory copy under the headline just to explain obvious ordering.
- Do not show progress/header/headline in a way that drifts from the existing Paper mobile Results/About You grammar.
- Do not use `CBA estimate`; it is redundant. Use `Selected lender`, `CBA Extra Home Loan`, or just `CBA`.
- The selected lender card must feel as clean as the Cathay Pacific card reference: one clear selected item card, crisp hierarchy, restrained metadata, strong alignment, no clutter.
- The details icons must be integrated into the sheet rows, not pasted as tiny thumbnails in empty boxes.
- Funds to complete needs more detail and a better relationship to the selected lender card.

## Board Structure

Create one board with:

1. A short board note outside the phones:
   - Clean selected lender card inspired by Cathay Pacific.
   - No redundant explanatory copy.
   - Sort is separate from details editing.
   - Funds to complete appears after lender selection.

2. Core flow row, five phones:
   - Default Results.
   - Selected lender clean Cathay-style card.
   - Selected lender with funds-to-complete action card.
   - Update details sheet with integrated icons.
   - Sort sheet.

3. Selected lender detail variations, five phones:
   - Clean card.
   - Compact inline expansion.
   - Bottom sheet detail.
   - Funds-to-complete receipt.
   - Non-top selected lender such as CBA while Macquarie remains top.

4. Detail editing destinations, three phones:
   - Property details.
   - Loan details.
   - Financial inputs route.

## Mobile Header And Result Rules

Use the existing Fundora mobile top chrome:

- `fundora`
- `Menu`
- progress label and progress bar consistent with the existing Paper flow.
- 32px rails.
- White / near-white surfaces.
- Fine borders.
- Teal active controls.

For the Results hero:

- Eyebrow: `Results`
- Heading: `Max property price by lender`
- Amount: `$3.10M`
- Use at most one short factual line when needed: `You may be able to afford a property up to $3.10M`
- Do not show the line on selected-lender states if it creates clutter.
- Do not say `Macquarie has the highest estimate`.
- Do not say `comfortable number`.
- Do not show default scenario chips.

## Selected Lender Card Requirements

The selected card should borrow from the Cathay Pacific reference:

- Small row label: `Selected lender`
- Right-side link: `View all lenders`
- A single white card with crisp 1px border and 8px radius.
- Top row:
  - Product/lender name, e.g. `CBA Extra Home Loan`
  - A quiet max-price block, e.g. `$2.92M`
- Middle:
  - A simple route/connection line or divider treatment if useful, not a decorative gimmick.
- Details inside the same card:
  - Rate.
  - Comparison rate.
  - Loan amount.
  - Monthly repayment.
  - LVR.
- No detached metric boxes.
- No `CBA estimate` label.
- No bulky explanatory paragraph inside or below the card.

Use example data:

- Product: `CBA Extra Home Loan`
- Max property price: `$2.92M`
- Rate: `6.18% p.a.`
- Comparison rate: `6.42% p.a.`
- Loan amount: `$2.61M`
- Monthly repayment: `$16,920`
- LVR: `76%`

For top lender example:

- Product: `Macquarie Basic Variable`
- Max property price: `$3.10M`

## Funds To Complete Requirements

Show funds-to-complete only after lender selection.

Create two treatments:

1. Action card below selected lender:
   - Title: `Funds to complete`
   - Primary value: `About $542k needed to settle`
   - Supporting line: `Deposit, purchase costs and remaining cash buffer.`
   - It should visually echo the Cathay `Prepare all your travel documents` card: compact, clear, secondary.

2. Receipt/detail state:
   - Deposit: `$356k`
   - Purchase costs: `$186k`
   - Capitalised costs: `$42k`
   - Cash needed to settle: `$542k`
   - Remaining cash buffer: `$44k`

Keep this as a secondary next-step after lender selection, not as a default Results headline.

## Update Details Sheet And Icons

Use the generated icon assets:

- Property details: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/property-details.png`
- Loan details: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/loan-details.png`
- Financial inputs: `/Users/sarah/Code/fi-design-ideas/output/imagegen/results-detail-icons/financial-inputs.png`

Rows:

- `Property details`
  - `State, purpose, savings and purchase costs.`
- `Loan details`
  - `Loan term, repayment type, product and rate type.`
- `Financial inputs`
  - `Income, expenses, liabilities and existing properties.`

Icon integration rules:

- Icons should feel anchored in the row, roughly 30-36px.
- Do not put icons inside pale empty thumbnail boxes unless the row layout makes the icon container purposeful.
- Align icon center, title baseline, supporting copy, and chevron.
- Use the icons as warm Fundora prop illustrations, not generic green UI icons.
- If the generated icon detail is too noisy at 30px, crop/scale more assertively or use a simplified treatment, but keep the Fundora style.

## Sort Sheet

Sorting is subtle and separate from editing details.

Default sort row:

- `Sorted by max property price`
- Action: `Sort`

Sort sheet copy:

- `Sorting changes the order, not your calculation.`

Options:

- Max property price.
- Monthly repayment.
- Interest rate.
- Comparison rate.
- Loan amount.
- LVR.
- Funds to complete.
- Policy fit.

Include one variation where sorting by monthly repayment puts CBA first while the global max remains `$3.10M`.

## Detail Editing Destinations

Show what happens after each Update details row:

### Property details

- State.
- Purpose.
- First home buyer.
- Savings.
- Optional property price in mind.
- Capitalise purchase costs.

### Loan details

- Loan term.
- Repayment type.
- Product type.
- Rate type.
- Conditional fixed-rate term when fixed is selected.
- Conditional interest-only term when interest only is selected.

### Financial inputs

Routes back to:

- Income.
- Expenses.
- Liabilities.
- Existing properties.

Copy should say saving returns to Results and recalculates.

## QA Bar

Before finishing:

- Check the selected card against the Cathay reference: clean, aligned, quiet, not boxy or cluttered.
- Confirm no redundant `CBA estimate` copy exists.
- Confirm the bad explanatory sentence is gone.
- Confirm the header/progress/headline match existing Paper mobile grammar.
- Confirm details icons feel integrated into rows.
- Confirm funds to complete has a real action-card and receipt treatment.
- Confirm no clipping under CTA.
- Confirm sorting is separate from editing details.
- Confirm all phones fit 393 x 852.
- Confirm `finish_working_on_nodes` was called.
