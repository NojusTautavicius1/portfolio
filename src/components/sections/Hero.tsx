import { getLocale, getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/localize";
import { buttonPrimary, buttonSecondary, container } from "@/lib/styles";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const facts = t.raw("facts") as string[];

  return (
    <section
      aria-labelledby="hero-title"
      className={`${container} grid min-h-[100dvh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}
    >
      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-2 text-text">
            <span aria-hidden className="status-dot size-2 rounded-full bg-accent" />
            {t("status")}
          </span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>{t("statusDetail")}</span>
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
        >
          <span className="block text-muted">{profile.name}.</span>
          {t("headline")}
        </h1>

        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{t("subtitle")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={{ pathname: "/", hash: "projects" }} className={buttonPrimary}>
            {t("ctaProjects")}
          </Link>
          <a href={localize(profile.cv, locale)} target="_blank" rel="noopener" className={buttonSecondary}>
            {t("ctaCv")}
          </a>
        </div>

        <ol className="mt-12 max-w-xl divide-y divide-line border-y border-line">
          {facts.map((fact, index) => (
            <li key={fact} className="flex gap-4 py-3 text-sm">
              <span className="font-mono text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span>{fact}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Stage for the 3D probe (step 4). Until then: a static stand-in with the same footprint. */}
      <div id="probe-stage" aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block">
        <div className="absolute inset-[8%] rounded-full border border-line" />
        <div className="absolute inset-[24%] rounded-full border border-line" />
        <div className="absolute inset-[40%] rounded-full border border-line bg-surface" />
        <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </section>
  );
}
