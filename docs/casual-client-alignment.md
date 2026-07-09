# Aligning with casual-client (Fundora brand repo)

Comparison of [garthmcrae/casual-client](https://github.com/garthmcrae/casual-client) — the canonical Fundora brand + visual grammar — against this repo's two design systems: the results-page spec v3 (`docs/results-page-spec.md` §3, Paper-verified) and the landing page (`src/landing-a.css`). Written 2026-07-08 to drive the landing revision.

**What casual-client is:** `BRAND.md` (Fundora brand + voice), `CREATIVE_BRIEF.md` (character direction), `VISUAL_GRAMMAR.md` (an abstract grammar — tiers/roles/rules, deliberately leaving px/hex to token systems), plus two concrete implementations (`grammar/` hand-rolled CSS, `tailwind/` Tailwind v4 mapping grey→stone, green→emerald). It declares itself the north star: *"the visual grammar and current artefacts define the look."*

---

## 1. Where the three systems stand

| Dimension | casual-client (canonical) | Results spec v3 (Paper-verified) | Landing (`landing-a.css`) |
| --- | --- | --- | --- |
| Brand name | **Fundora** | fundiq (owner-confirmed vs "fundora" 2026-07-06 — now needs re-confirmation, see §3) | fundiq |
| Font | **Inter** 400/600/700 (Regular/SemiBold/Bold) | Helvetica Neue 400/700 | **Hanken Grotesk** (retired token set!) |
| Page bg | Grey Page `#fafafa`, white cards on it, **no shadows** | White page, grey `#F8F8F5` tiles | Cream `#f4f3ed` |
| Ink | Black `#111111` | `#111111` ✓ aligned | `#181a12` |
| Secondary text | Grey Dark `#6f6f6a` | `#5F5E58` (darker, warmer) | `#76776c` |
| Borders | Grey Edge `#d8d8d4` | `#D8D8D0` / `#E2E2DC` ✓ near-identical | `#e5e3d8` |
| Primary hue | Teal, tiered: Light `#ccf3ef` / Solid `#14b8a6` / Dark `#0f766e`. Fills at Solid, chromatic text at Dark | Teal `#167D7F` (text links) + mint `#85C7BE` (controls) | Forest `#15362b` |
| Primary button | Teal Solid bg, **black label**, no border | Black `#111111` bg, white label | Forest bg, white label |
| Extended hues | 9 hues × 3 tiers (blue/green/amber/pink/yellow/teal) — badges, themed cards, deltas (Green Dark ↑ / Pink Dark ↓) | Only `--err #C2462C` | Only forest derivatives |
| Radius | One shared radius: 10px (`grammar/`) / 12px `rounded-xl` (`tailwind/`); pills 999 | 8px everywhere | 13–20px range |
| Shadows | None — raised = white on grey | None ✓ aligned | Soft shadows |
| Type scale | 5 named tiers; concrete: 12/13 smallest–small, 14–16 default, 18–22 large, 28–34 section, 38–64 hero | Numeric per component (25 H1 / 38 hero mobile) | 44–56 hero |
| Motion | **Background-colour transitions only** | Count-ups, FLIP, springs (§11) + stop-motion illustration language (`illustration-style.md` §4) | Scroll reveals, count-ups |
| Imagery | A **character** — helpful-friend avatar near insights/onboarding (never mascot-spammed); "Avatar with quote", "Illustrated summary card" patterns | Inked-sticker **objects**; explicit "no mascots, no faces" | Placeholder assets |
| Voice | "How much *won't* you regret?" — comfort/sustainability over maximum; protective realism | "Max property price by lender" — answer-first maximum | Product-led, "The Number" |

**Reading:** the results spec and casual-client are already close relatives — same black ink, same near-identical border greys, both flat/shadowless, both teal-accented. The Paper frames' Helvetica Neue was almost certainly a placeholder for Inter (both are in the Paper file's font list, and casual-client names Inter canonically). The landing page is the outlier — it's still on the *retired* cream/forest/Hanken token set from Results.html and needs rebuilding regardless.

## 2. Alignment decisions — recommended

Adopt casual-client as the **brand foundation** (font, hue system, roles, voice); keep the results spec's Paper-verified component anatomy where it's more developed. Concretely:

1. **Font → Inter everywhere.** Weights: 400 body/labels, 600 buttons/badges/nav (new — we only had 400/700), 700 headings/values. Free via Google Fonts, metrically close to Helvetica Neue, canonical per VISUAL_GRAMMAR. Update spec §3.2 and rebuild landing on it.
2. **Adopt the tiered hue system.** Teal Light/Solid/Dark replaces our two ad-hoc teals: text links `#167D7F` → Teal Dark `#0f766e` (visually near-identical); fills/thumbs at Solid `#14b8a6`. Extended hues (green/pink deltas, amber/blue/yellow badge+card tints) unlock the landing's proof sections and future insights for free.
3. **Radius: one shared value.** Recommend **10px** (grammar/'s value; splits our 8 and tailwind's 12). Pills stay 999.
4. **Page surface: Grey Page `#fafafa` with white cards** (casual-client's raised-without-shadow model) for the **landing**; the results page keeps its white page (its card-on-white anatomy is Paper-verified and the difference is invisible at these values). Grey Light `#f3f3f0` and our `#F8F8F5` merge to one token.
5. **Keep our secondary-text grey `#5F5E58`** (darker than theirs = better contrast; theirs fails to justify the loss).
6. **Voice for the landing revision:** adopt the comfort reframe — lead with "how much won't you regret" energy over bare maximum; keep the results page answer-first (it's the tool; the landing is the pitch). Copy rules from BRAND.md apply: protective realism, no social-caption slogans.

## 3. Conflicts — RESOLVED by owner, 2026-07-08

| # | Conflict | **Decision** |
| --- | --- | --- |
| C1 | Brand name: Fundora (casual-client + Paper frames) vs fundiq (spec/prototype) | **Fundora.** Reverses the 07-06 pick (made before the brand repo surfaced). Spec renamed; prototype wordmark update owed |
| C2 | Primary button: teal-Solid + black label vs black + white label | **Teal everywhere** — including the results page, reversing the Paper-frame black CTA. Primary = `--teal #14B8A6` fill, black label, no border; default/secondary = grey-light fill, black label. Spec §3.1/§7.9/§7.7/§10.6 updated |
| C3 | Mint `#85C7BE` not in the brand ramp | **Keep mint** as a product-only control tint (progress, toggles, radio fills); Teal Light handles badge/card tints |
| C4 | Character vs illustration doc's no-faces rule | **Coexist, scoped** — objects stay category imagery; character only at interpretive moments (insights, onboarding, comfort-checks), must pass the inked-sticker craft test. Carved into `illustration-style.md` §5a. Character design is an open task |
| C5 | Motion: bg-only vs our rich system | **Our motion governs** product + landing; casual-client's austerity survives as the hover rule (bg-only), which we already follow |

Foundation decisions from the same session: **Inter everywhere** (400/600/700 — Helvetica Neue read as an Inter stand-in); **one shared 10px radius** (nudged from the frames' 8px); **Grey Page `#FAFAFA` + white shadow-less cards everywhere** — the owner chose full adoption of the casual-client surface model, results page included (goes further than §2's split recommendation; grey-light and `#F8F8F5` merged to `#F3F3F0`). All folded into spec v3.2 §3.

## 4. Landing revision — practical starting point

`src/landing-a.css` + `LandingANumberPage.jsx` rebuild on: Inter · Grey Page bg, white cards, no shadows · shared 10px radius · tiered teal with grammar buttons · Labelled-value/bar patterns and the Topbar/Section/Grid layouts from VISUAL_GRAMMAR (they map 1:1 onto the landing's existing sections) · comfort-reframe copy pass per BRAND.md · inked-sticker illustrations at T2/T3 per `illustration-style.md` (the landing is exactly where the T3 hero licence applies).
