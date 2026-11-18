import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["lt", "en"],
  defaultLocale: "lt",
  // Internal route (folder name) → public URL per locale.
  pathnames: {
    "/": "/",
    "/projektai/[slug]": { lt: "/projektai/[slug]", en: "/projects/[slug]" },
  },
});

export type Locale = (typeof routing.locales)[number];
