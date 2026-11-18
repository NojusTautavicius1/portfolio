"use client";

import { useEffect, useRef, useState } from "react";

import type { Suit } from "@/content/areas";

import { CardFront } from "./PlayingCard";
import { FINE_POINTER_QUERY as FINE_POINTER, resetTilt, tilt } from "./tilt";

export type HeroCardData = {
  suit: Suit;
  rank: string;
  name: string;
  line: string;
  stack: string[];
  best: string;
};

// Corner slots. `from` points back toward the name, so the deal-out animation starts behind it.
const slots = [
  { position: "left-[2%] top-[4%] sm:left-[5%] sm:top-[8%]", rot: -14, from: ["36vw", "20vh"], depth: 18, delay: 0.15 },
  { position: "right-[2%] top-[2%] sm:right-[6%] sm:top-[6%]", rot: 11, from: ["-36vw", "22vh"], depth: 26, delay: 0.27 },
  { position: "left-[3%] bottom-[2%] sm:left-[9%] sm:bottom-[7%]", rot: 9, from: ["32vw", "-18vh"], depth: 22, delay: 0.39 },
  { position: "right-[3%] bottom-[4%] sm:right-[8%] sm:bottom-[9%]", rot: -9, from: ["-34vw", "-20vh"], depth: 14, delay: 0.51 },
];

/**
 * The four direction cards around the name. Each card is a real button: hover tilts it
 * (fine pointers only), click / Enter flips it and brings it to the centre at a readable size.
 */
export function HeroDeck({ cards, flipHint }: { cards: HeroCardData[]; flipHint: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  // Gentle parallax: every card drifts with the pointer at its own depth.
  useEffect(() => {
    const element = stage.current;
    if (!element || !matchMedia(FINE_POINTER).matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--px", ((event.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        element.style.setProperty("--py", ((event.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // An open card closes with Escape or a click anywhere else.
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
    const onDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest("[data-hero-card]")) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function toggle(index: number, slot: HTMLElement) {
    if (open === index) {
      setOpen(null);
      return;
    }
    const area = stage.current?.getBoundingClientRect();
    if (area) {
      const rect = slot.getBoundingClientRect();
      const target = Math.min(320, area.width * 0.62);
      slot.style.setProperty("--tx", `${area.left + area.width / 2 - (rect.left + rect.width / 2)}px`);
      slot.style.setProperty("--ty", `${area.top + area.height / 2 - (rect.top + rect.height / 2)}px`);
      slot.style.setProperty("--open-scale", String(Math.min(3.2, Math.max(1.5, target / rect.width))));
    }
    setOpen(index);
  }

  return (
    <div ref={stage} className="absolute inset-0">
      {cards.map((card, index) => {
        const slot = slots[index];
        const isOpen = open === index;
        return (
          <div
            key={card.suit}
            data-open={isOpen}
            className={`deal absolute ${slot.position} ${isOpen ? "z-30" : "z-0 hover:z-20 focus-within:z-20"}`}
            style={
              {
                "--rot": `${slot.rot}deg`,
                "--from-x": slot.from[0],
                "--from-y": slot.from[1],
                "--depth": slot.depth,
                "--delay": `${slot.delay}s`,
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              data-hero-card=""
              aria-pressed={isOpen}
              data-flipped={isOpen}
              onClick={(event) => toggle(index, event.currentTarget.parentElement as HTMLElement)}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
              className="card cursor-pointer [--card-w:clamp(72px,11vw,176px)]"
            >
              <span className="card-float" style={{ "--float-delay": `${index * -1.3}s` } as React.CSSProperties}>
                <span className="card-tilt">
                  <span className="card-inner">
                    <CardFront suit={card.suit} rank={card.rank} label={card.name} />
                    <span className="card-face card-back flex flex-col p-[0.95em]">
                      <span className="card-frame" />
                      <span aria-hidden className="absolute -right-[0.15em] bottom-[1.6em] text-[6.5em] leading-none opacity-[0.06]">
                        {suitGlyph(card.suit)}
                      </span>
                      <span aria-hidden className={`font-display-wide text-[0.9em] ${card.suit === "hearts" || card.suit === "diamonds" ? "foil-red" : "foil"}`}>
                        {card.rank}
                        {suitGlyph(card.suit)}
                      </span>
                      <span className="mt-[0.4em] text-[0.82em] font-semibold uppercase leading-[1.05] tracking-tight [overflow-wrap:anywhere]">
                        {card.name}
                      </span>
                      <span className="mt-[0.35em] text-[0.62em] leading-snug text-muted">{card.line}</span>
                      <span className="mt-auto flex flex-wrap gap-[0.25em]">
                        {card.stack.map((item) => (
                          <span key={item} className="rounded-full border border-white/20 px-[0.45em] py-[0.1em] font-mono text-[0.48em]">
                            {item}
                          </span>
                        ))}
                      </span>
                      <span className="mt-[0.5em] font-mono text-[0.52em] text-accent">{card.best}</span>
                    </span>
                  </span>
                </span>
              </span>
              <span className="sr-only"> — {flipHint}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function suitGlyph(suit: Suit) {
  return { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[suit];
}
