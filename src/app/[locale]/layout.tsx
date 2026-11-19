import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

import "lenis/dist/lenis.css";
import "../globals.css";

const geistSans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono" });
// Archivo frozen at width 125 / weight 900 and subset to Latin + Lithuanian: 7 KB instead of the
// 170 KB variable font. Rebuild it with the script in src/assets/fonts/README.md.
const archivo = localFont({
  src: "../../assets/fonts/ArchivoExpanded-Black.woff2",
  weight: "900",
  variable: "--font-archivo",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — Nojus Tautavičius` },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "Nojus Tautavičius",
      locale: locale === "lt" ? "lt_LT" : "en_US",
      title: t("title"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}`,
      languages: { lt: "/lt", en: "/en" },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    // suppressHydrationWarning: client code sets data-* flags on <html> (e.g. data-deck="ready").
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      {/* Browser extensions (Grammarly) add data-* attributes to <body> before React loads. */}
      <body className="min-h-dvh" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {/* Cookieless; shows whether companies open the link. The scripts only exist on Vercel
            (VERCEL=1 at build), so they are skipped locally instead of 404-ing. */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
