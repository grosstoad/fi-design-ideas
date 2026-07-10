# Goal prompt — execute the Fundora landing page spec

> Copy everything below the line to the implementation agent, verbatim. It assumes the repo is checked out on branch `landing-b-the-range`.

---

## Goal

Implement `docs/landing-b-final-implementation-spec.md` (v1.1) on `/landing-b`, exactly as written, and keep that spec file updated with your progress as you go. The spec is the single source of truth: where it conflicts with any other doc, code comment, or your own judgement about design, the spec wins. You are implementing, not designing — the design decisions are all made.

## Read first, in this order

1. `docs/landing-b-final-implementation-spec.md` — the whole thing, before any code. §3 has exact copy and values; §5 is your task order; §6 is what you must not do; §7–§8 are how you'll be judged.
2. The current sources it references: `src/pages/LandingBRangePage.jsx`, `src/landing-b.css`, `src/pages/landing-b/model.js` (+ tests), `e2e/landing-b.spec.ts`.
3. Open https://main.d2shr8dw0vjdmh.amplifyapp.com/ in the browser and keep it open — header/footer/button parity is checked against it directly (§3.1/§3.9 contain the transcription, but your screenshots must match the live site, not just the words).

## Execution rules

- Work through **§5 tasks 1–13 in order**, one task at a time. Do not reorder, batch, or skip; the order minimises rework.
- Copy is verbatim from §3 — never paraphrase, "improve", or add copy. No em dashes in any user-facing text.
- §6 non-goals are hard vetoes. If you find yourself adding a hover state to a lender row, a hamburger, a new colour, or a looping animation: stop, re-read §6.
- Scope: `src/pages/LandingBRangePage.jsx`, `src/landing-b.css`, `src/pages/landing-b/*`, `e2e/landing-b.spec.ts`, and lender assets only. Do not touch other routes, global styles, or the docs except the status section described below.
- If something in the spec is impossible or contradictory in practice, do NOT silently improvise: record it in the status log (see below) with what you did instead and why, and continue.

## Test-and-verify loop (every task, not just at the end)

After each §5 task:
1. `npm run build` — must pass.
2. Run unit tests (`npm test` / vitest) — must pass; update assertions the task legitimately changed (renamed strings, removed elements). Never weaken a test to force a pass — if a test contradicts the spec, fix the test to assert the spec and note it in the status log.
3. Run the dev server and LOOK at the result: screenshot at 1440×900 and 375×812 minimum. For task 1 (header/footer) also screenshot the live amplify site and compare side by side.
4. Playwright e2e (`e2e/landing-b.spec.ts`) once tasks touch behaviour it covers; extend it per the spec's §4 table (above-the-fold check, slider recalc, scroll handoff, reduced-motion carousel).
5. Update the status section, commit (see protocol), then start the next task.

Final gate (after task 13): walk §7 acceptance criteria 1–12 one by one and §8's visual QA at 1440 / 1280 / 768 / 375 — each gets an explicit pass/fail in the status log with screenshot evidence for the visual ones. Reduced-motion is checked by emulating `prefers-reduced-motion: reduce`, not by assumption.

## Status-update protocol (required, not optional)

Maintain progress inside `docs/landing-b-final-implementation-spec.md` itself:

1. On starting work, append this section to the end of the spec:

```markdown
## 10. Implementation status (maintained by the implementation agent)

| §5 task | Status | Commit | Notes |
| --- | --- | --- | --- |
| 1. Header/footer parity | todo | | |
| 2. Grid/typography/background | todo | | |
| 3. Hero compaction + entrance | todo | | |
| 4. RangeModule corrections | todo | | |
| 5. LenderProof carousel | todo | | |
| 6. Remove price-ceiling section | todo | | |
| 7. HowItWorks rebuild | todo | | |
| 8. FundsCard revisions | todo | | |
| 9. PropositionGrid rework | todo | | |
| 10. FinalCTA | todo | | |
| 11. Motion polish | todo | | |
| 12. Reduced-motion audit | todo | | |
| 13. Tests + visual QA | todo | | |

### Deviations and blockers
(none yet)

### Acceptance criteria results (§7)
(filled in at the final gate)
```

2. Per task: flip `todo` → `in progress` when you start, → `done` (with the commit short-hash) when its loop passes. Anything you could not do exactly as specced goes under "Deviations and blockers" with one line of what/why — never leave a silent gap.
3. Update the tracker line at the very top of the spec when everything is done: `**Status: IMPLEMENTED — see §10**`.
4. The status edits are committed together with the task's code, so the doc never describes a state the branch isn't in.

## Commit protocol

- One commit per §5 task (task 13 may be two: tests, then QA fixes). Message: what behaviour changed, present tense, no em dashes. Do not push unless the owner has said to.
- Every commit leaves the app building and tests green.

## Definition of done

- §10 table: all 13 tasks `done` with commit hashes.
- §7 criteria 1–12: all explicitly passed in the status log.
- §8 QA: checked at all four widths with no open items.
- Zero entries under "Deviations and blockers" that the owner hasn't been told about (your final reply summarises them, if any).
- Final reply: a short report — what shipped per task, deviations list, screenshot paths for the §7 evidence, and anything genuinely left for the owner.
