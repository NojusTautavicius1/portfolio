import type { MetadataRoute } from "next";

import { featuredProjects } from "@/content/projects";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

function entry(href: Href, priority: number): MetadataRoute.Sitemap[number] {
  const url = (locale: Locale) => SITE_URL + getPathname({ locale, href });
  return {
    url: url(routing.defaultLocale),
    lastModified: new Date(),
    priority,
    alternates: { languages: Object.fromEntries(routing.locales.map((locale) => [locale, url(locale)])) },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    entry("/projektai", 0.8),
    ...featuredProjects.map((project) => entry({ pathname: "/projektai/[slug]", params: { slug: project.slug } }, 0.7)),
  ];
}
