import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type ProjectStatus = "client" | "mvp" | "concept" | "launching" | "live";

export type ProjectLink = {
  kind: "live" | "demo" | "github" | "video";
  href: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  tagline: Localized;
  status: ProjectStatus;
  problem: Localized;
  solution: Localized;
  /** null = no verified result yet; the block is hidden. */
  result: Localized | null;
  role: Localized | null;
  stack: string[];
  links: ProjectLink[];
};

export type SideProject = {
  title: Localized;
  description: Localized;
  stack: string[];
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
  items: string[];
};
