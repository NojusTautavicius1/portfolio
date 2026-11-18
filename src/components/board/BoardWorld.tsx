import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { boardItems, type BoardItem } from "@/content/board";
import { profile } from "@/content/profile";
import { featuredProjects, getFeaturedProject } from "@/content/projects";
import type { FeaturedProject } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { eyebrow } from "@/lib/styles";
import { CardFront } from "@/components/deck/PlayingCard";
import { Scribble } from "@/components/ui/Scribble";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

/** "Code that does the work *for people*." → the starred words get a hand-drawn circle. */
function QuoteText({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") ? (
          <Scribble key={index} kind="circle" trigger="load" delay={delay}>
            {part.slice(1, -1)}
          </Scribble>
        ) : (
          part
        ),
      )}
    </>
  );
}

async function ProjectTile({ project, x, y, locale }: { project: FeaturedProject; x: number; y: number; locale: string }) {
  const t = await getTranslations("projects");
  const index = featuredProjects.indexOf(project);
  const desktop = project.media?.find((media) => media.kind === "desktop");
  const mobile = project.media?.find((media) => media.kind === "mobile");

  return (
    <article className="absolute flex items-center gap-10" style={{ left: x, top: y }}>
      <figure className="relative h-[350px] w-[560px] shrink-0">
        {desktop ? (
          <Image
            src={desktop.src}
            alt={`${project.title} — ${t("screenshot")}`}
            width={560}
            height={350}
            sizes="560px"
            draggable={false}
            className="h-full w-full rounded-xl border border-line object-cover object-top shadow-2xl"
          />
        ) : (
          // No screenshot yet: the project's own card on a felt panel.
          <div className="grid h-full w-full place-items-center rounded-xl border border-line bg-surface">
            <span aria-hidden className="card [--card-w:190px]" style={{ transform: "rotate(-5deg)" }}>
              <span className="card-inner">
                <CardFront suit={project.card.suit} rank={project.card.rank} label={project.title} />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{t("mediaSoon")}</span>
          </div>
        )}
        {mobile && (
          <Image
            src={mobile.src}
            alt=""
            width={150}
            height={300}
            sizes="150px"
            draggable={false}
            className="absolute -bottom-10 -right-8 h-[300px] w-[150px] rounded-[1.4rem] border-4 border-[#1c1c1c] object-cover object-top shadow-2xl"
          />
        )}
      </figure>

      <div className="w-[330px]">
        <div className="flex items-center gap-3">
          <span className={eyebrow}>{String(index + 1).padStart(2, "0")}</span>
          <StatusBadge status={project.status} />
        </div>
        <h2 className="mt-3 font-display-wide text-[34px] uppercase leading-[0.95]">{project.title}</h2>
        <p className="mt-3 text-[15px] leading-snug">{localize(project.tagline, locale)}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{localize(project.problem, locale)}</p>
        <div className="mt-4">
          <TagList items={localizeTerms(project.stack, locale).slice(0, 5)} />
        </div>
        <Link
          href={{ pathname: "/projektai/[slug]", params: { slug: project.slug } }}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("more")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

/** One copy of the board world: every item absolutely placed (see content/board.ts). */
export async function BoardWorld() {
  const locale = await getLocale();
  const hero = await getTranslations("hero");

  const render = (item: BoardItem, index: number) => {
    switch (item.type) {
      case "project": {
        const project = getFeaturedProject(item.slug);
        return project ? <ProjectTile key={index} project={project} x={item.x} y={item.y} locale={locale} /> : null;
      }
      case "quote":
        return (
          <p
            key={index}
            className="absolute font-display-wide text-[56px] uppercase leading-[0.98] tracking-[-0.02em]"
            style={{ left: item.x, top: item.y, width: item.width }}
          >
            <QuoteText text={localize(item.text, locale)} delay={0.6 + (index % 4) * 0.25} />
          </p>
        );
      case "card":
        return (
          <span
            key={index}
            aria-hidden
            className="card absolute [--card-w:200px]"
            style={{ left: item.x, top: item.y, transform: `rotate(${item.rotate}deg)` }}
          >
            <span className="card-inner">
              <CardFront suit={item.suit} rank={item.rank} />
            </span>
          </span>
        );
      case "status":
        return (
          <div key={index} className="absolute w-[300px] rounded-2xl border border-line bg-surface p-6" style={{ left: item.x, top: item.y }}>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span aria-hidden className="status-dot size-2 rounded-full bg-accent" />
              {hero("status")}
            </p>
            <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-lg font-medium text-accent underline-offset-4 hover:underline">
              {profile.email}
            </a>
            <a
              href={localize(profile.cv, locale)}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-accent-fill px-4 text-sm font-medium text-on-accent"
            >
              {hero("ctaCv")}
            </a>
          </div>
        );
    }
  };

  return <>{boardItems.map(render)}</>;
}
