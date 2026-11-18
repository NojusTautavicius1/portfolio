import { getLocale, getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/localize";
import { container } from "@/lib/styles";

import { LocaleSwitch } from "./LocaleSwitch";

const sections = [
  { hash: "projects", key: "projects" },
  { hash: "experience", key: "experience" },
  { hash: "contact", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-md print:hidden">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          {profile.initials}
          <span className="sr-only"> — {profile.name}, {t("home")}</span>
        </Link>

        <nav aria-label={t("sections")} className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted">
            {sections.map((section) => (
              <li key={section.hash}>
                <Link href={{ pathname: "/", hash: section.hash }} className="transition-colors hover:text-text">
                  {t(section.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitch />
          <a
            href={localize(profile.cv, locale)}
            target="_blank"
            rel="noopener"
            aria-label={t("cvLabel")}
            className="ml-2 inline-flex min-h-10 items-center gap-2 rounded-xl bg-accent-fill px-4 text-sm font-medium text-on-accent transition-[filter,transform] hover:brightness-110 active:translate-y-px"
          >
            {t("cv")}
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
