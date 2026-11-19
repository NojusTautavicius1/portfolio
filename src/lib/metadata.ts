import type { Metadata } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

/**
 * Canonical, hreflang and link-preview tags for one page.
 * Next.js replaces a parent's `openGraph` object instead of merging it, so every page sets the full set.
 */
export function pageMetadata(
  locale: string,
  href: Href,
  { title, description, image: imagePath }: { title: string; description: string; image?: string },
): Metadata {
  const path = (target: Locale) => getPathname({ locale: target, href });
  const current = locale as Locale;
  // Setting openGraph here hides the opengraph-image files, so the image is named explicitly.
  // Pages without a card of their own reuse the home page one.
  const image = { url: imagePath ?? `/${current}/opengraph-image`, width: 1200, height: 630, alt: title };

  return {
    description,
    alternates: {
      canonical: path(current),
      languages: { lt: path("lt"), en: path("en"), "x-default": path(routing.defaultLocale) },
    },
    openGraph: {
      type: "website",
      siteName: "Nojus Tautavičius",
      url: path(current),
      title,
      description,
      locale: current === "lt" ? "lt_LT" : "en_US",
      alternateLocale: current === "lt" ? "en_US" : "lt_LT",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
