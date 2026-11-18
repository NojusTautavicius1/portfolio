"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const HORIZONTAL = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

type ProjectsTrackProps = React.ComponentProps<"section"> & { count: number };

/**
 * Desktop with motion: pins the projects section and scrolls the [data-track] list sideways
 * while the user scrolls down. Sets data-horizontal so the server-rendered markup switches
 * to its horizontal layout (see the group-data-[horizontal=true] classes in Projects.tsx).
 * Mobile and reduced motion keep the plain vertical list.
 */
export function ProjectsTrack({ count, children, ...sectionProps }: ProjectsTrackProps) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = section.current;
      const track = element?.querySelector<HTMLElement>("[data-track]");
      const frame = track?.parentElement;
      if (!element || !track || !frame) return;
      const counter = element.querySelector<HTMLElement>("[data-counter]");
      const bar = element.querySelector<HTMLElement>("[data-progress]");

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

      return () => media.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} {...sectionProps}>
      {children}
    </section>
  );
}
