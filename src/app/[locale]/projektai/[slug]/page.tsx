import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { featuredProjects, getFeaturedProject } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localize, localizeTerms } from "@/lib/localize";
import { pageMetadata } from "@/lib/metadata";
import { container, eyebrow } from "@/lib/styles";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";
import { CardPlaceholder } from "@/components/board/ProjectTile";

// Screenshot inside a plain browser window, with the site's address when it has one.
function BrowserFrame({ host, children }: { host: string | null; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line px-4">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        {host && <span className="ml-3 truncate font-mono text-[11px] text-muted">{host}</span>}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featuredProjects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return {};

  const description = clip(`${localize(project.tagline, locale)}. ${localize(project.problem, locale)}`, 160);
  return {
    title: project.title,
    ...pageMetadata(
      locale,
      { pathname: "/projektai/[slug]", params: { slug } },
      {
        title: `${project.title} — Nojus Tautavičius`,
        description,
        // Internal route path: the image route isn't covered by the localized pathnames.
        image: `/${locale}/projektai/${slug}/opengraph-image`,
      },
    ),
  };
}

// Search snippets stop around 160 characters; cut at a word instead of mid-word.
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…";
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const index = featuredProjects.indexOf(project);
  const nextProject = featuredProjects[(index + 1) % featuredProjects.length];

  const media = project.media ?? [];
  const desktop = media.find((item) => item.kind === "desktop");
  const mobile = media.find((item) => item.kind === "mobile");
  const pages = media.filter((item) => item.kind === "page");
  const live = project.links.find((link) => link.kind === "live");
  const host = live ? new URL(live.href).host : null;

  const blocks = [
    { label: t("problem"), text: localize(project.problem, locale) },
    { label: t("solution"), text: localize(project.solution, locale) },
    project.result ? { label: t("result"), text: localize(project.result, locale) } : null,
    project.role ? { label: t("role"), text: localize(project.role, locale) } : null,
    project.learned ? { label: t("learned"), text: localize(project.learned, locale) } : null,
  ].filter((block): block is { label: string; text: string } => block !== null);

  return (
    <article className={`${container} pt-28 pb-24`}>
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
        <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[50ch] text-xl text-muted">{localize(project.tagline, locale)}</p>
      </header>

      <figure className="relative mt-12 aspect-16/10 md:mr-10 md:mb-10">
        {desktop ? (
          <BrowserFrame host={host}>
            <Image
              src={desktop.src}
              alt={`${project.title} — ${t("screenshot")}`}
              width={1440}
              height={900}
              sizes="(min-width: 1280px) 1180px, 100vw"
              priority
              className="block h-full w-full object-cover object-top"
            />
          </BrowserFrame>
        ) : (
          <CardPlaceholder project={project} label={t("mediaSoon")} />
        )}
        {mobile && (
          <Image
            src={mobile.src}
            alt=""
            width={390}
            height={780}
            sizes="220px"
            className="absolute -right-10 -bottom-10 hidden aspect-1/2 w-[min(22%,220px)] rounded-[1.6rem] border-[5px] border-[#1c1c1c] object-cover object-top shadow-2xl md:block"
          />
        )}
      </figure>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
        <div>
          {blocks.map((block) => (
            <section
              key={block.label}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10"
            >
              <h2 className={eyebrow}>{block.label}</h2>
              <p className="max-w-[65ch] text-lg leading-relaxed">{block.text}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-10 lg:pt-8">
          <div>
            <h2 className={eyebrow}>{t("stack")}</h2>
            <div className="mt-4">
              <TagList items={localizeTerms(project.stack, locale)} />
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

      {pages.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className={eyebrow}>{t("pages")}</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {pages.map((page) => {
              const caption = page.caption ? localize(page.caption, locale) : "";
              return (
                <figure key={page.src}>
                  <BrowserFrame host={host}>
                    <Image
                      src={page.src}
                      alt={`${project.title}: ${caption}`}
                      width={1440}
                      height={900}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="block aspect-16/10 w-full object-cover object-top"
                    />
                  </BrowserFrame>
                  {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      <nav aria-label={t("next")} className="mt-20 border-t border-line pt-10">
        <p className={eyebrow}>{t("next")}</p>
        <Link
          href={{ pathname: "/projektai/[slug]", params: { slug: nextProject.slug } }}
          className="mt-3 inline-flex items-center gap-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {nextProject.title}
          <span aria-hidden>→</span>
        </Link>
      </nav>
    </article>
  );
}
