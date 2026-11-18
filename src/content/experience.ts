import type { ExperienceItem, Localized } from "./types";

export const experience: ExperienceItem[] = [
  {
    role: { lt: "IT praktikantas", en: "IT Intern" },
    organization: "IT Perspective Sp. z o.o.",
    context: {
      lt: "IT įmonė, Wasilkówas (Lenkija) · profesinio mokymo praktika per KTMC",
      en: "IT company, Wasilków (Poland) · vocational training placement via KTMC",
    },
    period: { lt: "2026 m. spalis – dabar", en: "Oct 2026 – present" },
    points: {
      lt: [
        "Kuriu ir prižiūriu svetaines",
        "Dizainas ir marketingo medžiaga",
        "IT pagalba ir sistemų priežiūra",
      ],
      en: [
        "Building and maintaining websites",
        "Design and marketing materials",
        "IT support and system maintenance",
      ],
    },
  },
  {
    role: { lt: "Web & AI praktikantas", en: "Web & AI Intern" },
    organization: "Potissimus",
    context: {
      lt: "SEO ir skaitmeninio marketingo agentūra, Klaipėda",
      en: "SEO and digital marketing agency, Klaipėda",
    },
    period: { lt: "2026 m. vasara", en: "Summer 2026" },
    points: {
      lt: [
        "Kūriau ir tobulinau klientų svetaines",
        "Kūriau AI automatizacijas su Python ir Claude API: SEO turinio generavimą ir audito ataskaitas",
        "Atlikau techninius SEO auditus ir taisymus",
      ],
      en: [
        "Built and improved client websites",
        "Built AI automations with Python and the Claude API: SEO content generation and audit reports",
        "Ran technical SEO audits and fixes",
      ],
    },
  },
  {
    role: { lt: "Bendraįkūrėjas", en: "Co-founder" },
    organization: "GraspIT",
    context: { lt: "Web studija", en: "Web studio" },
    period: { lt: "2026 m. – dabar", en: "2026 – present" },
    points: {
      lt: [
        "Svetainės ir el. parduotuvės smulkiam verslui, AI automatizacijos",
        "Su partneriu darome viską kartu: dizainą, kodą ir bendravimą su klientais",
      ],
      en: [
        "Websites and online shops for small businesses, AI automations",
        "My partner and I do everything together: design, code and client work",
      ],
    },
  },
];

export const education = {
  title: { lt: "JavaScript programuotojas", en: "JavaScript Developer" },
  school: {
    lt: "Klaipėdos technologijų mokymo centras (KTMC)",
    en: "Klaipėda Technology Training Centre (KTMC)",
  },
  period: { lt: "2024–2027 (baigiamasis kursas)", en: "2024–2027 (final year)" },
} satisfies Record<string, Localized>;
