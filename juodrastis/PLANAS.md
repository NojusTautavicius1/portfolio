# Portfolio planas (5 etapas)

## Sekcijų struktūra (viename puslapyje)

| # | Sekcija | Kas joje | 3D zondas |
|---|---|---|---|
| 0 | Viršutinė juosta | N.T. logotipas · Projektai · Patirtis · Kontaktai · LT/EN · tema · **[CV]** mygtukas (visada matomas) | — |
| 1 | Hero (100dvh) | ● Atviras darbui · vardas · „Kuriu web aplikacijas ir AI automatizacijas.“ · paantraštė · CTA | Atskrenda, objektyvas seka pelę |
| 2 | Greiti faktai | 3 eilutės (AI produktai, Potissimus, klientai + GraspIT) | Pakyla aukštyn |
| 3 | Projektai | 6 pagrindiniai, horizontalus pin'intas scroll (desktop), vertikaliai (mobile) | Skrenda šalia, atsisuka į aktyvų projektą |
| 4 | GraspIT + Motion | Studija + video galerija | Mažas, šone |
| 5 | Patirtis ir išsilavinimas | Laiko juosta: Potissimus, GraspIT, KTMC | Mažas, šone |
| 6 | Įgūdžiai + kiti projektai | Grupės be kortelių, trumpas sąrašas | Mažas, šone |
| 7 | Apie mane | Tekstas + maža nuotrauka + kalbos | — |
| 8 | Kontaktai | El. paštas, LinkedIn, GitHub, CV LT/EN | Nusileidžia prie CV mygtuko |

## Technologijos

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **React Three Fiber + drei** — 3D, `useGLTF` su Meshopt, `<Environment>` + `<Lightformer>` atspindžiams
- **GSAP + ScrollTrigger** — pin'inimas, horizontalus scroll, zondo kelias. **Lenis** — smooth scroll. Viena animacijų biblioteka (be Framer Motion), kad bundle būtų mažesnis
- **next-intl** — LT / EN
- **@react-pdf/renderer** — CV PDF generuojamas iš tų pačių duomenų failų
- **next/og** — Open Graph paveikslėlis, `sitemap.ts`, `robots.ts`
- **@vercel/analytics** + Speed Insights
- **Blender 5.3 (bpy)** + `@gltf-transform/cli` — modelis ir suspaudimas

## Failų struktūra

```
CV/
├─ blender/
│  ├─ zondas.py              # bpy skriptas, sukuria modelį
│  └─ renders/               # peržiūros renderiai tau patikrinti
├─ public/
│  ├─ models/zondas.glb      # suspaustas modelis
│  ├─ images/zondas-poster.webp
│  ├─ media/projects/        # screenshotai, video
│  └─ cv/                    # sugeneruoti PDF
├─ scripts/generate-cv.tsx   # PDF generavimas
└─ src/
   ├─ app/
   │  ├─ [locale]/layout.tsx, page.tsx, projektai/[slug]/page.tsx
   │  ├─ opengraph-image.tsx, sitemap.ts, robots.ts
   ├─ content/               # ČIA pildai turinį
   │  ├─ profile.ts          # vardas, kontaktai, apie mane
   │  ├─ projects.ts         # projektai (LT + EN laukai)
   │  ├─ experience.ts       # patirtis, išsilavinimas
   │  └─ skills.ts
   ├─ messages/lt.json, en.json   # UI tekstai (mygtukai, antraštės)
   ├─ components/
   │  ├─ sections/           # Hero, Projects, Experience...
   │  ├─ ui/                 # Button, Tag, StatusBadge...
   │  └─ three/              # Scene, Probe, ProbePlaceholder, Lights
   └─ lib/                   # gsap/lenis setup, reduced-motion, įrenginio galia
```

## Darbų eiliškumas

1. **Pagrindas:** Next.js projektas, spalvos/šriftai iš DESIGN.md, LT/EN, turinio failai iš `tekstai-lt.md`
2. **Visos sekcijos be animacijų:** mobile-first, prieinamumas, klaviatūra → **pirmas Vercel deploy** (jau galima rodyti)
3. **Zondo modelis:** bpy skriptas → renderiai tau patikrinti → `.glb` + poster
4. **3D scena:** placeholder → tikras modelis, atspindžiai, objektyvas seka pelę, lazy load
5. **Scroll choreografija:** Lenis + GSAP, horizontalūs projektai, zondo kelias; reduced-motion ir mobilios versijos
6. **Šviesi tema**
7. **Anglų versija**
8. **CV PDF, OG paveikslėlis, sitemap, analitika**
9. **Lighthouse (tikslas 90+) ir prieinamumo patikra**, taisymai
10. **Projektų paleidimas:** aiscan, PitchCraft, Sonara/Kalvita patikra → screenshotai ir video → nuorodos į portfolio

## Ko reikės iš tavęs pakeliui
- Užpildyti [ ] vietas `tekstai-lt.md` (galima ir vėliau, tiesiai `content/` failuose)
- Nuotrauka, motion video failai
- API raktai aiscan / PitchCraft paleidimui (įvesi pats Vercel'yje — aš jų nematysiu)
