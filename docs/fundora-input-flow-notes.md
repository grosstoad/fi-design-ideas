# Fundora borrowing-power flow — agreed product notes

This is the compact product note for the UI build. It describes the fields and interaction model agreed for each step. It is intentionally separate from the Funnel review and does not contain audit commentary.

## Flow

1. About you
2. Income
3. Properties
4. Liabilities
5. Expenses
6. New property
7. Results

The interface should use the same Fundora frame throughout: sentence-case labels, restrained white surfaces, teal active controls, compact progress, distinct icons, and clear mobile bottom actions.

## About you

### Data model

- Ask for the number of applicants first: one or two.
- One applicant: ask marital status (`Single` or `Couple`), dependant count, and residential postcode.
- Two applicants: ask the relationship between applicants (`Couple` or `Not couple`).
- Two applicants who are a couple: capture one shared household dependant count and one shared residential postcode.
- Two applicants who are not a couple: capture marital status, dependant count, and residential postcode for each household.
- Dependants are a count (`0`, `1`, `2`, `3`, `4+`); do not ask dependant ages.
- Postcode is an Australian numeric postcode; do not add suburb search or address lookup in this step.
- Use `Applicant 1` and `Applicant 2` labels. Do not collect first or last names here; names belong to later lead collection.

### UI

- The applicant-count question is the entry point and stays in the main form.
- Keep the two-applicant, not-couple path on one continuous screen with a clearly separated second-household section.
- Preserve the full form during validation, and keep the focused postcode field above the numeric keyboard.
- Do not add a competing “who is applying” component in the main content area.

## Income

### Data model

- Income is owned by an applicant and is grouped into two source types: employment income and other income.
- Employment income contains employment type, base income and frequency, optional bonus, overtime, commission and allowances (each with frequency), and HECS/HELP balance.
- Do not capture employer name, employment start date, occupation, industry, ABN, or lender notes at this stage.
- Other income contains an income type, amount and frequency for the selected applicant.
- Other-income types are investment income, interest income, government income, maintenance income, and other.
- Rental income belongs to Properties, not Other income. Use `Investment income` rather than a separate dividend field.
- HECS/HELP is captured at applicant level in Income; a blank or `$0` balance means no balance.

### UI

- Use direct `Add employment income` and `Add other income` actions; do not add a generic income chooser.
- For two applicants, show applicant ownership at the top of every add/edit form.
- Keep optional employment components behind a disclosure so base income is fast to enter.
- Review saved sources by applicant, with one prominent household gross annual total.

## Properties

### Data model

- Properties is the source of truth for existing property records and the home loans secured against them.
- Keep one `Where you live` record and one `Where you intend to buy` purchase-plan record per assessment.
- Allow zero or more `Existing investment property` records.
- Each property has zero or more linked home loans. A property can be saved without a loan.
- `Where you live` captures rental or owner-occupied status and postcode. An owner-occupied home can include estimated value and linked loans; a rental needs only its postcode here.
- An owner-occupied property must not show rental income or investment-property expenses.
- An investment property captures ownership (Applicant 1, Applicant 2, or Both applicants), postcode, estimated property value, rental income and frequency, property expenses and frequency, and negative-gearing eligibility (`Yes` or `No`).
- Show a short information treatment for the possible negative-gearing eligibility of a qualifying new residential property purchased after 12 May that increases supply. This is explanatory UI, not a tax decision.
- Use postcode for existing properties. Do not require suburb or state for these records.
- Existing home loans capture loan limit, current balance, interest rate, remaining P&I term, repayment and frequency, and loan purpose. Lender and interest-only term are optional.
- Keep home loans nested under their property. Multiple loans are supported; use loan-split labels only when a property has more than one loan.
- `New property` edits the single intended-purchase record; it does not create a second intended-purchase card.

### UI

- The first Properties screen presents three distinct full-width records: `Where you live`, `Where you intend to buy`, and `Existing investment property`.
- Use a place-marker icon for where you live, a glass/magnifier icon for the intended purchase, and a coin-stack icon for investment property. Do not repeat the same house illustration on every card.
- Keep the three record cards visible after saving. Use `Edit property` consistently on every saved record.
- `Add another property` opens an add-property choice. Once where you live and the intended purchase are saved, keep those choices visible but unavailable and offer investment property as the remaining path.
- Add or edit a home loan from inside the property flow. Keep the linked property name, postcode, and purpose visible while editing the loan.
- Make the home-loan action prominent with a clear `Add home loan` control and a quiet shaded loan group.
- Saved review cards show the entered property details, ownership, investment details when relevant, and linked loan balance(s). Do not use a net-equity hero or an isolated global “add loan split” action.
- Keep aggregate owned property value and outstanding property debt as quiet context, excluding the intended purchase from owned value.

## Liabilities

### Data model

- Allow multiple records of every repeatable liability type, including multiple credit cards.
- Credit card: limit only.
- Overdraft: limit only.
- Personal loan: limit, repayment, and repayment frequency.
- Car loan: limit, repayment, and repayment frequency.
- Novated lease: limit, repayment, and repayment frequency.
- Margin loan: limit, repayment, and repayment frequency.
- Other commitment: declared repayment and frequency.
- Do not collect home loans here; they are linked to Properties.
- Do not collect HECS/HELP here; it is an applicant-level Income field.

### UI

- Use one repeatable list with `Add another` rather than a single replaceable liability slot.
- Keep the type-specific fields minimal and show ownership where the calculation model needs it.
- Use the same concise add/edit sheet pattern as Income and Properties.

## Expenses

### Data model

- Capture household living expenses by category, amount, and frequency.
- Keep rent or board as a distinct conditional housing expense.
- Keep childcare and education available when dependants exist.
- Store the entered frequency and calculate a monthly normalised value for the assessment.

### UI

- Show a compact category review with direct edit affordances and a visible monthly total.
- Edit one category at a time in a focused sheet with amount, frequency, and monthly context.
- Keep rent/board and childcare prominent when relevant without adding transaction-level detail.

## New property

### Data model

- Edit the one `Where you intend to buy` record from this step.
- Required: state or territory, purchase purpose/status, and savings for deposit and costs.
- Purchase purpose/status supports owner occupied, investment, and first-home-buyer treatment.
- Capture whether the user wants to capitalise purchase costs.
- Target property price is optional for now.
- Do not collect a purchase-property postcode in this step; state is the required location field.
- Do not add property type, construction status, or loan product assumptions here.

### UI

- Use a compact scenario-first form titled `Where you intend to buy`.
- Use a state picker, purpose/status controls, savings input, optional target price, and a capitalise-costs switch with concise trade-off help.
- Returning to this step edits the existing purchase card and updates it in Properties; it never appends another card.

## Results

### Data model

- Results is derived from the saved About you, Income, Properties, Liabilities, Expenses, and New property inputs.
- The primary output is maximum property price by lender, with loan amount, LVR, rate, comparison rate, and monthly repayment as supporting values.
- Selected-lender detail and funds-to-complete are secondary views; editing routes back to the relevant source section.

### UI

- Lead with `Max property price by lender` and a ranked lender list.
- Keep sorting quiet and secondary. Use one primary next action and a text-style `Update details` action.
- Preserve the same sentence-case typography, spacing, and focused edit patterns used by the input steps.
