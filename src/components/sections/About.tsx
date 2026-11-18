import { getLocale, getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { localize } from "@/lib/localize";
import { container, sectionSpacing, sectionTitle } from "@/lib/styles";
import { PlayerCard } from "@/components/deck/PlayerCard";

/** Splits a paragraph into word spans (.w) that brighten on scroll (see .reveal-words in globals.css). */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        /\s/.test(part) ? (
          part
        ) : (
          <span key={index} className="w">
            {part}
          </span>
        ),
      )}
    </>
  );
}

export async function About() {
  const t = await getTranslations("about");
  const hero = await getTranslations("hero");
  const locale = await getLocale();

  const rows = [
    { label: t("player.studies"), value: t("player.studiesValue") },
    { label: t("player.languages"), value: t("player.languagesValue") },
    { label: t("player.base"), value: t("player.baseValue") },
    { label: t("player.focus"), value: t("player.focusValue") },
  ];

  return (
    <section aria-labelledby="about-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-24">
        <div>
          <h2 id="about-title" data-reveal className={sectionTitle}>
            {t("title")}
          </h2>
          <div className="reveal-words mt-10 max-w-[34ch] space-y-6 text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1.3] tracking-[-0.01em]">
            {localize(profile.about, locale).map((paragraph) => (
              <p key={paragraph}>
                <Words text={paragraph} />
              </p>
            ))}
          </div>
        </div>

        <PlayerCard
          name={profile.name}
          initials={profile.initials}
          photo={profile.photo}
          photoAlt={t("photoAlt")}
          rows={rows}
          status={hero("status")}
        />
      </div>
    </section>
  );
}
