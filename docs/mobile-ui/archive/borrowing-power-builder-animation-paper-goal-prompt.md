# Borrowing Power Builder animation Paper goal prompt

Goal: Create polished Paper designs for a Fundora borrowing-power animation/state system called Borrowing Power Builder.

Source of truth:
- Primary: User request to explore a cool, funky animated state system inspired by iterative isometric block states.
- Also follow: `docs/design.md`, `CODEX_DESIGN_SYSTEM.md`, and the existing `Fundora Inputs` Paper file.

Paper context:
- Work in the `Fundora Inputs` Paper file on the `Inputs` page.
- Create the new state board near the existing desktop inspiration and input-state artboards.
- Put state labels, animation notes, and rationale outside any product UI surfaces.

Brand and device:
- Brand: Fundora, with FundIQ-style lender modelling precision.
- Primary format: desktop Paper state board showing multiple 393 x 852 mobile product states plus an external animation storyboard.
- Use the existing Fundora mobile input-flow visual language: white/neutral workspace surfaces, fine borders, Helvetica Neue/system UI, IBM Plex Mono for tiny metadata, restrained teal/blue active states, and quiet bottom action zones.

Product concept:
- The user's borrowing profile becomes an isometric system of blocks.
- Blocks represent income, deposit, expenses, liabilities, dependants, lender buffer, and property target.
- As the user progresses, blocks move from ghost placeholders into a structured model, then into constraint and optimization states.
- The animation should make lender modelling feel tangible without turning into a heavy finance dashboard.

Required states:
- Empty/start: a pale isometric platform with ghost blocks waiting to be filled.
- Building profile: income, deposit, expenses, and liabilities blocks slide in one by one.
- Calculating: blocks lift, pulse, align, and a subtle scan line passes through.
- Constraint found: one or two blocks become heavier or darker and sink, such as living expenses or credit card limit.
- Optimization: a changed assumption shrinks or moves the constraint block and improves the model.
- Ready/lender match: blocks assemble into a clear house, stack, or pathway toward lender-match status.

Create 3 distinct variation directions:
- Platform Builder: the clearest state library, using a single isometric platform across six states.
- Lender Lane Conveyor: a scenario cube travels through lender lanes with pass, pause, and reject outcomes.
- Approval Pathway: blocks form a bridge/pathway toward ready-to-apply, with gaps representing missing actions.

Visual guidance:
- Use a bookish workspace mood: white paper, warm inset panels, ink text, fine borders, quiet blue/sand/sage data accents.
- Keep the animation funky through spatial transitions, not loud gradients or generic fintech styling.
- Use one dominant status/number per mobile screen.
- Use sentence-case labels and tabular numerals for money.
- Avoid loud gradients, decorative fintech green, heavy shadows, card-on-card layouts, and generic mortgage calculator motifs.

Output:
- A Paper board showing all required states.
- Include concise animation notes outside the states.
- Recommend the strongest direction or hybrid for implementation.
- Explicitly state how the primary borrowing-power status is handled in each direction.
