"use client";

import { useEffect, useRef } from "react";

import type { Suit } from "@/content/areas";
import { CardFront, CardPatternBack } from "@/components/deck/PlayingCard";

export type Flight = {
  id: number;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  suit: Suit;
  rank: string;
};

const FLIGHT_MS = 540;
const HOLD_MS = 1100;

type Props = {
  flight: Flight;
  onLand: (flight: Flight) => void;
  onDone: (id: number) => void;
};

type Pose = { x: number; y: number; z?: number; spin: number; tilt: number; flip: number; scale?: number };

function pose({ x, y, z = 0, spin, tilt, flip, scale = 1 }: Pose) {
  return (
    `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%) ` +
    `rotateZ(${spin}deg) rotateX(${tilt}deg) rotateY(${flip}deg) scale(${scale})`
  );
}

// Frisbee spin along an arc, sticks into the "glass", quivers, hangs for a second, drops.
export function ThrownCard({ flight, onLand, onDone }: Props) {
  const card = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = card.current;
    if (!element) return;

    const start = performance.now();
    const distance = Math.hypot(flight.x - flight.fromX, flight.y - flight.fromY);
    const arc = Math.min(240, distance * 0.32);
    const stickX = 34 + Math.random() * 12;
    const stickZ = (Math.random() - 0.5) * 60;
    const animations: Animation[] = [];
    let frame = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    // It lands back side up: the red back reads much better than a black face on the black page.
    const stuck = (tilt: number, z = -18) =>
      pose({ x: flight.x, y: flight.y, z, spin: stickZ, tilt, flip: 180 });

    const drop = () => {
      const fall = pose({
        x: flight.x + 50,
        y: window.innerHeight + 260,
        spin: stickZ + 70,
        tilt: 20,
        flip: 180,
      });
      const animation = element.animate(
        [
          { transform: stuck(stickX), opacity: 1 },
          { transform: stuck(stickX - 30, 0), opacity: 1, offset: 0.18 },
          { transform: fall, opacity: 0.25 },
        ],
        { duration: 1150, easing: "cubic-bezier(0.55, 0, 0.85, 0.35)", fill: "forwards" },
      );
      animations.push(animation);
      animation.onfinish = () => onDone(flight.id);
    };

    const land = () => {
      onLand(flight);
      const quiver = element.animate(
        [9, -6, 4, -2, 1, 0].map((offset) => ({ transform: stuck(stickX + offset) })),
        { duration: 460, easing: "ease-out", fill: "forwards" },
      );
      animations.push(quiver);
      quiver.onfinish = () => {
        holdTimer = setTimeout(drop, HOLD_MS);
      };
    };

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FLIGHT_MS);
      const travel = 1 - (1 - t) ** 2.2;
      const x = flight.fromX + (flight.x - flight.fromX) * travel;
      const y = flight.fromY + (flight.y - flight.fromY) * travel - arc * 4 * travel * (1 - travel);

      element.style.transform = pose({
        x,
        y,
        z: -380 * (1 - travel),
        spin: stickZ + (1 - travel) * 900,
        tilt: stickX + Math.sin(t * Math.PI * 3) * 8 * (1 - t), // frisbee wobble settling down
        flip: 180 * travel,
        scale: 0.6 + 0.4 * travel,
      });
      if (t < 1) frame = requestAnimationFrame(step);
      else land();
    };

    element.style.transform = pose({
      x: flight.fromX,
      y: flight.fromY,
      z: -380,
      spin: stickZ + 900,
      tilt: stickX,
      flip: 0,
      scale: 0.6,
    });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      animations.forEach((animation) => animation.cancel());
    };
  }, [flight, onLand, onDone]);

  return (
    <span
      ref={card}
      className="card absolute top-0 left-0 [--card-w:clamp(78px,8.5vw,118px)] [transform-style:preserve-3d]"
    >
      <span className="card-inner">
        <CardFront suit={flight.suit} rank={flight.rank} />
        <CardPatternBack />
      </span>
    </span>
  );
}
