import { getTranslations, setRequestLocale } from "next-intl/server";

import { CardThrower } from "@/components/thrower/CardThrower";
import { Reveal } from "@/components/motion/Reveal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { HowIWork } from "@/components/sections/HowIWork";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { StudioMotion } from "@/components/sections/StudioMotion";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";

// Lets search engines show who this site is about (name, role, location, GitHub).
function personSchema(locale: string, jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${SITE_URL}/${locale}`,
    jobTitle,
    ...(profile.photo && { image: `${SITE_URL}${profile.photo}` }),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Kretinga", addressCountry: "LT" },
    affiliation: { "@type": "EducationalOrganization", name: "Klaipėdos technologijų mokymo centras (KTMC)" },
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Claude API",
      "AI automation",
      "Technical SEO",
    ],
    knowsLanguage: ["lt", "en"],
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thrower");
  const meta = await getTranslations("meta");
  const jsonLd = JSON.stringify(personSchema(locale, meta("title").split(" — ")[1] ?? "")).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Hero />
      <Projects />
      <StudioMotion />
      <Experience />
      <Skills />
      <About />
      <HowIWork />
      <Contact />
      {/* After the sections: Reveal looks up elements that must already exist. */}
      <Reveal />
      <CardThrower labels={{ off: t("off"), on: t("on"), hint: t("hint"), jackpot: t("jackpot") }} />
    </>
  );
}
