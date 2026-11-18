import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";

export async function About() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <section aria-labelledby="about-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_260px] md:gap-20">
        <div>
          <h2 id="about-title" className={sectionTitle}>
            {t("title")}
          </h2>
          <div className="mt-8 max-w-[65ch] space-y-5 text-lg leading-relaxed text-muted">
            {localize(profile.about, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl border border-line bg-surface">
            {profile.photo ? (
              <Image src={profile.photo} alt={t("photoAlt")} fill sizes="260px" className="object-cover" />
            ) : (
              <span aria-hidden className="absolute inset-0 grid place-items-center font-mono text-3xl text-muted">
                {profile.initials}
              </span>
            )}
          </div>
          <div>
            <p className={eyebrow}>{t("languages")}</p>
            <ul className="mt-3 space-y-1">
              {profile.languages.map((language) => (
                <li key={language.en}>{localize(language, locale)}</li>
              ))}
            </ul>
          </div>
          <p className="font-mono text-sm text-muted">{localize(profile.location, locale)}</p>
        </aside>
      </div>
    </section>
  );
}
