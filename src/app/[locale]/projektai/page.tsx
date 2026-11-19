import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GRID, WORLD_H, WORLD_W } from "@/content/board";
import { pageMetadata } from "@/lib/metadata";
import { BoardWorld } from "@/components/board/BoardWorld";
import { ProjectBoard } from "@/components/board/ProjectBoard";
import { CardThrower } from "@/components/thrower/CardThrower";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "board" });
  return {
    title: t("title"),
    ...pageMetadata(locale, "/projektai", { title: t("title"), description: t("description") }),
  };
}

export default async function BoardPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("board");
  const thrower = await getTranslations("thrower");

  return (
    <>
      <h1 className="sr-only">{t("title")}</h1>
      <ProjectBoard
        width={WORLD_W}
        height={WORLD_H}
        label={t("label")}
        hint={t("hint")}
        start={{ x: GRID / 5, y: GRID / 4 }}
      >
        <BoardWorld />
      </ProjectBoard>
      <CardThrower
        labels={{
          off: thrower("off"),
          on: thrower("on"),
          hint: thrower("hint"),
          jackpot: thrower("jackpot"),
        }}
      />
    </>
  );
}
