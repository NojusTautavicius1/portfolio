"use client";

import { useEffect, useRef } from "react";

import { loadGsap } from "@/lib/gsap";

const HORIZONTAL = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

type ProjectsTrackProps = React.ComponentProps<"section"> & { count: number };

/**
 * Desktop with motion: pins the projects section and scrolls the [data-track] list sideways
 * while the user scrolls down. Sets data-horizontal so the server-rendered markup switches
 * to its horizontal layout (see the group-data-[horizontal=true] classes in Projects.tsx).
 * Mobile and reduced motion keep the plain vertical list and never download GSAP for it.
 */
export function ProjectsTrack({ count, children, ...sectionProps }: ProjectsTrackProps) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = matchMedia(HORIZONTAL);
    let disposed = false;
    let started = false;
    let revert: (() => void) | undefined;

    async function setup() {
      // gsap.matchMedia below handles later breakpoint changes itself; set up only once.
      if (started || disposed) return;
      started = true;
      const element = section.current;
      const track = element?.querySelector<HTMLElement>("[data-track]");
      const frame = track?.parentElement;
      if (!element || !track || !frame) return;
      const counter = element.querySelector<HTMLElement>("[data-counter]");
      const bar = element.querySelector<HTMLElement>("[data-progress]");

      const { gsap, ScrollTrigger } = await loadGsap();
      if (disposed) return;

      const media = gsap.matchMedia();
      media.add(HORIZONTAL, () => {
        element.dataset.horizontal = "true";

        // Measured from the untransformed wrapper so refreshes are stable.
        const distance = () => {
          const gutter = parseFloat(getComputedStyle(frame).paddingLeft);
          const start = frame.getBoundingClientRect().left + gutter;
          return Math.max(0, start + track.scrollWidth - window.innerWidth + gutter);
        };

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              if (counter) {
                const index = Math.min(count, Math.floor(self.progress * count) + 1);
                counter.textContent = String(index).padStart(2, "0");
              }
            },
          },
        });

        return () => {
          delete element.dataset.horizontal;
        };
      });
      // The pin adds scroll length, so anything measured before it (reveals) must re-measure.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      revert = () => media.revert();
    }

    // Load GSAP only once the layout actually needs the pinned track (now or after a resize).
    if (query.matches) setup();
    const onChange = () => query.matches && setup();
    query.addEventListener("change", onChange);

    return () => {
      disposed = true;
      query.removeEventListener("change", onChange);
      revert?.();
    };
  }, [count]);

  return (
    <section ref={section} {...sectionProps}>
      {children}
    </section>
  );
}
