import { getLocale, getTranslations } from "next-intl/server";

import { featuredProjects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

import { ProjectsTrack } from "./ProjectsTrack";

// Classes for the pinned horizontal mode only (desktop with motion; ProjectsTrack sets the attribute).
// Written out in full because Tailwind only generates classes it can find literally in the source.
const horizontal = {
  show: "group-data-[horizontal=true]/projects:flex",
  frame: "group-data-[horizontal=true]/projects:mt-10",
  list: "group-data-[horizontal=true]/projects:flex group-data-[horizontal=true]/projects:w-max group-data-[horizontal=true]/projects:gap-[4vw] group-data-[horizontal=true]/projects:space-y-0",
  item: "group-data-[horizontal=true]/projects:w-[min(1100px,76vw)] group-data-[horizontal=true]/projects:shrink-0",
  media: "group-data-[horizontal=true]/projects:order-none",
};

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const total = String(featuredProjects.length).padStart(2, "0");

  return (
    <ProjectsTrack
      id="projects"
      aria-labelledby="projects-title"
      count={featuredProjects.length}
      className={`group/projects ${sectionSpacing} data-[horizontal=true]:flex data-[horizontal=true]:h-dvh data-[horizontal=true]:flex-col data-[horizontal=true]:justify-center data-[horizontal=true]:overflow-x-clip data-[horizontal=true]:py-0 data-[horizontal=true]:pt-16`}
    >
      <div className={`${container} flex flex-wrap items-end justify-between gap-6`}>
        <div className="flex items-end gap-6">
          <h2 id="projects-title" data-reveal className={sectionTitle}>
            {t("title")}
          </h2>
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <p data-reveal className="text-muted">
            {t("intro")}
          </p>
          <div aria-hidden className={`hidden items-center gap-3 font-mono text-xs text-muted ${horizontal.show}`}>
            <span data-counter className="text-text">
              01
            </span>
            <span>/ {total}</span>
            <span className="relative h-px flex-1 bg-line">
              <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-accent" />
            </span>
          </div>
        </div>
      </div>

      <div className={`${container} mt-14 ${horizontal.frame}`}>
        <ol data-track className={`space-y-20 md:space-y-28 ${horizontal.list}`}>
          {featuredProjects.map((project, index) => (
            <li key={project.slug} className={horizontal.item}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                  className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-line bg-surface ${
                    index % 2 === 1 ? `lg:order-2 ${horizontal.media}` : ""
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{t("mediaSoon")}</span>
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
                    <TagList items={localizeTerms(project.stack, locale)} label={t("stack")} />
                  </div>
                  <Link
                    href={{ pathname: "/projektai/[slug]", params: { slug: project.slug } }}
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
      </div>
    </ProjectsTrack>
  );
}
