# FundIQ Landing Page Strategy Handoff

Date: 2026-05-21

Purpose: give another agent enough context to rigorously challenge and refine the FundIQ landing page, proposition, page architecture, and business thesis without needing to rediscover the repo from scratch.

Primary source files:

- `src/pages/FundIqPage.jsx` - current live homepage route at `/`
- `src/pages/BuyingRangePage.jsx` - consumer CRO variant at `/buying-range`
- `docs/landing_page_copy.md` - earlier copy explorations
- `docs/borrowing-power-calculator-discovery.md` - lender calculator discovery
- `docs/borrowing-power-results-page-plan.md` - intended post-CTA results experience
- `config/borrowing-power/lenders.json` - lender panel discovery data
- `config/borrowing-power/scenarios.json` - synthetic scenario model
- `CODEX_DESIGN_SYSTEM.md` - brand/product design direction

## Executive Summary

FundIQ is a lender-aware borrowing power and buying range product for Australian property buyers.

The cleanest thesis is:

> A borrowing number is not the same as a buying budget. FundIQ shows buyers a realistic property range by combining deposit, purchase costs, LMI, expenses, debts, and lender policy differences before they apply or inspect.

The current homepage has the right broad direction but needs sharper positioning discipline. It sometimes overclaims certainty: "Know exactly what you can afford," "every lender," and "real purchasing power across every lender." The product evidence supports a strong but more defensible promise:

> Know your realistic buying range before you inspect, with purchase costs and lender policy already factored in.

The best strategic wedge is not "more accurate calculator." That is useful but commoditised. The stronger wedge is "turn borrowing power into a usable buying budget." Most calculators answer "how much could I borrow?" FundIQ should answer "which homes are realistically worth my time, and what lender/policy assumptions are moving that answer?"

## Business Thesis

### The Market Reality

Australian home buyers are making high-stakes decisions from weak signals.

They use free online borrowing calculators, spreadsheet math, broker conversations, listing filters, and vibes. Each gives part of the picture:

- Online calculators are fast but shallow.
- Bank calculators are lender-specific and hard to compare.
- Brokers can help, but a buyer may not want a call before they know if the search is realistic.
- Property portals show asking prices, not affordability after deposit, costs, LMI, and serviceability.
- Pre-approval comes later than the emotional part of the property search.

FundIQ sits between the generic calculator and the formal credit process.

### The Core Problem

Buyers do not actually need a borrowing number.

They need to know:

- What property price range is realistic.
- Which lender policies create the best and worst outcomes for their profile.
- Whether deposit and purchase costs reduce the search range.
- Whether the top number is usable or only technically possible.
- Which assumptions could block approval or improve the result.
- Whether they should inspect, pause, fix the file, or talk to a broker.

Current tools make this harder because they collapse complexity into one headline number. That number can be directionally useful, but it hides the variance that matters.

The repo repeatedly points to the same insight:

> Same buyer. Different lender. Meaningfully different buying range.

The current examples show a spread of about `$149k` between lenders. That spread is the commercial and narrative hook.

### The Emotional Problem

Property buyers are not only solving math.

They are trying to avoid:

- Falling in love with homes they cannot buy.
- Wasting weekends inspecting the wrong places.
- Making offers that fall apart.
- Getting embarrassed or disappointed during finance.
- Talking to brokers or lenders before they feel ready.
- Mistaking a maximum borrowing number for a comfortable life decision.

The emotional promise is calm before commitment.

FundIQ should feel like a sober friend with better data: not a lender, not a broker, not a hype machine.

## Proposed Positioning

### Category

Best category label:

> Lender-aware buying range calculator

Secondary category labels:

- Borrowing power assessment
- Property affordability calculator
- Home buying budget tool
- Lender comparison for borrowing power
- Pre-application buying range check

Avoid leading with only "borrowing power calculator." That puts FundIQ in the commodity shelf beside bank calculators and SEO calculators.

### One-Line Proposition

Recommended:

> Know your realistic buying range before you inspect.

Support:

> FundIQ factors in purchase costs, deposit limits, LMI, debts, expenses, and lender policy differences so you can see which homes are actually worth your time.

### Stronger Strategic Proposition

> FundIQ turns borrowing power into a buying budget.

This is the cleanest reframing in the repo. It creates a clear distinction:

- Generic calculators estimate loan size.
- FundIQ estimates usable buying range.

### USP

FundIQ's unique selling proposition:

> FundIQ compares a buyer's scenario across lender policy assumptions and purchase-cost constraints, then translates the result into a realistic property range and next-step guidance.

Key differentiators:

- Lender policy spread: shows how different lender rules change the answer.
- Purchase cost inclusion: deposit, stamp duty, LMI, fees, and cash left after purchase are part of the buying range.
- Buyer-friendly interpretation: not only "you can borrow X," but "these homes/suburbs/listings are in reach."
- Scenario testing: buyer can test rate, expense, income, deposit, and purpose changes.
- Low-friction entry: private estimate, no broker call unless asked, not a loan application, no credit enquiry needed.

Important defensibility note:

The repo supports lender discovery across several Australian lenders, but the public claim should probably be "across your lender panel" or "across leading Australian lenders," not "every lender," until the product can prove comprehensive coverage.

## Target Audience

### Primary ICP

Australian property buyers before inspection, offer, broker call, or formal pre-approval.

Most likely segments:

- First-home buyers trying to understand a realistic search range.
- Upgraders with deposit/equity complexity.
- High-income buyers where serviceability and lender variation can materially change budget.
- Buyers in competitive markets who need to know what to inspect and what to ignore.
- Investors checking whether rental income and policy assumptions change their position.

### Secondary Audience

Refinancers are present in early copy exploration, but the current product/page has moved toward buyers.

Recommendation:

Keep the homepage buyer-first for now. Refinance can become a separate route or secondary product path once the buying range story is working.

### User Jobs To Be Done

Primary:

> When I am deciding what homes to inspect or bid on, I want a realistic buying range, so I do not waste time or make an offer the numbers cannot support.

Secondary:

- When different calculators give different numbers, I want to know why.
- When I am not ready to speak to a broker, I want a private first read.
- When I have deposit, LMI, stamp duty, debts, or expenses, I want those details included.
- When a lender changes the answer, I want to know which one and by how much.
- When the result is lower than expected, I want to know what to fix first.

## Competitive Context

### Direct Alternatives

Bank borrowing calculators:

- CommBank
- Westpac
- NAB
- ANZ
- Macquarie
- ING
- Bendigo
- Suncorp
- HSBC

Observed in `docs/borrowing-power-calculator-discovery.md`.

How they fall short:

- Usually show one lender's view.
- Inputs and assumptions vary by lender.
- Results are not directly comparable.
- Purchase cost treatment is inconsistent or hidden.
- The buyer still has to translate borrowing power into a buying budget.

### Secondary Alternatives

Property portal affordability filters:

- Helpful for browsing.
- Often too disconnected from real lender assessment and cash-to-complete math.

Broker conversations:

- High value when the buyer is ready.
- High friction when the buyer wants a private first read.
- May feel like a sales path before the buyer knows what to ask.

Spreadsheet/manual calculators:

- Flexible but brittle.
- Hard to encode lender assumptions.
- Not suitable for normal buyers under time pressure.

### FundIQ's Contrarian Take

The biggest number is not always the best number.

The market over-focuses on maximum borrowing capacity. FundIQ should own the more useful idea:

> A realistic range beats a flattering number.

## Current Landing Page Assessment

### Current `/` Homepage Structure

Current page sequence in `src/pages/FundIqPage.jsx`:

1. Header
2. Hero
   - Eyebrow: `For Australian property buyers`
   - H1: `Know exactly what you can afford`
   - Subhead: `See your real purchasing power across every lender - and lock in the right home before someone else does.`
   - CTA: `Calculate my purchasing power`
3. Lender proof
   - Visual lender comparison
   - Lender logos
   - Claim: `Powered by Australia's leading lenders`
4. Problem
   - Eyebrow: `The problem`
   - H2: `Online calculators are guesswork`
   - Interactive income slider comparing generic calculator vs real range
5. What you get
   - Real price you can afford
   - Every lender, side by side
   - Properties within reach
   - Stress test any scenario
6. How it works
   - Tell us your finances
   - We calculate across every lender
   - Explore what you can afford
7. Final CTA
8. Footer/legal disclaimer

### Current Strengths

- The page has product proof above the fold, not a generic SaaS hero.
- The lender spread example is strong and tangible.
- The interactive slider teaches the core problem quickly.
- The "what you get" cards map to real buyer outcomes, not abstract features.
- The design language is calm, premium, and consistent with the repo direction.
- The CTA destination `/assessment` aligns with the planned results-page experience.

### Current Weaknesses

Overclaiming:

- `Know exactly what you can afford` is too absolute for estimates.
- `Across every lender` is probably too broad.
- `Powered by Australia's leading lenders` may imply commercial integration or official lender relationship. Needs verification.
- Footer has placeholder licence details: `ACN 000 000 000`, `Australian Credit Licence 000000`. This cannot ship.

Positioning blur:

- The page sometimes sells "purchasing power," sometimes "borrowing power," sometimes "real price," sometimes "property reach."
- "Purchasing power" is elegant, but in Australian mortgage search behaviour, "borrowing power" and "buying range" may be clearer.
- The strongest concept from `/buying-range` is not fully carried into `/`: "A borrowing number is not the same as a buying budget."

Missing objection handling:

- Does this affect my credit score?
- Is this a loan application?
- Will a broker call me?
- Is my data private?
- Is this financial advice?
- How accurate is it?
- Which lenders are included?
- What assumptions are used?

Missing conversion context:

- The user is not told what happens after clicking the CTA.
- The current CTA says "Calculate my purchasing power," but the planned `/assessment` route becomes a results experience. The promise should match the first action: "Check my buying range" or "See my range."

## Recommended Landing Page Thesis

### Page Argument

The page should make one complete argument:

1. You are not buying a loan. You are trying to buy a home.
2. A generic borrowing number does not tell you what homes are realistic.
3. Purchase costs and lender policy can materially change your range.
4. FundIQ checks those details before you inspect or apply.
5. You get a realistic buying range, lender spread, property reach, and scenario levers.
6. It starts privately, without a credit enquiry or forced broker call.

### Recommended Hero

Hero should lead with the buyer outcome, not the calculation method.

Recommended H1:

> Know your buying range before the inspection

Recommended subhead:

> See which homes are realistically worth your time, with stamp duty, LMI, deposit limits, debts, expenses, and lender rules already factored in.

Trust chips:

- Private estimate
- No credit enquiry
- Not a loan application
- No broker call unless you ask

CTA:

> Check my buying range

Secondary link:

> See how it works

### Alternate Hero If Staying Closer To Current `/`

H1:

> Know what you can realistically afford

Subhead:

> FundIQ shows your likely property range across leading lender policies, including purchase costs, deposit limits, LMI, expenses, and debts.

CTA:

> Calculate my purchasing power

This is less sharp than "buying range," but safer than "exactly" and "every lender."

## Recommended Page Architecture

### Primary Version: Buyer-First Conversion Page

```
Homepage (/)
├── Hero: buying range before inspection
├── Product proof: lender spread preview
├── Trust/reassurance strip: private, no credit enquiry, not an application
├── Problem: borrowing number vs buying budget
├── Comparison: generic calculator vs FundIQ
├── What you get: buying range, lender spread, property reach, scenario levers
├── How it works: inputs, lender-aware calculation, decision-ready output
├── Assumptions/proof: what is included and which lenders are covered
├── FAQ/objections
├── Final CTA
└── Legal footer
```

### Why This Order

Product proof should stay high. The lender spread is the concept.

The current `/buying-range` route has a stronger emotional hook than `/`: "before the inspection." That should move into the main page because it connects the math to a real buyer moment.

The current `/` page has stronger visual/product polish. The final landing page should probably combine:

- `/` visual polish and lender proof components
- `/buying-range` sharper buyer proposition and objection chips
- `docs/landing_page_copy.md` clarity around "calculator simple, lender smart"
- `docs/borrowing-power-results-page-plan.md` result-oriented product promise

## Section-by-Section Handoff

### 1. Hero

Goal: make the visitor instantly understand who this is for and what problem it solves.

Current issue: "Know exactly what you can afford" is high-converting in shape but risky and imprecise.

Recommended direction:

- Make "buying range" the hero object.
- Tie it to inspection/search behaviour.
- Show a real-looking range card beside the copy.
- Put reassurance chips above or below the CTA.

Must answer:

- Is this for me?
- What will I get?
- Is it safe/private/low commitment?

### 2. Lender Spread Proof

Goal: demonstrate why FundIQ exists.

Core message:

> Same buyer. Different lender. Different buying range.

Keep:

- Lender bar chart.
- `$149k` spread example.
- Recognisable Australian lender names/logos if legally acceptable.

Refine:

- Avoid implying official lender partnership unless true.
- Prefer "Compared against leading Australian lender rules" over "Powered by Australia's leading lenders" unless there is a real powered-by relationship.

### 3. Problem Section

Goal: reframe the problem from "calculator accuracy" to "wrong search range."

Recommended headline:

> A borrowing number is not a buying budget

Support copy:

> Simple calculators can miss stamp duty, LMI, deposit limits, lender buffers, debts, and everyday expenses. Those are the details that decide which homes are realistic.

Use the current slider or comparison card to show:

- Generic calculator: one rough estimate
- FundIQ: range across lender panel, with assumptions visible

### 4. What You Get

Current cards are strong. Refine labels for consistency:

1. `Your realistic buying range`
   - Property price range after deposit, costs, LMI, and lender assumptions.
2. `Lender spread side by side`
   - Which lenders may assess your profile higher or lower.
3. `Homes and suburbs within reach`
   - Translate the range into search decisions.
4. `Scenario levers`
   - Test income, expenses, deposit, debts, rates, and purpose changes.

Avoid "Every lender" unless coverage is comprehensive.

### 5. How It Works

Recommended:

1. `Tell us your numbers`
   - Income, deposit, expenses, debts, dependants, and purpose.
2. `We model the details`
   - Purchase costs, LMI, deposit constraints, repayments, buffers, and lender policy assumptions.
3. `You get a usable range`
   - Best lender, lower/upper range, homes in reach, and what could move the result.

Do not make this section feel magical. The trust comes from showing assumptions.

### 6. Objection Handling

This is missing from the main page and should be added.

Recommended FAQ:

- `Is this a loan application?`
  - No. It is an estimate to help you understand your range before applying.
- `Will this affect my credit score?`
  - Only claim "no" if true for the implemented flow.
- `Will a broker call me?`
  - The `/buying-range` copy says no broker call unless asked. Keep only if operationally true.
- `Which lenders are included?`
  - List panel or say "selected leading Australian lenders" with an assumptions link.
- `How accurate is this?`
  - Directionally useful estimate, not a credit approval or offer.
- `What costs are included?`
  - Stamp duty, LMI, deposit, transfer/legal, lender/setup fees if implemented.
- `What happens after I get my result?`
  - Show range, lender spread, assumptions, and next-step options.

### 7. Final CTA

Current:

> Stop guessing. Start buying with confidence.

This is good, but can be more concrete:

> Check your buying range before the next inspection

Support:

> Private estimate. Not a loan application. No credit enquiry.

CTA:

> Check my buying range

## Messaging Hierarchy

### Primary Message

Know your realistic buying range before you inspect.

### Secondary Message

FundIQ includes the details generic calculators miss: purchase costs, deposit limits, LMI, debts, expenses, and lender policy differences.

### Proof Message

The same buyer can see a materially different result across lenders. Current example: about `$149k` spread.

### Emotional Message

Stop wasting time on homes the numbers will not support.

### Trust Message

Private estimate. Not a loan application. No credit enquiry. No broker call unless you ask. Assumptions shown.

Only use these trust claims if operationally true.

## Language Decisions

### Terms To Prefer

- buying range
- realistic range
- property price ceiling
- lender policy
- lender spread
- purchase costs
- assumptions
- estimate
- before you inspect
- before you apply
- homes worth your time

### Terms To Use Carefully

- borrowing power: good for search/category, but less differentiated than buying range
- purchasing power: polished, but may be less common than buying range/borrowing power
- real: strong but can overpromise if paired with certainty
- exact/exactly: avoid
- every lender: avoid unless literally true
- powered by lenders: avoid unless official relationship exists

### Best Copy Lines From Existing Repo

- `A borrowing number is not the same as a buying budget`
- `Same buyer. $149k difference depending on lender policy`
- `The highest number is not always the safest number`
- `Simple calculators can miss stamp duty, LMI, deposit limits, lender buffers and everyday expenses`
- `Private estimate. No broker call unless you ask. No credit enquiry needed`
- `Calculator simple. Lender smart`
- `The borrowing power check that shows its work`
- `This result is directionally useful, not a credit approval`
- `The boring detail matters: lender policy changes the answer`

## Conversion Strategy

### Primary Conversion Action

Check buying range.

CTA variants:

- `Check my buying range`
- `See my buying range`
- `Calculate my purchasing power`
- `See homes in my range`

Recommended: `Check my buying range`

Why:

- More concrete than purchasing power.
- More buyer-native than lender-native.
- Lower commitment than "apply."
- Matches the post-CTA result experience.

### Secondary Actions

- `See how it works`
- `View assumptions`
- `Which lenders are included?`

Avoid sending users away from the main CTA unless needed for trust.

### Conversion Risks

- The product asks for financial data. Trust/reassurance must appear before or beside the CTA.
- If the CTA opens a long form, the page must set that expectation.
- If `/assessment` still shows the old share-card concept, it breaks the promise. The route should become the results/calculation experience described in `docs/borrowing-power-results-page-plan.md`.

## Product Architecture

### Current Routes

```
/                              Current polished FundIQ homepage
/buying-range                  Consumer CRO variant with stronger buyer positioning
/assessment                    Current old share-card/experiment route
/insights                      Borrowing power analytics concept
/learn/negative-gearing-budget Learn article
/comparison                    Chart comparison route
```

### Recommended Near-Term Site Architecture

```
Homepage (/)
├── Buying Range Calculator (/assessment or /buying-range-calculator)
├── Learn (/learn)
│   └── Negative gearing article (/learn/negative-gearing-budget)
├── How It Works (#how-it-works or /how-it-works)
├── Lender Panel (#lender-panel or /lenders)
└── Legal
    ├── Privacy policy (/privacy)
    ├── Terms (/terms)
    ├── Credit guide (/credit-guide)
    └── Disclosures (/disclosures)
```

For MVP, keep most items as homepage anchors. Do not create many empty pages.

### Future Expansion

Likely future pages:

- `/borrowing-power-calculator`
- `/buying-range-calculator`
- `/stamp-duty-and-buying-costs`
- `/lenders`
- `/refinance`
- `/investor-borrowing-power`
- `/learn`
- `/learn/{article}`

SEO likely wants borrowing-power pages. Conversion likely wants buying-range language. The homepage can reconcile both:

> Borrowing power calculator for your real buying range.

## Evidence And Proof Points

Current available proof:

- Discovery across major Australian lender calculators.
- Configured lender dataset for CommBank, Westpac, NAB, ANZ, Macquarie, ING, Bendigo, Suncorp, BOQ, and HSBC.
- Synthetic scenarios for single/joint and owner-occupied/investment.
- Existing visual examples showing lender spread and purchase-cost components.
- Results page plan includes max purchase price by lender and funds-to-complete charts.

Proof gaps:

- No real customer testimonials.
- No verified conversion or accuracy metrics.
- No confirmed lender partnership language.
- No official licence details in footer.
- "30+ lenders" appears in homepage card copy, but current discovery/config only documents around 10 lender entries. Needs verification before public use.

## Legal And Compliance Watchouts

This product sits close to credit advice/credit assistance territory.

Claims should be reviewed before shipping:

- "exactly what you can afford"
- "real purchasing power"
- "every lender"
- "approval"
- "best lender for you"
- "lock in the right home"
- "powered by lenders"

Safer framing:

- estimate
- likely range
- selected lender panel
- based on assumptions provided
- not a credit approval
- not financial advice
- not a loan application
- subject to lender approval

Footer currently contains placeholder legal data. Replace or remove before production.

## Brand And Tone

FundIQ/Fundora voice should be:

- Clear
- Observant
- Calm
- Useful
- Slightly dry when appropriate
- Never hypey
- Never infantilising

The brand should not sound like:

- "Unlock your dream home"
- "Crush your mortgage goals"
- "You're pre-approved"
- "Financial freedom starts here"

The page should feel like:

- A useful financial report
- A calm workspace
- A product that respects the buyer's stress
- A guide to trade-offs, not a cheerleader

## Design Direction

Use the current FundIQ polished page as the visual base:

- Warm white/off-white surfaces
- Quiet financial report feel
- Fine borders
- Muted data colours
- Real product proof above the fold
- Lender bars and range visuals as main visual content
- Compact, useful sections

Avoid:

- Generic SaaS hero
- Decorative fintech gradients
- Heavy mascot usage
- Over-rounded card-heavy layouts
- Hero claims without product proof
- Landing page fluff before the useful object

If the Fundora character direction is used, the character should appear as a guide near interpretation moments, not as the main proof.

## Suggested Next-Agent Brief

Use this prompt for the next agent:

> You are refining FundIQ's landing page strategy and copy. Read `docs/fundiq-landing-strategy-handoff.md`, `src/pages/FundIqPage.jsx`, `src/pages/BuyingRangePage.jsx`, `docs/landing_page_copy.md`, and `docs/borrowing-power-results-page-plan.md`. Your job is to challenge the proposition, tighten the page argument, and produce a revised landing page architecture and copy deck. Be rigorous about claims. Flag anything that is legally or operationally unsafe. Prefer "buying range" if it strengthens buyer clarity, but consider SEO and category language around "borrowing power calculator." Do not invent proof. End with a recommended final H1, subhead, CTA, section order, and objections/FAQ.

## Questions The Next Agent Should Resolve

1. Should the main homepage lead with "buying range" or "borrowing power"?
2. Is the target user only active buyers, or should refinance remain on the homepage?
3. Can FundIQ truthfully claim no credit enquiry, no broker call, and private estimate?
4. Which lender panel count is accurate for public copy?
5. Is there any official lender relationship, or only comparison/modelling against public calculators?
6. What is the actual first-step UX after the CTA: form, instant estimate, demo result, or account flow?
7. Should the range be framed as maximum, realistic, comfortable, or all three?
8. What is the monetisation path: buyer lead, broker referral, SaaS, lender referral, or paid report?
9. What legal disclaimers are required for Australian credit compliance?
10. Should Fundora become the public brand, or is FundIQ still the brand?

## Recommended Refinement Direction

The strongest next version should combine three ideas:

1. Category capture:
   - `Borrowing power calculator`
2. Differentiation:
   - `Lender-aware buying range`
3. Buyer moment:
   - `Before the inspection`

Possible final hero:

> Know your buying range before the inspection

> FundIQ shows which homes are realistically worth your time, with stamp duty, LMI, deposit limits, debts, expenses, and lender policy already factored in.

> `Check my buying range`

Support chips:

- Private estimate
- No credit enquiry
- Not a loan application
- No broker call unless you ask

This is clearer, safer, and more differentiated than:

> Know exactly what you can afford

The job of the page is not to make FundIQ look clever.

The job is to make the buyer feel less blind before making a very expensive decision.
