import type { Suit } from "./areas";
import type { Localized } from "./types";

// One world repeats in every direction, so positions only need to be unique inside it.
// *Starred* words in a quote get a hand-drawn circle.
export const WORLD_W = 3600;
export const WORLD_H = 3600;
export const GRID = 400;

export type BoardItem =
  | { type: "project"; slug: string; x: number; y: number }
  | { type: "quote"; text: Localized; x: number; y: number; width: number }
  | { type: "card"; suit: Suit; rank: string; x: number; y: number; rotate: number }
  | { type: "status"; x: number; y: number };

export const boardItems: BoardItem[] = [
  { type: "project", slug: "aiscan", x: 160, y: 140 },
  {
    type: "quote",
    x: 1250,
    y: 180,
    width: 680,
    text: { lt: "Kodas, kuris dirba *už žmogų*.", en: "Code that does the work *for people*." },
  },
  { type: "project", slug: "kalvita", x: 2120, y: 120 },
  { type: "card", suit: "spades", rank: "A", x: 3260, y: 520, rotate: -12 },

  { type: "project", slug: "pitchcraft", x: 240, y: 900 },
  {
    type: "quote",
    x: 1380,
    y: 860,
    width: 600,
    text: { lt: "Nuo idėjos iki *veikiančio* MVP.", en: "From idea to a *working* MVP." },
  },
  { type: "project", slug: "sonara", x: 2240, y: 900 },
  { type: "status", x: 3260, y: 1180 },

  { type: "project", slug: "zaliuzesroletai", x: 120, y: 1620 },
  { type: "card", suit: "hearts", rank: "Q", x: 1240, y: 1560, rotate: 9 },
  {
    type: "quote",
    x: 1560,
    y: 1700,
    width: 620,
    text: { lt: "Mokausi greitai. *Baigiu*, ką pradedu.", en: "I learn fast. I *finish* what I start." },
  },
  { type: "project", slug: "graspit", x: 2420, y: 1640 },

  {
    type: "quote",
    x: 2720,
    y: 2380,
    width: 480,
    text: { lt: "AI — ne žaislas, o *įrankis*.", en: "AI isn't a toy. It's a *tool*." },
  },
  { type: "project", slug: "colorlisse", x: 200, y: 2320 },
  {
    type: "quote",
    x: 1380,
    y: 2400,
    width: 520,
    text: { lt: "Dizainas, kuris *juda*.", en: "Design that *moves*." },
  },
  { type: "card", suit: "diamonds", rank: "K", x: 2260, y: 2300, rotate: -8 },
  { type: "card", suit: "clubs", rank: "J", x: 3360, y: 60, rotate: 14 },

  { type: "card", suit: "spades", rank: "Q", x: 420, y: 3080, rotate: 10 },
  { type: "project", slug: "idea-radar", x: 1180, y: 3040 },
  {
    type: "quote",
    x: 2480,
    y: 3120,
    width: 720,
    text: { lt: "Kartojasi? *Automatizuoju*.", en: "Repeats? I *automate* it." },
  },
];
