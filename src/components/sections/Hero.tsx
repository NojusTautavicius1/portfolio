import { getLocale, getTranslations } from "next-intl/server";

import { areas } from "@/content/areas";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { localize, localizeTerms } from "@/lib/localize";
import { buttonPrimary, buttonSecondary, container } from "@/lib/styles";
import { HeroDeck } from "@/components/deck/HeroDeck";
import { LocalClock } from "@/components/deck/LocalClock";

/** Each letter is its own element so thrown cards can knock single letters (see CardThrower). */
function Letters({ word }: { word: string }) {
  return (
    <>
      {Array.from(word).map((letter, index) => (
        <span key={index} data-egg="letter" className="inline-block">
          {letter}
        </span>
      ))}
    </>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const facts = t.raw("facts") as string[];
  const [first, last] = profile.name.toUpperCase().split(" ");

  const cards = areas.map((area) => ({
    suit: area.suit,
    rank: area.rank,
    name: localize(area.name, locale),
    line: localize(area.line, locale),
    stack: localizeTerms(area.stack, locale),
    best: localize(area.best, locale),
  }));

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-dvh flex-col overflow-x-clip pb-6 pt-20">
      {/* HUD row */}
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted`}>
        <p className="flex items-center gap-2 text-text" data-egg="status">
          <span aria-hidden className="status-dot size-2 rounded-full bg-accent" />
          {t("status")}
        </p>
        <p>
          {t("city")} <LocalClock />
        </p>
      </div>

      {/* Stage: the name with the four cards dealt around it */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-16 md:py-10">
        <HeroDeck cards={cards} flipHint={t("flipHint")} />

        <h1
          id="hero-title"
          className="pointer-events-none relative z-10 select-none text-center font-display-wide text-[clamp(2rem,9.1vw,9.25rem)] uppercase leading-[0.95] tracking-[-0.02em]"
        >
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="block">
            <Letters word={first} />
          </span>
          <span aria-hidden className="block">
            <Letters word={last} />
            <span className="text-accent">.</span>
          </span>
        </h1>

        <p className="relative z-10 mt-8 max-w-xl text-balance text-center text-lg leading-relaxed md:text-xl">
          {t("headline")}
        </p>
        <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-3">
          <Link href={{ pathname: "/", hash: "projects" }} className={buttonPrimary}>
            {t("ctaProjects")}
          </Link>
          <a href={localize(profile.cv, locale)} target="_blank" rel="noopener" className={buttonSecondary} data-egg="cv">
            {t("ctaCv")}
          </a>
        </div>
      </div>

      {/* Facts strip */}
      <ol className={`${container} grid gap-x-8 gap-y-2 border-t border-line pt-4 font-mono text-xs text-muted md:grid-cols-3`}>
        {facts.map((fact, index) => (
          <li key={fact} className="flex gap-3">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{fact}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
