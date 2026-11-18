/**
 * Prints the /[locale]/cv pages to public/cv/*.pdf with the locally installed Chrome.
 *
 *   npm run dev            (or: npm run build && npm run start)
 *   npm run cv             (optional: npm run cv -- http://localhost:3123)
 *
 * The phone number never lives in the repo or on the website: put CV_PHONE=+370... in
 * .env.local and it is written into the PDF only. CHROME_PATH overrides the browser location.
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const locales = ["lt", "en"];
const outDir = resolve("public", "cv");

function readLocalEnv(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(".env.local")) return undefined;
  const line = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${name}=`));
  return (
    line
      ?.slice(name.length + 1)
      .trim()
      .replace(/^["']|["']$/g, "") || undefined
  );
}

const chromePath =
  process.env.CHROME_PATH ??
  [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((candidate) => existsSync(candidate));

if (!chromePath) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome or Edge executable.");
  process.exit(1);
}

const phone = readLocalEnv("CV_PHONE");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath });
try {
  for (const locale of locales) {
    const page = await browser.newPage();
    const response = await page.goto(`${base}/${locale}/cv`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${base}/${locale}/cv responded ${response?.status()}`);

    // Hide the Next.js dev badge when printing from `npm run dev`.
    await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
    await page.evaluate((value) => {
      const slot = document.querySelector("[data-cv-phone]");
      if (slot && value) {
        slot.textContent = value;
        slot.hidden = false;
      }
    }, phone ?? "");
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });

    const path = resolve(outDir, `nojus-tautavicius-cv-${locale}.pdf`);
    const pdf = await page.pdf({ path, format: "A4", printBackground: true, preferCSSPageSize: true });
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    const warning = pages > 1 ? "  ⚠ more than one page: shorten the content" : "";
    console.log(
      `✓ ${path} (${pages} page${pages > 1 ? "s" : ""})${warning}${phone ? "" : "  — no CV_PHONE in .env.local, phone omitted"}`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
