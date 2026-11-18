# Portfolio tekstai — juodraštis (LT)

> Laužtiniuose skliaustuose [ ] — vietos, kurias užpildai tu. Anglų versiją darysim, kai patvirtinsi lietuvišką.

---

## 1. Hero (pirmas ekranas)

**Žyma:** ● Atviras darbui ir apmokamai praktikai · Klaipėdos regionas / nuotoliu

**Antraštė:**
Nojus Tautavičius.
Kuriu web aplikacijas ir AI automatizacijas.

**Paantraštė:**
JavaScript programuotojo specialybės studentas (KTMC, baigiamasis kursas). Dirbu su Next.js, TypeScript, Python ir Claude API, o laisvalaikiu kuriu motion design ir video reklamas.

**Mygtukai:** `Peržiūrėti projektus` · `Atsisiųsti CV (PDF)` · `Susisiekti`

**Greiti faktai (3 eilutės po hero):**
- 3 savo AI / SaaS produktai — nuo idėjos iki veikiančio MVP
- Web & AI praktika SEO agentūroje Potissimus
- Svetainės realiems klientams ir sava web studija GraspIT

---

## 2. Apie mane

Esu Nojus, baigiamojo kurso JavaScript programuotojo specialybės studentas Kretingos technologijų ir verslo mokykloje (KTMC). Labiausiai mane traukia vieta, kur susitinka kodas ir dirbtinis intelektas: kuriu įrankius, kurie automatizuoja nuobodų darbą ir duoda verslui aiškų rezultatą.

Praktikos metu Potissimus agentūroje kūriau svetaines, AI automatizacijas ir taisiau techninį SEO. Su partneriu turiu nedidelę web studiją GraspIT, o laisvalaikiu kuriu savo SaaS produktus ir motion design darbus. Mokausi greitai, mėgstu baigti tai, ką pradedu, ir nebijau užduočių, kurių dar nemoku.

[1 sakinys apie tai, kokio darbo ieškai ir kuo galėtum būti naudingas komandai — pvz. „Ieškau komandos, kurioje galėčiau kurti produktus su AI ir augti kaip full-stack programuotojas.“]

**Šalia:** maža nuotrauka · Kalbos: lietuvių (gimtoji), anglų (C1) · 📍 [Miestas]

---

## 3. Projektai

### 3.1 aiscan — AI matomumo auditas · `Ruošiama paleidimui`

**Problema:** Vis daugiau žmonių klausia ne Google, o ChatGPT ar Perplexity. Įmonės nežino, ar AI atsakymuose jos apskritai minimos, o įprasti SEO įrankiai to nematuoja.

**Sprendimas:** Sistema sugeneruoja realistiškus klausimus pagal įmonės nišą, užduoda juos AI paieškos varikliams ir analizuoja atsakymus: ar minimas prekės ženklas, kurioje vietoje, kokie šaltiniai cituojami ir kurie konkurentai pasirodo dažniausiai. Atpažįsta ir lietuviškus linksnius („Kalvita“, „Kalvitos“, „Kalvitą“).

**Rezultatas:** Veikiantis analizės variklis su automatiniais testais ir foniniu darbų apdorojimu. [Po paleidimo: kiek auditų atlikta / pirmi vartotojai.]

**Mano vaidmuo:** viskas — idėja, architektūra, backend, frontend.
**Technologijos:** Next.js · TypeScript · Supabase · Upstash Redis · Perplexity API · Vitest · Vercel
**Nuorodos:** [Demo] · [Video]

---

### 3.2 PitchCraft — AI pardavimų laiškai iš svetainės URL · `MVP`

**Problema:** Web dizaineriai ir agentūros valandas leidžia rašydami šaltus laiškus potencialiems klientams, o šabloniniai laiškai lieka neatsakyti.

**Sprendimas:** Įklijuoji kliento svetainės adresą — sistema padaro jos ekrano nuotrauką, Claude vision modelis įvertina dizainą ir randa konkrečias silpnas vietas, o tada parašo 3 laiškų seką, kuri remiasi tikromis tos svetainės problemomis. Gali mėgdžioti vartotojo rašymo stilių, rasti kontaktinį el. paštą ir apdoroti kelis URL iš karto.

**Rezultatas:** Pilnas procesas veikia nuo pradžios iki galo: skenavimas → AI analizė → laiškai → mokėjimai (Stripe freemium). [Po paleidimo: demo nuoroda.]

**Mano vaidmuo:** viskas — produktas, kodas, AI promptai, mokėjimų integracija.
**Technologijos:** Next.js · TypeScript · Claude API (vision) · Puppeteer · Supabase · Stripe · Upstash · Resend
**Nuorodos:** [Demo] · [Video]

---

### 3.3 Sonara — muzikos platforma su AI rekomendacijomis

**Problema:** [1 sakinys, kodėl kūrei — pvz. „Norėjau suprasti, kaip veikia Spotify tipo rekomendacijos, ir sukurti jas pats.“]

**Sprendimas:** Pilna muzikos klausymosi platforma: dainų įkėlimas ir grojimas su bangos vizualizacija, automatiškai atsinaujinantys „Daily Mix“ ir „Discover Weekly“, grojaraščiai, dainų žodžiai, klausymo statistika. „Ask Sonara“ leidžia ieškoti natūralia kalba — pvz. „dainos lietingam vakarui“.

**Rezultatas:** Veikianti platforma su atskiru muzikos agento servisu. [Gyva nuoroda / video.]

**Mano vaidmuo:** viskas — full-stack kūrimas ir AI dalis.
**Technologijos:** Next.js 15 · TypeScript · Tailwind · PostgreSQL + Prisma · Auth.js · Claude API · Ruby (Sinatra) · Vercel + Railway
**Nuorodos:** [Live] · [GitHub]

---

### 3.4 Kalvita — svetainė kalvystės įmonei · `Klientas`

**Problema:** Kalvystės įmonei Klaipėdoje ir Kretingoje reikėjo svetainės, kuri parodytų gaminius (vartus, turėklus, tvoras, stogelius) ir atneštų užklausų iš vietinių klientų.

**Sprendimas:** Greita svetainė su gaminių galerija, užklausų forma su apsauga nuo spamo ir vietiniam SEO paruošta struktūra (raktiniai žodžiai pagal miestus, sitemap, Open Graph). Pridėtos saugumo antraštės (Content Security Policy).

**Rezultatas:** Svetainė veikia adresu kalvita.lt. [Jei klientas sutiktų — 1 sakinys atsiliepimo arba kiek užklausų gauna per mėnesį.]

**Technologijos:** React · Vite · Tailwind · Motion · EmailJS · Vercel
**Nuorodos:** kalvita.lt

---

### 3.5 zaliuzesroletai.lt — SEO ir priežiūra · `Klientas`

**Problema:** Žaliuzių ir roletų įmonės svetainė turėjo būti geriau matoma Google paieškoje ir nuolat atnaujinama.

**Sprendimas:** Atlikau techninį SEO (greitis, meta duomenys, struktūrizuoti duomenys, indeksavimas), atlikau raktinių žodžių tyrimą, optimizavau turinį ir prižiūriu svetainę — atnaujinimai, taisymai, nauji produktai.

**Rezultatas:** [Jei vėliau gausi Search Console duomenis — paspaudimai / pozicijos prieš ir po. Kol nėra — šią eilutę praleidžiam.]

**Technologijos / įrankiai:** Google Search Console · [kiti įrankiai, pvz. Ahrefs, PageSpeed Insights, WordPress?]

---

### 3.6 Greitas Kąsnis — kebabinės svetainė · `Koncepcija`

**Problema:** Vietinės užkandinės dažnai turi tik Facebook puslapį — meniu ir kontaktus sunku rasti.

**Sprendimas:** Koncepcinė svetainė kebabinių tinklui su dviem padaliniais (Kretinga, Ginduliai): meniu, kiekvieno padalinio puslapis, naujienos, automatiškai generuojami nuorodų peržiūros paveikslėliai ir SEO.

**Technologijos:** Next.js · TypeScript · Vercel
**Nuorodos:** [Live]

---

## 4. GraspIT — mano web studija

Su partneriu kuriame svetaines, el. parduotuves ir AI automatizacijas mažoms ir vidutinėms įmonėms Lietuvoje. Fiksuota kaina, aiškus procesas, klientui atiduodamas visas kodas.

**Mano vaidmuo:** [ką darai tu, o ką partneris — pvz. „Aš — programavimas ir AI automatizacijos, partneris — dizainas ir klientai.“]
**Nuorodos:** [graspit domenas, kai bus / webgenas.com]

---

## 5. Motion design ir video

Kuriu video reklamas ir animacijas: nuo 2D motion graphics iki 3D scenų. Kai reikia daug variantų, video generuoju kodu.

**Įrankiai:** After Effects · Blender · Remotion
**Darbai:** [3–6 geriausi video — 1 eilutė kiekvienam: kam darei ir ką jis rodo]

---

## 6. Patirtis

**Web & AI praktikantas** — Potissimus (SEO ir skaitmeninio marketingo agentūra), Klaipėda
2026 m. [birželis–rugpjūtis]
- Kūriau ir tobulinau klientų svetaines
- Kūriau AI automatizacijas agentūros darbui su Python ir Claude API [1 konkretus pavyzdys — pvz. „automatinis SEO ataskaitų generavimas“]
- Atlikau techninius SEO auditus ir taisymus

**Bendraįkūrėjas** — GraspIT (web studija)
[Nuo kada] – dabar
- Svetainės ir el. parduotuvės smulkiam verslui, AI automatizacijos

## 7. Išsilavinimas

**JavaScript programuotojas** — Kretingos technologijų ir verslo mokykla (KTMC)
[Pradžios metai] – 2027 (baigiamasis kursas)

---

## 8. Įgūdžiai

| Sritis | Technologijos |
|---|---|
| AI ir automatizacijos | Claude API, Perplexity API, Python, Playwright, Puppeteer, Telegram botai |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Motion |
| Backend ir duomenys | Supabase, PostgreSQL, Prisma, Redis (Upstash), Stripe, REST API |
| SEO | Techninis SEO, Search Console, struktūrizuoti duomenys, GEO / AI matomumas |
| Motion ir 3D | After Effects, Blender, Remotion |
| Įrankiai | Git, GitHub, Vercel, Railway, Claude Code |

---

## 9. Kiti projektai (trumpas sąrašas)

- **TradeJournal** — prekybos dienoraštis su automatiniais skaičiavimais, ekrano nuotraukomis ir AI apžvalgomis. *Next.js, Supabase*
- **Python stebėjimo botai** — automatiškai renka duomenis iš svetainių ir realiu laiku siunčia pranešimus į Telegram. *Python, Playwright, Telegram API*
- **Crystal Age (Roblox)** — tycoon + capture žaidimas su grapple judėjimu ir serverio pusėje saugoma ekonomika. *Luau, Rojo*

---

## 10. Kontaktai

**Antraštė:** Dirbkime kartu
**Tekstas:** Ieškau darbo arba apmokamos praktikos. Atsakau per 24 valandas.

- ✉️ [el. paštas]
- LinkedIn: [nuoroda]
- GitHub: github.com/NojusTautavicius1
- 📄 Atsisiųsti CV (LT / EN)

---

## 11. Laiško šablonas įmonėms

**Tema:** Web & AI programuotojas — [praktika / darbas] [Įmonės pavadinimas]

> Laba diena,
>
> esu Nojus Tautavičius, baigiamojo kurso JavaScript programuotojo specialybės studentas (KTMC). Ieškau [apmokamos praktikos / darbo] ir mane sudomino [Įmonė], nes [1 konkreti priežastis — jų produktas, projektas ar technologija].
>
> Kuriu web aplikacijas su Next.js ir AI automatizacijas su Python bei Claude API, praktiką atlikau SEO agentūroje Potissimus. Savo projektus, patirtį ir CV surinkau čia: [nuoroda].
>
> Mielai pasikalbėčiau, jei matote vietą savo komandoje.
>
> Pagarbiai,
> Nojus Tautavičius
