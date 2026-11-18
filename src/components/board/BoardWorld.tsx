import { getLocale, getTranslations } from "next-intl/server";

import { boardItems, type BoardItem } from "@/content/board";
import { profile } from "@/content/profile";
import { getFeaturedProject } from "@/content/projects";
import { localize } from "@/lib/localize";
import { CardFront } from "@/components/deck/PlayingCard";
import { Scribble } from "@/components/ui/Scribble";

import { ProjectTile } from "./ProjectTile";

// "Code that does the work *for people*." -> the starred part gets a hand-drawn circle.
function QuoteText({ text, delay }: { text: string; delay: number }) {
  return text.split(/(\*[^*]+\*)/).map((part, index) =>
    part.startsWith("*") ? (
      <Scribble key={index} kind="circle" trigger="load" delay={delay}>
        {part.slice(1, -1)}
      </Scribble>
    ) : (
      part
    ),
  );
}

async function StatusTile({ x, y, locale }: { x: number; y: number; locale: string }) {
  const hero = await getTranslations("hero");

  return (
    <div
      className="absolute w-[300px] rounded-2xl border border-line bg-surface p-6"
      style={{ left: x, top: y }}
    >
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase">
        <span aria-hidden className="status-dot size-2 rounded-full bg-accent" />
        {hero("status")}
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-4 block text-lg font-medium break-all text-accent underline-offset-4 hover:underline"
      >
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

function renderItem(item: BoardItem, index: number, locale: string) {
  switch (item.type) {
    case "project": {
      const project = getFeaturedProject(item.slug);
      if (!project) return null;
      return <ProjectTile key={index} project={project} x={item.x} y={item.y} locale={locale} />;
    }

    case "quote":
      return (
        <p
          key={index}
          className="absolute font-display-wide text-[56px] leading-[0.98] tracking-[-0.02em] uppercase"
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
      return <StatusTile key={index} x={item.x} y={item.y} locale={locale} />;
  }
}

// One copy of the board world; ProjectBoard repeats it.
export async function BoardWorld() {
  const locale = await getLocale();
  return boardItems.map((item, index) => renderItem(item, index, locale));
}
