import { getLocale, getTranslations } from "next-intl/server";

import { sideProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { TagList } from "@/components/ui/Tag";

const row = "grid gap-3 border-t border-line py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10";

export async function Skills() {
  const t = await getTranslations("skills");
  const locale = await getLocale();

  return (
    <section aria-labelledby="skills-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <h2 id="skills-title" data-reveal className={sectionTitle}>
        {t("title")}
      </h2>

      <dl className="mt-12">
        {skillGroups.map((group) => (
          <div key={group.name.en} data-reveal className={row}>
            <dt className="font-medium">{localize(group.name, locale)}</dt>
            <dd>
              <TagList items={group.items} />
            </dd>
          </div>
        ))}
      </dl>

      <h3 className={`${eyebrow} mt-16`}>{t("side")}</h3>
      <ul className="mt-4">
        {sideProjects.map((project) => (
          <li key={project.title.en} data-reveal className={row}>
            <p className="font-medium">{localize(project.title, locale)}</p>
            <div className="space-y-3">
              <p className="leading-relaxed text-muted">{localize(project.description, locale)}</p>
              <TagList items={project.stack} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
