import { getLocale, getTranslations } from "next-intl/server";

import { redSuits, suitSymbol } from "@/content/areas";
import { principles } from "@/content/principles";
import { localize } from "@/lib/localize";
import { container, sectionSpacing, sectionTitle } from "@/lib/styles";

export async function HowIWork() {
  const t = await getTranslations("howIWork");
  const locale = await getLocale();

  return (
    <section aria-labelledby="how-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <h2 id="how-title" data-reveal className={sectionTitle}>
        {t("title")}
      </h2>

      <ol className="mt-14 grid gap-5 md:grid-cols-2">
        {principles.map((item, index) => (
          <li key={item.suit} data-reveal className="card-stock relative rounded-2xl p-6 md:p-8">
            <span className="card-frame" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span
                aria-hidden
                className={`text-2xl leading-none ${redSuits.includes(item.suit) ? "foil-red" : "foil"}`}
              >
                {suitSymbol[item.suit]}
              </span>
            </div>
            <h3 className="mt-6 font-display-wide text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.05] uppercase">
              {localize(item.title, locale)}
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{localize(item.body, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
