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

// Corner slots, relative to the stage centre (cqw/cqh = % of the stage, see globals.css .deal).
// `aim` is the angle the card points at its corner while clustered in the centre before take-off.
// On phones the bottom cards sit lower so they clear the buttons.
const slots = [
  {
    end: "[--end-x:-38cqw] [--end-y:-30cqh] sm:[--end-y:-26cqh]",
    aim: -45,
    dir: [-1, -1],
    rot: -14,
    depth: 18,
    delay: 0,
  },
  {
    end: "[--end-x:38cqw] [--end-y:-31cqh] sm:[--end-y:-28cqh]",
    aim: 45,
    dir: [1, -1],
    rot: 11,
    depth: 26,
    delay: 0.04,
  },
  {
    end: "[--end-x:-37cqw] [--end-y:37cqh] sm:[--end-y:25cqh]",
    aim: -135,
    dir: [-1, 1],
    rot: 9,
    depth: 22,
    delay: 0.08,
  },
  {
    end: "[--end-x:37cqw] [--end-y:36cqh] sm:[--end-y:23cqh]",
    aim: 135,
    dir: [1, 1],
    rot: -9,
    depth: 14,
    delay: 0.12,
  },
];

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

  return (
    // Container for cqw/cqh; --cw is the card width (also scales the clustered offsets).
    <div
      ref={stage}
      className="[container-type:size] absolute inset-0 [--cw:clamp(72px,11vw,176px)] [--open-scale:3] sm:[--open-scale:2]"
    >
      {cards.map((card, index) => {
        const slot = slots[index];
        const isOpen = open === index;
        return (
          <div
            key={card.suit}
            data-open={isOpen}
            className={`deal ${slot.end} ${isOpen ? "z-30" : "z-0 focus-within:z-20 hover:z-20"}`}
            style={
              {
                "--rot": `${slot.rot}deg`,
                "--aim": `${slot.aim}deg`,
                "--aim-x": `calc(var(--cw) * ${slot.dir[0] * 0.3})`,
                "--aim-y": `calc(var(--cw) * ${slot.dir[1] * 0.42})`,
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
              onClick={() => setOpen(isOpen ? null : index)}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
              className="card cursor-pointer [--card-w:var(--cw)]"
            >
              <span
                className="card-float"
                style={{ "--float-delay": `${index * -1.3}s` } as React.CSSProperties}
              >
                <span className="card-tilt">
                  <span className="card-inner">
                    <CardFront suit={card.suit} rank={card.rank} label={card.name} />
                    <span className="card-face card-back flex flex-col p-[0.95em]">
                      <span className="card-frame" />
                      <span
                        aria-hidden
                        className="absolute -right-[0.15em] bottom-[1.6em] text-[6.5em] leading-none opacity-[0.06]"
                      >
                        {suitGlyph(card.suit)}
                      </span>
                      <span
                        aria-hidden
                        className={`font-display-wide text-[0.9em] ${card.suit === "hearts" || card.suit === "diamonds" ? "foil-red" : "foil"}`}
                      >
                        {card.rank}
                        {suitGlyph(card.suit)}
                      </span>
                      <span className="mt-[0.4em] text-[0.82em] leading-[1.05] font-semibold tracking-tight [overflow-wrap:anywhere] uppercase">
                        {card.name}
                      </span>
                      <span className="mt-[0.35em] text-[0.62em] leading-snug text-muted">{card.line}</span>
                      <span className="mt-auto flex flex-wrap gap-[0.25em]">
                        {card.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/20 px-[0.45em] py-[0.1em] font-mono text-[0.48em]"
                          >
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
