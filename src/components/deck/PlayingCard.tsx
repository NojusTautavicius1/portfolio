import { redSuits, suitSymbol, type Suit } from "@/content/areas";

// Built from <span>s only, so a card can live inside a <button> (phrasing content).

/** Engraved medallion behind the centre suit: rings + 36 tick marks, in silver hairlines. */
function Medallion() {
  const ticks = Array.from({ length: 36 }, (_, index) => {
    const angle = (index / 36) * Math.PI * 2;
    const inner = index % 3 === 0 ? 33 : 36;
    return `M${(Math.cos(angle) * inner).toFixed(2)} ${(Math.sin(angle) * inner).toFixed(2)}L${(Math.cos(angle) * 40).toFixed(2)} ${(Math.sin(angle) * 40).toFixed(2)}`;
  }).join("");

  return (
    <svg aria-hidden viewBox="-46 -46 92 92" className="absolute inset-0 m-auto h-[62%] w-[62%]" fill="none" stroke="rgb(214 214 214 / 0.32)">
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

/** Front face: foil rank + suit in two corners, an engraved medallion with the suit in the middle. */
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
      <span className="absolute left-[0.62em] top-[0.6em]">{corner}</span>
      <span className="absolute bottom-[0.6em] right-[0.62em] rotate-180">{corner}</span>
      <span className="absolute inset-0">
        <Medallion />
        <span aria-hidden className={`absolute inset-0 m-auto grid h-fit place-items-center text-[3.6em] leading-none ${foil}`}>
          {symbol}
        </span>
      </span>
      {label && (
        <span className="absolute inset-x-0 bottom-[3.1em] mx-auto max-w-[62%] text-center font-mono text-[0.56em] font-medium uppercase leading-tight tracking-[0.14em] text-[#b9b7b2]">
          {label}
        </span>
      )}
      <span className="card-sheen" />
    </span>
  );
}

/** Red guilloche back with a silver frame and an engraved N·T medallion. */
export function CardPatternBack({ className = "card-back" }: { className?: string }) {
  return (
    <span className={`card-face card-pattern ${className}`}>
      <span className="card-frame" />
      <span className="absolute inset-0">
        <Medallion />
        <span className="foil absolute inset-0 m-auto grid h-fit place-items-center font-display-wide text-[1.35em] tracking-tight">N·T</span>
      </span>
      <span className="card-sheen" />
    </span>
  );
}
