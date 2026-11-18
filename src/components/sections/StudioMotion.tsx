import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { motionClient, motionWorks } from "@/content/motion";
import { motionTools } from "@/content/skills";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/localize";
import { container, eyebrow, sectionSpacing } from "@/lib/styles";
import { TagList } from "@/components/ui/Tag";

import { MotionClip } from "./MotionClip";

const heading = "mt-4 text-3xl font-semibold tracking-tight md:text-4xl";

export async function StudioMotion() {
  const studio = await getTranslations("studio");
  const motion = await getTranslations("motion");
  const locale = await getLocale();

  return (
    <section className={`${container} ${sectionSpacing} border-t border-line`}>
      <div className="grid gap-16 lg:grid-cols-2">
        <div aria-labelledby="studio-title" role="group" data-reveal>
          <p className={eyebrow}>{studio("eyebrow")}</p>
          <h2 id="studio-title" className={heading}>
            {studio("title")}
          </h2>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{studio("body")}</p>
          <p className="mt-4 max-w-[60ch] leading-relaxed">{studio("role")}</p>
          <Link
            href={{ pathname: "/projektai/[slug]", params: { slug: "graspit" } }}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
          >
            {studio("project")}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div aria-labelledby="motion-title" role="group" data-reveal>
          <p className={eyebrow}>{motion("eyebrow")}</p>
          <h2 id="motion-title" className={heading}>
            {motion("title")}
          </h2>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{motion("body")}</p>
          <div className="mt-6">
            <TagList items={motionTools} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className={eyebrow}>{motion("campaign", { client: motionClient })}</p>
        <ul className="mt-6 grid grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {motionWorks.map((work) => {
            const title = localize(work.title, locale);
            return (
              <li key={work.image} data-reveal>
                {work.video ? (
                  <MotionClip src={work.video} poster={work.image} label={title} />
                ) : (
                  <Image
                    src={work.image}
                    alt={title}
                    width={720}
                    height={900}
                    sizes="(min-width: 1024px) 220px, 45vw"
                    className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
                  />
                )}
                <p className="mt-3 text-sm leading-snug font-medium">{title}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                  {work.tool}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
