import type { Localized } from "./types";

export const profile = {
  name: "Nojus Tautavičius",
  initials: "N.T.",
  email: "nojustautavicius007@gmail.com",
  website: "ntdev.lt",
  github: "https://github.com/NojusTautavicius1",
  repo: "https://github.com/NojusTautavicius1/portfolio",
  /** Add your LinkedIn URL here once the profile is updated. */
  linkedin: null as string | null,
  /** Path inside /public, e.g. "/images/nojus-portrait.webp". null shows initials instead. */
  photo: "/images/nojus-portrait.webp" as string | null,
  location: { lt: "Kretinga", en: "Kretinga" } satisfies Localized,
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
      "Esu Nojus iš Kretingos. Programuoti pradėjau Klaipėdos technologijų mokymo centre (KTMC), kur nuo 2024 m. mokausi JavaScript programuotoju. Labiausiai mane užveda dvi akimirkos: kai sistema pirmą kartą suveikia nuo pradžios iki galo ir kai ji dar ir atrodo gražiai.",
      "Mano mėgstamiausias projektas yra Sonara. Pradėjau ją kaip darbą, kuriuo norėjau parodyti įmonei, ką sugebu, bet nesustojau ir vysčiau toliau pats: norėjau suprasti, kaip veikia AI, kaip jis keičia atsakymus ir kaip jį teisingai promptinti. Šiuo metu atlieku praktiką IT Perspective įmonėje Lenkijoje, vasarą dirbau Potissimus agentūroje, o su partneriu turiu web studiją GraspIT.",
      "Kai gaunu užduotį, kurios nemoku, pirma išsiaiškinu: skaitau dokumentaciją, klausiu AI ir žmonių, tada darau. Ieškau vietos, kur galėčiau augti, Klaipėdoje, Kretingoje arba nuotoliu. Kai nesu prie kompiuterio, dažnai einu į sporto salę, domiuosi mašinomis, klausau muzikos ir skaitau knygas apie verslą, pinigus ir psichologiją.",
    ],
    en: [
      "I am Nojus from Kretinga. I started programming at Klaipėda Technology Training Centre (KTMC), where I have been training as a JavaScript developer since 2024. Two moments get me going the most: when a system works end to end for the first time, and when it also looks good.",
      "My favourite project is Sonara. I started it as a piece of work to show a company what I can do, but I did not stop and kept building it on my own: I wanted to understand how AI works, how it changes its answers and how to prompt it properly. I am currently an intern at IT Perspective in Poland, I worked at the Potissimus agency over the summer, and I run a web studio, GraspIT, with a partner.",
      "When I get a task I do not know how to do yet, I figure it out first: I read the docs, ask AI and people, then build. I am looking for a place where I can grow, in Klaipėda, Kretinga or remote. Away from the computer I go to the gym a lot, I am into cars, I listen to music and read books about business, money and psychology.",
    ],
  } satisfies Localized<string[]>,
};
