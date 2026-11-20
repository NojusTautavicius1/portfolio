import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { redSuits, suitSymbol } from "@/content/areas";
import { featuredProjects } from "@/content/projects";
import type { FeaturedProject } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { firstSentence } from "@/lib/text";
import { CardPlaceholder } from "@/components/board/ProjectTile";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

// All projects at once, two per row: screenshot, what it is and the result, readable in a few seconds.
export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  return (
    <section id="projects" aria-labelledby="projects-title" className={`${container} ${sectionSpacing}`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
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
        </div>
      </div>

      <ol className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} index={index} locale={locale} />
          </li>
        ))}
      </ol>
    </section>
  );
}

async function ProjectCard({
  project,
  index,
  locale,
}: {
  project: FeaturedProject;
  index: number;
  locale: string;
}) {
  const t = await getTranslations("projects");
  const desktop = project.media?.find((item) => item.kind === "desktop");
  const live = project.links.find((link) => link.kind === "live");
  const host = live ? new URL(live.href).host : null;
  const outbound = project.links.filter((link) => link.kind !== "video");

  return (
    // The title link is stretched over the whole card; the outbound links sit above it.
    <article className="group relative flex h-full flex-col">
      <div className="aspect-16/10 transition-transform duration-500 group-hover:-translate-y-1">
        {desktop ? (
          <BrowserFrame host={host}>
            <Image
              src={desktop.src}
              alt={`${project.title} — ${t("screenshot")}`}
              width={1440}
              height={900}
              sizes="(min-width: 1400px) 660px, (min-width: 768px) 46vw, 100vw"
              className="block h-full w-full object-cover object-top"
            />
          </BrowserFrame>
        ) : (
          <CardPlaceholder project={project} label={t("mediaSoon")} />
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className={eyebrow}>{String(index + 1).padStart(2, "0")}</span>
        <span
          aria-hidden
          className={`font-mono text-xs ${redSuits.includes(project.card.suit) ? "text-accent" : "text-muted"}`}
        >
          {project.card.rank}
          {suitSymbol[project.card.suit]}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-4 font-display-wide text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[0.95] uppercase">
        <Link
          href={{ pathname: "/projektai/[slug]", params: { slug: project.slug } }}
          aria-label={t("moreAbout", { title: project.title })}
          className="group-hover:text-accent after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-lg">{localize(project.tagline, locale)}</p>
      {project.result && (
        <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">
          <span className="text-text">{t("result")}: </span>
          {firstSentence(localize(project.result, locale), { colon: false })}
        </p>
      )}

      <div className="mt-5">
        <TagList items={localizeTerms(project.stack, locale).slice(0, 4)} label={t("stack")} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-sm font-medium">
        <span aria-hidden className="inline-flex min-h-11 items-center gap-2 text-accent">
          {t("more")} <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
        {outbound.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener"
            className="relative z-10 inline-flex min-h-11 items-center gap-1 text-muted underline-offset-4 hover:text-text hover:underline"
          >
            {t(`linkKinds.${link.kind}`)} <span aria-hidden>↗</span>
          </a>
        ))}
      </div>
    </article>
  );
}
