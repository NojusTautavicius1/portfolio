import { getLocale, getTranslations } from "next-intl/server";

import { redSuits, suitSymbol, type Suit } from "@/content/areas";
import { education, experience } from "@/content/experience";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";

type Entry = { suit: Suit; period: string; title: string; organization: string; context: string; points: string[] };

const entrySuits: Suit[] = ["spades", "hearts", "diamonds", "clubs"];

/** A suit marker sitting on the rail. */
function Marker({ suit }: { suit: Suit }) {
  return (
    <span
      aria-hidden
      className={`relative z-10 grid size-9 place-items-center rounded-full border border-accent-fill bg-bg text-base shadow-[0_0_0_6px_var(--bg)] ${
        redSuits.includes(suit) ? "foil-red" : "foil"
      }`}
    >
      {suitSymbol[suit]}
    </span>
  );
}

export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  const entries: Entry[] = [
    ...experience.map((item, index) => ({
      suit: entrySuits[index % entrySuits.length],
      period: localize(item.period, locale),
      title: localize(item.role, locale),
      organization: item.organization,
      context: localize(item.context, locale),
      points: localize(item.points, locale),
    })),
    {
      suit: "diamonds",
      period: localize(education.period, locale),
      title: localize(education.title, locale),
      organization: "KTMC",
      context: `${t("education")} · ${localize(education.school, locale)}`,
      points: [],
    },
  ];

  return (
    <section id="experience" aria-labelledby="experience-title" className={`${container} ${sectionSpacing}`}>
      <h2 id="experience-title" data-reveal className={sectionTitle}>
        {t("title")}
      </h2>

      {/* Rail: grey track + red fill that grows with scroll (see .timeline in globals.css). */}
      <ol className="timeline relative mt-14 md:mt-20">
        {/* Centred on the marker column: 36px / 2 on mobile; 200px + 24px gap + 18px on desktop. */}
        <span aria-hidden className="absolute bottom-0 left-[17.5px] top-0 w-px bg-line md:left-[241.5px]" />
        <span aria-hidden className="timeline-fill absolute bottom-0 left-[16.5px] top-0 w-[3px] rounded-full bg-accent-fill md:left-[240.5px]" />

        {entries.map((entry) => (
          <li
            key={`${entry.organization}-${entry.period}`}
            data-reveal
            className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-x-5 pb-14 last:pb-0 md:grid-cols-[200px_36px_minmax(0,1fr)] md:gap-x-6"
          >
            <p className="hidden pt-2 text-right font-mono text-sm text-muted md:block">{entry.period}</p>
            <Marker suit={entry.suit} />

            <article className="card-stock relative rounded-2xl p-6 md:p-8">
              <span className="card-frame" />
              <p className="font-mono text-xs text-muted md:hidden">{entry.period}</p>
              <p className={`${eyebrow} mt-1 md:mt-0`}>{entry.organization}</p>
              <h3 className="mt-2 font-display-wide text-[clamp(1.4rem,2.6vw,2.1rem)] uppercase leading-[1]">{entry.title}</h3>
              <p className="mt-2 text-sm text-muted">{entry.context}</p>
              {entry.points.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
