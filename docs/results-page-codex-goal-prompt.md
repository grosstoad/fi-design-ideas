# Codex goal prompt — build the FundIQ Results page

> Copy everything below the line into codex as the task prompt. It assumes the repo is checked out with `docs/results-page-spec.md`, `docs/results-page-spec-review.md`, and `docs/results-page-implementation-guide.md` present at the commit that introduced spec v3.

---

## Goal

Build a **functional, interactive prototype** of the FundIQ Results page (`/results`) in this repository — something the owner can open in a browser and *play with*, end to end, on desktop and mobile viewports. This is a UI test-drive, not a production integration:

- **All numbers are fake** — the fixture engine (guide §2.3) supplies plausible, internally consistent data (8 lenders, corrected §5.3 maths). No real engine, no backend, no auth.
- **Every control works.** The owner must be able to: select any lender and see the detail card/sheet update; open Sort and reorder the list; open Update details, change loan/property inputs (watch conditional fields appear), hit "Save and recalculate" and watch the shimmer → re-rank; expand Funds to complete; sort by monthly repayment and see the compare footer; submit the broker form and hit the success state; and reach every state via the states gallery. Nothing renders as a dead control.
- Pixel-faithful to `docs/results-page-spec.md` (DRAFT v3), tested, and iterated against the acceptance gates below until every gate passes. Fidelity of *interaction and layout* is the point; the fake numbers just need to be coherent enough that the flows feel real.

You are done only when the Definition of Done at the bottom is true — not when the happy path renders.

## Read first, in this order (do not skip; do not start coding before finishing all three)

1. `docs/results-page-spec.md` — the build spec. It is the single source of truth for layout, tokens, type, copy, states, and interaction. Every measurable value in it was extracted directly from the Paper design frames; treat numbers as exact, not suggestions.
2. `docs/results-page-implementation-guide.md` — how to build it here: stack decisions, engine seam, state model, build order (§4), testing strategy (§5), and **§6 Traps** (read twice; each trap is a bug you will otherwise ship).
3. `docs/results-page-spec-review.md` §9–§11 — the decision register and what was verified against the design frames, so you understand *why* the spec says what it says.
4. **The Paper frames themselves** — you have a Paper integration; the spec's "Paper reference index" (top of the spec) deep-links every authoritative frame. Open at minimum: `18XL-0` (default results), `19MF-0` (canonical selected card), `193F-0`/`19EL-0` (update-details flow), `194T-0` (sort sheet), `19CR-0` (non-top selection). These outrank any verbal description of them.

Conflict rule: spec > implementation guide > this prompt. If all three are silent, implement the stated default if one exists; otherwise **stop and record the question** in the FILL-IN registry (guide §3.4) — never invent product behaviour.

## Non-negotiable invariants (check these at every iteration, not just at the end)

1. **Rate = comparison rate prominence (legal requirement).** Everywhere a rate renders, the comparison rate renders adjacent at identical font size, weight, and colour (spec §12a, A14). A single violation anywhere — including loading, error, and future-proofed surfaces — is a failed build.
2. **Capacity pair (owner direction).** The selected-lender detail leads with Max property price and Loan amount at identical visual treatment: two `--field` tiles, price left / loan right on desktop, price above loan on mobile (spec §7.6.2, §10.5, A13).
3. **Sort never recalculates; Update details always recalculates via explicit save** (spec §7.3a, §7.7, principles §2a). Enforce with tests that spy on the engine: sort → zero calls; Save and recalculate → exactly one.
4. **Funds to complete appears only after/with a selected lender, as a quiet row — never the page headline** (spec §2a-4, §8).
5. **Tokens and type only from spec §3** — `"Helvetica Neue", system-ui` at weights 400/700 only; the named CSS variables; 8px radii; flat surfaces. No hex outside the token block, no other weights, no shadows on page-level cards.

## What to build

Follow the implementation guide's milestone order (§4) exactly — scaffold/tokens/engine → list+hero (with sort) → detail card (capacity pair, rate pair, statement rows, compare footer, funds block) → Update details loop → mobile (sheets, dock) → broker capture → states gallery + e2e + a11y + docs. One commit per milestone, app building and tests green at each.

Fixture engine only (guide §2.3) — the real serviceability engine plugs into the `Engine` interface later with zero component changes. Do **not** port maths from `app/results-data.jsx` (guide §6 Trap 1 — its deposit maths is wrong; spec §5.3 replaces it).

## Test-and-iterate loop (this is the core of the task)

Work in a loop; never mark a milestone complete on the first render:

1. **Build** the milestone.
2. **Run** `npm run build`, unit + component tests (vitest/Testing Library per guide §5.1–5.2), then the Playwright journeys (guide §5.4) for everything built so far.
3. **Verify visually**: launch the dev server, screenshot the states gallery (`/results/dev-states`, guide §5.3) at 1340×900 and 393×852, and inspect the screenshots yourself — computed styles for type sizes and token hexes (guide §5.6 lists the exact checks: H1 25px/700, hero 38px/700, tile values 24px/700, rate-pair classes identical), alignment lanes, spacing rhythm ±2px.
4. **Compare against the Paper frames** via your Paper integration (screenshot each reference frame from the spec's Paper reference index; `docs/reference/paper/` exports are an optional convenience if present). Produce side-by-side + overlay images per guide §5.6.
5. **Fix and repeat** until: all tests green, zero axe violations on every gallery state, and a flick-test between reference and build shows no structural difference.
6. Re-check the five invariants above, then move to the next milestone.

Do not weaken a test to make it pass. If a test contradicts the spec, fix the test to match the spec and say so in the commit message.

## Hard constraints

- Scope: only the files the guide's §2.2 allows plus one route registration in `src/App.jsx`. Don't touch existing routes, global styles, or dependencies.
- All user-facing strings come from `lib/copy.ts`, keyed exactly as spec §12 — no literals in components. The spec's copy is final wording, including "Sorting changes the order, not your calculation." and "You may be able to afford a property up to {$X.XXM}."
- Accessibility is acceptance criteria (guide ground rule 4): listbox semantics, dialog focus traps, global focus ring, reduced-motion, number announcements — shipped per component, not as cleanup.
- Every FILL-IN default you implement gets a registry entry + inline marker (guide §3.4). No unregistered TODOs.

## Definition of Done

- [ ] **The prototype is playable:** `npm run dev` → `/results` loads with fixture data, and every interaction in the Goal section works by hand on both a desktop and a 393px-wide viewport — clicking through it is the owner's primary review method, ahead of any screenshot.
- [ ] All seven milestones committed in order; `npm run build` clean; all vitest + Playwright suites green.
- [ ] States gallery renders every named state (loading staged/mid-flight, default, recalculating, re-ranked, sorted + compare footer, empty, error, partial, shortfall funds, broker form/error/success, mobile sheet snap points, reduced motion); axe reports zero violations per state.
- [ ] The five invariants verified in the final screenshots and asserted by at least one test each.
- [ ] Pixel comparison artifacts (side-by-side + overlay per reference frame) attached to the PR description, or explicitly noted as pending on missing reference exports.
- [ ] `src/pages/results/README.md` + ADRs written (guide §3.5); FILL-IN registry reflects exactly the open items actually encountered.
- [ ] A final self-review pass: re-read spec §7–§10 top to bottom against the running app and list any deviation found (there should be none) in the PR description.
