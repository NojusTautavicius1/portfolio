import { getLocale, getTranslations } from "next-intl/server";

import { featuredProjects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  return (
    <section id="projects" aria-labelledby="projects-title" className={`${container} ${sectionSpacing}`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="projects-title" className={sectionTitle}>
          {t("title")}
        </h2>
        <p className="max-w-md text-muted">{t("intro")}</p>
      </div>

      <ol className="mt-14 space-y-20 md:space-y-28">
        {featuredProjects.map((project, index) => (
          <li key={project.slug}>
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div
                className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-line bg-surface ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <span aria-hidden className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight text-line">
                  {project.title}
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-xs text-muted">{t("mediaSoon")}</span>
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <span className={eyebrow}>{String(index + 1).padStart(2, "0")}</span>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
                <p className="mt-3 text-lg">{localize(project.tagline, locale)}</p>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{localize(project.problem, locale)}</p>
                <div className="mt-6">
                  <TagList items={project.stack} label={t("stack")} />
                </div>
                <Link
                  href={`/projektai/${project.slug}`}
                  aria-label={t("moreAbout", { title: project.title })}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
                >
                  {t("more")}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
