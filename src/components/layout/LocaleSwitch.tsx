"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function LocaleSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const params = useParams<{ slug?: string }>();
  const other = locale === "lt" ? "en" : "lt";

  // Keep the visitor on the same page: /lt/projektai/x ↔ /en/projects/x.
  // Only project pages have a slug, so the route param identifies them reliably.
  const href = params.slug ? { pathname: "/projektai/[slug]" as const, params: { slug: params.slug } } : "/";

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
