"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Suit } from "@/content/areas";

import { Crack } from "./Crack";
import { SuitBurst } from "./SuitBurst";
import { hit } from "./targets";
import { ThrownCard, type Flight } from "./ThrownCard";

type Point = { id: number; x: number; y: number };
type Labels = { off: string; on: string; hint: string; jackpot: string };

const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7"];
const MAX_IN_AIR = 8;
const CRACK_MS = 3800;
const BURST_MS = 1600;
const JACKPOT_MS = 1700;

const CROSSHAIR =
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' ` +
  `viewBox='0 0 36 36' fill='none' stroke='%23ff5446' stroke-width='2'><circle cx='18' cy='18' r='11'/>` +
  `<path d='M18 2v9M18 25v9M2 18h9M25 18h9'/></svg>") 18 18, crosshair`;

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

// Shows an item for a while, then removes it again.
function useTemporaryList<T extends { id: number }>(lifetime: number) {
  const [items, setItems] = useState<T[]>([]);
  const add = useCallback(
    (item: T) => {
      setItems((current) => [...current, item]);
      setTimeout(() => setItems((current) => current.filter((other) => other.id !== item.id)), lifetime);
    },
    [lifetime],
  );
  return [items, add] as const;
}

// Bottom-left toggle: while it is on, every click throws a card at the pointer.
export function CardThrower({ labels }: { labels: Labels }) {
  const [armed, setArmed] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [cracks, addCrack] = useTemporaryList<Point>(CRACK_MS);
  const [bursts, addBurst] = useTemporaryList<Point>(BURST_MS);
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

    const flight: Flight = {
      id: nextId.current++,
      x: event.clientX,
      y: event.clientY,
      fromX: origin.left + 24,
      fromY: origin.top,
      suit: pick(SUITS),
      rank: pick(RANKS),
    };
    setFlights((current) => [...current.slice(1 - MAX_IN_AIR), flight]);
  }

  const land = useCallback(
    ({ id, x, y }: Flight) => {
      addCrack({ id, x, y });
      navigator.vibrate?.(18);

      const reaction = hit(x, y);
      if (reaction) addBurst({ id, x, y });
      if (reaction === "jackpot") {
        setJackpot(id);
        setTimeout(() => setJackpot((current) => (current === id ? null : current)), JACKPOT_MS);
      }
    },
    [addCrack, addBurst],
  );

  const remove = useCallback((id: number) => {
    setFlights((current) => current.filter((flight) => flight.id !== id));
  }, []);

  return (
    <div data-thrower="" className="motion-reduce:hidden">
      <button
        ref={toggle}
        type="button"
        aria-pressed={armed}
        onClick={() => setArmed((value) => !value)}
        className="fixed bottom-4 left-4 z-50 flex min-h-11 items-center gap-3 rounded-full border border-line bg-bg/80 py-2 pr-4 pl-2 font-mono text-[11px] tracking-[0.12em] uppercase backdrop-blur-md transition-colors hover:border-muted md:bottom-6 md:left-6"
      >
        <span
          aria-hidden
          className={`relative h-5 w-9 rounded-full transition-colors ${armed ? "bg-accent-fill" : "bg-line"}`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-text transition-[left] ${armed ? "left-[18px]" : "left-0.5"}`}
          />
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
          <p
            role="status"
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-line bg-bg/85 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase backdrop-blur-md md:block"
          >
            {labels.hint}
          </p>
        </>
      )}

      {/* One shared perspective, so the cards tumble in the same 3D space. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[46] [perspective:1100px]">
        {flights.map((flight) => (
          <ThrownCard key={flight.id} flight={flight} onLand={land} onDone={remove} />
        ))}
      </div>

      {cracks.map((crack) => (
        <Crack key={crack.id} x={crack.x} y={crack.y} seed={crack.id * 7919} />
      ))}
      {bursts.map((burst) => (
        <SuitBurst key={burst.id} x={burst.x} y={burst.y} />
      ))}

      {jackpot !== null && (
        <p
          aria-hidden
          className="jackpot pointer-events-none fixed inset-0 z-[48] grid place-items-center bg-[radial-gradient(closest-side,rgb(10_10_10/0.9),rgb(10_10_10/0.55)_60%,transparent)] font-display-wide text-[clamp(3rem,13vw,12rem)] text-accent uppercase"
        >
          {labels.jackpot}
        </p>
      )}
    </div>
  );
}
