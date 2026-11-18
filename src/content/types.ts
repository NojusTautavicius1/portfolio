import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

/** A tag that is the same in every language ("Next.js") or needs translating ("Technical SEO"). */
export type Term = string | Localized;

export type ProjectStatus = "client" | "mvp" | "concept" | "launching" | "live";

export type ProjectLink = {
  kind: "live" | "demo" | "github" | "video";
  href: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  /** Card shown for the project: suit = its main direction (see areas.ts), rank = its order. */
  card: { suit: "spades" | "hearts" | "diamonds" | "clubs"; rank: string };
  tagline: Localized;
  status: ProjectStatus;
  problem: Localized;
  solution: Localized;
  /** null = no verified result yet; the block is hidden. */
  result: Localized | null;
  role: Localized | null;
  stack: Term[];
  links: ProjectLink[];
  /** Screenshots in /public. Desktop shots are 16:10, mobile shots 1:2. */
  media?: { src: string; kind: "desktop" | "mobile" }[];
};

export type SideProject = {
  title: Localized;
  description: Localized;
  stack: Term[];
};

export type ExperienceItem = {
  role: Localized;
  organization: string;
  context: Localized;
  period: Localized;
  points: Localized<string[]>;
};

export type SkillGroup = {
  name: Localized;
  items: Term[];
};
