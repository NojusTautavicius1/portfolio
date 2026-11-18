"use client";

import { useSyncExternalStore } from "react";

/**
 * off  — static poster only (reduced motion, data saver, no WebGL, very weak device)
 * lite — 3D at DPR 1, no antialiasing, low-res environment (phones, 4-core machines)
 * full — 3D at up to DPR 2
 */
export type RenderTier = "pending" | "off" | "lite" | "full";

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let cached: RenderTier | null = null;
let webglSupport: boolean | null = null;

function hasWebGL() {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

function computeTier(): RenderTier {
  const nav = navigator as NavigatorHints;
  if (matchMedia(REDUCED_MOTION).matches || nav.connection?.saveData || !hasWebGL()) return "off";

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return "off";

  const touchFirst = matchMedia("(pointer: coarse)").matches;
  return touchFirst || cores <= 4 ? "lite" : "full";
}

function subscribe(onChange: () => void) {
  const query = matchMedia(REDUCED_MOTION);
  const handle = () => {
    cached = null;
    onChange();
  };
  query.addEventListener("change", handle);
  return () => query.removeEventListener("change", handle);
}

export function useRenderTier(): RenderTier {
  return useSyncExternalStore<RenderTier>(
    subscribe,
    () => (cached ??= computeTier()),
    () => "pending",
  );
}
