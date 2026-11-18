import { getTranslations } from "next-intl/server";

import { motionTools } from "@/content/skills";
import { container, eyebrow, sectionSpacing } from "@/lib/styles";
import { TagList } from "@/components/ui/Tag";

export async function StudioMotion() {
  const studio = await getTranslations("studio");
  const motion = await getTranslations("motion");

  return (
    <section className={`${container} ${sectionSpacing} grid gap-16 border-t border-line lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}>
      <div aria-labelledby="studio-title" role="group">
        <p className={eyebrow}>{studio("eyebrow")}</p>
        <h2 id="studio-title" className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {studio("title")}
        </h2>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{studio("body")}</p>
        <p className="mt-4 max-w-[60ch] leading-relaxed">{studio("role")}</p>
      </div>

      <div aria-labelledby="motion-title" role="group">
        <p className={eyebrow}>{motion("eyebrow")}</p>
        <h2 id="motion-title" className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {motion("title")}
        </h2>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{motion("body")}</p>
        <div className="mt-6">
          <TagList items={motionTools} />
        </div>
        <div className="mt-8 grid aspect-video place-items-center rounded-2xl border border-dashed border-line p-6 text-center font-mono text-sm text-muted">
          {motion("worksSoon")}
        </div>
      </div>
    </section>
  );
}
