import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

import { profile } from "@/content/profile";
import { featuredProjects, getFeaturedProject } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { localize } from "@/lib/localize";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nojus Tautavičius — project";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => featuredProjects.map((project) => ({ locale, slug: project.slug })));
}

const font = (file: string) => readFile(join(process.cwd(), "src", "assets", "fonts", file));

// Screenshots are 2x WebP; the OG renderer wants JPEG and only needs ~1200px.
async function screenshot(src: string) {
  const data = await sharp(join(process.cwd(), "public", src)).resize(1200).jpeg({ quality: 80 }).toBuffer();
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

// Link preview for a project page: name and tagline on the left, the site's screenshot on the right.
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getFeaturedProject(slug)!;
  const desktop = project.media?.find((item) => item.kind === "desktop");

  const [regular, semibold, mono, image] = await Promise.all([
    font("Geist-Regular.ttf"),
    font("Geist-SemiBold.ttf"),
    font("GeistMono-Regular.ttf"),
    desktop ? screenshot(desktop.src) : null,
  ]);
  const red = project.card.suit === "hearts" || project.card.suit === "diamonds";
  const suit = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[project.card.suit];

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        color: "#f2f0eb",
        fontFamily: "Geist",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 520,
          padding: "60px 0 60px 72px",
        }}
      >
        <span style={{ fontFamily: "Geist Mono", fontSize: 22, color: "#8c8c8c" }}>
          {locale === "lt" ? "Projektas" : "Project"} · {profile.name}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: project.title.length > 12 ? 60 : 84, fontWeight: 600, lineHeight: 1, letterSpacing: -2 }}>
            {project.title}
          </span>
          <span style={{ fontSize: 28, lineHeight: 1.3, color: "#c9c6bf" }}>{localize(project.tagline, locale)}</span>
        </div>
        <span style={{ fontFamily: "Geist Mono", fontSize: 24, color: "#ff5446" }}>{profile.website}</span>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", position: "relative" }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>
          <img
            src={image}
            alt=""
            width={720}
            height={450}
            style={{
              position: "absolute",
              left: 40,
              borderRadius: 18,
              border: "2px solid #2a2a2a",
              boxShadow: "0 30px 60px rgba(0,0,0,0.7)",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: 150,
              width: 240,
              height: 336,
              padding: 20,
              borderRadius: 20,
              background: "#f2f0eb",
              color: red ? "#c81e17" : "#141414",
              transform: "rotate(-6deg)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1 }}>{project.card.rank}</span>
            <span style={{ fontSize: 130, lineHeight: 1, alignSelf: "center" }}>{suit}</span>
            <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1, alignSelf: "flex-end", transform: "rotate(180deg)" }}>
              {project.card.rank}
            </span>
          </div>
        )}
      </div>
    </div>,
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
