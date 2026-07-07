# FundIQ Results Prototype

This route is a fixture-only prototype for `/results`. It is intentionally isolated under `src/pages/results`, with one route registration in `src/App.jsx` and a scoped stylesheet (`results.css`) using only `rp-*` classes.

## Architecture

- `engine/types.ts` defines the `ServiceabilityEngine` seam. The real engine only needs to implement `calculate(scenario)` and pass the contract tests.
- `engine/fixtureEngine.ts` supplies 8 coherent fake lenders. It implements the spec §5.3 usable-deposit model and marks fixture-only defaults with FILL-IN comments.
- `hooks/useResults.ts` owns scenario state, sessionStorage persistence, ranking, sorting, stale-response guards, and explicit save recalculation.
- Components map to the spec IDs: header, hero, lender list, detail card, funds block, update details, mobile sheet/dock, broker capture, and page states.

## ADRs

**TypeScript feature island.** New results code is TypeScript even though the repo mixes JSX/TSX. This keeps the engine contract and scenario edits explicit without refactoring existing pages.

**Engine interface + fixture strategy.** Components never compute lender maths. The fixture engine is realistic enough for UI review and can be replaced by the production serviceability engine with no component edits.

**URL as selection state.** The selected lender is synced through `?lender=<id>` so direct links and mobile sheet state can share one source of truth.

**Explicit save recalculation.** Sort changes only list order. Property/loan edits stay local until `Save and recalculate`, then the fixture engine runs once and rows shimmer while results refresh.

## Run

- `npm run dev` then open `/results`
- States gallery: `/results/dev-states`
- Unit/component/a11y: `npm run test`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- E2E: `npm run e2e`

## Prototype Defaults

See `lib/fillIns.ts` for the active registry. Important defaults: sessionStorage-only persistence, static rates-as-at date, placeholder stamp duty/LMI/fees, stubbed broker lead submission, placeholder comparison-rate warning, and financial-input rows that intentionally dead-end with the prototype note.

## Visual Verification

Paper references used during implementation: default results, M3 selected card, update details, detail destinations, sort sheet, and non-top selection. Current local screenshots are in `output/results-m*-*.png`; comparison overlays are pending a PR attachment workflow.

## Deviations

- The Paper artboard is mobile-only; desktop layout follows the spec's extrapolated grid/type values.
- The local Playwright config falls back to `/Applications/Google Chrome.app/...` because `/opt/pw-browsers/chromium` is not present on this machine.
