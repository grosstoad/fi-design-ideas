# Goal prompt — results prototype visual refresh (spec v3.3)

> Copy everything below the line to the implementation agent, verbatim. Branch: `landing-b-the-range`. This supersedes `results-page-codex-goal-prompt.md` (that was the initial-build prompt; the prototype exists — this is the visual refresh that brings it to spec v3.3).

---

## Goal

Bring the existing results prototype (`/results`, `src/pages/results/**`) up to `docs/results-page-spec.md` **v3.3** visually and structurally, verify it in the browser at desktop and mobile, and keep a status table in this file updated as you go. Visuals only: do NOT touch the engine seam, fixture data values, or production FILL-INs (§14) — those are deferred by the owner.

The spec wins over any other doc or code comment. You are implementing decided design, not designing.

## Read first

1. `docs/results-page-spec.md` §3 (tokens v3.3), §7.1, §7.7 (chooser illustrations), §8 (funds block v3.3), §10.4 (ResponsiveDialog note), §12 (copy table), §14 rows #31/#32.
2. `src/pages/results/README.md` (the prototype's own architecture notes), its token module/CSS token block, and `src/components/ResponsiveDialog.jsx`.
3. The landing implementation of the funds pattern: `FundsCard` in `src/pages/LandingBRangePage.jsx` + its CSS — §8's reference implementation.

**Working-tree caution:** other agents' uncommitted changes may exist (landing files, and possibly an earlier token-retrofit pass over `src/pages/results/**`). Build on what's there; never revert or stash. If a token retrofit is already partially applied, verify it against the checklist below instead of redoing it.

## Tasks, in order

1. **Token pass (or verification of the existing retrofit)** — Inter 400/600/700; page `#FFFFFF`; borders `#D6D3D1` (soft `#E9E9E5`); muted `#5F5E58`; primary fills teal `#2DD4BF` with **black labels** (hover `#14B8A6`); links/focus `#0F766E`; mint `#85C7BE` only for progress/toggles/radios; **12px** shared radius; desktop container **1180px**; header 64px sticky. Change values at the token layer; update token/hex tests to the new values (never delete tests).
2. **Wordmark** — header reads **"Ask Fundora"** (code identifiers and the engine repo name stay untouched).
3. **Chooser illustrations** — Update details rows use casual-client assets: `house.png` (Property), `calculator.png` (Loan), `piggy-bank.png` (Financial), ~40px anchored in-row, no chip box. Copy assets from `/Users/sarah/Code/casual-client/assets/` into the repo if a prior agent hasn't already.
4. **Funds block rework (§8 v3.3)** — the expanded funds view becomes the landing pattern: segmented horizontal bars (10px, 2px white gaps, rounded outer ends) + colour-dot legends per group; group 2 titled **"Funding breakdown"**; rows **"Loan from {lender} ({XX}% LVR)"** (LVR on the loan row, parentheses, no middle dot) and **"Deposit"**; final row **"Savings left over"** in green-dark `#0b6b4a`; hairlines between groups replaced by spacing. Numbers keep reconciling exactly (§8's invariant). Update the copy module keys per spec §12 (`funds.groups`, `funds.rows`).
5. **ResponsiveDialog adoption** — every modal/sheet surface (mobile lender sheet, the three Update-details surfaces, broker capture, "How we estimate") renders through `src/components/ResponsiveDialog.jsx` instead of bespoke chrome, preserving each surface's specced content, snap/close and focus behaviour (§10.4, §13).
6. **Desktop evidence pack (#28)** — at 1180px container: screenshot `/results` desktop master–detail at 1440×900 and 1280×800, plus mobile 393×852, plus the funds block expanded and the Update details chooser open. The owner signs off desktop from these — label the files clearly.
7. **Regression sweep** — motion per spec §11 unchanged (count-ups once, FLIP re-rank, reduced-motion final states); rate + comparison rate still identical prominence everywhere (§12a — legal, re-check after every task); states gallery still renders every state; `npm run build` + unit + e2e green.

## Test-and-verify loop (every task)

Build → tests → dev server → look at the actual screens at 1440 and 393 → fix → update the status table below → next task. Screenshots to the session scratchpad, not the repo. Never weaken a test to force a pass; update expectations to spec values and note it.

## Status protocol (required)

Maintain this table in THIS file, committing doc updates together with each task's code... except: **do not commit at all unless the owner has said to** — in that case update the table in the working tree only and say so in your final reply.

| Task | Status | Notes |
| --- | --- | --- |
| 1. Tokens v3.3 | todo | |
| 2. Wordmark | todo | |
| 3. Chooser illustrations | todo | |
| 4. Funds block §8 | todo | |
| 5. ResponsiveDialog | todo | |
| 6. Desktop evidence pack | todo | |
| 7. Regression sweep | todo | |

### Deviations and blockers
(none yet)

## Definition of done

All seven rows `done`; §12a parity visually confirmed in the final screenshots; the desktop evidence pack paths listed in your final reply; deviations summarised (or "none"); build and all suites green; nothing outside `src/pages/results/**`, the copied assets, and this doc touched.
