import type { Suit } from "./areas";
import type { Localized } from "./types";

export type Principle = { suit: Suit; title: Localized; body: Localized };

// "How I work": each point is backed by something on this site.
export const principles: Principle[] = [
  {
    suit: "spades",
    title: { lt: "Pirma suprantu, tada rašau", en: "Understand first, then build" },
    body: {
      lt: "Prieš rašydamas kodą perskaitau dokumentaciją ir pasiklausiu AI bei žmonių. Kai problema aiški, kodo reikia mažiau, o perrašinėti tenka rečiau.",
      en: "Before writing code I read the docs and ask AI and people. Once the problem is clear, the code gets shorter and I rewrite less.",
    },
  },
  {
    suit: "hearts",
    title: { lt: "AI yra įrankis, ne autopilotas", en: "AI is a tool, not an autopilot" },
    body: {
      lt: "Claude naudoju kasdien, bet už rezultatą atsakau pats: kodą skaitau ir tikrinu testais. Ką AI grąžina, patikrinu kodu: idea-radar atmeta idėjas, kurios remiasi neegzistuojančiu šaltiniu.",
      en: "I use Claude every day, but the result is on me: I read the code and back it with tests. What AI returns gets checked in code: idea-radar drops any idea that cites a source that doesn't exist.",
    },
  },
  {
    suit: "diamonds",
    title: { lt: "Baigta, kai veikia gyvai", en: "Done means live" },
    body: {
      lt: "Projektas baigtas, kai jis veikia savo adresu ir yra prižiūrimas. Kai Sonaros duomenų bazė nustojo veikti, perkėliau ją į Neon ir paleidau platformą iš naujo.",
      en: "A project is done when it runs at its own address and someone looks after it. When Sonara's database went down, I moved it to Neon and brought the platform back.",
    },
  },
  {
    suit: "clubs",
    title: { lt: "Svarbu ir kaip atrodo", en: "How it looks matters too" },
    body: {
      lt: "Labiausiai mane užveda, kai sistema veikia ir dar atrodo gerai. Todėl dirbu ir su dizainu bei animacija: ši svetainė padaryta be šablono, o CV PDF generuojamas iš tų pačių duomenų.",
      en: "What gets me going most is a system that works and also looks good. That's why I do design and motion too: this site uses no template, and the CV PDF is generated from the same data.",
    },
  },
];
