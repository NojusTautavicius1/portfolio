import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { skillDecks } from "@/content/skills";
import { localize, localizeTerms } from "@/lib/localize";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

// GraspIT is already listed under experience; idea-radar would push the CV onto a second page.
// The full stacks are on the website.
const CV_STACK_LIMIT = 5;
const cvSkipped = ["graspit", "idea-radar"];
const cvProjects = featuredProjects.filter((project) => !cvSkipped.includes(project.slug));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });
  // The PDF is the shareable artefact; this page only exists to print it.
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: true },
    ...pageMetadata(locale, "/cv", {
      title: `${t("metaTitle")} — Nojus Tautavičius`,
      description: meta("description"),
    }),
  };
}

const heading = "font-mono text-[7.5pt] uppercase tracking-[0.16em] text-accent";

function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

// `npm run cv` prints this page to public/cv/*.pdf. The phone number is only filled in while printing.
export default async function CvPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cv");
  const hero = await getTranslations("hero");

  const contacts = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: profile.website, href: `https://${profile.website}` },
    { label: profile.github.replace("https://", ""), href: profile.github },
    profile.linkedin
      ? { label: profile.linkedin.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedin }
      : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <div className="bg-bg pt-24 pb-16 print:p-0">
      <article
        data-theme="paper"
        className="mx-auto min-h-[297mm] w-[210mm] max-w-full bg-surface px-[14mm] py-[8mm] text-[9.25pt] leading-[1.4] text-text shadow-2xl print:shadow-none"
      >
        <header className="flex items-end justify-between gap-8 border-b border-line pb-4">
          <div>
            <h1 className="text-[24pt] leading-none font-semibold tracking-[-0.03em]">{profile.name}</h1>
            <p className="mt-2 text-[11pt] text-muted">{t("role")}</p>
          </div>
          <ul className="space-y-0.5 text-right font-mono text-[8pt]">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href}>{contact.label}</a>
              </li>
            ))}
            <li data-cv-phone hidden />
            <li className="text-muted">{localize(profile.location, locale)}</li>
          </ul>
        </header>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_52mm] gap-[9mm]">
          <div className="space-y-4">
            <section>
              <h2 className={heading}>{t("summary")}</h2>
              <p className="mt-2">{hero("subtitle")}</p>
            </section>

            <section>
              <h2 className={heading}>{t("experience")}</h2>
              <ol className="mt-2 space-y-3">
                {experience.map((item) => (
                  <li key={item.organization} className="break-inside-avoid">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-semibold">
                        {localize(item.role, locale)} · {item.organization}
                      </h3>
                      <span className="shrink-0 font-mono text-[8pt] text-muted">
                        {localize(item.period, locale)}
                      </span>
                    </div>
                    <p className="text-[8.5pt] text-muted">{localize(item.context, locale)}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-accent">
                      {localize(item.points, locale).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className={heading}>{t("projects")}</h2>
              <ol className="mt-2 space-y-2">
                {cvProjects.map((project) => (
                  <li key={project.slug} className="break-inside-avoid">
                    <h3 className="font-semibold">
                      {project.title}{" "}
                      <span className="font-normal text-muted">— {localize(project.tagline, locale)}</span>
                    </h3>
                    <p className="text-[8pt]">{firstSentence(localize(project.solution, locale))}</p>
                    <p className="mt-0.5 font-mono text-[7.5pt] text-muted">
                      {localizeTerms(project.stack, locale).slice(0, CV_STACK_LIMIT).join(" · ")}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-6">
            <section>
              <h2 className={heading}>{t("skills")}</h2>
              <dl className="mt-2 space-y-2.5">
                {skillDecks.map((group) => (
                  <div key={group.name.en} className="break-inside-avoid">
                    <dt className="font-semibold">{localize(group.name, locale)}</dt>
                    <dd className="text-[8.5pt] text-muted">
                      {localizeTerms(group.items, locale).join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className={heading}>{t("education")}</h2>
              <p className="mt-2 font-semibold">{localize(education.title, locale)}</p>
              <p className="text-[8.5pt]">{localize(education.school, locale)}</p>
              <p className="font-mono text-[8pt] text-muted">{localize(education.period, locale)}</p>
            </section>

            <section>
              <h2 className={heading}>{t("languages")}</h2>
              <ul className="mt-2 space-y-0.5">
                {profile.languages.map((language) => (
                  <li key={language.en}>{localize(language, locale)}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <footer className="mt-5 border-t border-line pt-2.5 font-mono text-[8pt] text-muted">
          {t("portfolio", { url: profile.website })}
        </footer>
      </article>
    </div>
  );
}
