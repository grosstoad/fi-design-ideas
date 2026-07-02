# Results Page Spec Review — Divergence Audit, Component Inventory, States & Open Questions

**Sources reviewed**
- `docs/design.md` — "Results Page Components" section and supporting system rules
- `Results.html` + `app/*.jsx` from the Claude Design export (FundIQ_Desktop.zip) — desktop frame (1340px) and mobile frame (392×844), including working prototype logic in `results-data.jsx`, `results-shared.jsx`, `results-desktop.jsx`, `results-mobile.jsx`, `results-broker.jsx`
- Repo state: the results page is **not implemented** in this codebase; `/`, `/buying-range`, `/insights`, `/assessment` exist but none is this page.

---

## 0. The headline finding: the MD and the design are two different pages

`design.md` and `Results.html` do not describe the same results page. They differ in typeface, palette, page anatomy, component set, interaction model, and even product scope. **Before any build, one of them must be declared the source of truth and the other rewritten.** The divergences:

| Area | `design.md` says | `Results.html` actually is |
| --- | --- | --- |
| Typeface | Helvetica Neue (fallback stack) | **Hanken Grotesk** 400–800 |
| Core palette | Warm white `#F5F4EF`, ink `#111`, lender blue `#78B5E8` accent | **Cream `#F4F3ED` + forest `#15362B`**, tweakable accent (default `#15362A`), error `#C2462C` |
| CTA colour | Black/near-black | Forest green |
| Chart accent | Blue scale (strongest blue = selected, pale blue others) | **Per-lender brand-ish colours** (`#6E9BC4`, `#E3B23C`, `#D98E63`, `#C2462C`, …) |
| Corner radius | 8–10px | 13–26px (cards 20px, sheets 26px) — the MD explicitly bans "rounded bubbly SaaS components" |
| Page anatomy | Hero → full-width **Purchase Scenario panel** → two result cards (lender chart + funds) → strips | Header → hero → **master–detail**: lender list (left, 468px) + selected-lender detail card (right) |
| Scenario controls | Savings amount, State, Loan purpose, Capitalise costs switch, Advanced assumptions (Premium) | **None on the page.** "Edit loan details" (purpose / rate type / repayments / term) lives *inside* the detail card; "Edit financials" is a link out |
| Funds to complete | Horizontal **stacked bar**, categories (property price, stamp duty, transfer+legal, lender fees), metrics incl. **available funds & remaining cash** | Collapsed 3-line **text breakdown** (deposit, stamp duty, fees) behind a "View breakdown" disclosure; no available funds, no remaining cash |
| Broker entry | Slim full-width strip below cards | **Primary button** (docked on mobile, in-card on desktop) |
| Broker modal | Two-column with watercolour panel + 3 benefits | **Single-column form** (sheet on mobile / 560px modal on desktop), no imagery |
| Premium | Advanced assumptions premium-gated with pill | No premium concept anywhere |
| Capitalise costs | Required switch | Absent |
| State (geography) | Required control (drives stamp duty) | Absent — stamp duty is a flat formula |
| Mobile | Essentially unspecified | Fully designed: docked CTAs, bottom-sheet detail, push-screen alternative, drag-to-dismiss |

**Decision 1 (blocks everything):** which direction wins? If Results.html is the new direction, `design.md` needs a full rewrite (tokens, type, radii, component specs). If the MD wins, Results.html is a concept exploration and needs redesigning. A hybrid ("Results.html layout, design.md tokens") is possible but must be stated explicitly.

There is also an internal inconsistency inside the export itself: the About You screen (`app.jsx`) defaults the accent to mint `#86C6A6`, while Results defaults to deep forest `#15362A`. Same flow, two default accents — pick one.

---

## 1. What the design actually contains — component inventory

Extracted from the code, with observed values. This is the baseline the spec must document; **Q:** items are the questions that remain.

### 1.1 Design tokens (as built)

```
cream #F4F3ED · cream-2 #EFEDE3 · paper #FFFFFF · field #F3F2EB
ink #181A12 · ink-2 #3C3E34 · muted #76776C · muted-2 #9C9C90
line #E5E3D8 · line-soft #ECEAE0 · forest #15362B · err #C2462C
accent (tweakable) → derived: accent-strong (−16% lum), accent-soft (+80% tint),
accent-text (auto black/white), accent-text-strong (−34%, for links on white)
```

- **Q:** The accent is a canvas tweak with four candidates (`#86C6A6`, `#1F6B54`, `#15362A`, `#E0A23C`). Which is final? The derived-accent formula (darken/tint percentages) should be documented as the token generation rule if the system keeps it.
- **Q:** Per-lender colours are hardcoded per lender (8 values). Who owns this mapping? What's the rule for lender #9? Are these meant to approximate lender brands (CBA gold, NAB dark, Westpac red…) — if so, is that legally/brand-safe?
- **Q:** No success token (broker success reuses accent-soft), no warning, no focus-ring token documented (inputs use `accent + 4px accent-soft` ring — buttons/rows have **no visible focus style at all**, see §6).

### 1.2 Desktop page (1340px frame)

| # | Component | Observed spec | Open questions |
| --- | --- | --- | --- |
| D1 | Header | 70px, white, bottom line. Logo (26px forest mark + accent dot + "fundiq" 20/800). Right: "Save & exit" ghost button | **Q:** Save & exit does what — saves scenario to account? Requires auth? Destination? Confirmation if unsaved? Is there really no other nav (no menu, no profile)? |
| D2 | Hero | Eyebrow "Results" · H1 36/800 "Max property price by lender" · lede 16px: "Across 8 lenders, **Macquarie** gives you the highest estimate at **$3.10M**. Select a lender to see the loan behind the number." | **Q:** Lede is dynamic (count, top lender, price) — confirm template + singular/edge grammar ("Across 1 lender…"). No number in the hero itself — intentional? (Mobile push-screen *does* show a 56px hero number — inconsistent emphasis between platforms, see §7.) |
| D3 | Lender list card (left, 468px) | Title "Lenders" 17/800 · right: "Sorted by max price" note + **Sort** button (dead in prototype) | **Q:** Sort options (price, rate, repayment, A–Z?), control type (menu?), persistence, and does re-sorting re-rank the numbers? |
| D4 | Lender row | Grid: rank 22px · name 1fr · bar 120px · price · chevron. 15px/12px padding, r13. Hover cream; selected: accent-soft bg + 1.5px accent border; rank #1 name weight 800 | **Q:** Truncation for long lender names ("Bank of Melbourne")? Logos ever? Tie-breaking for equal prices? |
| D5 | Comparison bar | 8px pill, per-lender colour on cream-2 track; width = price ÷ (top price × 1.08), count-up 900ms | Bar style is an unresolved tweak: **colour / accent-only / off**. **Q:** decide. Also: bars encode price only relatively — is 1.08 headroom rule final? |
| D6 | View all | Top 6 shown; "View all lenders (8)" ⇄ "Show fewer lenders" toggle button | **Q:** Real panel size (30+ lenders on the landing page promise vs 8 here). With 30, is it a toggle, pagination, or scroll? Does "show fewer" scroll position reset? |
| D7 | Detail card (right) | Dot + product 21/800 ("Macquarie Basic Home Loan") + sub "Macquarie · Owner-occupier · P&I · Variable · Rank #1" · "View product ↗" outlined button (dead) | **Q:** View product destination — lender site? internal product page? new tab? tracking? |
| D8 | Headline banner | Forest block r16: "Max property price with Macquarie" + 42/800 white value, count-up 850ms | |
| D9 | Stat tiles ×4 | field-bg tiles r14: Loan amount ($2.48M / "borrowing power") · Monthly repayment ($…, "over 30 yrs" or "interest only") · Interest rate (6.09% / "6.21% comparison") · LVR (80% / "$0.62M deposit") | **Q:** Repayment frequency fixed at monthly — toggle to weekly/fortnightly? LVR tile is near-constant by construction (see §3) — is it earning its slot? |
| D10 | Edit loan details (disclosure) | Chevron rotates 90°; inline panel on field bg: Loan purpose (Owner-occupier/Investment), Rate type (Variable/Fixed 2yr/Fixed 3yr), Repayments (P&I/Interest only), Loan term (25/30 yrs) as mini segmented controls, 2-col | **Q:** Do these edits apply to *all* lenders or just the selected one? (Prototype: global state, but the panel header says "Editing loan · Macquarie Basic Home Loan" — contradictory.) Persisted? Reset control? Fixed 1yr/5yr? terms other than 25/30? Why does changing them not change borrowing power (§3)? |
| D11 | Funds to complete | Icon + "Funds to complete" + "About $813k in cash needed to settle" + View breakdown/Hide link → rows: Deposit (gap to loan) $620,000 · Stamp duty (est.) · Lender & legal fees $2,800 · total | **Q:** See §3 — no state input, no LMI, no available-funds/shortfall concept. "(est.)" needs a disclaimer link? |
| D12 | CTA row | Forest primary "Connect with a broker" + text "Edit financials" | **Q:** Edit financials goes where — back into the 7-step flow at step 1? Preserves answers? Warn about losing current view? |
| D13 | Broker overlay | Centered 560px modal (see §1.4) | |

Selecting a lender resets the edit-loan and funds disclosures closed, and remounts the detail (numbers re-animate). **Q:** intended on every click? Re-animating four tiles on each selection may get tiresome — spec when count-up runs (first load only?).

### 1.3 Mobile page (392×844 frame)

| # | Component | Observed spec | Open questions |
| --- | --- | --- | --- |
| M1 | Header | Circular back button (cream), "fundiq" wordmark, "Menu" text button (dead) | **Q:** Back from the results *list* goes where — last form step? Menu contents? |
| M2 | Progress bar | 7 equal segments, all accent-filled | Results is step 7 of 7. **Q:** Should a *completed* flow still show the stepper? Is it tappable to jump back? |
| M3 | List screen | Eyebrow "Results" · H1 30/800 "Max price by lender" · sub "Macquarie currently gives you the highest property estimate." | Title differs from desktop ("Max price" vs "Max property price") — unify. |
| M4 | Lender list | Bordered r18 container; rows: rank · name · 92px bar · price · chevron; hover cream / pressed cream-2 / active accent-soft | Tap target = full row (~56px) ✓. **Q:** same colour/sort/view-all questions as desktop. |
| M5 | Dock | Bottom gradient-fade: primary "Connect with a broker" + text "Edit financials", always visible | **Q:** Dock overlaps last list rows (150px scroll padding) — confirm. Does the dock persist while the sheet is open? (Yes in prototype — so two "Connect" buttons stack visually; sheet has its own footer CTA. Redundant?) |
| M6 | Lender detail — **two competing patterns, unresolved tweak** | **(a) Bottom sheet** (default, "recommended"): 34% scrim, r26 sheet ≤90% height, grab handle, drag-down >110px dismisses, click scrim closes. Footer: primary + secondary CTA. **(b) Push screen**: replaces list; eyebrow + "Max property price" + **56/800 hero number** + "Selected lender / View all lenders" row + card; back button closes | **Decision 2:** sheet or push? The spec must pick one (or define when each is used). Sheet: does it snap to heights? Is the list still scrollable behind it? Push: browser back button behaviour, deep-link (`/results/macquarie`)? |
| M7 | Lender card (in sheet/push) | Cream header: dot + product 17/800 + sub "Owner-occupier · P&I · Variable" · big stat row "Max property price" 26/800 · key-value rows: Rate, Comparison rate, Loan amount, Monthly repayment, LVR · Edit loan details disclosure (1-col) · Funds to complete block (bg `#FBFAF5`, View/Hide) | Mobile shows rate rows where desktop shows tiles — fine, but confirm the field *set* is identical (mobile lacks the "borrowing power"/"deposit" subtexts). |
| M8 | Broker overlay | Bottom sheet ≤95% height (see §1.4) | **Q:** keyboard avoidance when inputs focus (sheet must rise above keyboard); does sheet-in-sheet occur if broker is opened from the lender sheet? (Prototype: broker renders over everything; lender sheet stays mounted behind — confirm stacking + scroll lock.) |

### 1.4 Broker capture form (shared, fully specced in prototype — the strongest part of the design)

- **Header:** eyebrow "FUNDIQ BROKERS" · title "Connect with a broker" · lede "A real mortgage broker, free to you, who can take this estimate to settlement." · round ✕ close; scrim click closes; panel click doesn't.
- **Fields:**
  1. First name / Last name (2-col) — required, error "Enter your first name." / "Enter your last name."
  2. Mobile (tel keypad, placeholder `0400 000 000`) — regex `[0-9 +()-]{8,}`, error "Enter a valid mobile number."
  3. Email — standard regex, error "Enter a valid email address."
  4. Preferred lender — native select, all 8 as "Name — Product" + "No preference"; **prefilled from selected lender**, hint "Pre-filled from your selection".
  5. "Where are you up to?" — 2×2 chip group, single-select: Just researching / Actively looking / Found a property / Offer made / under contract — required, error "Select where you are in the journey."
  6. "Anything else?" — optional textarea, hint "Optional", placeholder "e.g. self-employed, looking in inner west, settling in March…"
- **Validation model:** on submit; per-field error clears on change; error = red border + message below; no scroll-to-first-error (**Q:** add — on mobile the first error can be off-screen).
- **Submit:** "Request a call back" → success view: tick badge, "You're all set, {first}", "A FundIQ broker will call you on **{mobile}** within one business day to talk through your **{lender}** option." + Done.
- **Fine print:** "By submitting, you agree a FundIQ broker can contact you. No credit check."
- **Missing / Q:**
  - **No network layer:** no submitting/loading state on the button, no failure state, no double-submit guard. All three are mandatory for a real build.
  - **Consent:** is one implicit fine-print line sufficient for AU privacy/lead-gen compliance, or is an explicit checkbox + privacy policy link required? No privacy link exists.
  - **Prefill** of name/email/mobile from the earlier flow steps (they were plausibly collected)?
  - Phone regex accepts junk like `--------`; AU-specific validation (04xx, +61)?
  - What payload is sent — just the form, or the full scenario (lender ranks, loan settings, financials)? Users should know their numbers are shared; the lede implies it ("take this estimate").
  - Esc-to-close, focus trap, focus return to trigger, `aria-modal` — none implemented (see §6).
  - After success + Done: does the page change (CTA becomes "Requested ✓"? banner)? Can the user submit twice?

---

## 2. Prototype-only artefacts that must NOT leak into the spec

- **Tweaks panel** (`tweaks-panel.jsx`) is a canvas control, not product UI — but it encodes four **unmade decisions** that the spec must close: accent colour, bar style (colour/accent/off), mobile selection pattern (sheet/push), entrance animation (on/off).
- Phone chrome (status bar, 9:41, 5G) is frame decoration.
- CDN React + Babel-standalone, `window.*` globals, inline `<style>` — none of this is implementation guidance.
- Count-up implementation is a canvas workaround ("CSS transitions are frozen in some hosts") — the *intent* (850ms cubic-out count-up, 900ms bar fill, 300ms sheet slide) is the spec; the rAF+safety-timeout mechanism is not. Add `prefers-reduced-motion` behaviour (absent).

---

## 3. Data & calculation audit — where the prototype maths cannot be the spec

The prototype derives everything from hardcoded values in `results-data.jsx`. Several relationships are placeholders that would be **wrong in production**; each needs a real definition:

1. **Deposit is a constant $620,000** and `max price = lender max loan + deposit`. Real engine: where does savings/deposit come from (flow step), and does *usable* deposit shrink by stamp duty + fees? In the prototype it doesn't — deposit is counted in full toward price **and** again in full inside "funds to complete", which double-counts reality: a buyer with $620k cash cannot put $620k toward the price *and* pay $193k stamp duty. **This is the single biggest logic question on the page.** (design.md's version answered it with available funds / remaining cash — the concept the new design dropped.)
2. **Loan settings change rates but not borrowing power.** Switching to Investment or Interest-only adds +0.30/+0.20 to the rate but the loan amount (borrowing power) is untouched. In reality serviceability drops. Spec: does editing loan details re-run borrowing power per lender (re-ranking the list live)? If yes, the list should visibly re-rank/animate — big interaction to design. If no, say why (and label the figures accordingly).
3. **Stamp duty is `price × 5.2% + $1,300`** with no state/territory input anywhere in this screen — and design.md required a State control. Presumably state was captured in the earlier steps ("postcode" appears in About You). Spec must state: stamp-duty engine (state tiers, FHB concessions, foreign surcharge), and whether the user can see/change the state assumption from the results page.
4. **Fees are a flat $2,800 for every lender** while the funds line says "Lender & legal fees". Real per-lender fees? Split legal vs lender rows?
5. **No LMI anywhere**, yet LVR is displayed and the landing page promises LMI modelling. If LVR can exceed 80% in real data, LMI must appear in funds-to-complete and possibly cap logic.
6. **LVR is ~constant by construction** (loan ÷ (loan + fixed deposit) ≈ same % for every lender at these magnitudes). With real data it varies; confirm the tile stays.
7. **Comparison-rate handling:** `adjRate` applies the same loading to the comparison rate — comparison rates are regulated figures per product; they can't be arithmetically adjusted. Legal review needed on showing derived "comparison" rates at all.
8. **Rounding/format rules (observed, need ratification):** price `$X.XXM`; funds `$XXXk` below $1M; money rows `$1,234,567` (en-AU); rates 2dp; LVR whole %. Repayments monthly only.
9. **Freshness/validity:** rates are hardcoded; production needs a rates feed, an "as at" timestamp, and a disclaimer ("Indicative only" — required by design.md's voice section, currently **absent from the entire results screen**; the only fine print anywhere is inside the broker form).

---

## 4. Missing states (both platforms)

The prototype designs exactly one state: 8 healthy lenders, animation on. A build needs:

| State | Needed spec |
| --- | --- |
| Loading / calculating | Results arrive from an engine after a 7-step flow — skeleton list? staged reveal ("Running across panel…" like the landing concept)? |
| No eligible lenders | Guaranteed real state (low deposit, high debts). Empty layout, message, recovery actions ("Edit financials", broker CTA framing) — nothing exists. |
| Few lenders (1–3) | "View all", the lede sentence, and the bars all assume 6+. |
| Partial results | One lender's calc fails — omit silently or show an unavailable row? |
| Error / retry | Engine failure, stale session, expired quote. |
| Zero/negative edge values | Deposit > price of cheapest scenario, IO monthly < P&I sanity checks, $0 rows. |
| Returning user | Saved result reopened later — stale-rate banner? recalc prompt? |
| Broker form: submitting / failed / already-submitted | See §1.4. |
| Offline (mobile) | At minimum a graceful failure for the docked CTA. |
| Reduced motion | Count-ups and sheet slide need `prefers-reduced-motion` variants. |

---

## 5. Interaction inventory & unwired controls

Every interactive element, with its prototype status — each "dead" item needs a destination or removal:

| Control | Platform | Status | Needs |
| --- | --- | --- | --- |
| Lender row select | both | ✔ works | Keyboard/focus spec (§6); deselect behaviour (desktop: none — always one selected; mobile sheet: close = deselect) — confirm asymmetry is intended |
| Sort | both | ✖ dead | Options, UI, default, persistence |
| View all / Show fewer | both | ✔ toggle | Behaviour at 30+ lenders; scroll handling |
| View product ↗ | desktop only | ✖ dead | Destination; why absent on mobile? |
| Edit loan details | both | ✔ | Scope (global vs per-lender), persistence, live re-rank (§3.2) |
| Funds View breakdown | both | ✔ | Deep-link from "About $813k" text too? |
| Connect with a broker | both | ✔ opens form | Post-success page state |
| Edit financials | both | ✖ dead | Destination step, data preservation |
| Save & exit | desktop only | ✖ dead | Auth story; mobile equivalent (Menu?) |
| Menu | mobile only | ✖ dead | Contents |
| Back (header) | mobile | ✔ only in push-detail | Where does back go from the list? |
| Progress bar | mobile | static | Tappable? Desktop has none — parity? |
| Sheet drag/scrim | mobile | ✔ | Snap points, velocity dismiss, a11y alternative (close button — currently the sheet has **no close button**, only gesture/scrim) |
| Broker form | both | ✔ validate+success | Network states, consent, focus trap (§1.4, §6) |

---

## 6. Accessibility gaps (blocking, both platforms)

design.md sets a11y rules the new design mostly misses:

1. **No visible focus styles** for lender rows, disclosures, chips, CTAs — only text inputs have a focus ring. Keyboard users cannot see where they are. Define a global focus token.
2. **Overlays are not accessible:** no `role="dialog"`/`aria-modal`, no focus trap, no Esc handling, no focus return, background not inert, on either the lender sheet or the broker overlay. The lender sheet cannot be dismissed without a pointer (no close button).
3. **Selection semantics:** lender rows are plain `<button>`s with no `aria-pressed`/`aria-selected`, and the detail panel update is not announced (`aria-live`). MiniSeg uses `aria-pressed` ✓ but `role="group"` lacks a label.
4. **Bars have no text alternative** and rely on colour alone to distinguish lenders (design.md: "do not rely on colour alone") — the price value adjacent mitigates for the *value*, but bar colour = lender identity needs no meaning, or needs a label.
5. **Colour contrast:** muted-2 `#9C9C90` on white ≈ 2.7:1 — used for hints, rank numbers, sub-labels (below AA even for large text in some uses). Amber accent `#E0A23C` as accent-text would fail on white (derived −34% may pass — verify per accent option). Headline-banner key text is white at 72% opacity on forest — verify.
6. **Count-up numbers** churn text for screen readers; final values should be set with a single announced update.
7. Touch targets: chips/mini-seg options are ~40px — bump to 44px on mobile.

---

## 7. Information-hierarchy feedback

### Desktop

1. **The page answers "which lender" before "what's my number."** The H1 is a category label ("Max property price by lender") and the biggest number on screen (42px) is inside the detail card, *belonging to whichever lender is selected*. A first-time user's actual question — "what can I afford?" — is answered only inside the lede's bold `$3.10M`. Recommendation: give the hero the top-line answer (e.g., "You could buy up to **$3.10M**" + "with Macquarie, your strongest of 8 lenders"), and let the master–detail be the exploration layer. This also restores consistency with mobile-push, which *does* lead with a 56px number.
2. **Master–detail is the right pattern** for 8+ lenders (a clear improvement over the MD's chart+detail-panel), and rank + bar + price per row scans well.
3. **Funds to complete is under-weighted.** "Can I actually settle?" is the second most important answer and it's a one-line footnote behind a disclosure — and the current maths double-counts the deposit (§3.1). Whether or not the stacked bar returns, surface the cash number and a **surplus/shortfall verdict** at tile level, not behind "View breakdown".
4. **Two dead affordances sit in premium positions** ("View product" top-right of detail; "Sort" top-right of list). Unwired controls in prime slots erode trust — wire or cut.
5. **The forest headline banner competes with the primary CTA** (same colour family, both high-mass). Consider letting the banner own forest and keeping the CTA accent-derived, or vice versa.
6. **"Indicative only" is missing.** Regulatory/voice requirement; needs a consistent slot (under the lede or under the detail card) without per-card noise.
7. Detail card ordering is good: identity → price → cost tiles → refine → cash to settle → act. Keep it.

### Mobile

1. **Sheet vs push must be decided.** Recommendation: **sheet** — it keeps list context, matches the docked CTA model, and the code itself marks it "recommended". But then fix: the dock's "Connect" and the sheet's "Connect" duplicate; suppress the dock while the sheet is open.
2. **The docked broker CTA appears before any lender is explored.** A user who has seen only the list gets "Connect with a broker" as the screen's most prominent action. Consider dock appearing after first selection or after scroll — or accept aggressive conversion placement deliberately (state it).
3. The **push variant's 56px hero number** is the best "answer-first" moment in the whole design — if sheet wins, consider moving that hero number to the *list* screen top (top lender's price) so mobile leads with the answer too.
4. Progress bar on a completed flow adds noise on a small screen — replace with breadcrumb/back affordance or drop.
5. List rows carry five columns on 392px; the 92px bar is the first thing to sacrifice if lender names truncate — set a truncation and minimum-name-width rule.

---

## 8. Copy inventory needing sign-off

Confirmed strings exist in the prototype (title, lede, funds note, broker copy, errors, success). Still unwritten: empty/error/loading states (§4), "Indicative only"/disclaimer text, stamp-duty estimate caveat, sort menu labels, Menu contents, Save & exit confirmation, consent line legal review, push-notification/e-mail follow-ups after broker success (out of page scope but implied by "within one business day").

Also unify: "Max property price by lender" (desktop) vs "Max price by lender" (mobile H1) vs "Max property price" (mobile push + card row) — three variants of one concept.

---

## 9. Priority questions (ranked)

1. **Source of truth:** Results.html direction vs design.md system — or a stated hybrid. Everything else inherits from this. (§0)
2. **Deposit / funds-to-complete double-count:** define the real relationship between savings, usable deposit, costs, and max price — and whether surplus/shortfall returns. (§3.1)
3. **Do loan-detail edits re-rank borrowing power?** Defines the page's core feedback loop. (§3.2)
4. **Mobile detail pattern:** sheet or push (recommend sheet + dock suppression). (§7)
5. **Desktop hero:** lead with the answer ($3.10M) or keep category-label H1. (§7)
6. **Lender panel scale:** 8 vs 30+ changes list, sort, and view-all design. (§1.2 D6)
7. **Accent colour + bar style + animation** — close the three tweak-panel decisions. (§2)
8. **Empty/no-eligibility and loading states** — guaranteed states, zero design. (§4)
9. **Broker form production states** (submitting/failure/duplicate) + consent/privacy line legal review. (§1.4)
10. **Accessibility baseline:** focus styles, dialog semantics, sheet close button, contrast of muted-2. (§6)
11. **Dead controls:** wire or cut Sort, View product, Edit financials, Menu, Save & exit. (§5)
12. **State/stamp-duty engine and LMI** presence. (§3.3, §3.5)
13. **Comparison-rate legality** when rates are adjusted client-side. (§3.7)
14. **Naming:** unify the three "max price" title variants; confirm dynamic lede grammar. (§8)
