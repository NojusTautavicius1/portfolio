import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { featuredProjects } from "@/content/projects";
import type { FeaturedProject } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { eyebrow } from "@/lib/styles";
import { CardFront } from "@/components/deck/PlayingCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/Tag";

type Props = { project: FeaturedProject; x: number; y: number; locale: string };

export async function ProjectTile({ project, x, y, locale }: Props) {
  const t = await getTranslations("projects");
  const number = String(featuredProjects.indexOf(project) + 1).padStart(2, "0");
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
          <CardPlaceholder project={project} label={t("mediaSoon")} />
        )}

        {mobile && (
          <Image
            src={mobile.src}
            alt=""
            width={150}
            height={300}
            sizes="150px"
            draggable={false}
            className="absolute -right-8 -bottom-10 h-[300px] w-[150px] rounded-[1.4rem] border-4 border-[#1c1c1c] object-cover object-top shadow-2xl"
          />
        )}
      </figure>

      <div className="w-[330px]">
        <div className="flex items-center gap-3">
          <span className={eyebrow}>{number}</span>
          <StatusBadge status={project.status} />
        </div>
        <h2 className="mt-3 font-display-wide text-[34px] leading-[0.95] uppercase">{project.title}</h2>
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

// No screenshot yet: show the project's own card instead.
export function CardPlaceholder({ project, label }: { project: FeaturedProject; label: string }) {
  return (
    <div className="grid h-full w-full place-items-center rounded-xl border border-line bg-surface">
      <span aria-hidden className="card -rotate-5 [--card-w:190px]">
        <span className="card-inner">
          <CardFront suit={project.card.suit} rank={project.card.rank} label={project.title} />
        </span>
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}
