import type { FeaturedProject, SideProject } from "./types";

// In display order. Each project gets a page at /[locale]/projektai/[slug].
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "aiscan",
    card: { suit: "spades", rank: "A" },
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
      en: 'The system generates realistic questions for the company\'s niche, asks AI search engines and analyses the answers: is the brand mentioned, in which position, which sources are cited and which competitors show up most. It also handles Lithuanian word endings ("Kalvita", "Kalvitos", "Kalvitą").',
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
    card: { suit: "spades", rank: "K" },
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
    media: [{ src: "/images/projects/pitchcraft-desktop.jpg", kind: "desktop" }],
  },
  {
    slug: "sonara",
    card: { suit: "hearts", rank: "Q" },
    title: "Sonara",
    tagline: {
      lt: "Muzikos platforma su AI rekomendacijomis ir paieška natūralia kalba",
      en: "A music platform with AI recommendations and natural-language search",
    },
    status: "live",
    problem: {
      lt: "Pradėjau ją kaip darbą, kuriuo norėjau parodyti įmonei, ką sugebu. Vėliau tęsiau pats, nes norėjau suprasti, kaip veikia AI: kaip jis keičia atsakymus ir kaip jį teisingai promptinti.",
      en: "I started it as a piece of work to show a company what I can do. Later I kept going on my own because I wanted to understand how AI works: how it changes its answers and how to prompt it properly.",
    },
    solution: {
      lt: "Pilna muzikos klausymosi platforma: dainų įkėlimas ir grojimas su bangos vizualizacija, automatiškai atsinaujinantys „Daily Mix“ ir „Discover Weekly“, grojaraščiai, dainų žodžiai, klausymo statistika. „Ask Sonara“ leidžia ieškoti natūralia kalba — pvz. „dainos lietingam vakarui“.",
      en: 'A complete music streaming platform: upload and play songs with a waveform view, auto-refreshing Daily Mix and Discover Weekly, playlists, lyrics and listening stats. "Ask Sonara" lets you search in plain language, e.g. "songs for a rainy evening".',
    },
    result: {
      lt: "Veikianti platforma su atskiru muzikos agento servisu.",
      en: "A working platform with a separate music agent service.",
    },
    role: {
      lt: "Viskas: full-stack kūrimas ir AI dalis.",
      en: "Everything: full-stack development and the AI layer.",
    },
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Claude API",
      "Ruby (Sinatra)",
      "Railway",
    ],
    links: [],
  },
  {
    slug: "graspit",
    card: { suit: "hearts", rank: "10" },
    title: "GraspIT",
    tagline: {
      lt: "Mūsų web studijos svetainė: svetainės ir el. parduotuvės vietiniam verslui",
      en: "Our web studio's website: websites and online shops for local businesses",
    },
    status: "launching",
    problem: {
      lt: "Studijai reikėjo svetainės, kuri aiškiai parodytų, ką darome, kiek tai kainuoja ir kaip vyksta darbas, kad klientas galėtų apsispręsti be ilgo susirašinėjimo.",
      en: "The studio needed a website that clearly shows what we do, what it costs and how the work goes, so a client can decide without a long email thread.",
    },
    solution: {
      lt: "12 puslapių svetainė: paslaugos, kainos, procesas, darbai, DUK su 22 klausimais ir kontaktų forma. Visi puslapiai sugeneruojami kaip HTML, todėl turinys matomas ir be JavaScript, kiekvienas turi savo meta duomenis, o DUK puslapis turi FAQPage struktūrizuotus duomenis.",
      en: "A 12-page website: services, prices, process, work, an FAQ with 22 questions and a contact form. Every page is prerendered to HTML, so the content is visible without JavaScript, each page has its own metadata, and the FAQ page has FAQPage structured data.",
    },
    result: null,
    role: {
      lt: "Kartu su partneriu: dizainas, tekstai ir kodas.",
      en: "Together with my partner: design, copy and code.",
    },
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      { lt: "Techninis SEO", en: "Technical SEO" },
    ],
    links: [],
    media: [
      { src: "/images/projects/graspit-desktop.jpg", kind: "desktop" },
      { src: "/images/projects/graspit-mobile.jpg", kind: "mobile" },
      { src: "/images/projects/graspit-kainos.jpg", kind: "page", caption: { lt: "Kainos", en: "Pricing" } },
      { src: "/images/projects/graspit-procesas.jpg", kind: "page", caption: { lt: "Darbo procesas", en: "How we work" } },
    ],
  },
  {
    slug: "kalvita",
    card: { suit: "hearts", rank: "J" },
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
    media: [
      { src: "/images/projects/kalvita-desktop.jpg", kind: "desktop" },
      { src: "/images/projects/kalvita-mobile.jpg", kind: "mobile" },
      { src: "/images/projects/kalvita-galerija.jpg", kind: "page", caption: { lt: "Darbų galerija", en: "Work gallery" } },
      { src: "/images/projects/kalvita-paslaugos.jpg", kind: "page", caption: { lt: "Paslaugos", en: "Services" } },
    ],
  },
  {
    slug: "colorlisse",
    card: { suit: "hearts", rank: "9" },
    title: "Colorlisse",
    tagline: {
      lt: "El. parduotuvė profesionaliai kirpėjų folijai",
      en: "Online shop for professional hairdressing foil",
    },
    status: "client",
    problem: {
      lt: "Prekės ženklui reikėjo parduotuvės, kurioje kirpėjai ir salonai galėtų greitai užsisakyti foliją su pristatymu į paštomatą.",
      en: "The brand needed a shop where hairdressers and salons can quickly order foil with delivery to a parcel locker.",
    },
    solution: {
      lt: "Ryški, prekės ženklo stiliaus el. parduotuvė: krepšelis ir užsakymas su LP Express ar Omniva paštomatais, atskiras puslapis salonams, galerija, DUK ir anglų kalbos versija.",
      en: "A bold, on-brand online shop: cart and checkout with LP Express or Omniva parcel lockers, a separate page for salons, a gallery, an FAQ and an English version.",
    },
    result: {
      lt: "Parduotuvė veikia adresu colorlisse.lt.",
      en: "The shop is live at colorlisse.lt.",
    },
    role: {
      lt: "Kūriau kartu su Nojumi Šiauliu.",
      en: "Built together with Nojus Šiaulys.",
    },
    stack: ["React", "Vite", "Cloudflare", { lt: "El. parduotuvė", en: "E-commerce" }],
    links: [{ kind: "live", href: "https://colorlisse.lt" }],
    media: [
      { src: "/images/projects/colorlisse-desktop.jpg", kind: "desktop" },
      { src: "/images/projects/colorlisse-mobile.jpg", kind: "mobile" },
      { src: "/images/projects/colorlisse-produktas.jpg", kind: "page", caption: { lt: "Produkto puslapis", en: "Product page" } },
      { src: "/images/projects/colorlisse-salonams.jpg", kind: "page", caption: { lt: "Puslapis salonams", en: "Page for salons" } },
    ],
  },
  {
    slug: "zaliuzesroletai",
    card: { suit: "clubs", rank: "10" },
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
    stack: [
      "Google Search Console",
      { lt: "Techninis SEO", en: "Technical SEO" },
      { lt: "[kiti įrankiai]", en: "[other tools]" },
    ],
    links: [{ kind: "live", href: "https://zaliuzesroletai.lt" }],
    media: [
      { src: "/images/projects/zaliuzesroletai-desktop.jpg", kind: "desktop" },
      { src: "/images/projects/zaliuzesroletai-mobile.jpg", kind: "mobile" },
      { src: "/images/projects/zaliuzesroletai-produkcija.jpg", kind: "page", caption: { lt: "Produkcija", en: "Products" } },
      { src: "/images/projects/zaliuzesroletai-roletai.jpg", kind: "page", caption: { lt: "Kategorijos puslapis", en: "Category page" } },
    ],
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
