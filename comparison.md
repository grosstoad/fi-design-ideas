# Lending Analytics: Recharts vs Polaris Viz / D3

This repo implements the same five-chart `Lending Analytics` dashboard in two ways:

- Version A: `recharts`
- Version B: `D3 + raw SVG` as the practical fallback for `@shopify/polaris-viz`

`@shopify/polaris-viz` was not used directly in the running prototype because the current app is already on `react@19.2.4`, while `@shopify/polaris-viz@16.16.0` only declares React `^16.14 || ^17 || ^18` peer support and the official `Shopify/polaris-viz` repo is archived. In practice, that makes Polaris Viz a reference point, not a safe production candidate for this codebase.

Sources:

- `@shopify/polaris-viz` npm: <https://www.npmjs.com/package/@shopify/polaris-viz>
- `Shopify/polaris-viz` archived repo: <https://github.com/Shopify/polaris-viz>
- `recharts` npm: <https://www.npmjs.com/package/recharts>
- `recharts` repo: <https://github.com/recharts/recharts>

## Prototype Scope

Both versions render the same dashboard layout:

1. Max Borrowing Power
2. Rate vs Market
3. Monthly Settlements
4. Application Funnel
5. LVR Distribution

Both use the same:

- data
- card layout
- stat-row pattern
- legend structure
- tooltip visual treatment
- responsive page shell

## 1. Visual Fidelity

### Recharts

Recharts got close to the target design quickly. The horizontal bar chart, dual-axis combo chart, funnel, and LVR chart all map cleanly onto native primitives. The biggest compromise is the rate chart confidence band: it works, but it is implemented as a stacked area trick rather than a first-class "band between two lines" abstraction.

### D3 + raw SVG

D3 got the closest to the exact spec ceiling. The custom band, per-shape styling, axis density, and tooltip trigger zones are all more explicit. It is easier to match details like custom bar radii, overlay hit areas, and layered geometry when every mark is under direct SVG control.

### Verdict

For pixel-level fidelity, D3 wins. For "very close, very fast," Recharts wins.

## 2. Code Volume

Renderer-specific file sizes in this prototype:

- `src/pages/recharts-dashboard.tsx`: 316 lines
- `src/pages/polaris-viz-dashboard.tsx`: 540 lines

Shared shell/data/utilities:

- `src/components/dashboard-comparison/shared.tsx`: 366 lines

The D3 version is materially more verbose for equivalent output. That extra code is not accidental; it is the direct cost of owning layout math, axes, paths, hit areas, and tooltip positioning yourself.

### Verdict

Recharts is substantially smaller for equivalent dashboard output.

## 3. Customisation Ceiling

### Recharts

Easy:

- horizontal bars
- per-bar colours
- dual-axis composed chart
- responsive resizing
- custom tooltips

Harder / less natural:

- true confidence bands
- exact geometry control
- bespoke axis/grid behaviour
- fine-grained tooltip hit-testing
- unusual interaction patterns

### D3 + raw SVG

Easy once the scaffolding exists:

- confidence bands
- non-standard chart combinations
- exact SVG shapes
- custom legends and overlays
- semantic mark styling at any level

Harder:

- nothing is "free"
- every layout, interaction, and responsive behaviour has to be authored

### Verdict

D3 has the higher ceiling by a large margin. Recharts is easier until you cross into custom visual language or non-standard compositions.

## 4. Tooltip Control

### Recharts

Good control over content and styling through custom tooltip components. Positioning is mostly handled for you, which is helpful. The tradeoff is that you are still operating inside library assumptions about active points, cursors, and payload shape.

### D3 + raw SVG

Maximum control. You choose the hit target, the payload, the anchor position, and collision strategy. In this prototype, that also meant more code and more edge-case risk on narrow widths.

### Verdict

If you want default-good behaviour, Recharts. If you want total control over tooltip semantics and positioning, D3.

## 5. Responsiveness

### Recharts

`ResponsiveContainer` makes resize handling straightforward. It is the better default for dashboard cards that need to adapt without much ceremony.

### D3 + raw SVG

Responsive behaviour required a custom `ResizeObserver` container and explicit chart-box calculations. It works, but it is more infrastructure to maintain.

### Verdict

Recharts is better out of the box. D3 is fine once wrapped, but you have to build that wrapper yourself.

## 6. Animation / Motion

### Recharts

You get basic chart motion for free, with simple props and familiar defaults.

### D3 + raw SVG

Nothing is automatic. That is good if you want highly intentional motion, but it is extra work. If we wanted production-grade motion here, I would likely add `react-spring` or explicit SVG transitions.

### Verdict

Recharts is better for cheap, decent default motion. D3 is better only if bespoke motion is worth the extra implementation cost.

## 7. Bundle Size

Two useful measurements from this prototype:

### Prototype route chunks after lazy loading

`npm run build` produced:

- base app chunk: `255.31 kB` minified
- Recharts route chunk: `362.28 kB`
- D3 dashboard route chunk: `10.65 kB`
- shared vendor chunk used by the D3 dashboard: `36.53 kB`

That means the Recharts route is materially heavier in the running app.

### npm unpacked package metadata

- `recharts`: `6,756,347` bytes unpacked
- `@shopify/polaris-viz`: `3,595,576` bytes unpacked
- `d3-array` + `d3-scale` + `d3-shape`: about `585,360` bytes unpacked combined

Unpacked size is not shipped bundle size, but it is directionally useful.

### Verdict

In this prototype, the D3 fallback is lighter. Recharts is convenient, but it is not the smaller runtime choice.

## 8. Maintenance Risk

### Recharts

Low-to-moderate risk. It is active, current, and supports React 19 in its published peer dependency range. It has broad community usage, plenty of examples, and a clear React-first mental model.

### Polaris Viz

High risk. The repo is archived and the package peer dependency range stops at React 18. That makes it a poor fit for a React 19 codebase you expect to maintain.

### D3 + raw SVG

Library risk is low, implementation risk is higher. D3 itself is stable and mature, but the maintenance burden shifts to your team because you own more of the rendering and interaction logic.

### Verdict

Recharts is the safer maintained package. D3 is a safe foundation if you are willing to own more custom code. Polaris Viz itself should not be the production choice here.

## 9. Accessibility

### Recharts

Some accessibility comes along with the library structure, but it is still limited for serious analytics accessibility needs. You usually still need additional labeling and surrounding narrative to make charts understandable.

### D3 + raw SVG

Everything is manual. That is more work, but it also means you can build exactly the right semantics, ARIA descriptions, and fallback text if accessibility becomes a hard requirement.

### Verdict

Neither solution is "done" automatically. Recharts gives a faster baseline; D3 gives a higher accessibility ceiling if you invest properly.

## 10. Developer Experience

### Recharts

Fastest to build. Easier to debug at the component level. Better documentation density for common dashboard patterns. Lower cognitive overhead for product engineers who mostly think in React components.

### D3 + raw SVG

Slower to build and easier to get subtly wrong. Debugging is more math- and SVG-oriented. The upside is that unusual requirements stop being fights against library abstractions.

### Verdict

For day-to-day product work, Recharts is the better developer experience. D3 is better when design ambition or data-specific complexity outruns component-library abstractions.

## Recommendation

- **For internal dashboards (ops / MBR)**: use `recharts` because it gets you to high-quality, maintainable charts faster with lower code volume and better out-of-the-box responsiveness.
- **For consumer-facing borrowing power surfaces**: use `D3 + raw SVG` when the experience is part of the product moat and the chart language needs to feel custom, branded, or unusually precise. Otherwise, default to `recharts`.
- **For one-off presentations / decks**: use `D3 + raw SVG` if the chart needs to be highly art-directed, otherwise use `recharts` for speed.

## Bottom Line

If the question is "what should Athena use most often?" the answer is `recharts`.

If the question is "what should Athena use when a consumer-facing flow needs custom charting that feels unmistakably ours?" the answer is `D3 + raw SVG`.

`@shopify/polaris-viz` is not the right production bet for this React 19 app. The underlying approach is still useful; the package itself is not.
