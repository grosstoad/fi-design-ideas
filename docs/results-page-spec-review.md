# Results Page Spec Review — Gaps, Questions, and States

**Reviewed against:** `docs/design.md` (sections "Results Page Components", "Controls", "Surfaces", "Layout", "Accessibility")
**Reference design:** `Results.html` in Claude Design project `1b5ef3f2-6b1c-47b5-a69a-03411abcfadd` — *not accessible from this session (authentication required); items that must be verified against it are marked** `[verify vs Results.html]`.*
**Status of implementation:** the results page is **not yet built** in this repo. `/`, `/buying-range`, `/insights`, `/assessment` exist; none implements the results page described in the MD.

The goal of this document: everything that must be added to `design.md` (or a dedicated results-page spec) before the page can be built without a designer or PM in the room. Organised as: global gaps → component-by-component (anatomy, fields, interactions, states, open questions) → state matrix → responsive/mobile spec → information-hierarchy feedback.

---

## 1. Global / page-level gaps

These apply to the whole page and are entirely unspecified today.

### 1.1 Page identity and entry

- **Route**: What is the URL? (`/results`? `/assessment/results`?) Is scenario state encoded in the URL/query params so a result can be shared or reloaded?
- **Entry conditions**: What has the user completed before landing here? Which inputs are already known (income, expenses, debts, dependants, savings, state)? What happens on direct navigation with no prior data — redirect to the assessment, or show an empty/demo state?
- **Persistence**: Do scenario changes persist (localStorage, backend, URL)? If the user leaves and returns, is their scenario restored?
- **Page title / meta**: Browser tab title, share/OG behaviour if URLs are shareable.

### 1.2 Data contract

The MD names UI elements but never defines the data that feeds them. Needed:

- **Canonical scenario object**: savings, state, loan purpose, capitalise-costs flag, plus all advanced assumptions — field names, types, units, defaults.
- **Result object per lender**: lender name, logo?, max purchase price, max loan amount, interest rate, comparison rate, estimated repayment (frequency?), fees. Which of these are required vs optional?
- **How many lenders** are shown? design.md's landing page shows 4–7; the results chart spec says "horizontal lender rows" with no count. Fixed list, top N, or "show more" expansion? `[verify vs Results.html]`
- **Sort order** of lender rows: descending by max price? Is the order stable while a user has a row selected and inputs change?
- **Calculation timing**: Is recalculation client-side and instant, or a backend call? This decides whether loading states (1.4) are real requirements.
- **Rounding and formatting rules**: `$847k` vs `$847,000` vs `$0.85M` — where is each used? Tabular numerals are specified, but rounding, thousands separators, and currency symbol conventions are not. Repayments: weekly/fortnightly/monthly, and is the frequency user-selectable?

### 1.3 Recalculation behaviour (the core interaction, currently unspecified)

Every control in the Purchase Scenario panel presumably re-runs the model. Missing:

- **Trigger**: on blur? on keystroke with debounce? explicit "Update" button?
- **Feedback during recalculation**: do bars animate to new widths? Duration/easing? Does the headline value count up/down or swap?
- **Selection retention**: if Athena is selected and a change makes another lender the max, does the selection stay on Athena, or move? Does the detail panel show stale data during recalc?
- **No-result outcome**: what renders when the scenario yields $0 / no lender will lend (savings too low, capitalisation impossible)? This is a guaranteed real-world state and there is no design for it.

### 1.4 Page-level states (none are specified)

| State | Question |
| --- | --- |
| Initial load | Skeletons? Which components get placeholders? Or is data always ready because it's computed client-side? |
| Recalculating | Per-card spinners, dimming, or seamless animation? |
| Partial failure | One lender's model fails — hide the row or show an error row? |
| Full failure | Backend unreachable — full-page error with retry, or cached last result? |
| Empty / no eligibility | No lender returns a positive result — message, illustration, and recovery CTA ("adjust your savings", "talk to a broker")? |
| Stale scenario | User changed inputs elsewhere (e.g., went back to assessment) — is the result invalidated? |

### 1.5 Header and footer

design.md defines the landing header/footer but never says what the **results page** chrome is:

- Same header? Does "Calculate" become "Recalculate" or "Edit my details"? Is there a save/share/print action? `[verify vs Results.html]`
- Is the legal disclaimer strip from the landing footer repeated here? The Voice section requires "Indicative only" — where exactly does it live on this page (hero sub-copy, footer strip, both)?
- Sticky behaviour of the header on scroll, both breakpoints.

### 1.6 Result hero (mentioned only as "Hero/result summary: compact and left-aligned")

The single most important element on the page has no content spec:

- **What is the headline number?** Max purchase price across the panel? For the *selected* lender? A range (min–max across lenders)?
- Supporting copy above/below it (eyebrow label? "Your estimated maximum purchase price"?).
- Secondary stats in the hero (loan amount, deposit used, spread across lenders)?
- Does the hero update live with scenario changes, and does it duplicate the "headline max value" that the Lender Chart card is also required to show? Two big competing numbers is a hierarchy risk — see §7.
- Confidence framing: "estimate", "indicative range" — exact copy and placement.

---

## 2. Purchase Scenario panel

MD spec: full-width panel below the hero with savings amount, state, loan purpose segmented control, capitalise costs switch, advanced assumptions trigger with Premium pill.

### 2.1 Savings amount (currency input)

Missing:

- **Format/mask**: live thousands separators? `$` prefix inside the field or as adornment?
- **Range and validation**: min (0? some floor?), max, step. Behaviour for empty, non-numeric, paste with symbols.
- **Error display**: inline message? Border colour token? (No error colour exists in the palette — a gap in the design system itself. Only blues/sand/clay/sage/neutrals are defined; there is no semantic error/warning/success token.)
- **Commit semantics**: recalc on blur/Enter vs while typing.
- **Keyboard**: numeric inputmode on mobile; increment with arrow keys?
- States needed: default, hover, focus, filled, invalid, disabled (is it ever disabled?).

### 2.2 State selector

- **Control type**: dropdown/select, or chips? `[verify vs Results.html]`
- **Options**: all 8 AU states/territories? Order? Default (geolocated? from assessment)?
- Changing state changes stamp duty — does the Funds to Complete card visually acknowledge the change (flash, animate)?
- Native `<select>` on mobile vs custom listbox on desktop?

### 2.3 Loan purpose segmented control

- **Options and labels**: presumably "Owner occupier" / "Investment" — confirm exact copy and whether there are more segments (e.g., first-home buyer?). `[verify vs Results.html]`
- Default selection.
- Does purpose change more than rates (e.g., stamp duty concessions, LMI)? Worth a helper note?
- States: active (ink bg/white text per MD), inactive, hover on inactive, keyboard focus ring, disabled. MD specifies active/inactive only.
- A11y: MD says `aria-pressed` buttons — confirm this vs a radiogroup pattern; needs arrow-key navigation spec if radiogroup.

### 2.4 Capitalise purchase costs switch

- **Exact label copy** and the **helper text** (MD requires helper text beside the label — the actual sentence is unwritten).
- Default on or off?
- What visibly changes when toggled — loan amount up, remaining cash up? Should the affected values pulse/animate so the user sees the causal link?
- Edge case: capitalisation pushes LVR beyond what any lender allows → interacts with the empty state (§1.4).
- States: on, off, hover, focus, disabled, plus `role="switch"`/`aria-checked` per MD.

### 2.5 Advanced assumptions trigger + Premium pill

- Trigger style: text button, secondary button, or link with chevron? Placement within the panel (right-aligned end?). `[verify vs Results.html]`
- Premium pill: exact copy ("Premium"?), colours (no premium/upsell colour token exists), and whether the pill is on the trigger, in the modal, or both.
- Behaviour difference for premium vs free users at the *trigger* level: same modal with locked fields (per MD) — but is the trigger itself ever hidden or fully unlocked for premium users? What does the unlocked experience look like? The MD only designs the locked state.

### 2.6 Panel-level

- Desktop layout: one row with all five controls? Column proportions? Wrapping behaviour at ~1024px?
- Label style: small uppercase muted per Controls spec — confirm every control follows it.
- Is the panel sticky on scroll (so controls stay reachable while reading charts)? Not specified either way.

---

## 3. Lender chart card ("Max purchase price by lender")

MD spec: title, subtitle ("Select a lender to compare purchase power, rates and repayments"), headline max value, horizontal rows (fixed label/bar/value lanes), selected-row active state, detail panel below with lender name, interest rate, comparison rate, estimated repayments, loan amount.

### 3.1 Anatomy gaps

- **Lane widths**: "fixed width" is stated but no values. Need px/fr for label lane, bar lane, value lane at desktop; and the mobile strategy (see §6).
- **Bar geometry**: height, corner radius, gap between rows (MD gives 7–10px rhythm), remainder-track treatment ("very pale" — which token? Warm neutral `#EEEDE7`?).
- **Bar scaling**: are bars proportional to absolute value with the max at 100% of the lane, or normalised some other way? Min visible width for very small values?
- **Colour assignment**: "Other lenders use muted sand, clay, blue-grey, sage, and warm neutrals" — is the assignment positional (2nd row always sand?) or per-lender-stable? "Blue-grey" is not in the token table — define it. What happens with more lenders than colours?
- **Lender identity**: names only, or logos? (Landing page uses favicon logos; results spec is silent.) `[verify vs Results.html]`
- **Headline max value**: exact placement (top-right of card? under subtitle?), size, and its label copy.

### 3.2 Selection interaction

- **Default selection** on page load: highest lender? None (detail panel empty/hidden)? MD's subtitle implies selection is optional — but then what does the detail panel show pre-selection?
- **Affordances**: hover state on a row (cursor, background tint?), pressed state, focus-visible ring for keyboard (MD requires focusability — specify the visual).
- **Selected state**: strongest blue bar + what else? Row background? Left indicator? Label weight change? "Active visual state" needs pixels.
- **Deselection**: can you click the selected row to deselect? Is exactly-one-selected enforced?
- **Announcement**: `aria-live` on the detail panel when it updates? Role of the row group (listbox with `aria-selected`? radiogroup? buttons?). MD only covers segmented controls and switches.
- **Hover tooltip**: MD says "hover-only information must also be available on focus" — but never says what the hover information *is*. Tooltip with exact values? Define content, delay, and mobile equivalent (none? long-press?).

### 3.3 Detail panel

- **Layout**: horizontal stat row? 2×2 grid? Divider from the chart? `[verify vs Results.html]`
- **Fields**: lender name, interest rate, comparison rate, estimated repayments, loan amount — plus units/labels for each ("6.24% p.a.", "comparison 6.51% p.a.", "$4,820/month est."). Repayment frequency fixed or toggleable?
- **Transition** when selection changes: instant swap, crossfade?
- Missing data (a lender without a published comparison rate): dash? "n/a"? hide the field?
- Any CTA inside the detail panel ("Check eligibility with a broker")? Or is the broker strip the only conversion point?

### 3.4 Card-level states

- Loading/recalculating (bars animate? shimmer?), empty (no eligible lenders), partial (some lenders returned $0 — shown as $0 rows or removed?), error.

---

## 4. Funds to Complete card

MD spec: horizontal stacked bar (not pie); categories Property price, Stamp duty, Transfer + legal fees, Lender fees + setup; metrics Funds required, Available funds, Remaining cash; lane-aligned legend; remaining cash treated as outcome, not cost.

### 4.1 Gaps

- **Colour mapping**: which token per segment? (Clay is "cost chart segment", sage "positive or remaining" — so property price = ?, stamp duty = ?, transfer/legal = ?, lender fees = ? Only partially derivable; specify all four.) Segment order in the bar = legend order?
- **Bar behaviour**: min segment width so tiny fees stay visible? Labels on segments or legend-only? Rounded outer corners only?
- **Legend rows**: exact lanes (swatch + label | amount | % of total?) — MD says "labels, amounts, and percentages", confirm percentage basis (of funds required?).
- **Metrics block**: layout of Funds required / Available funds / Remaining cash (three columns? stacked rows with divider per MD's "metric divider"?).
- **Negative remaining cash** (shortfall): this is a critical, common state — colour (no red/error token exists), copy ("Shortfall of $12,400"), guidance CTA? Completely undesigned.
- **Coupling to lender selection**: do funds figures change with the selected lender (lender fees differ per lender)? Or does it use the selected lender only for "Lender fees + setup"? This is a key logic question that changes the mental model of the page.
- **Capitalise-costs interplay**: when costs are capitalised, do they leave the stacked bar (moved into the loan)? The chart's story changes fundamentally — specify both renderings.
- LMI is absent from the category list, though the landing page copy promises LMI modelling. Intentional (rolled into lender fees?) or a spec omission? `[verify vs Results.html]`

---

## 5. Broker CTA strip, Broker modal, Advanced assumptions modal

### 5.1 Broker CTA strip

Copy is fully specced (headline, support, CTA, "No obligation"). Missing:

- Desktop layout confirmed (text left, button right) but mobile stacking order and alignment are not (see §6).
- Button style: primary ink per Buttons spec — confirm, since the strip sits on white/warm surface.
- Does the strip carry any scenario context ("Share *this* scenario" implies the payload includes the current inputs/results — confirm what data would be sent, for the form spec below)?
- Dismissible? Repeated after the modal is completed ("Request sent" replaces strip?)?

### 5.2 Broker modal

Left column fields: Name, Email, Phone, Buying timeframe, CTA. Missing everything a form needs:

- **Field specs**: placeholder/label copy, required flags, validation rules (email format, AU phone format), error messages, input order on mobile.
- **Buying timeframe**: control type (select? segmented? chips?) and its options ("0–3 months / 3–6 / 6–12 / just researching"?).
- **Consent**: privacy/consent checkbox or disclosure line? Required for lead-gen in AU — currently absent.
- **Submission**: CTA label copy; loading state on submit; success state (inline confirmation replacing the form? toast? modal swap?); failure state and retry.
- **Prefill**: name/email known from earlier steps?
- **Dismissal**: X button, Esc, backdrop click — all three? Focus trap and focus return to the trigger (a11y requirement not stated).
- Right column: which watercolour asset, the 3 benefit bullets' exact copy, and how the right column behaves on mobile (hidden? stacked above/below?).

### 5.3 Advanced assumptions modal (Premium)

The MD is strongest here (layout rules, one pill, no repeated locks, segmented Yes/No, example fields). Still missing:

- **Definitive field list** — the MD says "example fields". A build needs the exact list, each field's control type, options, default, and unit:
  - Property type (options: house/apartment/townhouse/land?)
  - Foreign buyer (Yes/No)
  - Include government grant (Yes/No — which grants? FHOG by state?)
  - Retain cash buffer (Yes/No + amount field?)
  - Settlement adjustments (Yes/No + amount?)
  - Transfer fee override (currency input)
  - Stamp duty override (currency input)
  - Lender fee assumptions (per-lender? single figure?)
- **Locked-state behaviour**: are locked fields visible-but-disabled with real defaults shown? Can free users open the modal at all, or does the trigger route straight to upgrade?
- **Upgrade callout**: copy, price mention?, CTA destination (checkout? plans page?).
- **Unlocked flow**: Apply/Cancel buttons? Do changes apply live or on "Apply"? Reset-to-defaults control?
- **Dirty indicator**: after overrides are applied, how does the results page show "custom assumptions active" (pill on the trigger? note in the assumptions strip)? Without this, users forget they've overridden stamp duty and mistrust the numbers.
- Modal mechanics: width, two-column collapse point, scroll behaviour when content exceeds viewport, focus trap, Esc/backdrop rules — none specified for either modal.

### 5.4 Scenario assumptions strip

Listed under Strips ("Scenario assumptions") but never specced as a component: content (which assumptions summarised — rate used, term, P&I, buffers?), expandable?, link to the advanced modal?, placement (below the result cards? above the broker strip?). `[verify vs Results.html]`

---

## 6. Mobile spec — essentially absent

design.md says "Check desktop at 1440px first" and gives desktop-only structure. For mobile the spec needs:

- **Breakpoints**: at least desktop / tablet / mobile values (e.g., 1024/768/375?) and which layout each uses. The two-column card grid collapse point is unstated.
- **Hero**: headline scale on mobile (desktop is 48–56px; landing mobile precedent is 46px — confirm for results).
- **Purchase Scenario panel on mobile**: control stacking order (savings → state → purpose → switch → advanced?), full-width segmented control, native select for state, keyboard type per field. Does the panel collapse into an accordion ("Your scenario ▾") to keep results above the fold, or stay expanded?
- **Lender chart on mobile**: fixed three-lane rows can't fit ~360px. Options: label above bar with value right; shorter label lane with truncation; horizontal scroll (avoid). Which one? Truncation rules for long lender names. Tap targets ≥44px per row. Since hover doesn't exist: does tapping a row scroll to/reveal the detail panel? Is the detail panel sticky-bottom?
- **Funds to Complete on mobile**: stacked bar full-width; legend lanes reflow — do percentages drop off? Metric block stacks?
- **Broker strip on mobile**: stack order (headline, copy, button full-width, trust note under button?).
- **Modals on mobile**: both modals are two-column — do they become full-screen sheets? Bottom sheets? Where does the broker modal's image column go? Keyboard-avoidance for the form?
- **Sticky elements**: is anything sticky on mobile (scenario summary bar, broker CTA)? Not specified.
- **Header on mobile**: hamburger? Just brand + one CTA?
- Touch equivalents for all hover-revealed info (MD covers focus, not touch).

---

## 7. Information hierarchy — feedback

### Desktop

1. **Two competing headline numbers.** The hero has a big result number *and* the Lender Chart card must show a "headline max value". If both show the same max, it's redundant; if they diverge (hero = range, card = max), it's confusing. Recommendation: make the hero the single authoritative number (max purchase price + one-line range context), and demote the card's value to a smaller "top lender: $847k" beside the title. Or drop the hero number and make the card the hero. Pick one owner of "the number".
2. **Scenario controls between the hero and the proof** is the right order (see number → tweak inputs → see evidence), but the control panel must stay visually quieter than the hero and the two cards — a full-width white card with five controls can easily out-weigh the hero. Consider warm-card background (`#F7F6F1`) for the panel so the white result cards pop against it.
3. **Reading order of the two cards**: Lender chart left, Funds to Complete right is implied but not stated. Lender chart is the differentiator and should be left/first. State it explicitly.
4. **Remaining cash is the second-most emotionally important number** on the page (can I actually complete the purchase?) but is buried as the third metric of the second card. If it's negative, it must escalate visually. Consider surfacing remaining cash (or shortfall) as a compact stat in the hero row.
5. **Premium pill placement**: keep it off the primary reading path — it belongs on the advanced trigger only, right-aligned, so the free path never reads as gated.
6. **Disclaimers**: "Indicative only" needs a consistent, single placement (suggest: small line under the hero number + full legal in footer), otherwise it will get sprinkled per-card and add noise.

### Mobile

1. Order should be: hero number → *collapsed* scenario summary (tap to edit) → lender chart → funds to complete → assumptions strip → broker CTA. If the scenario panel renders fully expanded on mobile, the actual result is pushed ~2 screens down — violating the MD's own rule "don't push primary proof below the fold".
2. The lender detail panel risks being invisible on mobile (user taps a row, the panel updates off-screen below 6+ rows). Either auto-scroll to the panel, move the panel to a sticky bottom summary, or expand details inline under the tapped row (accordion). Decide and spec it.
3. The broker CTA is the primary business conversion; on mobile consider a persistent (but small) sticky footer CTA after the user has scrolled past the charts — needs an explicit decision since it trades against the calm aesthetic.

---

## 8. Cross-cutting gaps (both breakpoints)

- **Design-token gaps exposed by this page**: no error/negative colour, no success colour, no premium/upsell accent, no focus-ring spec (colour, width, offset), no disabled-state opacity/colour rule, "blue-grey" chart colour referenced but not defined.
- **Motion**: zero animation spec anywhere — bar width transitions, value changes, modal open/close, switch/segment transitions. Even "150–250ms ease-out, respect `prefers-reduced-motion`" would unblock a build.
- **Iconography**: which icon set? (Arrow is hand-drawn SVG on landing; modals need close ×, maybe info icons for tooltips.)
- **Tooltips**: no tooltip component exists in the system, but §3.2 hover-info implies one. Define or explicitly forbid.
- **Number animation** and `font-variant-numeric: tabular-nums` — stated for values; confirm it applies to bars' value lane and detail panel.
- **Print/share**: is a shareable or printable result an explicit requirement? (Assessment page has a "share card" concept — does the results page link to it?)
- **Analytics events**: lender row selected, scenario field changed, advanced opened, broker modal opened/submitted — worth listing in the spec if this page is a conversion surface.
- **Copy source of truth**: several exact strings exist (chart title, broker strip) but most microcopy (labels, helpers, errors, empty states, tooltips) does not. A copy table per component would close half the questions in this document.

---

## 9. Priority question list (what to answer first)

1. What is the hero's headline number, and is it the same value as the lender chart's "headline max value"? (§1.6, §7)
2. What happens when no lender lends / remaining cash is negative? Both are guaranteed states with zero design. (§1.4, §4.1)
3. Recalc model: client-side instant vs async — determines all loading-state work. (§1.2–1.4)
4. Do Funds to Complete figures depend on the selected lender? (§4.1)
5. Exact field list + defaults for the Advanced Assumptions modal, and the unlocked (premium) flow. (§5.3)
6. Mobile pattern for the lender chart rows and detail panel. (§6, §7-mobile)
7. Scenario panel mobile behaviour: expanded vs collapsed summary. (§6)
8. Definitive lender count, ordering, and colour assignment rules. (§3.1)
9. Broker modal form validation, consent line, and success/failure states. (§5.2)
10. Error/negative and premium colour tokens. (§8)

---

## 10. Verification checklist once Results.html is available

Because the Claude Design file couldn't be imported from this environment, the following must be cross-checked against `Results.html` and folded back into `design.md`:

- Hero content and exact headline treatment
- Header variant used on results
- Control types for state selector and advanced trigger
- Lender count, logo usage, lane widths, selected-row styling, detail-panel layout
- Funds to Complete segment colours and legend lanes, presence/absence of LMI
- Scenario assumptions strip content and placement
- Any components present in the HTML but absent from the MD (and vice versa — MD bans e.g. the "Panel spread" footer and top-right promo cards; confirm the HTML complies)

*To get the file into a session: open the project at claude.ai/design and use "Send to Claude Code Web", or run `/design-login` in a local interactive Claude Code session, or paste/commit the exported `Results.html` into this repo.*
