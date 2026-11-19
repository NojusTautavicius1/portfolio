import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

/** A tag that is the same in every language ("Next.js") or needs translating ("Technical SEO"). */
export type Term = string | Localized;

export type ProjectStatus = "client" | "mvp" | "launching" | "live";

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
  /** Optional: what the project taught me. Only for things that really happened. */
  learned?: Localized;
  stack: Term[];
  links: ProjectLink[];
  /**
   * Screenshots in /public. Desktop and page shots are 16:10, mobile shots 1:2.
   * The first desktop + mobile shot open the project page; "page" shots are its other pages, shown below.
   */
  media?: { src: string; kind: "desktop" | "mobile" | "page"; caption?: Localized }[];
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
