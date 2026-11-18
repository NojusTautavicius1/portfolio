"use client";

import { useEffect } from "react";

import { loadGsap, MOTION_OK } from "@/lib/gsap";
import { whenIdle } from "@/lib/idle";

// Runs once the browser is idle. Elements are only hidden from that point, so the page
// still reads fine without JS or with reduced motion.
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
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.07,
                overwrite: true,
              }),
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
