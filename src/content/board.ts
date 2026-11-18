import type { Suit } from "./areas";
import type { Localized } from "./types";

/**
 * The project board is one "world" of WORLD_W × WORLD_H px that repeats in every direction
 * (it is rendered 2 × 2 and wrapped), so positions only need to be unique inside one world.
 * Words wrapped in *asterisks* in a quote get a hand-drawn red circle.
 */
export const WORLD_W = 3600;
export const WORLD_H = 2400;
export const GRID = 400;

export type BoardItem =
  | { type: "project"; slug: string; x: number; y: number }
  | { type: "quote"; text: Localized; x: number; y: number; width: number }
  | { type: "card"; suit: Suit; rank: string; x: number; y: number; rotate: number }
  | { type: "status"; x: number; y: number };

export const boardItems: BoardItem[] = [
  { type: "project", slug: "aiscan", x: 160, y: 140 },
  { type: "quote", x: 1250, y: 180, width: 680, text: { lt: "Kodas, kuris dirba *už žmogų*.", en: "Code that does the work *for people*." } },
  { type: "project", slug: "kalvita", x: 2120, y: 120 },
  { type: "card", suit: "spades", rank: "A", x: 3260, y: 520, rotate: -12 },

  { type: "project", slug: "pitchcraft", x: 240, y: 900 },
  { type: "quote", x: 1380, y: 860, width: 600, text: { lt: "Nuo idėjos iki *veikiančio* MVP.", en: "From idea to a *working* MVP." } },
  { type: "project", slug: "sonara", x: 2240, y: 900 },
  { type: "status", x: 3260, y: 1180 },

  { type: "project", slug: "zaliuzesroletai", x: 120, y: 1620 },
  { type: "card", suit: "hearts", rank: "Q", x: 1240, y: 1560, rotate: 9 },
  { type: "quote", x: 1560, y: 1700, width: 620, text: { lt: "Mokausi greitai. *Baigiu*, ką pradedu.", en: "I learn fast. I *finish* what I start." } },
  { type: "project", slug: "greitas-kasnis", x: 2420, y: 1640 },

  { type: "quote", x: 3020, y: 1760, width: 480, text: { lt: "AI — ne žaislas, o *įrankis*.", en: "AI isn't a toy. It's a *tool*." } },
  { type: "card", suit: "diamonds", rank: "K", x: 1060, y: 2120, rotate: -8 },
  { type: "quote", x: 1820, y: 2140, width: 520, text: { lt: "Dizainas, kuris *juda*.", en: "Design that *moves*." } },
  { type: "card", suit: "clubs", rank: "J", x: 3360, y: 60, rotate: 14 },
];
