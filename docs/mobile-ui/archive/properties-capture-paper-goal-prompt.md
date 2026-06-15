# Properties Capture Paper Goal Prompt

Use this prompt when asking an agent to create or improve mobile Paper designs for the Properties step.

```markdown
Goal: Create polished mobile Paper variations for the Fundora Properties step.

Source of truth:
- Primary: `docs/mobile-ui/properties-capture-mobile-plan.md`
- Also follow: `docs/mobile-ui/mobile-assessment-interaction-states.md`, `docs/mobile-ui/income-capture-mobile-plan.md`, `docs/mobile-ui/fundora-about-you-paper-goal-prompt.md`, `CODEX_DESIGN_SYSTEM.md`, and `docs/design.md`.
- Visual source of truth: the current About You Paper screens. Match their 393 x 852 device, 32px content rail, status/nav/progress stack, system UI typography, teal active controls, bottom safe-area CTA, and adjacent out-of-phone state labels.

Paper context:
- Work in the existing Fundora/FundIQ Paper file, Inputs page:
  https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/P7A-0
- Latest canonical polish set:
  https://app.paper.design/file/01KSXN0H5ZRH0R4NDQWCC3MBQK/1-0
- Place the new Properties variations near the existing Income mobile variations.
- Use the current Income and About You screens as interaction references, not as visual copies.
- Phone artboards must contain only user-facing UI. Put state labels and notes outside artboards.

Brand and device:
- Use Fundora naming.
- Use iPhone 16 artboards: 393 x 852.
- Calm, compact, Mobbin-inspired iOS form flow.

Key decisions:
- Properties is step 3: You, Income, Properties, Liabilities, Expenses, New property, Results.
- This step captures existing owned properties only. The future purchase stays in New property.
- Existing home loans belong inside the related property record.
- Liabilities should not ask for home loans again.
- Each property can have zero or more home loans. Use loan split labels only when multiple loans are attached to the same property.
- Use postcode as the default location input. Address search may be explored in one variation only.
- Property purpose options: Owner occupied, Investment.
- Show rental income and property expenses only when Investment is selected.
- Property type is optional and should not block saving.
- Ownership: one applicant = hidden 100% Applicant 1; two applicants = show selector defaulting to `Joint`, with Applicant 1 and Applicant 2 options. Do not show `Joint 50/50` as the visible label.
- Do not use net property equity as the main review total. Review should focus on property value, ownership/purpose, investment rent/expenses when relevant, and attached home loan balances.

Core property fields:
- Property postcode or address
- Property purpose
- Estimated value
- Ownership, for two applicants
- Rental income + frequency, investment only, default weekly
- Property expenses + frequency, investment only, default yearly

Core home loan fields:
- Optional lender
- Loan limit
- Current balance
- Interest rate
- Remaining term
- Optional interest-only term
- Repayment + frequency
- Loan purpose

Required states:
- No existing property first screen titled `Add your existing properties`, with only `Add property` and an enabled `Continue` CTA. Do not include an `I do not own property` CTA and do not include copy explaining that home loans are captured here rather than in liabilities.
- Add property sheet for an owner-occupied property.
- Add property sheet for an investment property with rental income and property expenses compactly grouped under investment/ownership context.
- Add/edit home loan sheet launched from the property add/edit flow.
- Saved review with one property and one home loan, showing the attached home loan balance without an extra total row or `Loan split 1` label. Use a total loan balance row only when multiple loans exist.
- Saved review with one property and multiple home loans, showing split rows and total loan balance.
- Review with investment property, rent, expenses, ownership, and attached loan summary.
- Multi-property stress state with several properties, including top, mid-scroll, and bottom positions to show how CTAs behave across scroll.
- Edit property state with prefilled values and attached home loans.
- Edit home loan state with prefilled values.
- Delete confirmation for removing a property and for removing a home loan from a property.
- Property postcode focused with numeric keyboard.
- Property value focused with numeric keyboard.
- Loan balance focused with numeric keyboard.
- Loan repayment focused with numeric keyboard.
- Ownership selector open or selected.
- Loan purpose picker open.
- Validation for missing property value.
- Validation for missing loan balance.
- Validation for missing repayment.

Create five distinct mobile variations:
1. Property Card Starter.
2. Investment-Aware Sheet.
3. Home Loans Nested.
4. Review Ledger.
5. Multi-Property Stress.

Visual guidance:
- Preserve the Fundora input-flow feel: compact progress, quiet headers, bottom sheets, anchored CTA, plain language.
- Properties must look like the same product session as About You, not a standalone property module. Avoid black primary buttons unless the full input flow is deliberately redesigned around them.
- Use sentence case and tabular numerals for money.
- Keep amount and frequency in the same visual group.
- Hide the bottom CTA while the keyboard is open if it would collide.
- Use stable row lanes for repeated property and loan rows.
- Avoid card-on-card layouts, loud gradients, heavy shadows, decorative fintech green, and design commentary inside phone artboards.
- Add-home-loan affordances should feel visually attached to the property being added or edited, not like a disconnected global CTA.
- In review, only offer `Add property` as the global add CTA. Additional loans are added from the relevant property edit flow.
- Use Fundora-style illustrated prop icons sparingly in empty and add states when they improve warmth without competing with form density.

Output:
- A comprehensive canonical Properties state library in the About You/Income visual system, with every required property, ownership, picker, keyboard, validation, review, edit/remove, and stress state visible and labelled outside the phone.
- Optional exploratory variation rows may remain, but they are secondary to the canonical library.
- If variation rows are created, each variation should include the core entry, add property, add home loan, review, and validation or keyboard treatment. Reserve loan split labelling for multi-loan states.
- Add a short recommendation note naming which variation or hybrid to take forward.
- Recommend whether postcode-only is enough or address search should be added later.
```
