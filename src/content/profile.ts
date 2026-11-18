import type { Localized } from "./types";

export const profile = {
  name: "Nojus Tautavičius",
  initials: "N.T.",
  email: "nojustautavicius007@gmail.com",
  website: "ntdev.lt",
  github: "https://github.com/NojusTautavicius1",
  /** Add your LinkedIn URL here once the profile is updated. */
  linkedin: null as string | null,
  /** Path inside /public, e.g. "/images/nojus.webp". null shows initials instead. */
  photo: null as string | null,
  location: { lt: "[Miestas]", en: "[City]" } satisfies Localized,
  cv: {
    lt: "/cv/nojus-tautavicius-cv-lt.pdf",
    en: "/cv/nojus-tautavicius-cv-en.pdf",
  } satisfies Localized,
  languages: [
    { lt: "Lietuvių — gimtoji", en: "Lithuanian — native" },
    { lt: "Anglų — C1", en: "English — C1" },
  ] satisfies Localized[],
  about: {
    lt: [
      "Esu Nojus, baigiamojo kurso JavaScript programuotojo specialybės studentas Kretingos technologijų ir verslo mokykloje (KTMC). Labiausiai mane traukia vieta, kur susitinka kodas ir dirbtinis intelektas: kuriu įrankius, kurie automatizuoja nuobodų darbą ir duoda verslui aiškų rezultatą.",
      "Praktikos metu Potissimus agentūroje kūriau svetaines, AI automatizacijas ir taisiau techninį SEO. Su partneriu turiu nedidelę web studiją GraspIT, o laisvalaikiu kuriu savo SaaS produktus ir motion design darbus. Mokausi greitai, mėgstu baigti tai, ką pradedu, ir nebijau užduočių, kurių dar nemoku.",
      "[1 sakinys apie tai, kokio darbo ieškai ir kuo galėtum būti naudingas komandai.]",
    ],
    en: [
      "I'm Nojus, a final-year JavaScript developer student at Kretinga Technology and Business School (KTMC). What excites me most is where code meets AI: I build tools that automate tedious work and give a business a clear result.",
      "During my internship at the Potissimus agency I built websites and AI automations and fixed technical SEO. I run a small web studio, GraspIT, with a partner, and in my spare time I build my own SaaS products and motion design work. I learn fast, I finish what I start, and I'm not afraid of tasks I don't know how to do yet.",
      "[One sentence about the kind of role you're looking for and how you could help a team.]",
    ],
  } satisfies Localized<string[]>,
};
