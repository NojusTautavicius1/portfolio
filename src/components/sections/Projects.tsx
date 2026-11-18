import { getLocale, getTranslations } from "next-intl/server";

import { featuredProjects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { CardFront } from "@/components/deck/PlayingCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

import { ProjectsDeck } from "./ProjectsDeck";

// Pinned layout (desktop with motion; ProjectsDeck sets data-pinned) — classes written out in full
// because Tailwind only generates what it finds literally in the source.
const pinned = {
  header: "group-data-[pinned=true]/projects:pt-24",
  counter: "group-data-[pinned=true]/projects:flex",
  list: "group-data-[pinned=true]/projects:absolute group-data-[pinned=true]/projects:inset-y-0 group-data-[pinned=true]/projects:right-0 group-data-[pinned=true]/projects:mt-0 group-data-[pinned=true]/projects:w-[56%] group-data-[pinned=true]/projects:max-w-none group-data-[pinned=true]/projects:space-y-0 group-data-[pinned=true]/projects:pl-0 group-data-[pinned=true]/projects:pt-24",
  item: "group-data-[pinned=true]/projects:absolute group-data-[pinned=true]/projects:inset-0 group-data-[pinned=true]/projects:flex group-data-[pinned=true]/projects:items-center group-data-[pinned=true]/projects:pr-[6vw]",
  smallCard: "group-data-[pinned=true]/projects:hidden",
};

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const total = String(featuredProjects.length).padStart(2, "0");

  return (
    <ProjectsDeck
      id="projects"
      aria-labelledby="projects-title"
      cards={featuredProjects.map((project) => ({ suit: project.card.suit, rank: project.card.rank, title: project.title }))}
      className={`group/projects relative ${sectionSpacing} data-[pinned=true]:h-dvh data-[pinned=true]:overflow-hidden data-[pinned=true]:py-0`}
    >
      <div className={`relative z-10 mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-10 ${pinned.header}`}>
        <h2 id="projects-title" data-reveal className={sectionTitle}>
          {t("title")}
        </h2>
        <div className="flex max-w-md flex-col gap-4">
          <p data-reveal className="text-muted">
            {t("intro")}
          </p>
          <Link
            href="/projektai"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {t("openBoard")}
            <span aria-hidden>→</span>
          </Link>
          <div aria-hidden className={`hidden items-center gap-3 font-mono text-xs text-muted ${pinned.counter}`}>
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

      <ol className={`mx-auto mt-14 w-full max-w-[1400px] space-y-16 px-5 md:px-10 ${pinned.list}`}>
        {featuredProjects.map((project, index) => (
          <li
            key={project.slug}
            data-project=""
            className={`transition-[opacity,translate] duration-500 data-[active=false]:pointer-events-none data-[active=false]:translate-y-6 data-[active=false]:opacity-0 ${pinned.item}`}
          >
            <article className="grid items-start gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10">
              <span aria-hidden className={`card [--card-w:clamp(104px,26vw,150px)] ${pinned.smallCard}`}>
                <span className="card-inner">
                  <CardFront suit={project.card.suit} rank={project.card.rank} label={project.title} />
                </span>
              </span>

              <div>
                <div className="flex items-center gap-4">
                  <span className={eyebrow}>{String(index + 1).padStart(2, "0")}</span>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="mt-4 font-display-wide text-[clamp(1.9rem,3.6vw,3.4rem)] uppercase leading-[0.95]">{project.title}</h3>
                <p className="mt-4 text-lg">{localize(project.tagline, locale)}</p>
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
    </ProjectsDeck>
  );
}
