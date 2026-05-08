# FundIQ Design System

## Purpose

This file is the shared aesthetic guide for building FundIQ product and marketing components. It reflects the current Paper direction, especially the results page at:

`https://app.paper.design/file/01KMVY07H2B05015VVNPYFHRWS/01KMVY07H36M706X5HW9VW56B4/38C-0`

For the consumer CRO landing variant, also follow the section **Consumer CRO Landing Variant** below. That route intentionally uses a warmer, more playful buyer-facing expression than the core product/results screens.

FundIQ should feel calm, precise, useful, and premium. The interface should suggest real lender modelling underneath without making the user feel like they are inside a bank calculator or a heavy finance dashboard.

## Brand Feel

FundIQ is a lender-aware home finance product that helps buyers understand what they can afford before speaking to a broker or applying for a loan.

The product should feel:

- Minimal, not empty
- Premium, not decorative
- Intelligent, not technical for its own sake
- Human, not playful
- Useful, not salesy
- Precise, not dense
- Modern, not loud fintech

Avoid:

- Loud gradients
- Decorative fintech green
- Heavy shadows
- Busy dashboards
- Overly rounded SaaS cards
- Generic mortgage calculator styling
- Too many badges, chips, icons, or motifs
- Serif display typography for core UI

## Visual Direction

The current FundIQ aesthetic is a warm white financial report: quiet typography, soft page bands, precise cards, compact financial rows, and restrained chart colour.

Use visual interest through:

- Strong type hierarchy
- Carefully grouped spacing
- Soft borders
- Muted chart colour
- Compact, readable data components
- Occasional watercolour property imagery

Do not make components feel like standalone marketing cards unless they are true callouts. Product surfaces should feel integrated into the page.

## Typography

### Primary Font

Use **Helvetica Neue** as the preferred typeface.

Fallback stack:

```css
font-family: "Helvetica Neue", "Neue Montreal", "Host Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Paper currently uses Host Grotesk in several places, but new implementation work should use Helvetica Neue unless a screen is intentionally matching an existing Paper layer exactly.

### Typography Principles

- Use sentence case for UI labels and headings.
- Use large, confident result headlines.
- Keep body copy short and muted.
- Use tabular numerals for financial values where available.
- Use slightly open tracking only for small uppercase labels.
- Avoid negative letter spacing in product UI.
- Avoid tiny text below 12px unless it is a compact label.

### Suggested Scale

Hero/result headline:

- Size: 48-56px desktop
- Weight: 600-700
- Line height: 1.02-1.08
- Colour: ink

Section title:

- Size: 24-28px
- Weight: 600-700
- Line height: 1.15

Card title:

- Size: 18-22px
- Weight: 600-700
- Line height: 1.2

Body:

- Size: 14-16px
- Weight: 400
- Line height: 1.45-1.55
- Colour: muted text

Small labels:

- Size: 11-12px
- Weight: 500-600
- Letter spacing: 0.12-0.18em for uppercase labels only
- Colour: muted text

Financial values:

- Size: context-dependent
- Weight: 500-700
- Use tabular numerals
- Keep values readable and aligned in clear columns

## Colour

The palette should feel warm, white, and lightly editorial. Colour supports comprehension; it should not become the brand expression by itself.

### Core Tokens

| Token | Use | Value |
| --- | --- | --- |
| Page | Primary page background | `#FFFFFF` |
| Soft band | Section bands and report background | `#F5F4EF` |
| Card | Card and input surface | `#FFFFFF` |
| Warm card | Subtle inset cards | `#F7F6F1` |
| Ink | Primary text and CTA background | `#111111` |
| Charcoal | Secondary strong text | `#242424` |
| Muted text | Body support copy | `#5F5E58` |
| Faint text | Captions and disabled text | `#8B8982` |
| Border | Card borders | `#D8D8D0` |
| Soft line | Internal dividers | `#E2E2DC` |

### Chart And Accent Tokens

| Token | Use | Value |
| --- | --- | --- |
| Lender blue | Primary selected lender, strongest bar | `#78B5E8` |
| Deep lender blue | Active state, dot, selected emphasis | `#416C86` |
| Pale blue | Lower lender comparison bars | `#D8ECFA` |
| Sand | Secondary chart segment | `#E0C9A7` |
| Clay | Cost chart segment | `#D59A88` |
| Sage | Positive or remaining segment | `#AEBBA5` |
| Warm neutral | Disabled track and chart remainder | `#EEEDE7` |

### Colour Rules

- Use black or near-black for primary CTAs.
- Use blue as the main lender/chart accent.
- Use sand, clay, and sage only as supporting data colours.
- Do not use rust as a dominant brand colour.
- Do not use bright green for trust or success unless a state truly needs it.
- Keep legal, helper, and supporting text legible.

## Layout

### Page Structure

Use a 1440px desktop composition with a centered content container around `1180-1240px`.

Preferred rhythm:

- Header: compact, 72px high
- Hero/result summary: compact and left-aligned
- Controls: full-width panel
- Main result cards: two-column desktop grid
- CTA/assumptions strips: full-width, low-height components

### Spacing

Use calm whitespace between sections and tighter spacing within related data groups.

Recommended spacing:

- Page container horizontal padding: 48-100px depending viewport
- Section vertical gap: 28-40px
- Card padding: 24-28px
- Card internal groups: 18-26px
- Repeated chart rows: 7-10px
- Legend rows: 14-18px
- CTA strip padding: 18-24px

Avoid:

- Large empty vertical gaps above important charts
- Over-compressed rows that blur together
- Hero spacing that pushes the product proof too far below the fold
- Centering every section by default

## Surfaces

### Cards

Cards should feel precise and quiet.

- Background: white
- Border: 1px solid `#D8D8D0`
- Radius: 8-10px
- Shadow: subtle, only when elevation is needed
- Padding: 24-28px

Use cards for:

- Result charts
- Purchase scenario controls
- Modals
- Repeated compact feature blocks

Do not put cards inside cards unless the inner element is an input, selected-state panel, or modal callout.

### Strips

Use full-width strips for low-friction next steps and assumptions.

Examples:

- Broker CTA
- Scenario assumptions
- Legal or estimate notes

Strip style:

- White or soft warm surface
- Thin border
- Radius: 8-10px
- Short height
- One clear action on the right

## Controls

### Inputs

Inputs should be clear, quiet, and editable.

- Height: 56-72px depending importance
- Radius: 8px
- Border: `#D8D8D0`
- Label: small uppercase, muted
- Value: large enough to scan
- Background: white

Financial inputs can use larger value text than ordinary inputs.

### Segmented Controls

Use segmented controls for binary or small choice sets.

- Active segment: ink background, white text
- Inactive segment: white background, ink text
- Outer border: soft line
- Radius: 8px
- Equal-width segments

### Switches

Use switches for true on/off behaviour.

- Track off: muted grey
- Knob: white
- Track on: ink or deep lender blue
- Keep helper text beside the label, not hidden in a tooltip

### Buttons

Primary buttons:

- Background: `#111111`
- Text: white
- Radius: 8-10px
- Compact height: 38-44px
- Use arrow only when it reinforces forward motion

Secondary buttons:

- White or warm card background
- Border: `#D8D8D0`
- Text: ink

Avoid duplicate CTAs in the same visual group.

## Results Page Components

### Purchase Scenario

The purchase scenario panel should be a full-width control surface directly below the result hero.

Required controls:

- Savings amount
- State
- Loan purpose segmented control
- Capitalise purchase costs switch
- Advanced assumptions trigger with Premium pill

Advanced assumptions should be visually available but clearly premium-locked.

### Lender Chart

Use horizontal bars for max purchase price by lender.

Required structure:

- Title: `Max purchase price by lender`
- Subtitle: selection cue, such as `Select a lender to compare purchase power, rates and repayments`
- Headline max value
- Horizontal lender rows
- Selected lender detail panel below the chart

Row style:

- Left label lane: fixed width
- Middle bar lane: fixed width
- Right value lane: fixed width, right aligned
- Active lender uses the strongest blue
- Other lenders use muted sand, clay, blue-grey, sage, and warm neutrals
- Remainder tracks should be very pale

Selection behaviour:

- Each lender row is clickable or tappable.
- The selected row receives an active visual state.
- The detail panel updates with lender name, interest rate, comparison rate, estimated repayments, and loan amount.
- Hover-only information must also be available on focus.

Do not include the old `Panel spread across shown lenders` footer.

### Funds To Complete

Use a horizontal stacked bar, not a pie chart.

Required categories:

- Property price
- Stamp duty
- Transfer + legal fees
- Lender fees + setup

Required metrics:

- Funds required
- Available funds
- Remaining cash

Spacing rules:

- Keep the stacked bar close to the header.
- Align legend labels, amounts, and percentages in vertical lanes.
- Leave enough space between the final legend row and the metric divider.
- Remaining cash is an outcome, not a cost.

### Broker CTA

Use a slim full-width strip below the main result cards.

Preferred copy:

- Headline: `Turn this result into a broker-ready plan`
- Supporting copy: `Share your scenario with a vetted broker to check lender fit, repayments, documents and timing.`
- CTA: `Connect with a broker`
- Trust note: `No obligation`

Avoid tall broker cards in the top-right of the results page.

### Broker Modal

Use a centered modal with two columns.

Left side:

- Form title
- Short explanation
- Name
- Email
- Phone
- Buying timeframe
- Primary CTA

Right side:

- Watercolour aerial suburb or property-context background
- Light overlay for legibility
- Proposition headline
- 3 concise benefits in a translucent panel

The modal should feel helpful and practical, not sales-led.

### Advanced Assumptions Modal

Advanced assumptions are a premium feature.

Modal rules:

- Centered overlay
- Softly dimmed page behind
- Compact two-column layout
- One Premium pill near the title
- Disabled/tinted fields when locked
- No repeated lock icons on every input
- Concise upgrade callout at the bottom

Use segmented Yes/No controls for binary fields.

Example fields:

- Property type
- Foreign buyer
- Include government grant
- Retain cash buffer after purchase
- Include settlement adjustments
- Transfer fee overrides
- Stamp duty overrides
- Lender fee assumptions

## Imagery

Imagery should add warmth while the UI remains restrained.

Preferred direction:

- Watercolour aerial suburb
- Roads, rooftops, trees, parks, coastline, or waterways
- Softly washed and editorial
- Low contrast enough to sit behind UI
- No obvious stock-photo realism
- No distracting white blur in the center

Use imagery:

- Behind the landing page lender panel
- In broker modal side panels
- As contextual product atmosphere, not decoration for every section

Avoid:

- Clip-art houses
- Cartoon people
- Literal money graphics
- Neon finance motifs
- Busy maps that reduce text legibility

## Voice

Copy should be clear, calm, and direct.

Use:

- `Know exactly what you can afford`
- `Your real range`
- `Purchasing power`
- `Funds to complete`
- `Scenario assumptions`
- `Advanced assumptions`
- `Connect with a broker`
- `Indicative only`

Avoid:

- Guaranteed approval language
- Fear-based urgency
- Vague claims like `quick and easy`
- Dense credit jargon
- Long explanatory paragraphs inside product UI

## Accessibility

- Maintain strong contrast for primary text and CTAs.
- Do not rely on colour alone for chart meaning.
- Use visible labels for all inputs.
- Use buttons with `aria-pressed` for segmented controls.
- Use `role="switch"` and `aria-checked` for switches.
- Ensure chart rows are keyboard-focusable when selectable.
- Keep assumptions and estimate disclaimers visible but understated.

## Implementation Guardrails

Do:

- Reuse these tokens before inventing new colours.
- Keep related financial data tightly grouped.
- Use fixed lanes for chart labels, bars, and values.
- Use full-width strips for secondary CTAs and assumptions.
- Prefer quiet borders over decorative shadows.
- Check desktop at 1440px first.

Do not:

- Reintroduce vertical lender bars on the results page.
- Add tall top-right promo cards to the results page.
- Use a one-note cream or beige palette.
- Use rounded bubbly SaaS components.
- Add decorative icons without a functional reason.
- Push primary proof components too far below the fold.

## Consumer CRO Landing Variant

This section documents the aesthetic used for the Paper artboard `FundIQ Landing - Consumer CRO Variant` and the coded route `/buying-range`.

Use this direction for consumer acquisition pages where Australian buyers are the hero and the proposition is confidence before inspections. Do not automatically apply it to dense product/results screens.

### Feel

The consumer CRO variant should feel:

- Buyer-friendly, not broker-heavy
- Playful, not childish
- Clear and reassuring, not salesy
- Useful before an inspection, not abstractly educational
- Light, precise, and warm

It may use more character, illustration, and CTA colour than the core product system because the job is conversion and comprehension for consumers.

### Typography

Preferred stack for this variant:

```css
font-family: "Host Grotesk", Inter, system-ui, sans-serif;
```

The amendments from the Paper review should be preserved:

- Navigation links: `14px`, weight `600`, line height `18px`.
- Buttons: `14px`, weight `800`, line height `18px`.
- Hero H1 desktop: `68px`, weight `800`, line height around `0.96`.
- Hero H1 mobile: `46px`, line height `46px`.
- Section H2 desktop: `42px`, weight `800`, line height `44px`.
- Section H2 mobile: `34px`, line height `37px`.
- Card titles: `18px`, weight `800`, line height `24px`.
- Body copy: `15px`, line height `22px`, colour no lighter than `#3F3C36`.
- Small labels: generally `12-13px`, weight `600`, with enough contrast.

Avoid the earlier too-thin/tiny treatment for nav labels, tabs, calculator labels, and supporting text. If text is actionable or explains a financial assumption, make it readable at a glance.

### Palette

Core tokens for this variant:

| Token | Use | Value |
| --- | --- | --- |
| Page | Main background | `#FBFBFA` |
| Surface | Cards and chips | `#FFFFFF` |
| Soft band | Section band | `#F6F6F4` |
| Ink | Primary text | `#141414` |
| Heading | Display headings | `#151515` |
| Body | Paragraph text | `#3F3C36` |
| Muted | Secondary labels | `#5F625E` |
| Border | Quiet card/chip borders | `#E4E2DC` |
| Strong border | Feature card border | `#D4D1C8` |
| CTA teal | Primary CTA | `#8AC8BE` |
| Deep teal | Emphasis card / strongest range bar | `#123F46` / `#0F4C4C` |
| Mid teal | Secondary range bar | `#5B8F81` |
| Amber | Estimate note / caution strip | `#FFF4DF` |
| Gold | Third range bar | `#C98925` |

CTA teal is intentional here. Do not replace it with the black CTA rule from the product/results system unless the page is being moved back into product UI.

### Components

Header:

- Brand left, simple text links right.
- Links are plain text, not segmented tabs.
- Primary CTA is a compact teal button with a small calculator/forward icon.

Hero:

- Trust chips first: private estimate, no broker call unless asked, not a loan application, no credit enquiry.
- Large heavy headline.
- Buyer-range proof card on the right, with Fundora above it.
- Range card must show lender policy spread as horizontal bars.

Lender strip:

- Full-width white strip.
- Use local lender logos in compact chips.
- Lender names are context/proof, not endorsement language.

Problem/comparison block:

- The comparison between generic calculators and FundIQ is a primary proof moment.
- Keep the split-path illustration, two answer cards, and amber bottom strip.
- Generic calculator should feel incomplete; FundIQ estimate should feel clearer and safer.

Feature cards:

- Use the playful generated icons.
- Cards stay precise: `8px` radius, light border, restrained shadow.
- Icon panel on top, copy below.

How it works:

- Three cards.
- Final card may use deep teal.
- Result strip below should summarize included assumptions: stamp duty, LMI, lender policy range, repayment stress test.

### Accessibility Notes

- Primary and body text must remain high contrast.
- Do not use text below `12px` except tiny non-essential labels.
- CTA labels should be explicit: `Check my buying range`, not vague `Start`.
- Informational lender logos need either visible adjacent lender names or useful alt text.
- Decorative character and feature art can use empty alt text when the adjacent copy carries the meaning.
- Maintain visible focus outlines on links and buttons.

### Route Reference

Current implementation:

- Route: `/buying-range`
- Page component: `src/pages/BuyingRangePage.jsx`
- Scoped CSS namespace: `.buying-range-page` and `.br-*`
- Assets: `src/assets/buying-range/`
