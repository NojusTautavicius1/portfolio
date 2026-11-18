import { redSuits, suitSymbol, type Suit } from "@/content/areas";

// Built from <span>s only, so a card can live inside a <button> (phrasing content).

type CardFrontProps = {
  suit: Suit;
  rank: string;
  /** Small caption under the big centre suit. */
  label?: string;
};

/** Front face: rank + suit in two corners, a big suit in the middle. Decorative glyphs are aria-hidden. */
export function CardFront({ suit, rank, label }: CardFrontProps) {
  const red = redSuits.includes(suit);
  const symbol = suitSymbol[suit];
  const corner = (
    <span aria-hidden className={`flex flex-col items-center leading-none ${red ? "card-suit-red" : ""}`}>
      <span className="font-display-wide text-[1.55em] tracking-tight">{rank}</span>
      <span className="mt-[0.1em] text-[1.25em]">{symbol}</span>
    </span>
  );

  return (
    <span className="card-face card-front">
      <span className="absolute inset-[0.45em] rounded-[0.45em] border border-black/10" />
      <span className="absolute left-[0.55em] top-[0.55em]">{corner}</span>
      <span className="absolute bottom-[0.55em] right-[0.55em] rotate-180">{corner}</span>
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-[0.5em]">
        <span aria-hidden className={`text-[4.4em] leading-none ${red ? "card-suit-red" : ""}`}>
          {symbol}
        </span>
        {label && (
          <span className="max-w-[80%] text-center font-mono text-[0.62em] font-medium uppercase leading-tight tracking-[0.08em]">
            {label}
          </span>
        )}
      </span>
      <span className="card-sheen" />
    </span>
  );
}

/** Patterned red back: the side shown while a card is in the air. */
export function CardPatternBack({ className = "card-back" }: { className?: string }) {
  return (
    <span className={`card-face card-pattern ${className}`}>
      <span className="absolute inset-[0.45em] grid place-items-center rounded-[0.45em] border border-white/25">
        <span className="font-display-wide text-[1.6em] tracking-tight">N·T</span>
      </span>
      <span className="card-sheen" />
    </span>
  );
}
