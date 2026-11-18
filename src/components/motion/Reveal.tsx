"use client";

import { useEffect } from "react";

import { loadGsap, MOTION_OK } from "@/lib/gsap";
import { whenIdle } from "@/lib/idle";

/**
 * Fades in every [data-reveal] element as it enters the viewport, in small staggered batches.
 * Set up once the browser is idle, so it never competes with the first paint. Elements are only
 * hidden once this runs, so the page is fully readable without JS and with reduced motion.
 * Mount it once, after the sections it should animate.
 */
export function Reveal() {
  useEffect(() => {
    if (!matchMedia(MOTION_OK).matches) return;

    let disposed = false;
    let revert: (() => void) | undefined;

    const cancelIdle = whenIdle(() => {
      loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (disposed) return;
        const context = gsap.context(() => {
          const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          // Opacity only (not autoAlpha/visibility): hidden-by-visibility headings drop out of
          // the accessibility tree, so screen readers would miss them until scrolled into view.
          gsap.set(items, { opacity: 0, y: 18 });
          ScrollTrigger.batch(items, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, overwrite: true }),
          });
        });
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        revert = () => context.revert();
      });
    });

    return () => {
      disposed = true;
      cancelIdle();
      revert?.();
    };
  }, []);

  return null;
}
