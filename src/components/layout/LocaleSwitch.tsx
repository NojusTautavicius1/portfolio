"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const other = locale === "lt" ? "en" : "lt";

  // Keep the visitor on the same page: /lt/projektai/x ↔ /en/projects/x, /lt/projektai ↔ /en/projects.
  // Project pages are identified by their slug param (reliable on statically rendered pages).
  const href = params.slug
    ? { pathname: "/projektai/[slug]" as const, params: { slug: params.slug } }
    : pathname === "/projektai" || pathname === "/cv"
      ? pathname
      : "/";

  return (
    <Link
      href={href}
      locale={other}
      hrefLang={other}
      className="grid h-11 min-w-11 place-items-center rounded-xl px-2 font-mono text-xs uppercase text-muted transition-colors hover:text-text"
    >
      {/* Visible text stays first in the accessible name, so voice control ("click EN") works. */}
      {other}
      <span className="sr-only"> — {t("languageLabel")}</span>
    </Link>
  );
}
