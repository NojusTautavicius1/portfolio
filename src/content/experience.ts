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
      lt: ["[1–2 konkretūs darbai, kuriuos darai praktikoje]"],
      en: ["[1–2 concrete things you work on during the internship]"],
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
        "Kūriau AI automatizacijas agentūros darbui su Python ir Claude API [1 konkretus pavyzdys]",
        "Atlikau techninius SEO auditus ir taisymus",
      ],
      en: [
        "Built and improved client websites",
        "Built AI automations for the agency with Python and the Claude API [one concrete example]",
        "Ran technical SEO audits and fixes",
      ],
    },
  },
  {
    role: { lt: "Bendraįkūrėjas", en: "Co-founder" },
    organization: "GraspIT",
    context: { lt: "Web studija", en: "Web studio" },
    period: { lt: "[Nuo kada] – dabar", en: "[Since] – present" },
    points: {
      lt: ["Svetainės ir el. parduotuvės smulkiam verslui, AI automatizacijos"],
      en: ["Websites and online shops for small businesses, AI automations"],
    },
  },
];

export const education = {
  title: { lt: "JavaScript programuotojas", en: "JavaScript Developer" },
  school: {
    lt: "Kretingos technologijų ir verslo mokykla (KTMC)",
    en: "Kretinga Technology and Business School (KTMC)",
  },
  period: { lt: "[Pradžios metai] – 2027 (baigiamasis kursas)", en: "[Start year] – 2027 (final year)" },
} satisfies Record<string, Localized>;
