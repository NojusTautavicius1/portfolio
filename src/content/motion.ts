import type { Localized } from "./types";

export type MotionWork = {
  title: Localized;
  tool: string;
  /** Video clips are 9:16, stills are 4:5. Files live in /public/media/motion. */
  video?: string;
  image: string;
};

// Black Friday 2026 campaign for zaliuzesroletai.lt (TikTok / Reels / Stories + feed posts).
export const motionClient = "zaliuzesroletai.lt";

export const motionWorks: MotionWork[] = [
  {
    title: { lt: "Fasado roletai: –30 %", en: "Exterior shutters: –30%" },
    tool: "HyperFrames · GSAP",
    video: "/media/motion/fasado-roletai.mp4",
    image: "/media/motion/fasado-roletai.jpg",
  },
  {
    title: { lt: "Vienas langas, trys sprendimai", en: "One window, three options" },
    tool: "Blender 3D",
    video: "/media/motion/trys-sprendimai-3d.mp4",
    image: "/media/motion/trys-sprendimai-3d.jpg",
  },
  {
    title: { lt: "Plisuotos žaliuzės", en: "Pleated blinds" },
    tool: "HyperFrames · GSAP",
    video: "/media/motion/plisuotos.mp4",
    image: "/media/motion/plisuotos.jpg",
  },
  {
    title: { lt: "Plisuotos žaliuzės 3D", en: "Pleated blinds in 3D" },
    tool: "Blender 3D",
    video: "/media/motion/plisuotos-3d.mp4",
    image: "/media/motion/plisuotos-3d.jpg",
  },
  {
    title: { lt: "Medinės žaliuzės: feed postas", en: "Wooden blinds: feed post" },
    tool: "HTML → PNG",
    image: "/media/motion/medines-post.jpg",
  },
  {
    title: { lt: "Nemokamas matavimas: feed postas", en: "Free measuring: feed post" },
    tool: "HTML → PNG",
    image: "/media/motion/matavimas-post.jpg",
  },
];
