"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger (pinning, reveals) stays in sync.
 * Skipped entirely for prefers-reduced-motion: native scrolling is kept.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
