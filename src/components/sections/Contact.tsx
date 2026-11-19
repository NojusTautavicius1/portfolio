import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { buttonSecondary, container, eyebrow, sectionSpacing } from "@/lib/styles";
import { CardFront } from "@/components/deck/PlayingCard";
import { Scribble } from "@/components/ui/Scribble";

type Tile = { key: string; node: React.ReactNode };

function tiles(): Tile[] {
  return featuredProjects.flatMap((project) => {
    const media = project.media ?? [];
    if (media.length === 0) {
      return [
        {
          key: project.slug,
          node: (
            <span className="card block [--card-w:118px]">
              <span className="card-inner">
                <CardFront suit={project.card.suit} rank={project.card.rank} label={project.title} />
              </span>
            </span>
          ),
        },
      ];
    }
    return media.map((item) => ({
      key: item.src,
      node: (
        <Image
          src={item.src}
          alt=""
          width={item.kind === "mobile" ? 83 : 272}
          height={165}
          sizes={item.kind === "mobile" ? "83px" : "272px"}
          className="h-[165px] w-auto rounded-lg border border-line object-cover object-top"
        />
      ),
    }));
  });
}

// The tiles are rendered twice, so moving by -50% loops seamlessly.
function Strip({ items, tilt, reverse }: { items: Tile[]; tilt: string; reverse?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none [perspective:1100px]">
      <div style={{ transform: tilt }}>
        <div className={`marquee flex w-max items-center gap-6 ${reverse ? "marquee-reverse" : ""}`}>
          {[...items, ...items].map((tile, index) => (
            <div key={`${tile.key}-${index}`} className="shrink-0 [transform:skewY(-4deg)]">
              {tile.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function Contact() {
  const t = await getTranslations("contact");
  const items = tiles();

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
      className={`relative overflow-hidden border-t border-line ${sectionSpacing}`}
    >
      <Strip items={items} tilt="rotateX(14deg) rotateY(-16deg) rotateZ(-3deg)" />

      <div className={`${container} relative z-10 py-16 text-center md:py-24`}>
        <h2
          id="contact-title"
          data-reveal
          className="mx-auto max-w-[16ch] font-display-wide text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] uppercase"
        >
          {t.rich("titleRich", { mark: (chunks) => <Scribble kind="circle">{chunks}</Scribble> })}
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-[55ch] text-lg text-muted">
          {t("body")}
        </p>

        <div data-reveal>
          <p className={`${eyebrow} mt-12`}>{t("emailLabel")}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 inline-block text-[clamp(1.25rem,3.4vw,2.6rem)] font-medium break-all text-accent underline-offset-8 hover:underline"
          >
            {profile.email}
          </a>
        </div>

        <ul data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener"
                className={`${buttonSecondary} bg-bg/80 backdrop-blur`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Strip items={[...items].reverse()} tilt="rotateX(-14deg) rotateY(16deg) rotateZ(3deg)" reverse />
    </section>
  );
}
