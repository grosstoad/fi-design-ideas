# Landing B refinement goal

## Objective

Refine `/landing-b` into a more cohesive, responsive and memorable product story while preserving its established Fundora visual language. The page should feel intentionally paced, make the lender comparison more legible and expressive, and turn the scenario controls into one connected interaction rather than a set of disconnected demonstrations.

## Required changes

1. Capture matching desktop and mobile screenshots before implementation.
2. Restore the existing lender-specific colours to each maximum-property-price bar. Keep neutral tracks and retain text/value labels so colour is never the sole identifier.
3. Make the purchase-power range separator inherit the surrounding black text.
4. Update values, bars and lender ranking continuously while the household-income slider moves. Animate only genuine rank changes with a short FLIP transform; debounce assistive-technology announcements until the adjustment settles. Disable rank motion under `prefers-reduced-motion`.
5. Give the hero more room beneath the navigation and intentionally wrap the desktop headline over two lines without harming the mobile composition.
6. Replace uniform 96px section padding with transition-specific spacing so the carousel, walkthrough, propositions and closing CTA flow as one narrative.
7. Lift the scenario values to shared page state. The main comparison and walkthrough must use the same household income, savings, purpose and location.
8. Rebuild the three walkthrough previews to share an equal visual height. Keep step copy centred and preview contents left-aligned.
9. Make the walkthrough scenario inputs genuine native controls with visible labels, focus treatment and keyboard support. Keep the fields compact rather than adding filler content.
10. Show additional lenders in the walkthrough comparison and update them from the shared scenario.
11. Flatten the funding breakdown; keep only the savings-left-over verdict on a tinted surface.
12. Add more space between proposition artwork and titles while keeping illustration and copy baselines aligned.
13. Present the final CTA as a contained warm off-white endcap with a subtle border and coherent responsive layout.
14. Preserve the existing lender-logo carousel, assumptions dialog, disclosure and non-production/demo qualification.

## Quality constraints

- Use the existing components, CSS variables and assets; add no dependency.
- Native controls must have accessible names, visible focus states and usable touch targets.
- Do not rely on colour alone to convey lender identity or state.
- Animate only transforms and opacity for reordering; avoid layout-thrashing loops.
- Keep reduced-motion behaviour complete and usable.
- Avoid horizontal overflow and clipped lender names at 1440px, 1280px, 768px and 375px.
- Preserve unrelated working-tree changes.
- Do not push.

## Verification and evidence

- Update unit and browser tests for shared scenario state and continuous ordering.
- Run `git diff --check`, production build, unit tests and the Landing B Playwright suite.
- Review the final diff across correctness, readability, architecture, security and performance.
- Capture matching desktop and mobile after screenshots and provide an explicit before/after playback.

## Execution record — 11 July 2026

Status: implemented and visually verified.

- Before captures: `tmp/landing-b-refinement-2026-07-11/before/`
- After captures: `tmp/landing-b-refinement-2026-07-11/after/`
- Responsive review: 1440×900, 1280×800, 768×900 and 375×812
- Horizontal overflow: 0px at all reviewed widths
- Walkthrough preview heights: 340px / 340px / 340px at all reviewed widths
- Build: passed
- Unit tests: 41 passed across 11 files
- Landing B browser tests: 11 passed, 1 intentional project-specific skip
- Accessibility: automated axe check passed; native labels, focus states and reduced-motion paths verified
- TypeScript project check: blocked only by the pre-existing `onUpdateLoan` mismatch in the unrelated dirty results-page worktree
- Push: not performed
