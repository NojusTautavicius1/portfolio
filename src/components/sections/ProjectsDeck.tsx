"use client";

import { useEffect, useRef, useState } from "react";

import type { Suit } from "@/content/areas";
import { loadGsap } from "@/lib/gsap";
import { CardFront, CardPatternBack } from "@/components/deck/PlayingCard";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export type ProjectCardData = { suit: Suit; rank: string; title: string };

type ProjectsDeckProps = React.ComponentProps<"section"> & { cards: ProjectCardData[] };

// Desktop: the section is pinned and one big card turns 360° per project while the matching
// article fades in. The face is swapped while the back is showing, so you never see it change.
// Mobile and reduced motion just get the plain list.
export function ProjectsDeck({ cards, children, ...sectionProps }: ProjectsDeckProps) {
  const section = useRef<HTMLElement>(null);
  const spinner = useRef<HTMLSpanElement>(null);
  const [face, setFace] = useState(0);

  useEffect(() => {
    const element = section.current;
    const card = spinner.current;
    if (!element || !card) return;
    const articles = Array.from(element.querySelectorAll<HTMLElement>("[data-project]"));
    const counter = element.querySelector<HTMLElement>("[data-counter]");
    const bar = element.querySelector<HTMLElement>("[data-progress]");
    const steps = Math.max(1, cards.length - 1);
    const query = matchMedia(PINNED);
    let disposed = false;
    let started = false;
    let revert: (() => void) | undefined;

    const activate = (index: number) => {
      articles.forEach((article, i) => {
        const active = i === index;
        article.dataset.active = String(active);
        article.inert = !active;
      });
      if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    };

    async function setup() {
      if (started || disposed || !element || !card) return;
      started = true;
      const { gsap, ScrollTrigger } = await loadGsap();
      if (disposed) return;

      const media = gsap.matchMedia();
      media.add(PINNED, () => {
        element.dataset.pinned = "true";
        activate(0);
        let current = 0;

        ScrollTrigger.create({
          trigger: element,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.8 * cards.length}`,
          pin: true,
          scrub: 0.6,
          snap: { snapTo: 1 / steps, duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const position = self.progress * steps;
            // One full turn per project, with a little lean in the direction of travel.
            const lean = Math.max(-12, Math.min(12, self.getVelocity() / 120));
            card.style.transform = `rotateY(${position * 360}deg) rotateZ(${-lean * 0.4}deg) rotateX(${lean}deg)`;
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            const index = Math.round(position);
            if (index !== current) {
              current = index;
              activate(index);
              setFace(index);
            }
          },
        });

        return () => {
          delete element.dataset.pinned;
          articles.forEach((article) => {
            delete article.dataset.active;
            article.inert = false;
          });
          card.style.transform = "";
        };
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      revert = () => media.revert();
    }

    if (query.matches) setup();
    const onChange = () => query.matches && setup();
    query.addEventListener("change", onChange);
    return () => {
      disposed = true;
      query.removeEventListener("change", onChange);
      revert?.();
    };
  }, [cards.length]);

  const active = cards[face] ?? cards[0];

  // The extra <div> matters: GSAP moves the pinned section into a "pin-spacer" wrapper. Without a
  // parent of our own, React later tries to remove the section from <main> and navigation crashes.
  return (
    <div>
      <section ref={section} {...sectionProps}>
        <div
          aria-hidden
          className="projects-spinner pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] items-center justify-center pt-24"
        >
          <span className="card [--card-w:clamp(220px,21vw,320px)]">
            <span className="card-float">
              <span
                ref={spinner}
                className="card-inner"
                style={{ transition: "none" }}
                data-egg="project-card"
              >
                <CardFront suit={active.suit} rank={active.rank} label={active.title} />
                <CardPatternBack />
              </span>
            </span>
          </span>
        </div>
        {children}
      </section>
    </div>
  );
}
