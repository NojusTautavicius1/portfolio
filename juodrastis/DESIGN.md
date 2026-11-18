# Design System: Nojus Tautavičius — "The Deck"

## 1. Visual Theme & Atmosphere
A bold, high-contrast "card table" portfolio: near-black, warm white and card red. Nojus is the
deck — every card is a part of him. The hero is a giant wide name with four playing cards dealt
from behind it; projects are one big card that spins to a new face per project; a card thrower
turns the page into a game. One theme (dark). The information layer stays calm and scannable:
a recruiter finds who / stack / projects / CV within 30–60 s.

Principles borrowed (not copied) from award-style sites: giant type, objects around the name,
a HUD frame, a playful toggle. Own assets, own fonts, own mechanic (cards + glass cracks).

## 2. Color Palette & Roles
- **Table Black** (#0A0A0A) — background
- **Felt Surface** (#141414) — raised blocks, card backs (info side)
- **Hairline** (#262626) — dividers
- **Card White** (#F2F0EB) — text and card faces
- **Steel** (#8C8C8C) — secondary text (5.9:1 on black)
- **Signal Red** (#FF5446) — text, links, icons on black (~6:1)
- **Card Red** (#C81E17) — button fills (white text ~5.4:1), red suits on card faces, card backs
- Paper tokens (`data-theme="paper"`) exist only for the printable CV sheet.

## 3. Typography
- **Display:** Archivo, static instance at width 125 / weight 900, subset to Latin + Lithuanian
  (7 KB). Utility: `font-display-wide`. Uppercase, tight leading (0.95), for the name, section
  titles, project titles, card ranks.
- **Body:** Geist. **Mono:** Geist Mono for HUD, tags, counters, labels.

## 4. Cards (CSS 3D, no WebGL)
- `.card` (size via `--card-w`, everything scales in em) > `.card-float` (idle bob) >
  `.card-tilt` (pointer tilt + lift) > `.card-inner` (flip) > `.card-face` front/back.
- Front: rank + suit in two corners, big centre suit, small mono caption. Back: info (hero) or
  red weave pattern with "N·T" (thrown / spinning cards).
- Moving sheen follows the pointer (`--mx/--my`). Cards are real buttons/HTML text: accessible
  and crawlable.
- Suits = directions: A♠ AI & automation, K♦ Motion design, Q♥ Full-stack, J♣ SEO.

## 5. Motion
- Hero: deal-out from behind the name (staggered), parallax per card depth, hover tilt, click /
  Enter flips a card to the centre at reading size; Esc / outside click closes.
- Projects (desktop, motion OK): pinned; one big card turns 360° per project with scroll
  (snap to faces, lean from scroll velocity); the face swaps while the back is showing.
- Card thrower (bottom-left toggle): arc flight, glass crack at impact (fades in ~3.6 s),
  reactions: letter falls, status → suit fountain, CV → JACKPOT, hero card flips, project card spins.
- Reduced motion: no deal-out, no float, instant flips, no pin, thrower hidden.

## 6. Anti-Patterns (Banned)
No emojis in UI · no Inter · no pure black · no neon glows / purple gradients · no fake metrics ·
no "Scroll to explore" · no 3 equal cards in a row · custom cursor only inside thrower mode.
