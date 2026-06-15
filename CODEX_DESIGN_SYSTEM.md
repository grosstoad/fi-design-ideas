# Fundora Codex Design System

This is the working creative brief for generating updated Fundora UI. Use it as a companion to `docs/design.md`, not a replacement. The existing file describes the current implementation; this file describes the desired evolution.

## Creative Direction

Fundora should feel like a Notion-inspired product with a helpful friend attached to it.

The product is useful, practical, and data driven. The brand is a characterful guide who makes uncomfortable financial decisions easier to look at. The interface should never become childish. The character layer should make the product feel less cold, not less credible.

**North star:** Notion's calm workspace clarity, translated into Australian borrowing-power guidance with a quirky challenger character.

**Internal shorthand:** Daria realism + Dora helpfulness. Dry, observant, capable, gently mischievous. Never wacky. Never infantilising.

## Paper Input-Flow State Libraries

For Fundora mobile input-flow work in Paper, use the numbered specs in `docs/mobile-ui/` and the current About You screens as the visual source of truth. Income, Properties, Liabilities, Expenses, New Property, and Results must use the same 393 x 852 phone frame, content rails, top chrome, progress treatment, system UI typography, teal active controls, keyboard behavior, validation styling, and external annotations.

Do not stop at one preferred screen or a sample row. Each step needs a comprehensive canonical state library covering every required resting, focused, keyboard, bottom sheet, picker, validation, review, edit/remove, and stress state. Exploratory variations can sit nearby, but the canonical state library is the source for implementation.

## Reference Signals

### Notion Releases

Use Notion's release page as the strongest tonal and structural reference.

Characteristics to borrow:

- Mostly white or warm off-white space with quiet dividers.
- Product proof first: screenshots, videos, data, releases, examples.
- Editorial hierarchy rather than decorative spectacle.
- Short, plain-language headings.
- Explanatory copy that says what changed and why it matters.
- Small metadata moments: dates, labels, categories, "learn more" links.
- Friendly confidence without loudness.
- Interface surfaces that feel like documents, lists, tables, and databases.
- A release-note rhythm: one thing per section, easy to scan, never over-designed.

Do not copy Notion literally. Borrow the behavior: restraint, clarity, and product confidence.

### FundIQ Reference

The Vercel reference is useful for a more financial, data-rich direction.

Characteristics to borrow selectively:

- Near-neutral off-white page backgrounds that feel warm without becoming cream.
- Fine 1px borders rather than heavy outlines.
- IBM Plex Mono labels for technical metadata, lender rows, timestamps, and system-like details.
- Large quiet typography with strong negative space.
- Tables, bars, range visuals, and comparison panels as primary visual content.
- Muted lender/data colors used inside charts rather than as global brand color.
- Narrow uppercase labels for section markers.
- Professional mortgage-tool language, especially around confidence, lender spread, and borrowing power.

Characteristics to soften:

- The terminal/data-room tone can feel too austere. Fundora should be more companionable.
- Heavy monochrome severity should be warmed with character, notes, and friendlier language.
- Avoid making the whole brand look like a fintech intelligence dashboard.

## Brand Role

Fundora is not a lender, broker, or hype machine. It is a thinking companion for home buyers.

The product says:

- "Here is what the numbers suggest."
- "Here is the trade-off."
- "Here is what might make this more comfortable."
- "Here is where lenders differ."

The character says:

- "Let's not pretend the biggest number is automatically the best number."
- "This is the part where calculators usually get vague."
- "You have more options than one scary headline number."

## Character Mark

Use `head.png` as the character's face, not the corporate logo.

Rules:

- Treat the mark as an avatar head of a helpful friend.
- Deep-etched only: no circle crop, badge container, sticker outline, or framed profile bubble.
- Let the transparent edge breathe. Do not trap it inside a pill, avatar ring, card, or logo lockup.
- Use it sparingly at medium size, usually near guidance moments, empty states, explanations, or result interpretation.
- Never use it as the nav logo. The wordmark can stay text-only.
- Do not repeat the head many times on one screen.
- Avoid placing it in dense tables, charts, forms, or places where the user needs pure focus.

Preferred placements:

- Beside a contextual insight after a result.
- Above or beside a short "Dora note" style panel.
- In onboarding or first-run empty states.
- In an article or release-note illustration spot.
- Near a comfort-check recommendation, especially where the product reframes maximum borrowing into sustainable borrowing.

Avoid:

- Circular avatars.
- Notification badges.
- Mascot reactions after every user action.
- Floating assistant bubbles.
- Logo replacement.
- Full-body cartoon scenes unless intentionally commissioned.

## Visual Character

Illustration should feel hand-made, sharp-eyed, and useful.

Desired illustration traits:

- Simple black ink linework with warm fills.
- Slightly deadpan expression.
- Big glasses, blunt fringe, recognisable head silhouette.
- A few expression variants only: neutral, skeptical, pleased, thinking, "really?".
- Cropped head or bust illustrations more often than full scenes.
- Props can include clipboard, calculator, coffee mug, tiny house plan, magnifying glass, or lender file.
- Quirky challenger energy, but composed enough for a financial product.

Do not use:

- Generic SaaS blob people.
- Overly cute mascot poses.
- Corporate gradient illustrations.
- Emoji-like reactions.
- Anime styling.
- Literal Dora/Daria references in user-facing assets.

## Character Icon System

Feature proof-point icons should extend the `head.png` world, not introduce a second illustration language.

The icons should look as if they came from the same character sheet as the head: thick black ink, soft warm fills, slight painterly grain, blunt simple shapes, and an observant Daria/Dora attitude. They should not look like generic UI glyphs. They are small illustrated props from Fundora's world.

Core icon traits:

- Cropped, deep-etched object illustrations with transparent edges.
- Heavy uneven black outline, similar weight to the glasses and hair outline in `head.png`.
- Warm matte fills with subtle texture, not flat emoji colour.
- Minimal internal detail: one or two defining lines, not rendered realism.
- Slight off-kilter geometry, as if hand-drawn.
- No enclosing circles, squares, badges, stickers, or background plates.
- No drop shadows unless the final artwork needs a tiny painted edge for readability.
- No text inside icons unless the object requires a tiny abstract mark.

Proof-point starter set:

| Icon | Product meaning | Visual direction |
|---|---|---|
| Pencil | Clear thinking, edits, guidance, explainers | Short chunky pencil, golden wood/paint accent, black tip, slightly skeptical angle |
| Calculator | Borrowing power, numbers, repayments | Rounded rectangular calculator, warm neutral body, dark display, a few chunky buttons |
| Backpack | Prepared buyer, next steps, useful tools | Simple school-style backpack, brown/golden panels, black straps, practical and friendly |

Use icons as proof accents near compact feature claims:

- "Compare lender spread"
- "See the repayment impact"
- "Know what to fix next"
- "Save assumptions"
- "Leave with a plan"

Do not use these icons as generic navigation symbols. They are brand illustrations, not utility icons. Functional UI should still use simple system/lucide-style icons where appropriate.

## Interface Vibe

The interface should feel like a calm workspace where numbers become understandable.

Use:

- White, near-white, neutral paper, and warm grey surfaces.
- Fine borders and subtle inset structure.
- Tables, cards, rows, notes, callouts, and compact charts.
- Visible information density, but with generous spacing around decision points.
- Real data visualisation as the main decoration.
- Gentle character moments where interpretation is needed.

Avoid:

- Big decorative cards stacked inside other cards.
- Heavy black borders on every object.
- Brutalist offset shadows as the default language.
- Large red/yellow comic UI as the dominant palette.
- Marketing-site hero theatrics.
- Gradients of any kind: backgrounds, buttons, cards, borders, charts, text, or decorative washes.
- Over-personality in calculator flows.

## Layout Principles

### Document First

Think in pages, lists, and blocks. The page should feel writable and inspectable, like a Notion workspace.

Use section patterns such as:

- Header row with title, short description, and one compact action.
- Dated update list.
- Lender comparison table.
- Borrowing-power result card.
- Scenario rows.
- Compact chart with caption.
- Character note as interpretation.

### Product Proof Over Promise

Show the useful thing early.

For Fundora this means:

- Borrowing-power range.
- Lender spread.
- Monthly repayment estimate.
- Comfort score.
- Scenario levers.
- Property reach.
- Assumptions and caveats.

Do not lead with abstract claims when a specific number, table, or workflow can do the job.

### Quiet Hierarchy

Use size, spacing, and structure before color.

- Headlines should be confident but not shouty.
- Section labels can be small, uppercase, and set in IBM Plex Mono.
- Important numbers can be large, but surrounding text should stay calm.
- Use dividers and alignment rather than boxed decoration everywhere.

## Colour Direction

Move from hard slate/red/yellow neo-brutalism toward a neutral paper workspace.

Important decision: do not make cream the default brand canvas.

Cream was tempting because the FundIQ reference uses a warm financial-paper atmosphere, but Fundora has a different problem. The character face already brings warmth through yellow skin tones, brown hair, and black linework. The product also needs lender colours, warning states, positive states, charts, and status marks to remain legible. If the base canvas becomes cream, the whole UI shifts yellow before any actual accent is added. That makes the character mark feel muddy, makes amber warnings less distinct, makes gold lender colours disappear, and pushes the interface toward lifestyle/editorial beige rather than Notion-like workspace clarity.

The Notion-adjacent move is not "make everything creamy." It is "make the product feel calm, blank, and writable." Notion-style warmth usually comes from restraint, spacing, soft neutral borders, small illustrations, and human copy. The canvas itself should still read as essentially white.

### Cream vs Notion-Neutral

Use this distinction whenever choosing colours:

| Choice | Effect |
|---|---|
| Cream canvas | Warm at first glance, but easily clashes with yellow, amber, gold, red, and skin-tone character art |
| Notion-neutral canvas | Reads as clean white/paper, lets character warmth and data accents stay intentional |
| Beige sections | Can make the product feel like a mortgage brochure or lifestyle brand |
| Neutral document surfaces | Make the product feel like a useful workspace, calculator, changelog, or database |

The page should pass the squint test: if you blur your eyes, the app should read as white/neutral with warm details, not as an all-over cream product.

### Practical Colour Rule

Default to neutral first, then add warmth locally.

| Layer | Preferred direction | Avoid |
|---|---|---|
| Page background | Almost-white neutral paper, slightly warm only at the edge | Yellow cream, beige, parchment, sand |
| Main panels | White | Tinted cards competing with data |
| Secondary panels | Soft neutral grey or stone | Saturated cream blocks |
| Dark panels | Deep Daria character tones only when contrast is useful | Pure black or generic near-black boxes |
| Character note | Very pale warm tint only when useful | Making every note yellow |
| Data visualisation | Muted but distinct colours | Colours dulled by a yellow base |
| Warning states | Amber that is clearly a warning | Amber sitting on cream where it disappears |
| Character head area | Neutral surrounding space | Warm background that blends into face/hair |

Suggested neutral family:

| Role | Direction |
|---|---|
| Page background | `#fbfbfa`, `#fafafa`, or an equivalent near-white neutral |
| App surface | `#ffffff` |
| Secondary surface | `#f7f7f5`, `#f4f4f2`, or very light warm grey |
| Muted surface | `#efefed` only for low-emphasis panels |
| Border | `#e6e4df` or a similar fine neutral grey |
| Text primary | `#111111` or near black |
| Text secondary | `#6b6b66` to `#8a8a84` |

If using Tailwind defaults, prefer `white`, `neutral-50`, `neutral-100`, `stone-50`, `stone-100`, and `zinc-700/800/900`. Use `stone` carefully; if it reads yellow on the screen, pull it back toward `neutral`.

Suggested palette roles:

| Role | Direction |
|---|---|
| Page background | Neutral off-white, paper white, or very light warm grey |
| Primary surface | White |
| Secondary surface | Warm-neutral grey or paper panel |
| Border | Fine neutral grey, 1px default |
| Text primary | Near black |
| Text secondary | Warm grey |
| Accent | Cyan or meaningful flat colour for primary actions |
| Character warmth | Muted golden/yellow from the face |
| Dark character surface | Deep petrol navy, deep green-navy, aubergine-brown, or ink-brown |
| Data colors | Muted lender-inspired blues, golds, reds, greens used only in charts |
| Warning | Warm amber, restrained |
| Positive | Muted green, restrained |

Use bright red and yellow only as rare personality accents. They should no longer define the whole interface.

### Light Dora, Dark Daria

The brand can have two emotional palettes, but they need different jobs.

The light palette is Dora: cyan, pink, orange, bright yellow, and other clear optimistic colours. Use it for actions, proof icons, selected states, small highlights, and friendly moments. These colours should stay flat, readable, and purposeful. They are not page washes, gradients, or decorative backgrounds.

The dark palette is Daria: deep petrol navy, green-navy, aubergine-brown, warm ink-brown, and other grounded darks that feel dry, smart, and analytical. Use this palette only when the product needs a high-contrast utility surface: a calculator control, a focused scenario module, a chart detail, or a small editorial break.

No black boxes. Do not use pure black or generic near-black slabs for panels, hero modules, sliders, cards, or callouts. If a surface needs to be dark, it must be a named brand colour with a relationship to the character head, the product's analytical tone, or both. A Daria dark surface should still feel like Fundora, not like a default admin template.

Practical dark surface examples:

| Role | Direction | Avoid |
|---|---|---|
| Focused calculator panel | Deep petrol navy or green-navy with warm off-white text | `#000`, `#111`, or charcoal boxes |
| Slider track on dark panel | A slightly lighter dark from the same family | White outlines or default browser borders |
| Progress fill | Bright yellow, cyan, or another meaningful Dora accent | Gradient fills or low-contrast muted fills |
| Dark panel copy | Warm off-white and pale tan secondary text | Stark white everywhere |
| Adjacent UI | Neutral paper or white surfaces | Stacking multiple dark blocks |

Cream is allowed only as a local accent when it has a job:

- A quiet empty-state illustration background.
- A small character note that needs warmth.
- A printed-paper style article figure.
- A single onboarding panel where no data accents are competing.

Cream is not allowed as:

- The global page background.
- The default card colour.
- The dominant hero colour.
- The background behind the character head.
- The base colour for chart-heavy screens.

### Notion-Style Colour Splashes

Notion uses colour like an editor, not like a campaign designer. The colour usually appears as small signals inside a neutral page: a product screenshot detail, an icon, a callout tint, a small illustration, a status chip, or a hover state. The page stays quiet so the coloured moment can actually work.

Fundora should use colour the same way. A colour splash is a local emphasis, not a section theme.

Good colour splashes:

- A small yellow character-note accent beside an otherwise white result panel.
- A muted blue line in a rate-sensitivity chart.
- A green status dot for "within comfort range."
- A restrained amber badge for an assumption that needs attention.
- A hand-drawn pencil/calculator/backpack icon near a proof point.
- A tiny highlight behind one phrase or number when it helps scanning.

Bad colour splashes:

- Whole hero sections washed in yellow, orange, or cream.
- Every card using a different pastel background.
- Chart colours reused as decorative blobs.
- Gradient colour ramps pretending to be brand energy.
- Character yellow used for warnings.
- Bright red/yellow CTAs repeated across the page.
- Large decorative colour panels that do not carry data or meaning.

Colour hierarchy should work like this:

| Level | Use | Amount |
|---|---|---|
| Neutral | Page, panels, tables, forms, primary reading surfaces | 80-90% |
| Ink | Text, primary actions, outlines, data labels | 5-10% |
| Data colour | Charts, lender distinction, status, comparison | 5-10% |
| Character colour | Head, proof icons, rare notes, small moments of warmth | 2-5% |

The character palette and the data palette must not fight each other. Character colours are for friendliness and interpretation. Data colours are for meaning and comparison. If a coloured element does not clearly belong to one of those jobs, remove it.

Recommended splash palette direction:

| Colour family | Use | Notes |
|---|---|---|
| Character gold/yellow | Character face, pencil accent, rare note warmth | Keep away from warnings when possible |
| Brown/chestnut | Hair, backpack, hand-drawn prop warmth | Good for illustration, not UI controls |
| Muted blue | Rates, lender comparison, analytical calm | Best default chart accent |
| Muted green | Comfort, pass, enough, completed | Keep desaturated and legible |
| Amber | Caution, assumptions, sensitivity | Use sparingly because it is close to character warmth |
| Red | Risk, negative change, important warning | Small doses only |

Practical rule: one page can have one character-colour moment and one data-colour family. If more colour is needed, it should come from the chart legend or the icon set, not from background decoration.

## Typography

The target typography should be less comic-heavy and more editorial/productive.

Recommended direction:

- Use a clean grotesk or system sans for the product UI.
- Pair with IBM Plex Mono for metadata, table labels, timestamps, calculator assumptions, and technical readouts.
- Keep headings slightly tight, but avoid extreme negative tracking.
- Body text should be normal weight, readable, and trustworthy.
- Use bold for meaning, not as the default body voice.

Suggested type behavior:

| Context | Direction |
|---|---|
| Page h1 | Large, plain, editorial, 600-700 weight |
| Section h2 | Medium-large, sentence-like, 600-700 weight |
| Card h3 | Compact, direct, 600 weight |
| Body | 400-500 weight, comfortable line height |
| Data value | 600-700 weight, tabular numbers |
| Metadata | IBM Plex Mono, 10-12px, uppercase or compact |
| Character note | Conversational, not childish |

## Components

### Navigation

Use a calm product nav.

- Text wordmark only.
- Small number of links.
- Primary action as a compact button.
- Sticky nav is acceptable if it stays quiet.
- Do not put the character head in the nav as a logo.

### Cards

Cards should feel like workspace surfaces.

- 1px neutral border.
- 8-12px radius.
- Minimal shadow or no shadow.
- Clear heading, compact body, useful data.
- Avoid nested cards unless the inner surface is a form field, table row, or chart region.

### Buttons

Buttons should be simple colour-filled controls. They should feel clickable through fill, placement, label, spacing, hover state, and cursor, not through heavy borders.

Default button:

- Light neutral grey fill.
- No border.
- Literal black text (`#000`).
- 8px radius or less.
- No shadow by default.

Accent buttons:

- Use bright fill only when the action has meaning.
- Use literal black text (`#000`) on light or bright Dora colours.
- Use warm white text on dark Daria colours when black text fails contrast.
- The primary button should use the same dark Daria green-navy used by focused utility panels such as the Deposit saved control.
- Cyan remains useful for selected states, highlights, and lighter action moments.
- Pink, orange, green, or amber can be used only when semantically justified.
- One accent button per local decision area is usually enough.

Button hierarchy:

| Button role | Direction | Use |
|---|---|---|
| Default | Light grey fill, no border, `#000` text | Secondary actions, navigation, ordinary controls |
| Primary | Dark Daria green-navy fill, no border, warm white text | Main next step in a flow |
| Edit / try | Pink fill, no border, `#000` text | Adjusting assumptions, trying an alternate scenario |
| Proceed / plan | Orange fill, no border, `#000` text | Saving or building a next-step plan |
| Positive | Muted green fill, no border, `#000` text | Confirmed, comfortable, completed actions |
| Warning | Amber fill, no border, `#000` text | Attention-needed actions only |
| Text link | Blue or ink text, no button chrome | Low-emphasis navigation, article/release links |

Avoid:

- Black-filled primary buttons as the default brand button.
- Black text on dark green, navy, aubergine, or other Daria-dark buttons.
- White text on bright Dora buttons.
- Gradient fills on buttons.
- Borders on buttons unless there is a specific system need.
- Offset shadows or pill shapes that make the UI feel comic.
- Colour as decoration. Button colour must communicate action priority or meaning.

### Tables

Tables are a core product surface.

Use for:

- Lender comparison.
- Rate, max borrow, approval speed, confidence.
- Scenario differences.
- Assumption lists.

Table behavior:

- Sticky or clear headers where useful.
- Small IBM Plex Mono labels.
- Tabular numeric alignment.
- Row hover states that help scanning.
- No comic borders.
- Include explanatory captions when the metric can be misunderstood.

### Charts

Charts should feel analytical but approachable.

Use:

- Horizontal bars for lender spread.
- Waterfall or stacked bars for deposit, costs, and usable budget.
- Line charts for rate sensitivity.
- Simple range bands for comfort zone.
- Compact legends.

Rules:

- Chart colors must be muted.
- Every chart needs a plain-language interpretation nearby.
- Avoid decorative chart junk.
- Data visuals are content, not background texture.

### Character Notes

A character note is the main personality component.

Use it when the user needs interpretation, reassurance, or a pointed reframe.

Pattern:

- Small head image, deep etched.
- Short note text.
- Optional label such as "Dora note" or "Worth noticing".
- No speech-bubble tail unless the rest of the interface is very quiet.
- Surface should usually be white or neutral off-white with a fine border. Use pale yellow only for rare moments where the note itself is the warm accent.

Example tone:

> The highest number is not automatically the best number. If the repayment makes every other choice feel smaller, treat it as a ceiling, not a target.

## Voice

Fundora should sound observant, clear, and useful.

Voice rules:

- Plain English first.
- Say what the number means.
- Name uncertainty without sounding evasive.
- Prefer "comfortable" and "sustainable" over "dream" and "maximum".
- Use dry wit rarely, usually after the serious point is clear.
- Do not turn financial stress into a joke.
- Do not use hype language.

Good copy patterns:

- "Your lender spread is doing more work than your deposit here."
- "This is the number a calculator usually hides behind an average."
- "You can probably borrow more. The better question is whether you want to live inside that repayment."
- "This result is directionally useful, not a credit approval."
- "The boring detail matters: lender policy changes the answer."

Bad copy patterns:

- "Unlock your dream home today."
- "Crush your mortgage goals."
- "You're pre-approved!"
- "No worries, you've got this!"
- "Financial freedom starts here."

## Page Archetypes

### Home

First screen should show the useful product concept, not a generic marketing promise.

Recommended first viewport:

- Text wordmark nav.
- Editorial h1 about real borrowing power or comfort.
- Short supporting copy.
- Primary calculator action.
- A real-looking borrowing-power panel or lender-spread preview.
- Optional character head near a single insight, not as the hero centerpiece.

### Calculator

The calculator is a thinking flow.

Use:

- Step structure.
- Clear field grouping.
- Assumption visibility.
- Calm progress indicator.
- Helpful microcopy only where it reduces uncertainty.
- Character notes only after a step or result, not beside every field.

### Results

Results should combine data and interpretation.

Required elements:

- Borrowing-power range.
- Comfortable range.
- Lender spread.
- Monthly repayment estimate.
- Key assumptions.
- Scenario levers.
- A plain-language character note explaining the trade-off.

### Insights / Articles

Use Notion release-note rhythm.

Patterns:

- Dated entries.
- Short title.
- Product screenshot or chart.
- One plain paragraph.
- Optional link.
- Tags for topic and audience.

### About

Explain the friend/tool split.

The company is serious about the math. The character exists because buying property is emotionally loaded and people need clarity without being patronised.

## Motion

Motion should be tiny and helpful.

Use:

- Subtle hover background changes.
- Soft reveal for result panels.
- Numeric count-up only when it adds comprehension.
- Chart bar fills after result load.

Avoid:

- Mascot bouncing.
- Constant animations.
- Parallax.
- Oversized page transitions.

## Implementation Guardrails For Codex

When generating new UI, follow this order:

1. Start with a neutral paper workspace, not a cream branded poster.
2. Place the useful product object above the fold.
3. Use Notion-like hierarchy: title, description, block, metadata, link.
4. Use tables and charts as primary visual interest.
5. Add the character head only where a helpful friend would speak.
6. Keep borders fine and shadows minimal.
7. Use muted data colors, not loud brand colors.
8. Use flat colour only. No gradients anywhere.
9. Use Daria dark brand colours for rare dark surfaces. No black boxes.
10. Write copy that explains trade-offs.
11. Check mobile layouts for dense tables and long financial labels.
12. Remove any decoration that does not clarify a decision.

## Compatibility With Existing System

This direction intentionally relaxes several current rules in `docs/design.md`.

Consider changing:

- Heavy black borders to neutral 1px borders.
- Slate page background to neutral off-white or white.
- Solid offset shadows to subtle or no shadows.
- Default bold body copy to normal readable body copy.
- Black-filled or outlined CTA dominance to borderless colour-filled buttons.
- Gradient effects to flat fills only.
- Single brutalist depth stack to document-like surfaces.
- Speech bubble personality to quieter character notes.
- "No illustrations" to "use character illustrations sparingly and purposefully."

Keep:

- Honest borrowing-power framing.
- Protective realism.
- Clear touch targets.
- Visible focus states.
- Data-first pages.
- Characterful challenger attitude.
- The idea that max borrowing is not the same as comfortable borrowing.

## Final Taste Check

Before shipping a generated screen, ask:

- Would this still feel credible if someone were making a million-dollar decision?
- Can the user find the number, the caveat, and the next step in under five seconds?
- Does the character feel like a helpful friend, not a mascot demanding attention?
- Is the interface doing Notion-style restraint, or only copying beige colors?
- Is personality clarifying the product, or decorating around it?

If the screen feels like a calculator wearing a costume, simplify the interface and make the character note sharper.
