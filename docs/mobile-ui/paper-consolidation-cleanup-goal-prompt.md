# Paper Goal Prompt: Fundora Design File Consolidation Cleanup

## Target

Clean up the Fundora Paper design workspace so a designer or engineer with no prior context can quickly understand the current mobile flow, the limited desktop work, and the archived exploration history.

Primary Paper file:

`https://app.paper.design/file/01KSYP7T3MFEQHHED41F3PQB58`

Additional source Paper files to audit for anything worth keeping:

- `https://app.paper.design/file/01KTEJ2X11APKYGCNN44FM18TN`
- `https://app.paper.design/file/01KSXRMA7KAV0NGNCNZHM756CP`
- `https://app.paper.design/file/01KSXN0H5ZRH0R4NDQWCC3MBQK`

## User Problem

The Paper work has become hard to navigate:

- Multiple files, pages, boards, and archive explorations exist without a clear source of truth.
- The main file mixes current work, old experiments, desktop fragments, and variations.
- Board ordering does not clearly follow the product flow.
- Typography, phone frame sizing, labels, notes, and visual density are not consistent enough.
- A new person cannot quickly tell what is live, what is experimental, and what is historical.

## Desired End State

The main Paper file should have a clean, obvious structure:

1. A `LIVE - Current mobile flow` area/page, ordered left to right:
   - About You
   - Income
   - Properties
   - Liabilities
   - Expenses
   - New Property
   - Results
2. Desktop versions, only where meaningful/current, placed underneath the matching mobile step.
3. Worth-keeping variations underneath the matching step, not scattered across the canvas.
4. An `ARCHIVE - Historical explorations` area/page that holds old boards and experiments.
5. A short onboarding note/table at the top explaining what is live, where variations live, and what specs are canonical.

Prefer creating a safer clean file or clean page if the current Paper file warns that it is too large for safe mutation. Do not risk data loss in the main file.

## Canonical Local Docs

Use these as source of truth before editing:

- `CODEX_DESIGN_SYSTEM.md`
- `docs/design.md`
- `docs/mobile-ui/README.md`
- `docs/mobile-ui/01-about-you-spec.md`
- `docs/mobile-ui/02-income-spec.md`
- `docs/mobile-ui/03-properties-spec.md`
- `docs/mobile-ui/04-liabilities-spec.md`
- `docs/mobile-ui/05-expenses-spec.md`
- `docs/mobile-ui/06-new-property-spec.md`
- `docs/mobile-ui/07-results-spec.md`
- `docs/mobile-ui/06-new-property-paper-goal-prompt.md`
- `docs/mobile-ui/07-results-paper-goal-prompt.md`
- `docs/mobile-ui/07-results-v8-clean-cathay-paper-goal-prompt.md`

## Mandatory Paper Workflow

- Load `get_guide({ topic: "paper-mcp-instructions" })` before any other Paper tool.
- Open the relevant Paper file.
- Call `get_basic_info`.
- Call `get_selection`.
- Call `get_font_family_info` before typographic styling.
- Use screenshots to audit and verify.
- Do not mutate source files until the audit identifies a safe cleanup route.
- After meaningful Paper changes, screenshot and critique:
  - spacing
  - typography
  - contrast
  - alignment
  - clipping
  - repetition
  - information hierarchy
- Call `finish_working_on_nodes` at the end of any Paper editing session.

## Safety Rules

- If Paper warns that a file is too large and further changes may cause data loss, stop editing that file.
- Prefer read-only inventory before moving or deleting anything.
- Do not delete historical work unless it has first been moved to an archive area/page or a safer duplicate file.
- Do not create another broad experimental board. This is organization and consolidation work.
- Keep old work discoverable, but clearly non-live.
- Avoid editing multiple Paper files in parallel if mutation is involved.

## Consolidation Taxonomy

Use consistent names:

- `LIVE - 01 About You`
- `LIVE - 02 Income`
- `LIVE - 03 Properties`
- `LIVE - 04 Liabilities`
- `LIVE - 05 Expenses`
- `LIVE - 06 New Property`
- `LIVE - 07 Results`
- `DESKTOP - [Step name]`
- `VARIATIONS - [Step name]`
- `ARCHIVE - [Original board name]`

Inside each board/section, label phone states specifically enough that they cannot be confused with a separate flow step. Avoid a generic universal `Review` label because there is no Review-before-Results step.

Examples:

- `Results - loaded top six`
- `Results - selected lender card`
- `New Property - savings keyboard`
- `Income - saved income summary`
- `Properties - long list stress`
- `Liabilities - validation`

Use the same mobile phone frame baseline:

- `393 x 852`
- 32px rails
- existing Fundora top chrome
- existing progress treatment
- Helvetica Neue / System Sans unless matching an existing canonical layer
- quiet white surfaces
- teal active controls
- external labels outside phones only

## Subagent / New Thread Split

Use read-only subagents or separate Codex threads for:

1. Paper file inventory:
   - Open each source file.
   - List pages and artboards.
   - Identify current vs archive candidates.
   - Flag duplicates and file-size warnings.
2. Spec and taxonomy audit:
   - Compare specs 01-07.
   - Identify naming and ordering conventions.
   - Find contradictions that affect cleanup.
3. Visual consistency audit:
   - Check existing current boards for phone size, font, label, spacing, and top chrome drift.
   - Recommend the canonical visual baseline.

Subagents should not mutate Paper. The main executor owns mutations after the audit.

## Execution Plan

1. Write or update this goal prompt.
2. Run read-only audits of the main and extra Paper files.
3. Build a consolidation map:
   - Keep live
   - Keep as desktop
   - Keep as variation
   - Archive
   - Discard only if duplicated and safely represented elsewhere
4. Choose the safe Paper mutation route:
   - clean page in main file, or
   - new clean Paper file if main file is too large
5. Create an onboarding/header area.
6. Arrange live mobile boards in canonical left-to-right order.
7. Place desktop and worthwhile variations underneath the matching step.
8. Move or recreate archive material into a clearly named archive area/page.
9. Normalize labels, typography, phone sizing, and board notes.
10. Screenshot review the final layout.
11. Call `finish_working_on_nodes`.

## Expected Final Response

Report:

- Whether Paper MCP was available and used.
- Whether subagents / new threads were used.
- What Paper file/page/board was created or cleaned.
- What was kept live.
- What was archived.
- Any files or docs changed locally.
- Remaining gaps or risks, especially Paper file-size limitations.
