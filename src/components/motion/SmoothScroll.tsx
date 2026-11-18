"use client";

import { useEffect } from "react";

import { loadGsap, MOTION_OK } from "@/lib/gsap";

// Desktop only: Lenis leaves touch scrolling native anyway, so phones skip the download.
export function SmoothScroll() {
  useEffect(() => {
    if (!matchMedia(MOTION_OK).matches || matchMedia("(pointer: coarse)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (disposed) return;
      const lenis = new Lenis({ autoRaf: false, lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
