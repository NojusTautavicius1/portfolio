import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { buttonPrimary, buttonSecondary, container } from "@/lib/styles";
import { CardFront } from "@/components/deck/PlayingCard";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section
      className={`${container} grid min-h-[80dvh] items-center gap-12 pt-28 pb-20 md:grid-cols-[minmax(0,1fr)_auto]`}
    >
      <div>
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{t("code")}</p>
        <h1 className="mt-5 font-display-wide text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] uppercase">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg text-muted">{t("body")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonPrimary}>
            {t("home")}
          </Link>
          <Link href="/projektai" className={buttonSecondary}>
            {t("projects")}
          </Link>
        </div>
      </div>

      <span aria-hidden className="card mx-auto rotate-6 [--card-w:min(240px,60vw)]">
        <span className="card-inner">
          <CardFront suit="spades" rank="?" label="404" />
        </span>
      </span>
    </section>
  );
}
