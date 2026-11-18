import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nojus Tautavičius — web & AI developer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const asset = (file: string) => readFile(join(process.cwd(), "src", "assets", file));

/** Link preview card (LinkedIn, Messenger, email clients). Generated at build time per locale. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const [regular, semibold, mono, probe] = await Promise.all([
    asset("fonts/Geist-Regular.ttf"),
    asset("fonts/Geist-SemiBold.ttf"),
    asset("fonts/GeistMono-Regular.ttf"),
    asset("zondas-og.png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0e0f11", color: "#ecedee", padding: "64px 72px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 22, color: "#8a8f98" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#e8643c" }} />
            {t("status")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 70, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5 }}>
            <span style={{ color: "#8a8f98" }}>{profile.name}.</span>
            <span>{t("headline")}</span>
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 24, color: "#e8643c" }}>{profile.website}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only */}
          <img src={`data:image/png;base64,${probe.toString("base64")}`} width={420} height={420} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
