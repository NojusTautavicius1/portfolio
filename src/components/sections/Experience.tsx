import { getLocale, getTranslations } from "next-intl/server";

import { education, experience } from "@/content/experience";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";

const row = "grid gap-2 border-t border-line py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10";

export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <section id="experience" aria-labelledby="experience-title" className={`${container} ${sectionSpacing}`}>
      <h2 id="experience-title" className={sectionTitle}>
        {t("title")}
      </h2>

      <ol className="mt-12">
        {experience.map((item) => (
          <li key={item.organization} className={row}>
            <p className="font-mono text-sm text-muted">{localize(item.period, locale)}</p>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {localize(item.role, locale)} <span className="text-muted">— {item.organization}</span>
              </h3>
              <p className="mt-1 text-sm text-muted">{localize(item.context, locale)}</p>
              <ul className="mt-4 space-y-2">
                {localize(item.points, locale).map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h3 className={`${eyebrow} mt-16`}>{t("education")}</h3>
      <div className={`${row} mt-4`}>
        <p className="font-mono text-sm text-muted">{localize(education.period, locale)}</p>
        <div>
          <p className="text-xl font-semibold tracking-tight">{localize(education.title, locale)}</p>
          <p className="mt-1 text-muted">{localize(education.school, locale)}</p>
        </div>
      </div>
    </section>
  );
}
