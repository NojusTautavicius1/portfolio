"use client";

import { useEffect, useRef } from "react";

const GLYPHS = ["♠", "♥", "♦", "♣"];
const PIECES = 14;

export function SuitBurst({ x, y }: { x: number; y: number }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pieces = Array.from(root.current?.children ?? []) as HTMLElement[];

    pieces.forEach((piece, index) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
      const speed = 160 + Math.random() * 220;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      piece.animate(
        [
          { transform: "translate(0, 0) rotate(0deg) scale(0.4)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) rotate(${index * 40}deg)`, opacity: 1, offset: 0.45 },
          {
            transform: `translate(${dx * 1.3}px, ${dy + 420}px) rotate(${index * 90}deg) scale(0.9)`,
            opacity: 0,
          },
        ],
        { duration: 1500, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" },
      );
    });
  }, []);

  return (
    <span ref={root} aria-hidden className="pointer-events-none fixed z-[46]" style={{ left: x, top: y }}>
      {Array.from({ length: PIECES }, (_, index) => (
        <span
          key={index}
          className={`absolute -translate-x-1/2 -translate-y-1/2 text-2xl ${index % 2 ? "text-accent" : "text-text"}`}
        >
          {GLYPHS[index % GLYPHS.length]}
        </span>
      ))}
    </span>
  );
}
