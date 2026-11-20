import type { FeaturedProject, SideProject } from "./types";

// In display order. Each project gets a page at /[locale]/projektai/[slug].
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "aiscan",
    card: { suit: "spades", rank: "A", line: { lt: "AI matomumas", en: "AI visibility" } },
    title: "aiscan",
    tagline: {
      lt: "AI matomumo auditas: ar AI atsakymuose minimas tavo verslas",
      en: "AI visibility audit: is your business mentioned in AI answers",
    },
    status: "launching",
    problem: {
      lt: "Dalis žmonių paslaugų dabar ieško per ChatGPT ar Perplexity. Įmonės nežino, ar AI atsakymuose jos apskritai minimos, o įprasti SEO įrankiai to nematuoja.",
      en: "Some people now look for services through ChatGPT or Perplexity. Businesses have no idea whether AI answers mention them at all, and classic SEO tools don't measure it.",
    },
    solution: {
      lt: "Sistema sugeneruoja realistiškus klausimus pagal įmonės nišą, užduoda juos AI paieškos varikliams ir analizuoja atsakymus: ar minimas prekės ženklas, kurioje vietoje, kokie šaltiniai cituojami ir kurie konkurentai pasirodo dažniausiai. Atpažįsta ir lietuviškus linksnius („Kalvita“, „Kalvitos“, „Kalvitą“).",
      en: 'The system generates realistic questions for the company\'s niche, asks AI search engines and analyses the answers: is the brand mentioned, in which position, which sources are cited and which competitors show up most. It also handles Lithuanian word endings ("Kalvita", "Kalvitos", "Kalvitą").',
    },
    result: {
      lt: "Analizės variklis veikia, jį dengia 448 automatiniai testai: klausimų generavimas, Perplexity užklausos, paminėjimų ir citatų atpažinimas, darbai fone. Vartotojo sąsajos dar nėra.",
      en: "The analysis engine works and is covered by 448 automated tests: question generation, Perplexity requests, mention and citation matching, background jobs. There is no user interface yet.",
    },
    role: {
      lt: "Viskas: idėja, architektūra, backend, frontend.",
      en: "Everything: idea, architecture, backend, frontend.",
    },
    learned: {
      lt: "Lietuvių kalba apgauna paprastą paiešką: prekės ženklas atsakyme būna „Kalvita“, „Kalvitos“ ar „Kalvitą“, todėl reikėjo atpažinti linksnius. O kelių AI užklausų auditas netelpa į vieną HTTP užklausą, todėl darbai vykdomi fone per eilę.",
      en: 'Lithuanian breaks naive search: a brand shows up as "Kalvita", "Kalvitos" or "Kalvitą", so the matcher had to handle word endings. And an audit made of many AI calls doesn\'t fit into one HTTP request, so the work runs in the background through a queue.',
    },
    stack: ["Next.js", "TypeScript", "Supabase", "Upstash Redis", "Perplexity API", "Vitest", "Vercel"],
    links: [],
    media: [
      { src: "/images/projects/aiscan-schema.webp", kind: "desktop" },
      {
        src: "/images/projects/aiscan-testai.webp",
        kind: "page",
        caption: { lt: "Testų paleidimas (vitest)", en: "Test run (vitest)" },
      },
    ],
  },
  {
    slug: "pitchcraft",
    card: { suit: "spades", rank: "K", line: { lt: "AI pardavimų laiškai", en: "AI sales emails" } },
    title: "PitchCraft",
    tagline: {
      lt: "Pardavimų laiškai, parašyti pagal tikras kliento svetainės problemas",
      en: "From a website URL to personalised sales emails with Claude",
    },
    status: "mvp",
    problem: {
      lt: "Web dizaineriai ir agentūros valandas leidžia rašydami šaltus laiškus potencialiems klientams, o šabloniniai laiškai lieka neatsakyti.",
      en: "Web designers and agencies spend hours writing cold emails to prospects, and template emails go unanswered.",
    },
    solution: {
      lt: "Įklijuoji kliento svetainės adresą. Sistema padaro jos ekrano nuotrauką, Claude vision modelis įvertina dizainą ir randa konkrečias silpnas vietas, o tada parašo 3 laiškų seką, kuri remiasi tikromis tos svetainės problemomis. Gali mėgdžioti vartotojo rašymo stilių, rasti kontaktinį el. paštą ir apdoroti kelis URL iš karto.",
      en: "Paste a prospect's website address: the system captures a screenshot, a Claude vision model reviews the design and finds specific weaknesses, then writes a 3-email sequence based on that site's real problems. It can mirror the user's writing style, find a contact email and process several URLs at once.",
    },
    result: {
      lt: "Visas procesas veikia nuo pradžios iki galo: skenavimas → AI analizė → laiškai → mokėjimai (Stripe freemium).",
      en: "The full pipeline works end to end: scan → AI analysis → emails → payments (Stripe freemium).",
    },
    role: {
      lt: "Viskas: produktas, kodas, AI promptai, mokėjimų integracija.",
      en: "Everything: product, code, AI prompts, payments integration.",
    },
    stack: ["Next.js", "TypeScript", "Claude API", "Puppeteer", "Supabase", "Stripe", "Upstash", "Resend"],
    links: [],
    media: [{ src: "/images/projects/pitchcraft-desktop.webp", kind: "desktop" }],
  },
  {
    slug: "idea-radar",
    card: { suit: "spades", rank: "Q", line: { lt: "Kasdienė AI atranka", en: "Daily AI digest" } },
    title: "Idea radar",
    tagline: {
      lt: "Kasdienė idėjų atranka: Claude išrenka 5 idėjas ir siunčia jas į Telegram",
      en: "A daily idea digest: Claude picks 5 ideas and sends them to Telegram",
    },
    status: "live",
    problem: {
      lt: "Norėjau kasdien matyti, kokias problemas žmonės aptaria Hacker News, GitHub ir Product Hunt, bet viską perskaityti užtrunka per ilgai, o dauguma įrašų man neaktualūs.",
      en: "I wanted to see every day what problems people discuss on Hacker News, GitHub and Product Hunt, but reading it all takes too long and most posts don't matter to me.",
    },
    solution: {
      lt: "Kiekvieną rytą GitHub Actions surenka naujus įrašus, atmeta jau matytus ir iš kiekvieno šaltinio palieka populiariausius. Vienas Claude kvietimas iš apie 100 įrašų išrenka 5 idėjas pagal mano profilį ir ankstesnius balsus, o atsakymą patikrina Zod schema. Idėjos ateina į Telegram su 👍/👎 mygtukais, ir kitos dienos atranka į tuos balsus atsižvelgia.",
      en: "Every morning GitHub Actions collects new posts, drops the ones it has already seen and keeps the hottest from each source. A single Claude call picks 5 ideas out of about 100 posts based on my profile and earlier votes, and a Zod schema validates the answer. The ideas arrive in Telegram with 👍/👎 buttons, and the next day's picks take those votes into account.",
    },
    result: {
      lt: "Veikia kasdien be serverio ir duomenų bazės: būsena laikoma viename JSON faile repozitorijoje, o kiekviena atranka išsaugoma kaip Markdown failas. Jei modelis nurodo šaltinį, kurio nebuvo įvestyje, tokia idėja atmetama. 19 automatinių testų, CI per GitHub Actions.",
      en: "It runs every day with no server and no database: state is one JSON file in the repo, and every digest is saved as a Markdown file. If the model points at a source that wasn't in its input, that idea is dropped. 19 automated tests, CI on GitHub Actions.",
    },
    role: {
      lt: "Viskas: idėja, kodas, promptas ir automatizacija.",
      en: "Everything: idea, code, prompt and automation.",
    },
    learned: {
      lt: "Modelio atsakymu negalima aklai pasitikėti: jis gali nurodyti šaltinį, kurio nebuvo. Todėl grąžintus įrašų ID sutikrinu su įvestimi ir tai padengiau testais. Dar išmokau, kad kiekvienas šaltinis gali nulūžti atskirai (Reddit blokuoja anonimines užklausas), ir tai neturi sustabdyti visos atrankos.",
      en: "You can't trust a model's answer blindly: it may cite a source that wasn't there. So I check the returned post ids against the input and cover that with tests. I also learned that every source can fail on its own (Reddit blocks anonymous requests), and that must not stop the whole digest.",
    },
    stack: ["TypeScript", "Claude API", "GitHub Actions", "Telegram Bot API", "Zod", "Vitest"],
    links: [{ kind: "github", href: "https://github.com/NojusTautavicius1/idea-radar" }],
    media: [
      { src: "/images/projects/idea-radar-digest.webp", kind: "desktop" },
      {
        src: "/images/projects/idea-radar-readme.webp",
        kind: "page",
        caption: { lt: "Kaip veikia (iš README)", en: "How it works (from the README)" },
      },
    ],
  },
  {
    slug: "sonara",
    card: { suit: "hearts", rank: "Q", line: { lt: "Muzika ir AI paieška", en: "Music and AI search" } },
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
      lt: "Muzikos klausymosi platforma: dainų įkėlimas ir grojimas su bangos vizualizacija, automatiškai atsinaujinantys „Daily Mix“ ir „Discover Weekly“, grojaraščiai, dainų žodžiai, klausymo statistika. „Ask Sonara“ leidžia ieškoti paprastais žodžiais, pvz., „dainos lietingam vakarui“.",
      en: 'A complete music streaming platform: upload and play songs with a waveform view, auto-refreshing Daily Mix and Discover Weekly, playlists, lyrics and listening stats. "Ask Sonara" lets you search in plain language, e.g. "songs for a rainy evening".',
    },
    result: {
      lt: "Platforma veikia: 176 dainos, o „Ask Sonara“ agentas pats renkasi, kaip ieškoti: pagal žanrą, tempą ar prasmę (vektorinė paieška per embeddings).",
      en: 'The platform is live with 176 songs, and the "Ask Sonara" agent decides how to search on its own: by genre, tempo or meaning (vector search over embeddings).',
    },
    role: {
      lt: "Viskas: full-stack kūrimas ir AI dalis.",
      en: "Everything: full-stack development and the AI layer.",
    },
    learned: {
      lt: "Kai baigėsi duomenų bazės planas, platforma nustojo veikti. Perkėliau duomenis į Neon (PostgreSQL su pgvector), AI agentą iš atskiro Ruby serviso perrašiau į patį Next.js ir supratau, kad net demo projektą reikia prižiūrėti kaip produkciją.",
      en: "When the database plan ran out, the platform went down. I moved the data to Neon (PostgreSQL with pgvector), rewrote the AI agent from a separate Ruby service into the Next.js app itself, and learned that even a demo project needs to be run like production.",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind",
      "PostgreSQL (Neon)",
      "pgvector",
      "Prisma",
      "Auth.js",
      "Claude API",
      "Vercel",
    ],
    links: [
      { kind: "live", href: "https://music-platform-woad-nine.vercel.app" },
      { kind: "github", href: "https://github.com/NojusTautavicius1/music-platform" },
    ],
    media: [
      { src: "/images/projects/sonara-desktop.webp", kind: "desktop" },
      { src: "/images/projects/sonara-mobile.jpg", kind: "mobile" },
      {
        src: "/images/projects/sonara-search.webp",
        kind: "page",
        caption: { lt: "Paieška pagal žanrą", en: "Browse by genre" },
      },
      {
        src: "/images/projects/sonara-browse.webp",
        kind: "page",
        caption: { lt: "Visos dainos", en: "Browse" },
      },
    ],
  },
  {
    slug: "graspit",
    card: { suit: "hearts", rank: "10", line: { lt: "Mūsų web studija", en: "Our web studio" } },
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
    learned: {
      lt: "React svetainė be prerenderinimo paieškos botams atrodo beveik tuščia, nes turinys atsiranda tik paleidus JavaScript. Todėl kiekvienas puslapis sugeneruojamas kaip HTML iš anksto.",
      en: "A React site without prerendering looks almost empty to search bots, because the content only appears once JavaScript runs. So every page is generated as HTML ahead of time.",
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
      { src: "/images/projects/graspit-desktop.webp", kind: "desktop" },
      { src: "/images/projects/graspit-mobile.webp", kind: "mobile" },
      { src: "/images/projects/graspit-kainos.webp", kind: "page", caption: { lt: "Kainos", en: "Pricing" } },
      {
        src: "/images/projects/graspit-darbai.webp",
        kind: "page",
        caption: { lt: "Atlikti darbai", en: "Our work" },
      },
    ],
  },
  {
    slug: "kalvita",
    card: { suit: "hearts", rank: "J", line: { lt: "Kalvystės svetainė", en: "Blacksmith website" } },
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
      lt: "Per nepilnus metus svetainė atvedė apie 50 naujų klientų (savininko skaičiavimu). Savininkas liko patenkintas: darbas padarytas greitai ir tvarkingai, o susirašinėjimas buvo aiškus.",
      en: "In under a year the site brought in about 50 new customers (the owner's estimate). The owner was happy with the work: it was done quickly and neatly, and communication was clear.",
    },
    role: null,
    stack: ["React", "Vite", "Tailwind", "Motion", "EmailJS", "Vercel"],
    links: [{ kind: "live", href: "https://kalvita.lt" }],
    media: [
      { src: "/images/projects/kalvita-desktop.webp", kind: "desktop" },
      { src: "/images/projects/kalvita-mobile.jpg", kind: "mobile" },
      {
        src: "/images/projects/kalvita-galerija.webp",
        kind: "page",
        caption: { lt: "Darbų galerija", en: "Work gallery" },
      },
      {
        src: "/images/projects/kalvita-paslaugos.webp",
        kind: "page",
        caption: { lt: "Paslaugos", en: "Services" },
      },
    ],
  },
  {
    slug: "colorlisse",
    card: { suit: "hearts", rank: "9", line: { lt: "El. parduotuvė", en: "Online shop" } },
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
      { src: "/images/projects/colorlisse-desktop.webp", kind: "desktop" },
      { src: "/images/projects/colorlisse-mobile.jpg", kind: "mobile" },
      {
        src: "/images/projects/colorlisse-produktas.webp",
        kind: "page",
        caption: { lt: "Produkto puslapis", en: "Product page" },
      },
      {
        src: "/images/projects/colorlisse-salonams.webp",
        kind: "page",
        caption: { lt: "Puslapis salonams", en: "Page for salons" },
      },
    ],
  },
  {
    slug: "zaliuzesroletai",
    card: { suit: "clubs", rank: "10", line: { lt: "Techninis SEO", en: "Technical SEO" } },
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
      { lt: "Struktūrizuoti duomenys", en: "Structured data" },
      { lt: "Raktinių žodžių tyrimas", en: "Keyword research" },
    ],
    links: [{ kind: "live", href: "https://zaliuzesroletai.lt" }],
    media: [
      { src: "/images/projects/zaliuzesroletai-desktop.webp", kind: "desktop" },
      { src: "/images/projects/zaliuzesroletai-mobile.jpg", kind: "mobile" },
      {
        src: "/images/projects/zaliuzesroletai-produkcija.webp",
        kind: "page",
        caption: { lt: "Produkcija", en: "Products" },
      },
      {
        src: "/images/projects/zaliuzesroletai-roletai.webp",
        kind: "page",
        caption: { lt: "Kategorijos puslapis", en: "Category page" },
      },
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
