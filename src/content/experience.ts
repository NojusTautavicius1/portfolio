import type { ExperienceItem, Localized } from "./types";

export const experience: ExperienceItem[] = [
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
    en: "Kretinga School of Technology and Business (KTMC)",
  },
  period: { lt: "[Pradžios metai] – 2027 (baigiamasis kursas)", en: "[Start year] – 2027 (final year)" },
} satisfies Record<string, Localized>;
