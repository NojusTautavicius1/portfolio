import type { FeaturedProject, SideProject } from "./types";

/**
 * Featured projects, in display order. Each one gets a detail page at
 * /[locale]/projektai/[slug]. To add a project, copy an entry and change the slug.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "aiscan",
    title: "aiscan",
    tagline: {
      lt: "AI matomumo auditas: ar AI atsakymuose minimas tavo verslas",
      en: "AI visibility audit: is your business mentioned in AI answers",
    },
    status: "launching",
    problem: {
      lt: "Vis daugiau žmonių klausia ne Google, o AI asistentų. Įmonės nežino, ar AI atsakymuose jos apskritai minimos, o įprasti SEO įrankiai to nematuoja.",
      en: "More and more people ask AI assistants instead of Google. Businesses have no idea whether AI answers mention them at all, and classic SEO tools don't measure it.",
    },
    solution: {
      lt: "Sistema sugeneruoja realistiškus klausimus pagal įmonės nišą, užduoda juos AI paieškos varikliams ir analizuoja atsakymus: ar minimas prekės ženklas, kurioje vietoje, kokie šaltiniai cituojami ir kurie konkurentai pasirodo dažniausiai. Atpažįsta ir lietuviškus linksnius („Kalvita“, „Kalvitos“, „Kalvitą“).",
      en: "The system generates realistic questions for the company's niche, asks AI search engines and analyses the answers: is the brand mentioned, in which position, which sources are cited and which competitors show up most. It also handles Lithuanian word endings (\"Kalvita\", \"Kalvitos\", \"Kalvitą\").",
    },
    result: {
      lt: "Veikiantis analizės variklis su automatiniais testais ir foniniu darbų apdorojimu. [Po paleidimo: kiek auditų atlikta / pirmi vartotojai.]",
      en: "A working analysis engine with automated tests and background job processing. [After launch: number of audits / first users.]",
    },
    role: {
      lt: "Viskas: idėja, architektūra, backend, frontend.",
      en: "Everything: idea, architecture, backend, frontend.",
    },
    stack: ["Next.js", "TypeScript", "Supabase", "Upstash Redis", "Perplexity API", "Vitest", "Vercel"],
    links: [],
  },
  {
    slug: "pitchcraft",
    title: "PitchCraft",
    tagline: {
      lt: "Iš svetainės URL — personalizuoti pardavimų laiškai su Claude",
      en: "From a website URL to personalised sales emails with Claude",
    },
    status: "mvp",
    problem: {
      lt: "Web dizaineriai ir agentūros valandas leidžia rašydami šaltus laiškus potencialiems klientams, o šabloniniai laiškai lieka neatsakyti.",
      en: "Web designers and agencies spend hours writing cold emails to prospects, and template emails go unanswered.",
    },
    solution: {
      lt: "Įklijuoji kliento svetainės adresą — sistema padaro jos ekrano nuotrauką, Claude vision modelis įvertina dizainą ir randa konkrečias silpnas vietas, o tada parašo 3 laiškų seką, kuri remiasi tikromis tos svetainės problemomis. Gali mėgdžioti vartotojo rašymo stilių, rasti kontaktinį el. paštą ir apdoroti kelis URL iš karto.",
      en: "Paste a prospect's website address: the system captures a screenshot, a Claude vision model reviews the design and finds specific weaknesses, then writes a 3-email sequence based on that site's real problems. It can mirror the user's writing style, find a contact email and process several URLs at once.",
    },
    result: {
      lt: "Pilnas procesas veikia nuo pradžios iki galo: skenavimas → AI analizė → laiškai → mokėjimai (Stripe freemium). [Po paleidimo: demo nuoroda.]",
      en: "The full pipeline works end to end: scan → AI analysis → emails → payments (Stripe freemium). [After launch: demo link.]",
    },
    role: {
      lt: "Viskas: produktas, kodas, AI promptai, mokėjimų integracija.",
      en: "Everything: product, code, AI prompts, payments integration.",
    },
    stack: ["Next.js", "TypeScript", "Claude API", "Puppeteer", "Supabase", "Stripe", "Upstash", "Resend"],
    links: [],
  },
  {
    slug: "sonara",
    title: "Sonara",
    tagline: {
      lt: "Muzikos platforma su AI rekomendacijomis ir paieška natūralia kalba",
      en: "A music platform with AI recommendations and natural-language search",
    },
    status: "live",
    problem: {
      lt: "[1 sakinys, kodėl kūrei — pvz. „Norėjau suprasti, kaip veikia Spotify tipo rekomendacijos, ir sukurti jas pats.“]",
      en: "[One sentence on why you built it — e.g. \"I wanted to understand how Spotify-style recommendations work and build them myself.\"]",
    },
    solution: {
      lt: "Pilna muzikos klausymosi platforma: dainų įkėlimas ir grojimas su bangos vizualizacija, automatiškai atsinaujinantys „Daily Mix“ ir „Discover Weekly“, grojaraščiai, dainų žodžiai, klausymo statistika. „Ask Sonara“ leidžia ieškoti natūralia kalba — pvz. „dainos lietingam vakarui“.",
      en: "A complete music streaming platform: upload and play songs with a waveform view, auto-refreshing Daily Mix and Discover Weekly, playlists, lyrics and listening stats. \"Ask Sonara\" lets you search in plain language, e.g. \"songs for a rainy evening\".",
    },
    result: {
      lt: "Veikianti platforma su atskiru muzikos agento servisu.",
      en: "A working platform with a separate music agent service.",
    },
    role: {
      lt: "Viskas: full-stack kūrimas ir AI dalis.",
      en: "Everything: full-stack development and the AI layer.",
    },
    stack: ["Next.js 15", "TypeScript", "Tailwind", "PostgreSQL", "Prisma", "Auth.js", "Claude API", "Ruby (Sinatra)", "Railway"],
    links: [],
  },
  {
    slug: "kalvita",
    title: "Kalvita",
    tagline: {
      lt: "Svetainė kalvystės įmonei Klaipėdoje ir Kretingoje",
      en: "Website for a blacksmith company in Klaipėda and Kretinga",
    },
    status: "client",
    problem: {
      lt: "Kalvystės įmonei reikėjo svetainės, kuri parodytų gaminius (vartus, turėklus, tvoras, stogelius) ir atneštų užklausų iš vietinių klientų.",
      en: "A blacksmith company needed a website that shows its products (gates, railings, fences, canopies) and brings in enquiries from local customers.",
    },
    solution: {
      lt: "Greita svetainė su gaminių galerija, užklausų forma su apsauga nuo spamo ir vietiniam SEO paruošta struktūra (raktiniai žodžiai pagal miestus, sitemap, Open Graph). Pridėtos saugumo antraštės (Content Security Policy).",
      en: "A fast website with a product gallery, a spam-protected enquiry form and a structure built for local SEO (city keywords, sitemap, Open Graph), plus security headers (Content Security Policy).",
    },
    result: {
      lt: "Svetainė veikia adresu kalvita.lt. [Jei klientas sutiktų — 1 sakinys atsiliepimo arba kiek užklausų gauna per mėnesį.]",
      en: "The site is live at kalvita.lt. [If the client agrees: a one-line testimonial or monthly enquiries.]",
    },
    role: null,
    stack: ["React", "Vite", "Tailwind", "Motion", "EmailJS", "Vercel"],
    links: [{ kind: "live", href: "https://kalvita.lt" }],
  },
  {
    slug: "zaliuzesroletai",
    title: "zaliuzesroletai.lt",
    tagline: {
      lt: "Techninis SEO, turinys ir nuolatinė priežiūra",
      en: "Technical SEO, content and ongoing maintenance",
    },
    status: "client",
    problem: {
      lt: "Žaliuzių ir roletų įmonės svetainė turėjo būti geriau matoma Google paieškoje ir nuolat atnaujinama.",
      en: "A blinds and roller-blinds company needed its website to be more visible in Google and kept up to date.",
    },
    solution: {
      lt: "Atlikau techninį SEO (greitis, meta duomenys, struktūrizuoti duomenys, indeksavimas), raktinių žodžių tyrimą, optimizavau turinį ir prižiūriu svetainę: atnaujinimai, taisymai, nauji produktai.",
      en: "I handled technical SEO (speed, metadata, structured data, indexing), keyword research and content optimisation, and I maintain the site: updates, fixes and new products.",
    },
    result: null,
    role: null,
    stack: ["Google Search Console", "Technical SEO", "[kiti įrankiai]"],
    links: [{ kind: "live", href: "https://zaliuzesroletai.lt" }],
  },
  {
    slug: "greitas-kasnis",
    title: "Greitas Kąsnis",
    tagline: {
      lt: "Koncepcinė svetainė kebabinių tinklui",
      en: "Concept website for a kebab restaurant chain",
    },
    status: "concept",
    problem: {
      lt: "Vietinės užkandinės dažnai turi tik Facebook puslapį, todėl meniu ir kontaktus sunku rasti.",
      en: "Local takeaways often only have a Facebook page, so the menu and contacts are hard to find.",
    },
    solution: {
      lt: "Koncepcinė svetainė kebabinių tinklui su dviem padaliniais (Kretinga, Ginduliai): meniu, kiekvieno padalinio puslapis, naujienos, automatiškai generuojami nuorodų peržiūros paveikslėliai ir SEO.",
      en: "A concept site for a chain with two locations (Kretinga, Ginduliai): menu, a page per location, news, auto-generated link preview images and SEO.",
    },
    result: null,
    role: null,
    stack: ["Next.js", "TypeScript", "Vercel"],
    links: [],
  },
];

export const sideProjects: SideProject[] = [
  {
    title: { lt: "TradeJournal", en: "TradeJournal" },
    description: {
      lt: "Prekybos dienoraštis su automatiniais skaičiavimais, ekrano nuotraukomis ir AI apžvalgomis.",
      en: "A trading journal with automatic calculations, screenshots and AI reviews.",
    },
    stack: ["Next.js", "Supabase"],
  },
  {
    title: { lt: "Python stebėjimo botai", en: "Python monitoring bots" },
    description: {
      lt: "Automatiškai renka duomenis iš svetainių ir realiu laiku siunčia pranešimus į Telegram.",
      en: "Collect data from websites automatically and send real-time alerts to Telegram.",
    },
    stack: ["Python", "Playwright", "Telegram API"],
  },
  {
    title: { lt: "Crystal Age (Roblox)", en: "Crystal Age (Roblox)" },
    description: {
      lt: "Tycoon + capture žaidimas su grapple judėjimu ir serverio pusėje saugoma ekonomika.",
      en: "A tycoon + capture game with grapple movement and a server-authoritative economy.",
    },
    stack: ["Luau", "Rojo"],
  },
];

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
