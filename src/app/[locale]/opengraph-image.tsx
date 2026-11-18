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

const font = (file: string) => readFile(join(process.cwd(), "src", "assets", "fonts", file));

const fan = [
  { rank: "A", suit: "♠", red: false, rotate: -16, x: -120, y: 30 },
  { rank: "K", suit: "♦", red: true, rotate: 13, x: 120, y: 30 },
  { rank: "Q", suit: "♥", red: true, rotate: -2, x: 0, y: 0 },
];

/** Link preview card (LinkedIn, Messenger, email clients). Generated at build time per locale. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const [regular, semibold, mono] = await Promise.all([
    font("Geist-Regular.ttf"),
    font("Geist-SemiBold.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0a0a", color: "#f2f0eb", padding: "60px 72px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 690 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 22, color: "#8c8c8c" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5446" }} />
            {t("status")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 600, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
            <span>{profile.name.split(" ")[0]}</span>
            <span style={{ display: "flex" }}>
              {profile.name.split(" ")[1]}
              <span style={{ color: "#ff5446" }}>.</span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: 30 }}>{t("headline")}</span>
            <span style={{ fontFamily: "Geist Mono", fontSize: 24, color: "#ff5446" }}>{profile.website}</span>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
          {fan.map((card) => (
            <div
              key={card.rank}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 190,
                height: 266,
                padding: 16,
                borderRadius: 16,
                background: "#f2f0eb",
                color: card.red ? "#c81e17" : "#141414",
                boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
                transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
              }}
            >
              <span style={{ fontSize: 40, fontWeight: 600, lineHeight: 1 }}>{card.rank}</span>
              <span style={{ fontSize: 110, lineHeight: 1, alignSelf: "center" }}>{card.suit}</span>
              <span style={{ fontSize: 40, fontWeight: 600, lineHeight: 1, alignSelf: "flex-end", transform: "rotate(180deg)" }}>{card.rank}</span>
            </div>
          ))}
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
