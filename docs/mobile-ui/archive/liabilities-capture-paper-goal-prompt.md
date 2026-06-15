# Liabilities Capture Paper Goal Prompt

Use this prompt when asking an agent to create or improve mobile Paper designs for the Liabilities step.

```markdown
Goal: Update the existing Fundora/FundIQ Paper input-flow designs with polished mobile variations for the Fundora Liabilities step.

Source of truth:
- Primary: `docs/mobile-ui/liabilities-capture-mobile-plan.md`
- Also follow: `docs/mobile-ui/mobile-assessment-interaction-states.md`, `docs/mobile-ui/income-capture-mobile-plan.md`, `docs/mobile-ui/properties-capture-mobile-plan.md`, `docs/mobile-ui/fundora-about-you-paper-goal-prompt.md`, `CODEX_DESIGN_SYSTEM.md`, and `docs/design.md`.
- Visual source of truth: the current About You Paper screens. Match their 393 x 852 device, 32px content rail, status/nav/progress stack, system UI typography, teal active controls, bottom safe-area CTA, and adjacent out-of-phone state labels.

Paper context:
- Work in the existing Fundora/FundIQ Paper file, Inputs page:
  https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/P7A-0
- Place the new Liabilities variations near the existing Income/Properties mobile variations.
- Use the current About You, Income, and Properties screens as interaction references, not visual copies.
- Phone artboards must contain only user-facing UI. Put state labels and notes outside artboards.

Brand and device:
- Use Fundora naming.
- Use iPhone 16 artboards: 393 x 852.
- Calm, compact, Mobbin-inspired iOS form flow.

Key decisions:
- Liabilities is step 4: You, Income, Properties, Liabilities, Expenses, New property, Results.
- Existing home loans belong in Properties and must not be captured again here; do not add in-screen copy such as `Home loans were captured with properties`.
- Do not assign liabilities to a person; commitments are application-level.
- Do not use generic `Limit` for every type. Show fields based on selected liability type.
- Credit card: require `Credit limit`; no repayment.
- Overdraft: require `Approved limit`; no repayment.
- Personal loan: require `Current balance` plus `Repayment` and frequency.
- Car loan: require `Current balance` plus `Repayment` and frequency.
- Novated lease: require `Amount owing` plus `Repayment` and frequency.
- Margin loan: require `Margin loan balance or limit`; repayment optional only in one advanced treatment.
- Other commitment: require repayment; amount owing optional.
- Do not include HECS/HELP, tax debt/ATO payment plan, child support/maintenance, BNPL/store finance, or generic lease/hire purchase as separate liability choices in this UI pass.
- Default repayment frequency to monthly, but make it editable.
- Include one variation with `This will be closed before the new loan settles` and one equivalent variation without any closing control.

Required states:
- Empty liabilities screen with `Add an existing liability` and bottom-safe-area `Continue`; no `I do not have liabilities` CTA.
- Liability type picker with one flat list; no Common/More split.
- Add credit card sheet.
- Add overdraft sheet.
- Add personal loan sheet.
- Add car loan sheet.
- Add novated lease sheet.
- Add margin loan sheet.
- Add other commitment sheet.
- Credit limit or approved limit focused with numeric keyboard.
- Repayment focused with numeric keyboard.
- Frequency picker open.
- Saved review with multiple liabilities.
- Review with one loan/facility marked `Closing`.
- Equivalent review without closing control.
- Remove liability confirmation.
- Validation for missing limit, balance, outstanding balance, or repayment.

Create five distinct mobile variations:
1. Type-First Drawer.
2. Icon-Led Flat Picker.
3. Closing Treatment.
4. No Closing MVP.
5. Dense Review Ledger.

Visual guidance:
- Preserve the Fundora input-flow feel: compact progress, quiet headers, bottom sheets, anchored CTA, plain language.
- Liabilities can be labelled as `Other liabilities` in state labels outside the phone, but do not add explanatory home-loan copy inside phone artboards.
- The step must look like the same product session as About You, not a separate debt-module concept. Avoid black primary buttons unless the full input flow is deliberately redesigned around them.
- Use sentence case and tabular numerals for money.
- Keep amount and frequency in the same visual group.
- Hide the bottom CTA while the keyboard is open if it would collide.
- Use stable row lanes for repeated liability rows.
- In saved rows, show liability type on the left, limit/balance/exposure on the right, and repayment amount plus frequency in muted grey text below the title. Include a compact total limit/exposure summary similar to Income.
- Save actions in add/edit sheets must be anchored to the bottom safe area, especially in short forms like credit card; do not let `Save liability` float halfway up the sheet.
- Avoid card-on-card layouts, loud gradients, heavy shadows, decorative fintech green, and design commentary inside phone artboards.

Output:
- A comprehensive canonical Other Liabilities state library in the About You visual system, with every required liability type, picker, keyboard, review, closing/no-closing, remove, validation, and stress state visible and labelled outside the phone.
- Optional exploratory variation rows may remain, but they are secondary to the canonical library.
- If variation rows are created, each variation should include type selection, add/edit, review, and validation or keyboard treatment.
- Add a short recommendation note naming which variation or hybrid to take forward.
```
