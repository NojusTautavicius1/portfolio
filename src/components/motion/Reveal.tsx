"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Fades in every [data-reveal] element as it enters the viewport, in small staggered batches.
 * Elements are only hidden once this runs, so the page is fully readable without JS
 * and with reduced motion. Mount it once, after the sections it should animate.
 */
export function Reveal() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, overwrite: true }),
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => media.revert();
  });

  return null;
}
