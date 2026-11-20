"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useInfinitePan } from "./useInfinitePan";

type ProjectBoardProps = {
  width: number;
  height: number;
  label: string;
  hint: string;
  start?: { x: number; y: number };
  children: React.ReactNode;
};

const ORIGIN = { x: 0, y: 0 };
const pad = (value: number) => String(Math.round(value)).padStart(4, "0");

// The world is rendered 2 × 2 and the plane wraps, so it looks endless in every direction.
// Only the first copy is visible to screen readers. The other three stay clickable (the view
// often shows them after panning past an edge) but are hidden from screen readers and Tab.
export function ProjectBoard({ width, height, label, hint, start = ORIGIN, children }: ProjectBoardProps) {
  const coords = useRef<HTMLSpanElement>(null);
  const [touched, setTouched] = useState(false);

  const showCoords = useCallback((x: number, y: number) => {
    if (coords.current) coords.current.textContent = `X ${pad(x)} · Y ${pad(y)}`;
  }, []);
  const hideHint = useCallback(() => setTouched(true), []);

  const { viewport, plane } = useInfinitePan({
    width,
    height,
    start,
    onMove: showCoords,
    onFirstInteraction: hideHint,
  });

  useEffect(() => {
    plane.current
      ?.querySelectorAll<HTMLElement>('[data-copy]:not([data-copy="0"]) :is(a, button, [tabindex])')
      .forEach((element) => (element.tabIndex = -1));
  }, [plane]);

  return (
    <div
      ref={viewport}
      tabIndex={0}
      role="region"
      aria-label={label}
      className="fixed inset-x-0 top-16 bottom-0 cursor-grab touch-none overflow-hidden bg-bg outline-none select-none data-[dragging=true]:cursor-grabbing"
    >
      <div
        ref={plane}
        className="absolute top-0 left-0 will-change-transform"
        style={{ width: width * 2, height: height * 2 }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            data-copy={copy}
            aria-hidden={copy > 0 || undefined}
            className="board-grid absolute"
            style={{ left: (copy % 2) * width, top: Math.floor(copy / 2) * height, width, height }}
          >
            {children}
          </div>
        ))}
      </div>

      <span ref={coords} aria-hidden className="board-pill fixed right-6 bottom-6 text-muted" />
      <p
        className={`board-pill fixed bottom-6 left-1/2 -translate-x-1/2 text-text uppercase transition-opacity duration-700 ${touched ? "opacity-0" : ""}`}
      >
        ✥ {hint}
      </p>
    </div>
  );
}
