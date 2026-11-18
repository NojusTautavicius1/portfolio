import { getLocale, getTranslations } from "next-intl/server";

import { redSuits, suitSymbol } from "@/content/areas";
import { sideProjects } from "@/content/projects";
import { skillDecks, type SkillDeck } from "@/content/skills";
import { localize, localizeTerms } from "@/lib/localize";
import { container, eyebrow, sectionSpacing, sectionTitle } from "@/lib/styles";
import { TagList } from "@/components/ui/Tag";

const glyph = (suit: SkillDeck["suit"]) => (suit === "joker" ? "✦" : suitSymbol[suit]);
const foil = (suit: SkillDeck["suit"]) => (suit !== "joker" && redSuits.includes(suit) ? "foil-red" : "foil");

const row = "grid gap-3 border-t border-line py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10";

export async function Skills() {
  const t = await getTranslations("skills");
  const locale = await getLocale();

  return (
    <section aria-labelledby="skills-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="skills-title" data-reveal className={sectionTitle}>
          {t("title")}
        </h2>
        <p
          data-reveal
          className="max-w-sm font-mono text-xs tracking-[0.12em] text-muted uppercase [@media(hover:none)]:hidden"
        >
          {t("deckHint")}
        </p>
      </div>

      {/* Five decks; each deals itself into a column on hover / focus (see .deck in globals.css). */}
      <div className="mt-14 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {skillDecks.map((deck) => {
          const items = localizeTerms(deck.items, locale);
          return (
            <div
              key={deck.name.en}
              data-reveal
              tabIndex={0}
              className="deck rounded-xl outline-offset-4"
              style={{ "--n": items.length + 1 } as React.CSSProperties}
            >
              <div
                className="deck-card card-stock flex h-[2.75rem] items-center gap-3 rounded-lg px-3"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <span aria-hidden className={`text-xl leading-none ${foil(deck.suit)}`}>
                  {glyph(deck.suit)}
                </span>
                <h3 className="flex-1 truncate font-display-wide text-[13px] uppercase">
                  {localize(deck.name, locale)}
                </h3>
                <span className="font-mono text-[11px] text-muted">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="contents">
                {items.map((item, index) => (
                  <li
                    key={item}
                    className="deck-card card-stock flex h-[2.75rem] items-center gap-3 rounded-lg px-3 font-mono text-[13px]"
                    style={{ "--i": index + 1 } as React.CSSProperties}
                  >
                    <span aria-hidden className={`text-sm ${foil(deck.suit)}`}>
                      {glyph(deck.suit)}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <h3 className={`${eyebrow} mt-24`}>{t("side")}</h3>
      <ul className="mt-4">
        {sideProjects.map((project) => (
          <li key={project.title.en} data-reveal className={row}>
            <p className="font-medium">{localize(project.title, locale)}</p>
            <div className="space-y-3">
              <p className="leading-relaxed text-muted">{localize(project.description, locale)}</p>
              <TagList items={localizeTerms(project.stack, locale)} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
