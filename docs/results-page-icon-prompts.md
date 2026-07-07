# Results page — icon inventory & generation prompts

A review of every place in the results experience (spec v3, `docs/results-page-spec.md`) where an icon is warranted, with a copy-paste generation prompt for each. Prompts are written for an AI icon/SVG generator or a designer brief — either works.

**The design is deliberately icon-light.** The Paper direction (board note §2a: "clean selected card", "no redundant copy") uses icons only where they do a job text can't: wayfinding chrome (chevrons, close), the three Update-details category chips, and state signalling (error/success/warning). Section 4 lists the places that must **stay** icon-free — adding icons there is a design regression, not a polish.

---

## 1. Shared style foundation (prepend to every prompt below)

> Minimal line icon on a 24×24 grid. Single colour, stroke only — no fills, no gradients, no shadows. Stroke width 1.5px with round caps and round joins. Geometry: simple, slightly rounded rectangles and circles, generous negative space, optically centred, 1.5px padding to the grid edge minimum. Flat and unornamented, matching a Helvetica Neue interface — no perspective, no 3D, no hand-drawn wobble, no duotone. Deliver as SVG with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"` so the interface can colour it via CSS (`--ink #111111`, `--muted #5F5E58`, `--accent #167D7F`, white on the black CTA).

**Build note for codex:** items marked *(standard)* below match stock [Lucide](https://lucide.dev) glyphs at stroke 1.5 — import those rather than generating, and reserve generation for the six custom/semantic icons. Either way, every icon renders through one `<Icon>` component so size/colour stay token-driven.

---

## 2. Core set — required by the spec

### 2.1 `chevron-left` — header back button *(standard: Lucide `chevron-left`)*
Where: header, 28px circular `--field` button (spec §10.1). Rendered 16px, `--ink`.
> **Prompt:** A left-pointing chevron: two straight 1.5px strokes meeting at a rounded point on the left, opening to the right, vertically centred, spanning roughly half the grid height. Nothing else in the frame.

### 2.2 `chevron-right` — row affordance *(standard: Lucide `chevron-right`)*
Where: lender rows (§7.4, 16px `--muted-2`, `--accent` when selected), Update-details chooser rows and Financial-inputs rows (§7.7), funds "View" affordance in the M5 action-card variant. Rendered 16px.
> **Prompt:** A right-pointing chevron: mirror of chevron-left. Two straight 1.5px strokes meeting at a rounded point on the right.

### 2.3 `close` — sheet/modal dismiss *(standard: Lucide `x`)*
Where: bottom sheets and modals, 34px circular `--field` button (§10.4, §13). Rendered 16px, `--ink`.
> **Prompt:** A diagonal cross: two straight 1.5px strokes crossing at the centre at 45°, each spanning roughly half the grid, round caps. Perfectly symmetric.

### 2.4 `property-details` — Update details chooser row (custom)
Where: first chooser row, "Property details — State, purpose, savings and purchase costs." Rendered ~20px inside a 40px `--field` chip (§7.7), `--ink`.
> **Prompt:** A simple house: pentagon silhouette made of a rectangular body and a triangular roof drawn as one continuous 1.5px outline, flat base, with a small door indicated by a short vertical rounded notch rising from the base line. No chimney, no windows, no ground line.

### 2.5 `loan-details` — Update details chooser row (custom)
Where: second chooser row, "Loan details — Loan term, repayment type, product and rate type." Rendered ~20px in the 40px chip, `--ink`.
> **Prompt:** A percent sign built for a loan context: a clean diagonal 1.5px stroke from lower-left to upper-right, with one small outlined circle above-left of the stroke and one below-right. Optically balanced so it reads as "%" at 16px, not as a division sign. No coin, no dollar sign, no document behind it.

### 2.6 `financial-inputs` — Update details chooser row (custom)
Where: third chooser row, "Financial inputs — Income, expenses, liabilities and existing properties." Rendered ~20px in the 40px chip, `--ink`.
> **Prompt:** A minimal wallet: a rounded rectangle in a wide landscape ratio with a fold hinted by a second line across the upper third, and a small rounded notch on the right edge suggesting the card slot / clasp, drawn as a tiny rectangle breaking the outline. One object, no cash sticking out, no coins.

### 2.7 `alert-circle` — error state *(standard: Lucide `alert-circle`)*
Where: full-failure error panel (§9.3). Rendered 24px, `--ink` (the panel is calm, not red — the copy carries the message).
> **Prompt:** A circle outline with an exclamation mark inside: vertical 1.5px stroke from upper-middle to just below centre, and a single round dot beneath it. Everything stroke-only.

### 2.8 `alert-triangle` — shortfall notice *(standard: Lucide `triangle-alert`)*
Where: funds-verdict shortfall band (§8), rendered 16px, `--err #C2462C`.
> **Prompt:** A rounded-corner equilateral triangle outline pointing up, with an exclamation mark inside (short vertical stroke plus dot). Corners visibly rounded so it feels calm rather than hazard-sign aggressive.

### 2.9 `check` — success & consent *(standard: Lucide `check`)*
Where: broker success view, `--accent` check in a 60px `--field` circle (§13.6); consent checkbox tick at 12px white on `--accent` (§13.2); "Call back requested ✓" CTA lockout (§7.9).
> **Prompt:** A single checkmark: two straight 1.5px strokes with round caps and a rounded joint — short stroke descending left-to-centre, long stroke rising centre-to-upper-right. Slightly wider than tall.

---

## 3. Optional set — only if the M5 action-card variant or row-consistency pass is adopted

The canonical M3 statement card renders the funds row **without** an icon; these exist only for the M5 "prep action stack" treatment (§8 collapsed note) and for giving the four Financial-inputs rows leading icons to match the chooser (the Paper frames leave them text-only — default is to leave them).

### 3.1 `funds-receipt` (custom)
Where: M5 funds action card, ~20px in a 40px `--field` chip.
> **Prompt:** A tall receipt: narrow vertical rounded rectangle with the bottom edge cut into a shallow zigzag of three points, and two short horizontal line items inside the upper half. Stroke-only, no currency symbol.

### 3.2 `update-pencil` (custom) *(near-standard: Lucide `pen-square`)*
Where: M5 "Update details" action card, ~20px in the 40px chip.
> **Prompt:** A rounded square outline with a diagonal pencil entering from the top-right corner and stopping at centre: pencil is a slim elongated body with a small triangular tip, drawn as outline, overlapping the square's corner which breaks its outline where they meet.

### 3.3 Financial-input row icons (custom, set of four — design as one family)
Income / Expenses / Liabilities / Existing properties, ~18px, `--ink`.
> **Prompt (set):** Four sibling line icons sharing identical stroke, corner radius and visual weight: (1) *Income* — a circle containing a dollar sign, the "$" drawn as an S-curve with a single vertical stroke through it; (2) *Expenses* — a downward-right arrow leaving a small rounded rectangle (money going out); (3) *Liabilities* — a credit card: landscape rounded rectangle with one full-width horizontal band near the top; (4) *Existing properties* — two overlapping house pentagons, the rear one clipped by the front. Present as a consistent family on one sheet.

---

## 4. Keep icon-free (reviewed and deliberate — do not add)

| Surface | Why no icon |
| --- | --- |
| Hero (eyebrow, H1, figure, support line) | The number is the visual; anything beside it competes (§2a-2) |
| "Sort", "View all lenders", "Update details", "View" links | Paper renders all text affordances as plain teal 700 text — no gear, no funnel, no eye (§7.3a, §7.5, §7.9) |
| Primary CTA "Connect with a broker" | Text-only black button in every frame — the v2 broker glyph is retired (§7.9) |
| Rate / statement / capacity rows | Financial figures stay unadorned; an icon would break the aligned label/value lanes (§7.6) |
| Lender rows | Rank number + name + bar + price is the complete grammar; no lender logos (A8 bans brand-matching) |
| Compare footer, funds breakdown rows, verdict strip | Row language only; the stacked bar carries colour, dots in the legend are geometry not icons (§8) |
| Empty state (§9.4) | Spec says "illustration-free panel" — copy does the work |
| Wordmark, progress bar, grab handle, toggle, radio | Text / controls, not icons |

---

## 5. Acceptance checklist for whichever icons ship

- [ ] All render from one component; size via prop (12/16/20/24), colour via `currentColor` — zero hard-coded hex inside SVGs.
- [ ] Optical weight is uniform at 16px: put every glyph side by side at 16px `--muted` and check none reads darker/lighter.
- [ ] `aria-hidden="true"` on every decorative icon (all of them — each sits beside its text label); interactive icon-only buttons (back, close) carry `aria-label`s from the copy table.
- [ ] Chevrons and close are pixel-identical mirrors/rotations of each other, not separately drawn.
- [ ] Nothing from §4 gained an icon during the build.
