import type { Suit } from "./areas";
import type { Localized, Term } from "./types";

export type SkillDeck = {
  /** "joker" = tools that serve every direction. */
  suit: Suit | "joker";
  name: Localized;
  items: Term[];
};

/** Skills as five decks, one per direction (same suits as the hero cards) plus a joker for tools. */
export const skillDecks: SkillDeck[] = [
  {
    suit: "spades",
    name: { lt: "AI ir automatizacijos", en: "AI & automation" },
    items: ["Claude API", "Perplexity API", "Python", "Playwright", "Puppeteer", { lt: "Telegram botai", en: "Telegram bots" }],
  },
  {
    suit: "hearts",
    name: { lt: "Full-stack", en: "Full-stack" },
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma", "Redis (Upstash)", "Stripe"],
  },
  {
    suit: "diamonds",
    name: { lt: "Motion ir 3D", en: "Motion & 3D" },
    items: ["After Effects", "Blender", "Remotion", "GSAP", "CSS 3D"],
  },
  {
    suit: "clubs",
    name: { lt: "SEO", en: "SEO" },
    items: [
      { lt: "Techninis SEO", en: "Technical SEO" },
      "Search Console",
      { lt: "Struktūrizuoti duomenys", en: "Structured data" },
      { lt: "GEO / AI matomumas", en: "GEO / AI visibility" },
    ],
  },
  {
    suit: "joker",
    name: { lt: "Įrankiai", en: "Tools" },
    items: ["Git", "GitHub", "Vercel", "Railway", "Claude Code"],
  },
];

export const motionTools = ["After Effects", "Blender", "Remotion"];
