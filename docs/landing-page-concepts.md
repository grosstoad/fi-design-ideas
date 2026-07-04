# FundIQ Landing Page — Design Concepts v2

**Status:** Concept exploration for review. Builds on learnings from the results-page work (`results-page-spec.md`, `results-page-spec-review.md`), the existing landing routes (`/` paperlp, `/buying-range` CRO variant), and the design.md voice rules.

---

## 1. What we've learnt that should shape the landing page

1. **The product's best moment is a number, not a feature list.** The results-page work settled on answer-first (hero leads with "$3.10M"). The landing page should sell that moment: the visitor is 3 minutes from a number no other tool gives them.
2. **The lender spread is the differentiator.** Every calculator gives *a* borrowing number. Only FundIQ shows that lenders disagree — by $150k+ for the same person — and which lender sits at the top. "The gap" is the story; "your max property price" is the payoff.
3. **Property price beats borrowing power.** Consumers shop for homes, not loans. All copy leads with "what you can spend on a home" (price, incl. deposit, stamp duty, costs), never "how much you can borrow."
4. **Trust facts convert anxious users:** free · no credit check · not a loan application · nothing shared unless you ask. The CRO variant already validated leading with these as chips. Keep them within one glance of every primary CTA.
5. **The results UI is the proof asset.** The ranked lender list with bars is self-explanatory in a screenshot — use the real component (cream/forest/Hanken Grotesk) as the hero visual instead of illustration. Nothing says "this is real modelling" like the actual output.
6. **Voice rules (design.md, still valid):** calm, concrete, no guaranteed-approval language, no urgency theatrics, "indicative only" visible but understated. Target reading level ≈ grade 6. Numbers always specific ($184,000, not "thousands").

**Copy principles applied throughout:**
- Headlines make a promise or expose a problem in ≤ 9 words.
- One idea per section. One CTA style per page ("Check my buying power" phrasing family — first person, verb-led, outcome-named).
- "You/your" everywhere; FundIQ appears only where the actor matters.
- Every claim is either a number, a mechanism ("we run 30+ lenders' actual rules"), or a trust fact. No adjectives doing the work ("powerful", "smart").
- Jargon budget: LVR, LMI, serviceability never appear above the fold; stamp duty and deposit are allowed (consumers know them).

---

## 2. Component taxonomy (the canonical section stack)

Every concept below assembles from this named set — this is also the build vocabulary for engineering:

| ID | Component | Job | Rules |
| --- | --- | --- | --- |
| **NAV** | Header | Brand + one CTA, nothing else competing | Logo left; "How it works" + "FAQ" text links; primary CTA button right. Sticky after scroll past hero. |
| **HERO** | Hero | Promise + proof + action in one viewport | Eyebrow or trust chips · H1 · subhead (≤ 2 lines) · primary CTA + trust note · proof visual. Mobile: visual directly under CTA. |
| **CRED** | Credibility strip | "This is real" in 2 seconds | Lender logos/names ("Modelled on 30+ lenders including…") or a stat bar. Context, not endorsement — no lender logos implying partnership without legal OK. |
| **GAP** | Problem block | Make the visitor feel the cost of not knowing | The spread demo: same person, different lenders, $ difference. Interactive where budget allows. |
| **CVP** | Core value proposition | The one-sentence promise + product proof shot | Headline + real results-UI screenshot/component. This is the "what you get". |
| **PILLARS** | Value pillars | 3–4 concrete outcomes | Card grid. Each: outcome-first title, one mechanism sentence, small product crop. |
| **HOW** | How it works | Kill "this will be hard" | 3 steps max, each with time or effort stated ("~3 minutes", "no documents"). Ends in a mini result visual. |
| **TRUST** | Objection panel | Kill the four fears | Credit check / privacy / cost / "is it accurate?" — Q&A or fact tiles. Includes the indicative-only framing in plain words. |
| **CTA2** | Final CTA band | Catch scrolled-to-the-end intent | Restate the promise + primary CTA + trust chips. Forest band, high contrast. |
| **FOOT** | Compliance footer | Legal + nav | ACL line, indicative-estimates disclaimer, credit guide, privacy. Same pattern as existing paperlp footer. |

Optional modules: **SOCIAL** (testimonials/UGC — only when real quotes exist; never fabricate), **FAQ** (accordion, feeds SEO), **CALC** (embedded teaser calculator — see Concept B).

---

## 3. Concept A — "The Number" (answer-first, product-led)

**Strategy:** the landing page behaves like the product: leads with the outcome, proves it with the real UI, gets out of the way. Shortest page of the three. For paid/search traffic with existing intent ("how much can I afford", "borrowing power calculator").
**Tone:** the results-page aesthetic verbatim — cream page, forest accents, Hanken Grotesk, ranked-bars visual. Landing and product feel like one thing (which builds trust at the results end too).

**Stack:** NAV → HERO → CRED → GAP (compact) → PILLARS → HOW → TRUST → CTA2 → FOOT

### Copy draft

**HERO**
- Trust chips: `Free` · `No credit check` · `Not a loan application` · `~3 minutes`
- H1: **Know the most you can spend on a home.**
- Subhead: FundIQ runs your numbers through 30+ lenders' actual rules and shows your top price — deposit, stamp duty and costs included.
- CTA: **Show me my number** · trust note beneath: *Private. Nothing is shared unless you ask.*
- Proof visual: the real results component — hero figure "$1.14M" above a ranked 5-lender bar list, one row selected showing rate + repayment. Caption chip: `Example — Sydney couple, $160k income, $120k saved`.

**CRED**: *Modelled on the lending rules of 30+ Australian lenders* + name row.

**GAP (compact)**: H2: **The bank's calculator only tells you the bank's answer.** Body: Every lender sizes you up differently — same income, same deposit, answers up to **$184,000 apart**. If you've only checked one calculator, you've seen one lender's opinion. Visual: two bars — "Lender A $712k / Lender F $896k" with the gap bracketed.

**PILLARS** (4):
1. **A price, not a loan figure** — Your top purchase price with deposit, stamp duty and buying costs already taken out. The number you can actually shop with.
2. **Every lender, ranked** — See who'd stretch furthest for *your* situation — and who wouldn't. No favourites, no ads.
3. **Move the sliders, watch it move** — Change your deposit, spending or loan setup and see your price shift live.
4. **Cash-to-settle, spelled out** — Exactly what you'll need on the day: deposit, stamp duty, fees — and what's left over.

**HOW** (3 steps): 1. *Answer a few questions* — income, spending, savings. ~3 minutes, no documents, no sign-up wall. → 2. *We run every lender's rules* — the real serviceability maths lenders use, not a one-size formula. → 3. *Get your number — and keep it* — your ranked lender list, your price, saved to revisit as things change.

**TRUST** (fact tiles): *Will this affect my credit score?* No — we never run a credit check. / *Is this a loan application?* No — nothing goes to any lender. / *What does it cost?* Nothing. If you later choose to talk to a broker, they're paid by lenders, not you. / *How accurate is it?* It's a realistic estimate built on each lender's published rules — indicative, not an approval. Brokers use the same style of modelling.

**CTA2** (forest band): **Three minutes. Thirty-plus lenders. One honest number.** → *Show me my number* + chips.

---

## 4. Concept B — "The Gap" (problem-led, interactive)

**Strategy:** built around the single most persuasive fact we have: *lenders disagree about you by six figures.* The page teaches one surprising thing, lets the visitor feel it with a live slider, then converts. Best for cold/social traffic that needs a reason to care. Highest production effort (interactive hero).
**Tone:** editorial and a bit bolder — bigger type, the amber accent allowed for the "gap" highlight, still the cream/forest base.

**Stack:** NAV → HERO (interactive) → GAP-STORY → CVP → HOW → TRUST/FAQ → CTA2 → FOOT

### Copy draft

**HERO**
- Eyebrow: `Same buyer. Same savings. Different lender.`
- H1: **One of these lenders would give you $184,000 more.**
- Subhead: Every lender runs different rules on the same facts. FundIQ shows you all of them — so you house-hunt with your real ceiling, not the first answer you got.
- Interactive demo (evolved from the existing GuessworkPanel): income slider → three outputs rendered as bars — `A typical calculator says: $760k` (grey, flat) vs `Across 30+ lenders: $712k – $896k` (colour bars) with the spread badge `$184k gap`. Slider moves everything live.
- CTA: **Find my real range** · chips beneath.

**GAP-STORY** (3 short beats, scroll-revealed):
1. **Calculators guess.** One formula, no lender rules, no costs. That's why the number feels too good — it usually is.
2. **Lenders judge.** Each one treats your income, spending and debts differently. That's the $184,000 nobody shows you.
3. **FundIQ compares.** We run the actual rules, rank the lenders, and show the price you could really pay — costs included.

**CVP**: H2: **This is what you get.** Real results screenshot (ranked list + funds panel), annotated with three callouts: "Your top price", "Your best-fit lenders, ranked", "Cash you'd need on settlement day". Sub-line: *Yours in about 3 minutes. Free, private, no credit check.*

**HOW**: same 3 steps as Concept A (reworded to keep the gap thread): 1. Tell us about you. 2. We ask 30+ lenders' rulebooks. 3. You see who stretches — and who won't.

**TRUST/FAQ** (accordion, adds two gap-specific items): *Why do lenders differ so much?* Different buffers, different treatment of your income type and spending. It's normal — it's also why checking one lender short-changes you. / *Will lenders know I did this?* No. Nothing is sent anywhere unless you choose to talk to a broker.

**CTA2**: **Stop guessing with one lender's answer.** → *Find my real range*.

---

## 5. Concept C — "First Open" (reassurance-led, first-home buyers)

**Strategy:** for the anxious majority — first-home buyers who find the whole topic stressful and are afraid of "being checked". Leads with emotional safety and a Saturday-morning-inspection moment, keeps the maths gentle, spends the most real estate on HOW and TRUST. Best for content/SEO traffic and brand campaigns.
**Tone:** warmest of the three — watercolour suburb imagery (per design.md imagery rules) behind the hero, softer section bands, the same precise product components inside.

**Stack:** NAV → HERO → HOW (promoted, 2nd position) → CVP → GAP (gentle) → TRUST (expanded) → SOCIAL (when real) → FAQ → CTA2 → FOOT

### Copy draft

**HERO**
- Eyebrow: `For Australian first-home buyers`
- H1: **Walk into Saturday's inspection knowing your number.**
- Subhead: Before the agent asks and before you fall for a place — spend three private minutes finding out what you could really pay. No credit check, no applications, no calls.
- CTA: **Get my number before Saturday** (test against plain **Get my number**) · trust note: *Free · private · nothing shared.*
- Visual: watercolour aerial suburb, with a floating compact result card (top price + two lender bars) anchored over it.

**HOW** (promoted, softened): H2: **Three minutes, three questions deep.** 1. *About you* — income, spending, savings. If you can read your payslip, you're qualified. 2. *We do the lender maths* — the same sums 30+ lenders would do, without any lender knowing. 3. *Your number, your list* — what you could pay, which lenders fit, what settlement day costs. Footer line: *No documents. No sign-up before you see results.*

**CVP**: H2: **One honest number changes how you shop.** Body: You'll stop scrolling homes you can't have, skip the heartbreak bids, and shortlist suburbs that fit. Product shot + three ticks: `Your top price, costs included` / `Lenders ranked for you` / `Updates when your savings do`.

**GAP (gentle)**: H2: **Why not just use the bank's calculator?** Body: Because it answers for one lender — theirs — and skips the costs. Lenders can differ by $150,000+ on the same person. You deserve the whole picture before you commit to anything.

**TRUST (expanded, the heart of this concept)**: H2: **Nothing happens to you here.** Tiles: *No credit check — ever* / *No lender is contacted* / *No broker will call unless you ask* / *Free — and we say so in writing* / *Delete your data anytime* / *Indicative estimate — an honest starting point, not an approval*.

**FAQ**: What do I need to know before starting? · I have HECS/car loan — can I still use it? · We're buying as a couple — does that work? · What happens after I see my number? · Who is FundIQ?

**CTA2** (soft band, not forest): **Your Saturday self will thank you.** → *Get my number*.

---

## 6. Comparison & recommendation

| | A — The Number | B — The Gap | C — First Open |
| --- | --- | --- | --- |
| Traffic fit | Search / high intent | Social / cold | Content / brand / FHB |
| Emotional lever | Certainty | Surprise / FOMO on $ | Safety |
| Production cost | Low (reuses results components) | High (interactive hero) | Medium (imagery + FAQ) |
| Risk | Assumes intent exists | Gap claim needs a defensible number | Slower to the point; weaker for investors |
| Differentiation shown | Immediately (product shot) | Dramatised (live demo) | Late (section 4) |

**Recommendation:** ship **A as the default landing page** — cheapest to build (it *is* the results design system), most honest, and it makes landing→product feel continuous. Build **B's interactive gap demo as a module** and A/B it into A's GAP slot (it can also live standalone for social campaigns). Hold **C** for a dedicated first-home-buyer campaign URL (`/first-home`) once real testimonials exist to fill SOCIAL.

**One shared decision to make now 🔶:** the headline gap figure ($184,000 / $150k+) must be a *defensible, reproducible* number from the serviceability engine (e.g., "spread for the median dual-income scenario across our panel, June 2026"). Marketing claims tied to engine output need the same source-of-truth treatment as the results page — add it to the engine work list alongside FILL-IN #4.

**Compliance notes (all concepts):** "indicative only" appears in HERO trust note or CVP sub-line *and* FOOT; no lender logos without the informational-context treatment (names + "modelled on published rules"); no "approval", "guaranteed", "pre-qualified" anywhere; the ACL/credit-guide footer block from the current paperlp page carries over.

**Measurement (all concepts):** hero CTA click-through, scroll-to-GAP rate, demo interaction rate (B), FAQ open rate (C), and flow-start → results-complete as the true conversion. Test one variable at a time: H1 first, CTA label second, proof visual third.
