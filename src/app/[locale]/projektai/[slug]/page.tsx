import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { featuredProjects, getFeaturedProject } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localize } from "@/lib/localize";
import { container, eyebrow } from "@/lib/styles";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => featuredProjects.map((project) => ({ locale, slug: project.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: localize(project.tagline, locale),
    alternates: {
      canonical: `/${locale}/projektai/${slug}`,
      languages: { lt: `/lt/projektai/${slug}`, en: `/en/projektai/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const index = featuredProjects.indexOf(project);
  const nextProject = featuredProjects[(index + 1) % featuredProjects.length];

  const blocks = [
    { label: t("problem"), text: localize(project.problem, locale) },
    { label: t("solution"), text: localize(project.solution, locale) },
    project.result ? { label: t("result"), text: localize(project.result, locale) } : null,
    project.role ? { label: t("role"), text: localize(project.role, locale) } : null,
  ].filter((block): block is { label: string; text: string } => block !== null);

  return (
    <article className={`${container} pb-24 pt-28`}>
      <Link
        href={{ pathname: "/", hash: "projects" }}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-text"
      >
        <span aria-hidden>←</span>
        {t("back")}
      </Link>

      <header className="mt-10 max-w-4xl">
        <div className="flex items-center gap-4">
          <span className={eyebrow}>{String(index + 1).padStart(2, "0")}</span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[50ch] text-xl text-muted">{localize(project.tagline, locale)}</p>
      </header>

      <div className="mt-12 grid aspect-[16/9] place-items-center rounded-2xl border border-line bg-surface">
        <span className="font-mono text-xs text-muted">{t("mediaSoon")}</span>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
        <div>
          {blocks.map((block) => (
            <section key={block.label} className="grid gap-3 border-t border-line py-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10">
              <h2 className={eyebrow}>{block.label}</h2>
              <p className="max-w-[65ch] text-lg leading-relaxed">{block.text}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-10 lg:pt-8">
          <div>
            <h2 className={eyebrow}>{t("stack")}</h2>
            <div className="mt-4">
              <TagList items={project.stack} />
            </div>
          </div>
          {project.links.length > 0 && (
            <div>
              <h2 className={eyebrow}>{t("links")}</h2>
              <ul className="mt-4 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {t(`linkKinds.${link.kind}`)}
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <nav aria-label={t("next")} className="mt-20 border-t border-line pt-10">
        <p className={eyebrow}>{t("next")}</p>
        <Link
          href={`/projektai/${nextProject.slug}`}
          className="mt-3 inline-flex items-center gap-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {nextProject.title}
          <span aria-hidden>→</span>
        </Link>
      </nav>
    </article>
  );
}
