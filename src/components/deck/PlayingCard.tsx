import Image from "next/image";

import { redSuits, suitSymbol, type Suit } from "@/content/areas";

// Built from <span>s only, so a card can live inside a <button> (phrasing content).

// Rings + 36 tick marks behind the centre suit.
function Medallion() {
  const ticks = Array.from({ length: 36 }, (_, index) => {
    const angle = (index / 36) * Math.PI * 2;
    const inner = index % 3 === 0 ? 33 : 36;
    return `M${(Math.cos(angle) * inner).toFixed(2)} ${(Math.sin(angle) * inner).toFixed(2)}L${(Math.cos(angle) * 40).toFixed(2)} ${(Math.sin(angle) * 40).toFixed(2)}`;
  }).join("");

  return (
    <svg
      aria-hidden
      viewBox="-46 -46 92 92"
      className="absolute inset-0 m-auto h-[62%] w-[62%]"
      fill="none"
      stroke="rgb(214 214 214 / 0.32)"
    >
      <circle r="44" strokeWidth="0.6" />
      <circle r="40" strokeWidth="0.4" strokeDasharray="1 2.2" />
      <path d={ticks} strokeWidth="0.5" />
      <circle r="30" strokeWidth="0.5" />
      <circle r="28" strokeWidth="0.3" />
    </svg>
  );
}

type CardFrontProps = {
  suit: Suit;
  rank: string;
  /** Small caption under the big centre suit. */
  label?: string;
};

export function CardFront({ suit, rank, label }: CardFrontProps) {
  const foil = redSuits.includes(suit) ? "foil-red" : "foil";
  const symbol = suitSymbol[suit];
  const corner = (
    <span aria-hidden className="flex flex-col items-center leading-none">
      <span className={`font-display-wide text-[1.55em] tracking-tight ${foil}`}>{rank}</span>
      <span className={`mt-[0.1em] text-[1.25em] ${foil}`}>{symbol}</span>
    </span>
  );

  return (
    <span className="card-face card-front">
      <span className="card-frame" />
      <span className="absolute top-[0.6em] left-[0.62em]">{corner}</span>
      <span className="absolute right-[0.62em] bottom-[0.6em] rotate-180">{corner}</span>
      <span className="absolute inset-0">
        <Medallion />
        <span
          aria-hidden
          className={`absolute inset-0 m-auto grid h-fit place-items-center text-[3.6em] leading-none ${foil}`}
        >
          {symbol}
        </span>
      </span>
      {label && (
        <span className="absolute inset-x-0 bottom-[3.1em] mx-auto max-w-[62%] text-center font-mono text-[0.56em] leading-tight font-medium tracking-[0.14em] text-[#b9b7b2] uppercase">
          {label}
        </span>
      )}
      <span className="card-sheen" />
    </span>
  );
}

export function CardPatternBack({ className = "card-back" }: { className?: string }) {
  return (
    <span className={`card-face card-pattern ${className}`}>
      <span className="card-frame" />
      <span className="absolute inset-0">
        <Medallion />
        <span className="foil absolute inset-0 m-auto grid h-fit place-items-center font-display-wide text-[1.35em] tracking-tight">
          N·T
        </span>
      </span>
      <span className="card-sheen" />
    </span>
  );
}

type ProjectCardFrontProps = {
  suit: Suit;
  rank: string;
  title: string;
  /** Two or three words on what the project is, under the title. */
  line: string;
  /** Screenshot shown in the card's picture window. */
  art?: string;
  /** Short facts under the title, like the rows on the About card. */
  rows?: { label: string; value: string }[];
  hidden?: boolean;
};

// A "picture card" for one project: its screenshot in the window, the name and what it is.
export function ProjectCardFront({ suit, rank, title, line, art, rows = [], hidden }: ProjectCardFrontProps) {
  const foil = redSuits.includes(suit) ? "foil-red" : "foil";
  const index = (
    <span aria-hidden className={`font-display-wide text-[0.75em] leading-none ${foil}`}>
      {rank}
      {suitSymbol[suit]}
    </span>
  );

  return (
    <span hidden={hidden} className="card-face card-front flex flex-col p-[0.9em]">
      <span className="card-frame" />
      <span className="flex items-center justify-between">
        {index}
        <span className="font-mono text-[0.32em] tracking-[0.14em] text-[#b9b7b2] uppercase">{line}</span>
      </span>

      <span className="relative mt-[0.5em] block aspect-4/3 overflow-hidden rounded-[0.35em] border border-white/15 bg-[radial-gradient(circle_at_50%_35%,#262626,#0d0d0d)]">
        {art ? (
          <Image src={art} alt="" fill sizes="320px" loading="eager" className="object-cover object-top" />
        ) : (
          <span className={`absolute inset-0 grid place-items-center text-[2.2em] ${foil}`}>
            {suitSymbol[suit]}
          </span>
        )}
      </span>

      <span className="mt-[0.55em] font-display-wide text-[0.62em] leading-[1.05] uppercase">{title}</span>
      {rows.length > 0 && (
        <span className="mt-[0.4em] block space-y-[0.2em] font-mono text-[0.32em] tracking-[0.08em] uppercase">
          {rows.map((row) => (
            <span
              key={row.label}
              className="flex justify-between gap-[1em] border-b border-white/10 pb-[0.2em]"
            >
              <span className="text-muted">{row.label}</span>
              <span className="truncate text-right">{row.value}</span>
            </span>
          ))}
        </span>
      )}
      <span className="mt-auto flex justify-end">
        <span className="rotate-180">{index}</span>
      </span>
      <span className="card-sheen" />
    </span>
  );
}
