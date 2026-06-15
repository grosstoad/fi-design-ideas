# Paper Goal Prompt: Fundora Results

## Target Paper File

Work in:

https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58/3-0

Create a clearly discoverable board or frame named:

`Canonical comprehensive states - Results v2`

Place it near the existing Fundora input-flow boards. It must be visible on the main canvas and easy to find.

## Visual Source Of Truth

Use the existing Fundora mobile boards in the target Paper file:

- iPhone 16, `393 x 852`.
- 32px mobile rails.
- Fundora top chrome and progress.
- White phone surface.
- Teal active controls.
- Fine borders.
- Anchored bottom action.
- Sentence-case borrower-facing copy.
- External state labels outside phone artboards only.

## Product Scope

Design Results around lender-by-lender maximum property price.

Use:

- Heading: `Max property price by lender`
- Answer copy: `You may be able to afford a property up to`
- Result amount: `$3.10M`

Avoid:

- Scenario chips such as `NSW`, `Owner occupied`, and `Savings $356k`.
- Copy such as `Macquarie has the highest estimate...`.
- `comfortable number` copy.
- A huge result amount that overwhelms the lender comparison.
- Disconnected metric boxes for lender detail.
- Heavy dual CTAs such as `Continue` plus `Assumptions`.
- Dashboard-like uppercase table headers such as `LENDER / REACH / MAX`.

## Lender Comparison

Show top 6 lenders first:

- Macquarie
- CBA
- NAB
- Westpac
- ANZ
- ING

Use softened lender-representative bar colours only if bars are used. Also explore non-bar list treatments.

Each lender row should have stable lanes:

- Lender name.
- Max property price comparison treatment, such as quiet bar, ranked row, dot-on-scale, or selected-lender delta.
- Max property price.
- Expand/tap affordance.

Add an affordance to show all 14 lenders.

Use `fundiq-serviceability-calculations/src/lenders/assets.ts` as the source of truth for the full 14-lender set:

- ANZ
- Athena
- Bankwest
- Bendigo
- Bluestone
- CBA
- ING
- Macquarie
- NAB
- Resimac
- St George
- Suncorp
- ubank
- Westpac

Sorting is in scope but should be subtle on mobile. Use copy such as:

- `Sorted by max property price`
- Small action: `Sort`

Sorting changes list order only. It must not be visually or conceptually merged with editing details/inputs.

## Selected Lender Detail

When a lender is selected, show product detail as a compact offer panel or row stack, not loose boxes.

Create specific selected-lender variations inspired by the Cathay Pacific flight card reference:

- Inline expansion inside the lender list.
- Focused selected-lender card with `View all lenders`.
- Detail sheet or panel with `View all lenders`.
- Selected lender plus a secondary `Funds to complete` action card underneath.

Include:

- Product name.
- Rate.
- Comparison rate.
- Loan amount.
- Monthly repayment.
- LVR.
- Product assumptions if useful, such as Basic/Package, P&I/IO, Variable/Fixed.
- `View all lenders` return affordance in card/sheet concepts.
- `Funds to complete` secondary card or row after lender selection.

## Action Model

Use one primary bottom action:

- `Connect with a broker`

Use a secondary text action beneath or near the primary:

- `Update details`

Use `Update details` because the chooser includes property details, loan details, and financial inputs.

## Details Editing

Use a details chooser with:

- `Property details`
- `Loan details`
- `Financial inputs`

Use the generated Fundora-style icon set for these three rows where possible. The icons should read as:

- Property details: house plus purchase document.
- Loan details: clipped loan document with rate/term cue.
- Financial inputs: wallet, coins, or income/expense slip.

The icon style should match existing Fundora generated icons: thick black ink outline, warm matte fills, transparent background, no enclosing badge, no text, no mascot face, readable at 24-32px.

Property details:

- State.
- Purpose.
- First home buyer.
- Savings.
- Optional property price in mind.
- Capitalise purchase costs.

Loan details:

- Loan term.
- Repayment type: P&I or Interest only.
- Interest-only term: 1-5 years, visible only when Interest only is selected.
- Product type: Basic or Package.
- Rate type: Variable or Fixed.
- Fixed-rate term, visible only when Fixed is selected.

Financial inputs:

- Route to Income, Expenses, Liabilities, or Existing properties.
- Return to Results after save.

## Required States

Create:

1. Results loaded, top six lenders.
2. Selected lender product detail.
3. Long lender-list scroll state.
4. All-lenders expanded state.
5. Details chooser.
6. Property details sheet.
7. Loan details sheet.
8. Interest-only and fixed selected loan-details state.
9. Financial inputs route concept.
10. Recalculating skeleton.
11. Partial unavailable or contact-support recovery state.
12. Cathay-inspired selected-lender card with funds-to-complete action.
13. Inline selected-lender expansion.
14. Selected-lender sheet/panel.
15. Subtle sort chooser.
16. Alternative all-lender list treatments beyond horizontal bars.

## Recommendation

The preferred Results model is:

- Moderate answer-first result.
- Heading `Max property price by lender`.
- Clean top-six lender rows, preferably ranked rows or very quiet bars.
- Selected lender product panel with product name and rates.
- Cathay-inspired selected-lender card with `View all lenders`.
- `Funds to complete` as a secondary card after lender selection.
- One primary CTA: `Connect with a broker`.
- Secondary text-link: `Update details`.
