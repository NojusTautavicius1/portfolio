# Design System: Nojus Tautavičius — Portfolio

## 1. Visual Theme & Atmosphere
Cinematic first impression, readable everything else. The hero is a full-viewport 3D stage with large, track-tight typography; a single Blender-made object acts as a guide that travels through the page on scroll. After the hero the page calms down: projects scroll horizontally on desktop (pinned section), experience/skills/contacts are quiet, scannable blocks where the 3D object shrinks to the side.

- Density 4 (balanced, airy hero) · Variance 7 (offset, asymmetric) · Motion 7 in hero/projects, 3 elsewhere
- One strong effect (3D guide + scroll choreography). Everything else is subtle: fades, small translates, staggered reveals.
- A recruiter must find who / stack / projects / CV within 30–60 s. A persistent "CV" button sits in the top bar at all times.

## 2. Color Palette & Roles
Single accent. Dark is the default theme; light is available via a toggle (and follows `prefers-color-scheme` on first visit).

### Dark (default)
- **Graphite Canvas** (#0E0F11) — page background
- **Graphite Surface** (#17191C) — raised blocks, project panels
- **Hairline** (#26292E) — 1px dividers, borders
- **Bone Text** (#ECEDEE) — primary text
- **Steel Text** (#8A8F98) — secondary text, metadata
- **Signal Orange** (#E8643C) — CTAs, links, focus ring, 3D rim light. Button labels on orange use Graphite Canvas (#0E0F11), never white (contrast).

### Light
- **Paper Canvas** (#F5F3EF) — page background
- **Paper Surface** (#FFFFFF) — raised blocks
- **Hairline** (#E3E0DA) — dividers
- **Ink Text** (#17181B) — primary text
- **Slate Text** (#5F636B) — secondary text
- **Burnt Orange** (#B83E18) — accent (darkened for ≥4.5:1 on paper)

## 3. Typography Rules
- **Display:** Geist, weight 600–700, tracking −0.03em, `clamp(2.75rem, 7vw, 6.5rem)`. Hierarchy through weight and color, not just size.
- **Body:** Geist 400, 1rem–1.125rem, line-height 1.6, max 65ch.
- **Mono:** Geist Mono — tech tags, dates, project numbers (01, 02…), status labels.
- Lithuanian diacritics (ą č ę ė į š ų ū ž) must be verified in the chosen font subset (`latin-ext`).

## 4. Component Stylings
- **Buttons:** Primary = accent fill, 0.75rem radius, active state translateY(1px). Secondary = 1px hairline outline. No glows.
- **Tech tags:** Geist Mono, small, hairline border, no fill.
- **Project panels (horizontal track):** Large media (video loop or screenshot) + number, title, one-line problem, stack tags, status badge (`Klientas`, `MVP`, `Koncepcija`, `Ruošiama paleidimui`).
- **Status badge:** "● Atviras darbui" with a slow opacity pulse on the dot only.
- **Loaders:** 3D canvas shows a skeleton / poster image until the model loads. No spinners.

## 5. Layout Principles
- Max width 1400px, CSS Grid. Hero is left-aligned text + 3D on the right (never centered text block).
- Projects: pinned horizontal track on ≥1024px; vertical stack below.
- Everything collapses to one column under 768px. No horizontal page overflow. Touch targets ≥44px.
- Full-height sections use `min-h-[100dvh]`.

## 6. Motion & Interaction
- 3D guide: scroll-driven path between section anchors; reacts to pointer (subtle tilt / look-at) and hover on project panels.
- Smooth scroll (Lenis) + GSAP ScrollTrigger for pinning and the 3D path.
- Reveals: opacity + translateY 16px, staggered 60–80ms. Transforms and opacity only.
- `prefers-reduced-motion`: no smooth scroll, no pinning, static 3D poster, instant reveals.
- Mobile: lighter 3D (lower DPR, no post-processing) or static render fallback on weak devices.

## 7. Anti-Patterns (Banned)
No emojis in UI · no Inter · no pure black · no neon glows or purple gradients · no gradient text on big headings · no custom cursors · no overlapping text over images · no 3 equal cards in a row · no fabricated metrics (real numbers only, otherwise omit) · no "Scroll to explore" / bouncing arrows · no AI clichés (Elevate, Seamless, Unleash, Next-Gen).
