import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { buttonSecondary, container, eyebrow, sectionSpacing } from "@/lib/styles";
import { CardFront, CardPatternBack } from "@/components/deck/PlayingCard";

export async function Contact() {
  const t = await getTranslations("contact");

  const links = [
    profile.linkedin ? { label: "LinkedIn", href: profile.linkedin } : null,
    { label: "GitHub", href: profile.github },
    { label: t("cvLt"), href: profile.cv.lt },
    { label: t("cvEn"), href: profile.cv.en },
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`${container} ${sectionSpacing} grid items-center gap-12 border-t border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]`}
    >
      <div>
        <h2
          id="contact-title"
          data-reveal
          className="max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
        >
          {t("title")}
        </h2>
        <p data-reveal className="mt-6 max-w-[55ch] text-lg text-muted">
          {t("body")}
        </p>

        <div data-reveal>
          <p className={`${eyebrow} mt-12`}>{t("emailLabel")}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 inline-block break-all text-[clamp(1.25rem,3.2vw,2.25rem)] font-medium text-accent underline-offset-8 hover:underline"
          >
            {profile.email}
          </a>
        </div>

        <ul data-reveal className="mt-10 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener" className={buttonSecondary}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing hand: a fanned trio of cards. */}
      <div aria-hidden className="relative mx-auto grid h-[min(24rem,78vw)] w-full max-w-md place-items-center">
        {[
          { rotate: "-14deg", x: "-38%", face: <CardFront suit="spades" rank="A" /> },
          { rotate: "12deg", x: "38%", face: <CardFront suit="diamonds" rank="K" /> },
          { rotate: "-1deg", x: "0%", face: <CardPatternBack className="" /> },
        ].map((card, index) => (
          <span
            key={index}
            className="card absolute [--card-w:clamp(120px,24vw,210px)]"
            style={{ transform: `translateX(${card.x}) rotate(${card.rotate})` }}
          >
            <span className="card-inner">{card.face}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
