# Borrowing Power Calculator Discovery

Date: 2026-04-27

## Objective

Run a first discovery pass across the top Australian home-loan lenders and document how we would capture borrowing power for four recurring scenarios:

- Single applicant, owner occupied
- Joint applicants, owner occupied
- Single applicant, investment
- Joint applicants, investment

This pass was focused on calculator availability, automation shape, result capture, and risks. It did not submit real applicant data.

## Summary

| Lender | Status | OOC | INV | Single | Joint | Recommended path |
|---|---|---:|---:|---:|---:|---|
| CommBank | Available | Yes | Yes | Yes | Yes | Browser automation against accessible form controls |
| Westpac | Available | Yes | Yes | Yes | Yes | Browser automation against microfrontend |
| NAB | Available | Yes | Yes | Yes | Yes | Browser first; investigate API-backed run later |
| ANZ | Available | Yes | Yes | Yes | Yes | DOM automation; easiest initial target |
| Macquarie | Available | Yes | Yes | Yes | Yes | API investigation or browser automation of SPA |
| ING | Available | Yes | Yes | Yes | Yes | API investigation preferred; UI possible but brittle |
| Bendigo Bank | Available | Yes | Yes | Yes | Yes | Browser automation inside WidgetWorks iframe |
| Suncorp Bank | Available | Yes | Yes | Yes | Yes | Browser automation inside WidgetWorks iframe |
| Bank of Queensland | Unavailable | Unknown | Unknown | Unknown | Unknown | Detect redirect and mark unavailable |
| HSBC Australia | Available | Yes | Yes | Yes | Yes | Browser automation inside WidgetWorks iframe |

## Lender Notes

### CommBank

- URL: https://www.commbank.com.au/digital/home-loans/calculator/how-much-can-i-borrow
- Supports applicant mode via `It's just me` and `There's two of us`.
- Supports loan purpose via `a home to live in` and `an investment property`.
- Basic fields include dependants, income before tax, income frequency, bills/living expenses, current home loan repayments, other loan repayments, and total credit card limit.
- Result appears in a same-page panel headed `You may be able to borrow up to`.
- Notes: JavaScript app; may store calculation in cookies. Chat/banner elements may appear. Cloudflare challenge request observed, but no visible captcha during discovery.
- Recommended automation: use browser automation, reset state between scenario runs, fill by labels/selects, then capture result panel text, screenshot, and HTML.

### Westpac

- URL: https://www.westpac.com.au/personal-banking/home-loans/calculator/mortgage-calculator/maximum-borrowing-calculator/
- Supports applicant mode via `By myself` and `With someone else`.
- Supports loan purpose via `To live in` and `An investment`.
- Basic fields include dependants, base salary before tax, income frequency, bills/living expenses, expense frequency, total credit card/overdraft limit, and optional other income/expenses.
- Result appears in a block labelled `Your estimated loan and repayments`, including `The most you may be able to borrow`.
- Notes: JavaScript microfrontend; live chat can overlay the page.
- Recommended automation: close any chat prompt if visible, fill stable labels, assert validation alert is absent, and extract result block text.

### NAB

- URL: https://www.nab.com.au/personal/home-loans/calculators/borrowing-calculator
- Supports applicant mode via `Just me` and `Two of us`.
- Supports loan purpose via `To live in` and `To invest`.
- Basic fields include applicant count, dependants, purpose, before/after tax salary mode, salary amount/frequency, additional income yes/no, existing liabilities yes/no, living expenses, and rent-after-loan yes/no.
- Result appears in a side/result panel labelled `Your estimated borrowing power`.
- Notes: JavaScript microfrontend. A BFF endpoint was observed: `https://customer.api.nab.com.au/v2/cohomelend/borrowing-calc-bff`, with token/session calls.
- Recommended automation: start with browser automation through the Details, Income, and Expenses steps. Later, test whether the API path can be reproduced reliably.

### ANZ

- URL: https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/
- Supports application type: single and joint.
- Supports property type: home to live in and residential investment.
- Basic fields include dependants, annual income, annual other income, joint applicant income if joint, monthly living expenses, current home loan repayments, other loan repayments, other monthly commitments, and total credit card limits.
- Result appears inline as `We estimate you could borrow:` with `#borrowResultTextAmount`.
- Notes: calculator markup is visible server-side; Incapsula script is present but no iframe is needed for the calculator.
- Recommended automation: this should be the first proof-of-concept lender. Fill inputs/radio/select controls, click `#btnBorrowCalculater`, read `#borrowResultTextAmount`.

### Macquarie

- URL: https://online.macquarie.com.au/originations/borrowing-power/calculate
- Public landing page: https://www.macquarie.com.au/home-loans/home-loan-calculators/how-much-can-i-borrow.html
- Supports purpose via `A place to live` and `Investment`.
- Supports one and two applicants. Three or more applicants appear to route toward a contact/phone flow rather than a normal calculator result.
- Basic fields include purpose, number of applicants, repayment type, income, additional income, living expenses, credit card limit, existing home loan repayment, other loan repayment, and dependants.
- Result appears on a reveal page with maximum borrowing amount.
- Notes: Angular SPA; state may persist in cookies. Endpoint observed: `/mortgages/v1/serviceability/borrowing-power/calculate`.
- Recommended automation: investigate API-backed calculation first, but keep browser automation as the audit path. Avoid 3+ applicants.

### ING

- URL: https://www.ing.com.au/home-loans/calculators/borrowing-power.html
- Supports single and joint applicants.
- Supports loan purpose within the calculator component.
- Basic fields include applicants, loan purpose, loan/property details, income, second applicant income if joint, expenses, financial commitments, and dependants.
- Result appears inline as `You may be able to borrow up to:`.
- Notes: legacy Polymer/Web Components implementation. Endpoint observed: `/api/BorrowPowerCalc/Service/BorrowPowerCalcService.svc/json/BorrowPowerCalc/BorrowPowerCalc`.
- Recommended automation: prefer direct POST if payload can be captured; otherwise use browser automation with careful handling of custom controls.

### Bendigo Bank

- URL: https://www.bendigobank.com.au/personal/home-loans/calculators/borrowing-power/
- Supports owner-occupied and investment product groups.
- Supports single and joint applicants.
- Basic fields include applicant count, dependants, application purpose, income amount/frequency/category per applicant, monthly living expenses, personal loan repayments, credit card limits, secured loan/mortgage details, loan term, and loan type.
- Result appears in the WidgetWorks result panel as `You may be able to borrow up to`.
- Notes: cross-domain WidgetWorks iframe, with widget source `https://calcs.widgetworks.com.au/s/benizedu/live.js`.
- Recommended automation: wait for iframe, fill by visible labels, click `Show results`, and extract result text.

### Suncorp Bank

- URL: https://www.suncorpbank.com.au/calculators/home-loan-calculators/borrowing-limit-calculator.html
- Supports owner occupied and investment via property purpose.
- Supports single and joint applicants.
- Basic fields include applicant count, dependants, applicant income amount/frequency, other income, household expenses, loan repayments, credit card limits, existing loan details, loan term, and loan type.
- Result appears in the WidgetWorks result panel as `You may be able to borrow up to`.
- Notes: cross-domain WidgetWorks iframe, with widget source `https://calcs.widgetworks.com.au/s/bupumeni/live.js`. Incapsula resource present.
- Recommended automation: use a real browser context with retry/backoff for iframe loading and anti-bot delays.

### Bank of Queensland

- Calculators page: https://www.boq.com.au/personal/help-and-support/home-loans/home-loan-calculators
- Advertised borrowing calculator route: https://www.boq.com.au/personal/help-and-support/tools-calculators/borrowing-power-calculator
- Current status: advertised borrowing-power link redirects to the generic home-loans page. No working borrowing-power calculator was found in this pass.
- Recommended automation: create an availability detector. If the route redirects away from a borrowing calculator, record `unavailable` for that run rather than trying to infer a result from generic pages.

### HSBC Australia

- URL: https://www.hsbc.com.au/calculators/home-loan-borrowing-power/
- Supports purpose options equivalent to live in and invest.
- Supports single and joint home loan modes.
- Basic fields include applicant mode, dependants, income amount/frequency/category, second applicant income if joint, other income, household expenses, loan repayments, credit card limits, secured loan details, loan term, and scenario amount.
- Result appears in the WidgetWorks result panel as `You may be able to borrow up to` or `You can borrow up to`.
- Notes: React shell plus WidgetWorks iframe, with widget source `https://calcs.widgetworks.com.au/s/bikipabi/live.js`.
- Recommended automation: wait for iframe, fill wizard steps by visible labels, then capture result panel text.

## Cross-Lender Automation Observations

1. Store both normalized output and raw evidence. Each scenario run should save the parsed borrowing amount, result text, screenshot, and HTML snapshot.
2. Keep browser automation as the baseline even if API automation works. Browser screenshots are the best audit trail when lenders change assumptions.
3. Segment calculator adapters by implementation type:
   - `static_dom`: ANZ
   - `microfrontend`: Westpac, NAB
   - `spa`: Macquarie
   - `legacy_web_components`: ING
   - `widgetworks_iframe`: Bendigo, Suncorp, HSBC
   - `unavailable`: BOQ
4. Add drift detection before extraction. If the expected heading, iframe, result label, or URL pattern is missing, mark the run as `needs_review`.
5. Capture lender assumptions where shown, especially interest rate, repayment type, loan term, assessment rate/product selector, repayment frequency, and disclaimer text.
6. Avoid using personal data in discovery. Use explicit synthetic scenario configs only.
7. Expect overlays. Chat, cookie notices, marketing banners, and feedback widgets should be handled as optional blockers.
8. Version scenario configs. Any change to income, expenses, dependants, rent, credit cards, or investment rental income should create a new scenario version.

## Improvements For Next Pass

1. Create one ANZ proof-of-concept run first because its calculator has the cleanest DOM/result selectors.
2. Create one WidgetWorks adapter next and test it on Bendigo, then reuse for Suncorp and HSBC.
3. Add a BOQ availability check so reporting can show `calculator unavailable` rather than a blank result.
4. Capture real network payloads for NAB, Macquarie, and ING to decide whether direct API runs are reliable enough for scheduled monitoring.
5. Define exact synthetic scenario values before entering data into live calculators.
6. Build a run summary report that shows latest amount, previous amount, delta dollars, delta percent, status, and screenshot link.
7. Add alert thresholds, for example missing result, more than 5% movement, calculator unavailable, or page drift detected.
8. Store source URL, final URL, and adapter version for every result row so historical changes can be explained later.

## Proposed Result Schema

Minimum result fields:

- `run_id`
- `run_started_at`
- `lender_id`
- `scenario_id`
- `scenario_version`
- `applicant_type`
- `loan_purpose`
- `status`
- `borrowing_power_amount`
- `repayment_amount`
- `repayment_frequency`
- `interest_rate`
- `loan_term_years`
- `calculator_url`
- `final_url`
- `result_text`
- `screenshot_path`
- `html_snapshot_path`
- `notes`

