import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { buttonSecondary, container, eyebrow, sectionSpacing } from "@/lib/styles";

export async function Contact() {
  const t = await getTranslations("contact");

  const links = [
    profile.linkedin ? { label: "LinkedIn", href: profile.linkedin } : null,
    { label: "GitHub", href: profile.github },
    { label: t("cvLt"), href: profile.cv.lt },
    { label: t("cvEn"), href: profile.cv.en },
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <section id="contact" aria-labelledby="contact-title" className={`${container} ${sectionSpacing} border-t border-line`}>
      <h2
        id="contact-title"
        className="max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
      >
        {t("title")}
      </h2>
      <p className="mt-6 max-w-[55ch] text-lg text-muted">{t("body")}</p>

      <p className={`${eyebrow} mt-12`}>{t("emailLabel")}</p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-2 inline-block break-all text-[clamp(1.25rem,3.2vw,2.25rem)] font-medium text-accent underline-offset-8 hover:underline"
      >
        {profile.email}
      </a>

      <ul className="mt-10 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener" className={buttonSecondary}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
