"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "lt" ? "en" : "lt";

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      aria-label={t("languageLabel")}
      className="grid h-11 min-w-11 place-items-center rounded-xl px-2 font-mono text-xs uppercase text-muted transition-colors hover:text-text"
    >
      {other}
    </Link>
  );
}
