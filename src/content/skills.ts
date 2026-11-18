import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    name: { lt: "AI ir automatizacijos", en: "AI & automation" },
    items: ["Claude API", "Perplexity API", "Python", "Playwright", "Puppeteer", { lt: "Telegram botai", en: "Telegram bots" }],
  },
  {
    name: { lt: "Frontend", en: "Frontend" },
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    name: { lt: "Backend ir duomenys", en: "Backend & data" },
    items: ["Supabase", "PostgreSQL", "Prisma", "Redis (Upstash)", "Stripe", "REST API"],
  },
  {
    name: { lt: "SEO", en: "SEO" },
    items: [
      { lt: "Techninis SEO", en: "Technical SEO" },
      "Search Console",
      { lt: "Struktūrizuoti duomenys", en: "Structured data" },
      { lt: "GEO / AI matomumas", en: "GEO / AI visibility" },
    ],
  },
  {
    name: { lt: "Motion ir 3D", en: "Motion & 3D" },
    items: ["After Effects", "Blender", "Remotion"],
  },
  {
    name: { lt: "Įrankiai", en: "Tools" },
    items: ["Git", "GitHub", "Vercel", "Railway", "Claude Code"],
  },
];

export const motionTools = ["After Effects", "Blender", "Remotion"];
