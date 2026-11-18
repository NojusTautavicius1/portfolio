import type { Localized, Term } from "./types";

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

export const suitSymbol: Record<Suit, string> = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" };
export const redSuits: Suit[] = ["hearts", "diamonds"];

export type Area = {
  suit: Suit;
  /** Card rank = priority: A is the strongest direction. */
  rank: "A" | "K" | "Q" | "J";
  name: Localized;
  line: Localized;
  stack: Term[];
  best: Localized;
};

// In the order they fly out: top-left, top-right, bottom-left, bottom-right.
export const areas: Area[] = [
  {
    suit: "spades",
    rank: "A",
    name: { lt: "AI ir automatizacijos", en: "AI & automation" },
    line: { lt: "Įrankiai, kurie dirba už žmogų", en: "Tools that do the work for people" },
    stack: ["Claude API", "Python", "Playwright", "Perplexity API"],
    best: { lt: "Geriausias: aiscan", en: "Best: aiscan" },
  },
  {
    suit: "diamonds",
    rank: "K",
    name: { lt: "Motion design", en: "Motion design" },
    line: { lt: "Video reklamos ir 3D", en: "Video ads and 3D" },
    stack: ["After Effects", "Blender", "Remotion"],
    best: { lt: "Geriausias: ši svetainė", en: "Best: this website" },
  },
  {
    suit: "hearts",
    rank: "Q",
    name: { lt: "Full-stack", en: "Full-stack" },
    line: { lt: "Web aplikacijos nuo idėjos iki paleidimo", en: "Web apps from idea to launch" },
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    best: { lt: "Geriausias: Sonara", en: "Best: Sonara" },
  },
  {
    suit: "clubs",
    rank: "J",
    name: { lt: "SEO", en: "SEO" },
    line: { lt: "Matomumas Google ir AI paieškoje", en: "Visibility in Google and AI search" },
    stack: [{ lt: "Techninis SEO", en: "Technical SEO" }, "Search Console", "GEO"],
    best: { lt: "Geriausias: zaliuzesroletai.lt", en: "Best: zaliuzesroletai.lt" },
  },
];
