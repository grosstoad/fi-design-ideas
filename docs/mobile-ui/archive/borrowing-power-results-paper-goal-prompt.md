# Paper Goal Prompt: Fundora Mobile Results - Max Purchase Price By Lender

## Correction

The results page must align with the Paper `SR5-0` mobile assessment aesthetic and the `garthmcrae/lip-service` Fundora tone. Do **not** use the earlier FundIQ report/dashboard direction.

Use this corrected goal prompt to add the mobile results states in Paper.

## Paper Target

- File/page: `https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/3-0/SR5-0`
- Target section: create a new section near the canonical SR5 mobile state library.
- Section name: `Mobile results - max purchase price by lender`

## Safe Execution Note

Paper warned that the original SR5 file is too large and further writes may cause data loss. A safe Paper file has therefore been created with the corrected four-state result set:

- `https://app.paper.design/file/01KSXRMA7KAV0NGNCNZHM756CP/1-0`

Use that file as the current executed Paper reference. Only copy the states into the original SR5 file if the large-file/data-loss warning is resolved or the user explicitly accepts that risk.

## Source Files

Use these local files:

- `docs/mobile-ui/mobile-assessment-interaction-states.md`
- `docs/mobile-ui/fundora-about-you-paper-goal-prompt.md`
- `output/imagegen/fundora-sr5-max-purchase-results-variations-imagegen.png`
- `output/imagegen/fundora-sr5-max-purchase-results-brief.md`

The old `max-purchase-lender-mobile-variations*` files were removed after review because they represented the wrong FundIQ/report direction.

## Visual Source Of Truth

Match SR5/About You:

- Device: `393 x 852`.
- Phone UI only inside the artboard.
- State labels/notes outside or below phones only.
- Status bar: `54px`.
- Top nav: `50px`.
- Progress region: `24px` minimum, using teal completed segments.
- Content rail: `32px` left/right, `329px` usable width.
- System UI typography.
- Step eyebrow around `13px`.
- Main title around `22-30px`, depending result hierarchy.
- Form labels: `16px / 20px` semibold.
- Body/help text: `14-15px`, `20-22px` line height.
- Inputs and chips: quiet rounded white/neutral controls.
- Active controls and primary CTA: SR5 teal `#8AC8BE` / close equivalent.
- Bottom action area: anchored near safe area; primary action first, secondary immediately below where needed.

## Tone Source

Use the `lip-service` Fundora tone:

- Calm and guided.
- Maximum is context, not obligation.
- The comfortable number may be lower.
- Clear trade-offs, no hype.
- Fundora, not FundIQ.

Suggested user-facing copy:

- `Results`
- `Your buying range`
- `Up to $3.10M`
- `Macquarie gives the highest estimate. The comfortable number may be lower.`
- `Max purchase price by lender`
- `Adjust assumptions`
- `Continue`
- `Recalculating your range...`

## Required States

Create four `393 x 852` mobile states:

1. `Results - loaded`
2. `Results - lender selected`
3. `Results - assumptions editing`
4. `Results - recalculating`

### Results - Loaded

Must include:

- Status bar.
- `fundora` top nav.
- Assessment progress with `8 of 9`.
- Eyebrow `Results`.
- Title `Your buying range`.
- Large result `Up to $3.10M`.
- Copy: `Macquarie gives the highest estimate. The comfortable number may be lower.`
- Scenario chips:
  - `NSW`
  - `Owner occupied`
  - `Savings $3.56M`
- Lender list:
  - Macquarie `$3.10M`
  - CBA `$2.92M`
  - NAB `$2.78M`
  - Westpac `$2.64M`
  - ANZ `$2.48M`
  - ING `$2.32M`
- Bottom actions:
  - `Continue`
  - `Adjust assumptions`

### Results - Lender Selected

Must include:

- Same header/progress/result structure.
- Macquarie row selected and expanded inline.
- Detail rows:
  - `Weekly repayment (P&I)` `$12,340`
  - `Interest rate` `6.34% p.a.`
  - `Loan amount` `$2.79M`
  - `LVR` `78%`
- Bottom actions remain visible.

### Results - Assumptions Editing

Must include:

- Same header/progress/result structure.
- A form-like assumptions panel using SR5 rhythm.
- State segmented control: `NSW`, `VIC`, `QLD`, `WA`.
- Purpose segmented control: `Owner occupied`, `Investment`.
- Savings input: `$3,560,000`.
- Optional row: `Show more assumptions`.
- Bottom actions:
  - `Update results`
  - `Cancel`

### Results - Recalculating

Must include:

- Same header/progress/result structure.
- Progress status may say `Calculating...`.
- Teal loading indicator and copy `Recalculating your range...`.
- Scenario chips faded/disabled.
- Stable skeleton lender rows.
- Bottom actions:
  - Disabled `Calculating...`
  - `Back`

## Avoid

- FundIQ branding.
- Desktop/report/dashboard styling.
- Cream financial-report cards.
- Black primary buttons.
- Heavy shadows.
- Dense tables.
- Lender logos.
- Purple SaaS defaults.
- Big blue analytics/chart treatment.
- Commentary inside phone screens.

## Paper Execution

1. Call `get_guide` with `paper-mcp-instructions`.
2. Call `get_basic_info` and `get_selection`.
3. Call `get_font_family_info` for `System Sans-Serif` and any fonts already used in SR5.
4. Inspect SR5/About You styles if needed.
5. Create the four states near SR5.
6. Screenshot-review:
   - exact `393 x 852` phone sizes
   - labels outside phones
   - no clipped lender rows
   - bottom CTA clear of safe area
   - no report/dashboard styling
   - Fundora branding only
7. Fix issues.
8. Call `finish_working_on_nodes`.

## Completion Criteria

- Four SR5-aligned mobile result states exist in Paper.
- They use Fundora branding and SR5-style mobile scaffolding.
- They show max purchase price by lender.
- They include loaded, selected, editing, and recalculating states.
- They were screenshot-reviewed in Paper.
- Paper work was finished cleanly.
