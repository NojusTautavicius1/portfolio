const paths = {
  circle: ["M18 34 C14 14 70 4 120 6 C176 9 198 22 192 38 C186 54 120 60 72 56 C28 52 6 42 12 28 C17 16 48 10 86 9"],
  underline: ["M3 38 C48 30 110 34 197 24", "M24 52 C80 44 130 48 186 42"],
  strike: ["M2 34 C50 26 120 36 198 24"],
};

// Explicit sizes: an absolutely positioned <svg> does not stretch between left/right insets.
const placement = {
  circle: "-left-[0.32em] -top-[0.28em] h-[calc(100%+0.56em)] w-[calc(100%+0.64em)]",
  underline: "-bottom-[0.32em] left-0 h-[0.5em] w-full",
  strike: "-left-[0.1em] top-1/2 h-[0.5em] w-[calc(100%+0.2em)] -translate-y-1/2",
};

type ScribbleProps = {
  kind: keyof typeof paths;
  /** "view": draws as it scrolls into view. "load": draws once after a delay (hero, board). */
  trigger?: "view" | "load";
  delay?: number;
  children: React.ReactNode;
};

/** A red hand-drawn mark around, under or through a word. Purely decorative (aria-hidden SVG). */
export function Scribble({ kind, trigger = "view", delay = 0, children }: ScribbleProps) {
  return (
    <span className={`scribble-host relative inline-block ${trigger === "load" ? "scribble-load" : "scribble-view"}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className={`scribble pointer-events-none absolute ${placement[kind]} overflow-visible`}
        style={{ "--scribble-delay": `${delay}s` } as React.CSSProperties}
        fill="none"
      >
        {paths[kind].map((d) => (
          <path key={d} d={d} pathLength={1} stroke="var(--accent)" strokeWidth={2.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </span>
  );
}
