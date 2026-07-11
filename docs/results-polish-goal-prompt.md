# Goal prompt — results page v3.6 owner-review polish

> Copy everything below the line to the implementation agent, verbatim. Branch: `landing-b-the-range`. Scope: the seven §16 amendments in `docs/results-page-spec.md` v3.6. This prompt does NOT re-open v3.5's architecture — it polishes the running build per the owner's review.

---

## Goal

Implement `docs/results-page-spec.md` **§16 (v3.6 owner-review amendments)** on the results prototype (`/results`, `src/pages/results/**`), verify each change in the browser at desktop and mobile, and keep the status table below updated. §16 overrides earlier sections where they conflict; everything else in v3.5 stands. You are implementing decided design.

**Working-tree caution:** the tree carries uncommitted work from prior agents (results v3.5 build, landing workstream). Build on it; never revert or stash; do not touch landing files.

## Read first

`docs/results-page-spec.md`: §16 in full, then the sections it amends (§3.4, §5.1, §6.1, §7.2, §10.1, §11, §12) and §2 (non-negotiable rules — especially rate parity and Inter-only). Then the current sources: `src/pages/results/**`, `src/components/ResponsiveDialog.jsx`.

## Tasks, in order

1. **Table polish (§16.1)** — chevron in a fixed ~20px column flush to the row's right padding, one 16px gap from the repayment column; card head gets 20–24px block padding (title stays); column headers unified at 12.5px/600 muted, right-aligned over values, lighter sort glyphs; repayment values lose the `/mth` suffix.
2. **Lender details body (§16.2)** — Rate / Comparison rate / Monthly repayment / LVR become a 2×2 grid of `--field` stat tiles (label 11px muted, value 16px/700, uniform; rate pair identical treatment); Loan purpose / Repayment / Loan term / Rate type become a uniform quiet two-column grid (13px key muted, 14px/600 value). Kill the current mixed sizing. No copy additions, no ranking lines.
3. **Mobile sheet height parity (§16.3)** — one sheet height across the Lender details and Cost breakdown tabs (size to the taller tab or a fixed snap); shorter tab top-aligns; body scrolls internally; switching tabs never resizes the sheet.
4. **Header (§16.4)** — circular 28px `--field` back button leading the wordmark (history back to the flow's review step), desktop and mobile; "Save & exit" restyled as a secondary button (`--field` bg, 38px min-height, 12px radius, 14px/600); confirm About/Learn are absent (deliberate).
5. **Broker dialog (§16.5)** — preferred-lender options lender-name only (no em dash, no product); remove "Anything else?"; Email optional or removed; sticky dialog footer so consent + "Request a call back" are always visible with content scrolling behind; verify no viewport in the matrix requires scrolling to reach the CTA.
6. **FAQ section (§16.6/§16.7)** — new "How we worked this out" section after the CTA band: four-item accordion per the spec copy (assumptions summary as item 1, credit-check, why-lenders-differ, accuracy + comparison-rate-warning placeholder marked [COMPLIANCE TO CONFIRM]); 1px `--line-soft` separators, 44px targets, `aria-expanded`, all closed by default; strings in the copy module. If an assumptions/"How we estimate" affordance exists elsewhere, item 1 becomes its canonical home (remove the duplicate or point it here).
7. **Sweep** — §2 rules re-checked (rate parity everywhere, Inter-only, action hierarchy stable); reduced-motion unaffected; states gallery updated if it renders affected components; `npm run build`, typecheck, unit (scoped `vitest --dir src` if the repo-wide run sweeps other workstreams' scratch), results e2e all green; screenshots at 1440×900 and 393×852 for each changed surface (table, detail body, sheet both tabs, header, broker dialog, FAQ) into the session scratchpad, clearly labelled.

## Loop, status, and rules

Per task: build → tests → look at the real screens → fix → flip the row below → next. Never weaken a test; re-target assertions to §16 and note it. Update this table in the working tree; **commit nothing** — the owner reviews first.

| Task | Status | Notes |
| --- | --- | --- |
| 1. Table polish | todo | |
| 2. Detail body tiles | todo | |
| 3. Sheet height parity | todo | |
| 4. Header (back + Save & exit button) | todo | |
| 5. Broker dialog | todo | |
| 6. FAQ section | todo | |
| 7. Sweep + evidence | todo | |

### Deviations and blockers
(none yet)

## Definition of done

All seven rows `done`; labelled screenshots for every changed surface listed in the final reply; §2 rate parity visually confirmed; build/typecheck/unit/e2e green; deviations summarised (or "none"); nothing outside `src/pages/results/**` and this doc touched.
