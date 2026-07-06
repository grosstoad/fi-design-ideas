# Results Page — Implementation Instructions for a Coding Agent

**Audience:** an AI coding agent (GPT-5.5 / Claude Opus 4.8 class) or an engineer implementing the FundIQ results page in this repository.
**Authoritative sources, in priority order:**
1. `docs/results-page-spec.md` — the build spec. Section references below (§) point into it.
2. `docs/results-page-spec-review.md` — rationale. Read §3 (calculation audit) and §9 (decision register) before writing code.
3. The Paper artboard `18WZ-0` ("Results v8 — Clean selected card + detail flow", file `01KSYP7T3MFEQHHED41F3PQB58`) — **visually** authoritative (mobile). Export the frames "01 Default results", "02 Selected lender clean card", "03 Selected plus funds action", "04 Update details sheet", "05 Sort sheet", "M3 Statement card" as PNG references before starting; pixel comparison against them is part of acceptance (§5.6).
4. The design export (`Results.html` + `app/*.jsx` from FundIQ_Desktop.zip) — desktop layout reference only; its tokens (Hanken Grotesk, cream/forest) are **retired**, spec §3 wins. See "Traps" below for what NOT to copy from it.

If this document and the spec conflict, the spec wins. If the spec is silent, follow this document. If both are silent, **stop and record the question in the FILL-IN registry (see below) — do not invent product behaviour.**

---

## 1. Ground rules (read first — these override your defaults)

1. **Read the entire spec before writing any code.** Produce a short implementation plan (file list + build order per §4 below) as your first artifact. Do not start with the happy path.
2. **You are implementing, not designing.** Where the spec marks a decision [ADOPTED], implement it exactly. Where it marks 🔶 FILL-IN, implement the stated default, register it (§3.4), and move on. Never silently pick a different behaviour because it's easier to build.
3. **States before polish.** Every component is built with ALL of its states (loading, empty, error, recalculating, selected, focus-visible, reduced-motion) before any visual refinement. A pixel-perfect happy path with missing states is a failed implementation here.
4. **Accessibility is acceptance criteria, not cleanup.** The listbox semantics (§7.4), dialog focus traps (§10.4, §13), global focus ring (§3.4), and reduced-motion behaviour (§11) ship with the component or the component isn't done.
5. **Scope guard:** touch only the files listed in §2.2 plus `src/App.jsx` (one new route). Do not modify existing routes, `src/styles.css`, or unrelated components. Do not upgrade or remove existing dependencies.
6. **No placeholder rot:** no `TODO` comments without a matching FILL-IN registry entry; no `console.log`; no commented-out code; no lorem copy (all strings come from the copy module, §3.3).
7. **Commit hygiene:** one commit per §4 milestone, message describing behaviour ("Add lender list with selection, keyboard nav and re-rank animation"), each commit leaves the app building (`npm run build`) and tests green.

---

## 2. Architecture

### 2.1 Stack decisions (fixed)

- **TypeScript** for all new code (`tsconfig.json` exists; repo mixes `.jsx`/`.tsx` — new code is `.tsx`/`.ts`).
- React 19 + react-router (already installed). New route `/results` in `src/App.jsx`, lazy-loaded like the comparison pages.
- **Styling:** one new stylesheet `src/pages/results/results.css`, every class prefixed `rp-` (repo convention: scoped namespaces like `br-*`, `paperlp-*`). Design tokens from spec §3.1 as CSS custom properties under `.rp-page` — do NOT add them to `:root` or reuse legacy `fundiq-*` styles.
- **Testing (add as devDependencies):** `vitest` + `@testing-library/react` + `@testing-library/user-event` + `jsdom`, `axe-core` (via `vitest-axe`), and `@playwright/test` for e2e. Playwright must use the preinstalled browser: `executablePath: '/opt/pw-browsers/chromium'`, never `playwright install`.
- Add scripts: `"test": "vitest run"`, `"test:watch": "vitest"`, `"e2e": "playwright test"`.

### 2.2 File layout

```
src/pages/results/
  ResultsPage.tsx           // route shell: layout switch, URL sync, providers
  results.css               // all rp-* styles + token block
  engine/
    types.ts                // Scenario, LenderResult, ServiceabilityEngine (spec §4.3)
    fixtureEngine.ts        // fixture implementation (see §2.3)
    fixtures.ts             // lender dataset + golden numbers
  lib/
    format.ts               // fmtPriceM, fmtMoney, fmtPct, fmtK  (spec §4.4)
    tokens.ts               // accent derivation: darken/tint/textOn (spec §3.1)
    copy.ts                 // every user-facing string, keyed as spec §12
    fillIns.ts              // FILL-IN registry (§3.4)
  components/
    Header.tsx              // C1
    Hero.tsx                // C2
    LenderList.tsx          // C3: list card, rows, view-all
    LenderDetail.tsx        // C4 desktop card
    LenderCardMobile.tsx    // C4 mobile card
    EditLoanPanel.tsx       // §7.7 disclosure + segmented controls
    FundsToComplete.tsx     // C5
    CtaRow.tsx / Dock.tsx   // C6
    BottomSheet.tsx         // §10.4 generic sheet (snap, drag, focus trap)
    BrokerOverlay.tsx       // C7 (modal/sheet switch)
    BrokerForm.tsx          // §13 fields + validation + success
    PageStates.tsx          // C8: skeletons, error, empty panels
  hooks/
    useResults.ts           // engine orchestration, ranking, recalc, status
    useCountUp.ts           // §11, reduced-motion aware
    useFocusTrap.ts
  __tests__/                // colocated *.test.tsx mirroring components
  dev/StatesGallery.tsx     // dev-only route, see §5.3
e2e/results.spec.ts
```

Component boundaries mirror the spec's component IDs (C1–C8) so spec↔code traceability is 1:1.

### 2.3 The engine seam (most important structural decision)

All maths lives behind one interface — nothing in a component computes money:

```ts
interface ServiceabilityEngine {
  calculate(scenario: Scenario): Promise<EngineResult>;
  // EngineResult = { lenders: LenderResult[]; asAt: string }
}
```

- Implement `fixtureEngine.ts` against this interface using the 8-lender dataset from the design export **but with the corrected maths of spec §5** (usable-deposit model, §5.3). Document each fixture formula with a comment referencing its spec section and FILL-IN number.
- The real engine (`fundiq-serviceability-calculations`) plugs in later by implementing the same interface — that swap must require **zero component changes**. Write a contract test (`engine.contract.test.ts`) that any implementation must pass: eligibility filtering, descending ranking, usable-deposit invariant (`maxPrice − maxLoan + costs === savings` within rounding), LVR bounds, non-negative funds rows.
- Simulate latency in the fixture engine via an injectable delay (0ms in tests, ~600ms in dev) so loading states (§9.1–9.2) are real and demo-able.

### 2.4 State model

- **URL is the source of truth for selection:** `?lender=<id>` (spec §4.1). Selection changes push history on mobile (sheet open/close = back-button navigable), replace on desktop. Unknown id → rank-1 default.
- Loan settings + scenario live in one reducer in `useResults`; persisted to `sessionStorage` (`fundiq:results:v1`) so refresh restores state. Version the key.
- Recalc flow (spec §7.7, revised — no live debounce): Update details sheet → user edits → **"Save and recalculate"** → sheet closes → `status: 'recalculating'` (values shimmer in place, layout frozen, rows stay interactive) → resolve → FLIP re-rank under the active sort. Cancel discards the draft (sheet state is a local draft, never written to the scenario until save). Still guard stale responses: tag each engine call with a sequence number and discard out-of-order results (rapid save → reopen → save is the repro).
- Sort (spec §7.3a) is pure client-side ordering state — one `sortBy` field, never touches the engine. Keep it separate from the scenario reducer so it can't accidentally trigger recalc.

---

## 3. Quality mechanics

### 3.1 Spec traceability

- Every component file starts with a one-line header comment: `// Spec: results-page-spec.md §7.4 (C3 lender row)`.
- Every test name cites its spec anchor: `it('§7.4: arrow keys move selection and selection follows focus', …)`.
- This makes spec-vs-code review mechanical, and it makes it obvious when code exists that no spec section asked for (delete it).

### 3.2 Copy discipline

All strings live in `lib/copy.ts`, keyed exactly as spec §12 (`hero.support`, `funds.shortfall`, …), with typed interpolation helpers. Components never contain literal user-facing strings. Tests assert against `copy.*` imports, so copy edits never break tests. This is also the owner's single review surface for words.

### 3.3 Token discipline

The Paper palette (spec §3.1) is flat — no derivation formulas. CSS custom properties are written once in `results.css` exactly as spec §3.1 names them (`--bg`, `--field`, `--accent`, `--control`, `--cta`, …); components reference variables, never hex. Font stack: `"Helvetica Neue", system-ui, sans-serif`, weights 400/700 only — if you reach for 500/600/800, the spec says you're off-design. A test greps built CSS for rogue hex values outside the token block (cheap lint, catches drift).

### 3.4 FILL-IN registry

`lib/fillIns.ts` exports the open items copied from spec §14 that touch code:

```ts
export const FILL_INS = [
  { id: 2,  section: '§9.1', defaultUsed: 'staged loading with 600ms fixture delay', blocking: true },
  { id: 6,  section: '§5.2', defaultUsed: 'flat NSW-approx stamp duty in fixtures', blocking: true },
  // …
] as const;
```

In dev builds, mount logs a single grouped `console.info` of unresolved FILL-INs. Every place a default is implemented references its id: `stampDuty(price) /* FILL-IN #6: placeholder curve */`. When the owner answers an item, the registry entry and all its markers are removed in the same commit — grep-able closure.

### 3.5 Documentation to produce (part of the deliverable, not optional)

1. `src/pages/results/README.md` — architecture overview: the engine seam, state model, how to swap the real engine, how to run tests/e2e/gallery. Max 2 pages.
2. **ADRs** (short, in the README or `docs/adr/`): TypeScript for the feature; engine interface + fixture strategy; URL-as-selection-state; sheet history behaviour. One paragraph each — the *why*, for the next agent.
3. JSDoc on the engine interface and every exported hook.
4. Update the root README route list if one exists.

---

## 4. Build order (milestones = commits)

1. **Scaffold + tokens + engine.** Route, `results.css` token block, `types.ts`, `fixtureEngine.ts` + contract tests + format tests. *App shows a blank rp-page; tests green.*
2. **Desktop list + hero, all list states.** C2, C3 with selection/keyboard/aria, sort control + sheet/popover (§7.3a), skeleton + staged loading, empty (§9.4), error (§9.3), view-all. *No detail card yet.*
3. **Desktop detail.** C4: identity band, capacity pair + rate pair, statement rows, compare footer (§7.8a), edge cases (§7.8), funds block C5 with verdict states.
4. **Update details loop.** §7.7 end-to-end: chooser → property/loan sheets (with conditional rows) → Save and recalculate → recalc shimmer, FLIP re-rank, stale-response guard, selection retention, hero update, cancel-discards-draft. *This is the riskiest milestone — see Traps 5–6.*
5. **Mobile.** Layout switch, dock, `BottomSheet` (snap/drag/focus trap/history), mobile card, dock suppression.
6. **Broker capture.** Form, validation, submit states, success, post-success CTA lockout (§13.6). Lead API behind a `submitLead` stub with injected failure for testing.
7. **States gallery + e2e + a11y pass + docs.** §5.3 gallery, Playwright flows, axe on every gallery state, README/ADRs.

Do not reorder: mobile before the recalc loop hides the hardest bugs behind two layouts.

---

## 5. Testing strategy

### 5.1 Unit (vitest)

- `format.ts`: every rule in spec §4.4 including boundaries ($999,499 vs $1M, trailing-zero retention in `$3.10M`).
- `tokens.ts`: exact derived hex for the adopted accent; luminance switch both sides of 0.62.
- Engine contract tests (§2.3) — run against the fixture engine now, the real engine later.
- Broker validation: table-driven cases per §13.2 including AU phone normalisation (`+61 400…` ⇄ `0400…`), and per-field error clearing.

### 5.2 Component / interaction (Testing Library; reduced-motion forced on for determinism)

- §7.4: click + Enter/Space + ArrowUp/Down selection; `aria-selected`; exactly-one-selected invariant; announcement region text.
- §7.3a: sort changes order without any engine call (spy on the engine — zero calls); head-row note updates; compare footer appears when selection ≠ leader (§7.8a) and hides when it is.
- §7.5: view-all toggle, selected-outside-top-6 note.
- §7.7: chooser routes to the right sheet; conditional rows (IO term, fixed term) appear/disappear with their parent field; Save → exactly one engine call; Cancel → zero calls and scenario unchanged; rapid save/reopen/save → last-wins (stale guard); re-rank order; selection retained; ineligible-selected fallback toast (§7.8).
- §8: verdict states incl. shortfall styling; rows hidden when LMI = 0.
- §9: each page state renders from its status prop (drive via fixture engine modes: `slow | fail | partial | empty`).
- §10.4: sheet focus trap, Esc/scrim/✕ close, focus return, dock hidden while open.
- §13: full form journey — invalid submit scrolls to first error; success view; duplicate-submit lockout.
- Axe assertions on: full page (both layouts), open sheet, open broker modal, error and empty states. Zero violations is the bar.

### 5.3 States gallery (dev route `/results/dev-states`)

A dev-only route rendering every named state side-by-side from fixtures: loading (staged, mid-flight), default, recalculating, re-ranked, empty, error, partial, shortfall funds, broker form/error/success, mobile sheet at both snap points, reduced-motion variant. Purpose: (a) owner review without clicking through flows, (b) Playwright screenshots each gallery cell as a visual baseline, (c) axe runs per cell. Exclude the route from production builds (`import.meta.env.DEV` guard).

### 5.4 E2E (Playwright, preinstalled chromium)

Three journeys, desktop (1340×900) and mobile (392×844) projects:
1. Load → staged reveal → select 3rd lender → detail matches fixture golden numbers → Update details → Loan details → set Interest only (IO-term row appears) → Save and recalculate → list re-ranks → selected retained. Plus: sort by monthly repayment → order changes, hero unchanged, compare footer shows.
2. Mobile: tap row → sheet opens (URL has `?lender=`) → browser back closes sheet → dock reappears.
3. Broker: open → submit empty → first-error focused → fill valid → success → CTA locked; reload → session persistence check.

Golden numbers: assert exact strings (`$3.10M`) computed once from fixtures into a `goldens.ts` — never retype numbers in tests.

### 5.5 What NOT to test

Don't screenshot-diff animations; don't unit-test CSS hover colours; don't test the real engine's finance maths here (that's the serviceability repo's job — only the contract).

### 5.6 Pixel verification against the Paper frames (acceptance gate)

The Paper reference PNGs (source list in "Authoritative sources" #3) belong in `docs/reference/paper/` — exporting them from Paper is an owner/setup task; if they are missing when the build starts, proceed against spec §3's measured values (they were extracted from the same frames) and treat the PNG comparison as the final gate once the exports land. For each reference, a Playwright script renders the matching app state at 393×852, screenshots it, and produces a side-by-side + overlay diff. This is a **human-judged gate, not an automated threshold** — fixture data differs from the mock's values, so raw pixel-diff percentages are meaningless. What must match exactly:

- Type sizes/weights per spec §3.2 (verify with computed styles, not by eye: H1 25px/700, hero 38px/700, tile values 24px/700, rate pair equal classes).
- Palette per §3.1 (grep computed styles for the token hexes; zero rogue colours).
- Structure: element order, alignment lanes, spacing rhythm within ±2px, radii 8px, hairline dividers.
- The two legal/owner invariants re-checked visually every iteration: rate = comparison-rate prominence; capacity pair equal treatment.

Iterate: render → compare → fix → re-render, per frame, until a reviewer can flick between reference and build without spotting a structural difference. Record each frame's final screenshot pair in the PR description.

---

## 6. Traps — what this implementation gets wrong by default (read twice)

These are the specific places where a competent agent, working from the design export and general instincts, will produce something subtly wrong:

1. **Do NOT port the maths from `app/results-data.jsx`.** The prototype's `price = loan + deposit` **double-counts the deposit** (the same $620k funds the price gap AND pays $190k+ stamp duty). It looks authoritative — it's executable, commented, and internally consistent — and it is wrong. Spec §5.3's usable-deposit model replaces it. The fixture engine must implement §5.3 and the contract test must enforce the invariant.
2. **Do not adjust comparison rates.** The prototype's `adjRate` loads the comparison rate alongside the actual rate; comparison rates are regulated published figures ([A11]). Fixture data carries a static published comparison rate; missing → render "n/a".
3. **Animation runs once.** The prototype remounts the detail on every selection (`key={selId}`), replaying count-ups each click. The spec forbids this ([A9]): update in place; only the capacity-pair tile values animate on selection. Don't copy the remount pattern.
4. **The prototype has no focus styles, no dialog semantics, no sheet close button.** You will be tempted to transcribe its DOM. The spec's a11y layer (§3.4, §7.4, §10.4) is NEW work, not present in the reference — budget for it explicitly.
5. **Stale async responses.** Rapid segmented-control clicks fire overlapping engine calls; without the sequence guard (§2.4) results arrive out of order and the UI shows lender rankings from a superseded scenario. No visual test catches this; write the unit test first.
6. **Re-rank + selection + URL interact.** After an edit: selection must survive re-ranking (it's identity-keyed, not index-keyed), the URL must not churn history entries, and if the selected lender becomes ineligible the fallback (§7.8) must fire exactly once. Write these three assertions before implementing the reducer.
7. **`prefers-reduced-motion` and screen-reader number churn.** Count-ups must render the final value into the accessible name immediately (visual-only animation), and reduced motion skips them entirely (§11). Agents animate the accessible DOM by default.
8. **Session/browser edges:** refresh mid-recalc (persisted state restores, recalc re-fires cleanly); sheet open + refresh (URL restores selection, sheet reopens closed-by-default is acceptable — document the choice); two tabs (sessionStorage isolates naturally — verify, don't share via localStorage).
9. **The dock/sheet CTA duplication** (§10.6): dock hides while the sheet is open. The reference shows both. Copying the reference reintroduces a double "Connect with a broker".
10. **Don't resolve FILL-INs by improvisation.** E.g., #6 stamp duty: the default is a labelled placeholder curve in fixtures — do not go implement all-states stamp duty tables from memory; that's engine-repo work awaiting owner confirmation.

---

## 7. Definition of done

- [ ] All §4 milestones committed; `npm run build` and `npm run typecheck` clean; all tests green; e2e green on both viewports.
- [ ] Every spec component C1–C8 implemented with every state listed in spec §7–§10; states gallery shows them all.
- [ ] Axe: zero violations across gallery states.
- [ ] Keyboard-only walkthrough completes journey 1 and 3 (§5.4) without a pointer.
- [ ] No string/hex/formula outside `copy.ts` / `results.css` tokens / engine.
- [ ] FILL-IN registry matches spec §14 exactly; every code default marked.
- [ ] `README.md` + ADRs written; engine swap documented and demonstrated by the contract test.
- [ ] Self-review pass: re-read spec §7–§13 top to bottom against the running app (use the gallery), fix every mismatch or log it as a deliberate deviation in the README's "Deviations" table (empty table is the goal).
