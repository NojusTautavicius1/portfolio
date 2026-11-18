"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Suit } from "@/content/areas";

import { Crack } from "./Crack";
import { CardFront, CardPatternBack } from "./PlayingCard";

type Point = { id: number; x: number; y: number };
type Flight = Point & { fromX: number; fromY: number; suit: Suit; rank: string };

const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7"];
const FLIGHT_MS = 430;
const CRACK_MS = 3800;
const CROSSHAIR = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none' stroke='%23ff5446' stroke-width='2'><circle cx='18' cy='18' r='11'/><path d='M18 2v9M18 25v9M2 18h9M25 18h9'/></svg>") 18 18, crosshair`;

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

type Labels = { off: string; on: string; hint: string; jackpot: string };

/**
 * Bottom-left toggle that turns the page into a target: every click throws a card from the
 * toggle to the pointer, the "screen" cracks where it lands, and some targets react
 * (see react() below). Escape or the toggle switches it off. Hidden for reduced motion.
 */
export function CardThrower({ labels }: { labels: Labels }) {
  const [armed, setArmed] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [cracks, setCracks] = useState<Point[]>([]);
  const [bursts, setBursts] = useState<Point[]>([]);
  const [jackpot, setJackpot] = useState<number | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (!armed) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setArmed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [armed]);

  function throwAt(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    const origin = toggle.current?.getBoundingClientRect();
    if (!origin) return;
    const id = nextId.current++;
    setFlights((current) => [
      ...current.slice(-7), // at most 8 cards in the air
      { id, x: event.clientX, y: event.clientY, fromX: origin.left + 24, fromY: origin.top, suit: pick(SUITS), rank: pick(RANKS) },
    ]);
  }

  const land = useCallback((flight: Flight) => {
    const id = flight.id;
    setCracks((current) => [...current, { id, x: flight.x, y: flight.y }]);
    setTimeout(() => setCracks((current) => current.filter((crack) => crack.id !== id)), CRACK_MS);
    navigator.vibrate?.(18);

    const reaction = react(flight.x, flight.y);
    if (reaction === "burst" || reaction === "jackpot") {
      setBursts((current) => [...current, { id, x: flight.x, y: flight.y }]);
      setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 1600);
    }
    if (reaction === "jackpot") {
      setJackpot(id);
      setTimeout(() => setJackpot((current) => (current === id ? null : current)), 1700);
    }
  }, []);

  const finish = useCallback((id: number) => setFlights((current) => current.filter((flight) => flight.id !== id)), []);

  return (
    <div data-thrower="" className="motion-reduce:hidden">
      <button
        ref={toggle}
        type="button"
        aria-pressed={armed}
        onClick={() => setArmed((value) => !value)}
        className="fixed bottom-4 left-4 z-50 flex min-h-11 items-center gap-3 rounded-full border border-line bg-bg/80 py-2 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.12em] backdrop-blur-md transition-colors hover:border-muted md:bottom-6 md:left-6"
      >
        <span aria-hidden className={`relative h-5 w-9 rounded-full transition-colors ${armed ? "bg-accent-fill" : "bg-line"}`}>
          <span className={`absolute top-0.5 size-4 rounded-full bg-text transition-[left] ${armed ? "left-[18px]" : "left-0.5"}`} />
        </span>
        {armed ? labels.on : labels.off}
      </button>

      {armed && (
        <>
          <div
            aria-hidden
            onPointerDown={throwAt}
            className="fixed inset-0 z-[45] touch-none select-none"
            style={{ cursor: CROSSHAIR }}
          />
          <p role="status" className="pointer-events-none fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-line bg-bg/85 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted backdrop-blur-md md:block">
            {labels.hint}
          </p>
        </>
      )}

      {flights.map((flight) => (
        <ThrownCard key={flight.id} flight={flight} onLand={land} onDone={finish} />
      ))}
      {cracks.map((crack) => (
        <Crack key={crack.id} x={crack.x} y={crack.y} seed={crack.id * 7919} />
      ))}
      {bursts.map((burst) => (
        <Burst key={burst.id} x={burst.x} y={burst.y} />
      ))}
      {jackpot !== null && (
        <p aria-hidden className="jackpot pointer-events-none fixed inset-0 z-[48] grid place-items-center bg-[radial-gradient(closest-side,rgb(10_10_10/0.9),rgb(10_10_10/0.55)_60%,transparent)] font-display-wide text-[clamp(3rem,13vw,12rem)] uppercase text-accent">
          {labels.jackpot}
        </p>
      )}
    </div>
  );
}

/** Finds what was hit (by geometry: some targets ignore pointer events) and plays its reaction. */
function react(x: number, y: number): "burst" | "jackpot" | null {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("[data-egg], [data-hero-card]"))
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
    .sort((a, b) => a.rect.width * a.rect.height - b.rect.width * b.rect.height);
  const target = candidates[0]?.element;
  if (!target) return null;

  if (target.matches("[data-hero-card]")) {
    target.click(); // flips the hero card
    return null;
  }
  switch (target.dataset.egg) {
    case "letter":
      target.animate(
        [
          { transform: "translateY(0) rotate(0deg)" },
          { transform: "translateY(0.55em) rotate(24deg)", offset: 0.22 },
          { transform: "translateY(0.55em) rotate(24deg)", offset: 0.78 },
          { transform: "translateY(0) rotate(0deg)" },
        ],
        { duration: 2600, easing: "cubic-bezier(0.3, 1.3, 0.5, 1)" },
      );
      return null;
    case "project-card":
      target.parentElement?.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(360deg)" }], {
        duration: 900,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      });
      return null;
    case "status":
      return "burst";
    case "cv":
      return "jackpot";
    default:
      return null;
  }
}

/** One card flying along an arc from the toggle to the target, then dropping off screen. */
function ThrownCard({ flight, onLand, onDone }: { flight: Flight; onLand: (flight: Flight) => void; onDone: (id: number) => void }) {
  const card = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = card.current;
    if (!element) return;
    const start = performance.now();
    const dx = flight.x - flight.fromX;
    const dy = flight.y - flight.fromY;
    const controlX = flight.fromX + dx / 2;
    const controlY = flight.fromY + dy / 2 - Math.min(260, Math.hypot(dx, dy) * 0.35);
    let frame = 0;

    const place = (x: number, y: number, spin: number, scale: number) => {
      element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${spin}deg) scale(${scale})`;
    };

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FLIGHT_MS);
      const e = 1 - (1 - t) * (1 - t);
      const x = (1 - e) ** 2 * flight.fromX + 2 * (1 - e) * e * controlX + e * e * flight.x;
      const y = (1 - e) ** 2 * flight.fromY + 2 * (1 - e) * e * controlY + e * e * flight.y;
      place(x, y, (1 - e) * -620 + 8, 0.45 + 0.55 * e);
      if (t < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      onLand(flight);
      const drop = element.animate(
        [
          { transform: element.style.transform, opacity: 1 },
          { transform: `translate(${flight.x}px, ${flight.y + 24}px) translate(-50%, -50%) rotate(14deg) scale(1)`, opacity: 1, offset: 0.25 },
          { transform: `translate(${flight.x + 40}px, ${window.innerHeight + 240}px) translate(-50%, -50%) rotate(65deg) scale(1)`, opacity: 0.2 },
        ],
        { duration: 1300, easing: "cubic-bezier(0.55, 0, 0.8, 0.4)", fill: "forwards" },
      );
      drop.onfinish = () => onDone(flight.id);
    };

    place(flight.fromX, flight.fromY, 0, 0.45);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [flight, onLand, onDone]);

  return (
    <span ref={card} aria-hidden className="card pointer-events-none fixed left-0 top-0 z-[46] [--card-w:clamp(64px,7vw,92px)]">
      <span className="card-inner">
        <CardFront suit={flight.suit} rank={flight.rank} />
        <CardPatternBack />
      </span>
    </span>
  );
}

/** A fountain of small suit glyphs bursting out of a point. */
function Burst({ x, y }: { x: number; y: number }) {
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
          { transform: `translate(${dx}px, ${dy}px) rotate(${index * 40}deg) scale(1)`, opacity: 1, offset: 0.45 },
          { transform: `translate(${dx * 1.3}px, ${dy + 420}px) rotate(${index * 90}deg) scale(0.9)`, opacity: 0 },
        ],
        { duration: 1500, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" },
      );
    });
  }, []);

  return (
    <span ref={root} aria-hidden className="pointer-events-none fixed z-[46]" style={{ left: x, top: y }}>
      {Array.from({ length: 14 }, (_, index) => (
        <span
          key={index}
          className={`absolute -translate-x-1/2 -translate-y-1/2 text-2xl ${index % 2 ? "text-accent" : "text-text"}`}
        >
          {["♠", "♥", "♦", "♣"][index % 4]}
        </span>
      ))}
    </span>
  );
}
