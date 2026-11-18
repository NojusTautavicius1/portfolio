/** Deterministic pseudo-random numbers, so a crack keeps its shape across re-renders. */
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Radial fracture lines plus broken rings between them, centred on (0, 0). */
function crackPaths(seed: number) {
  const random = seeded(seed);
  const spokes = 9 + Math.floor(random() * 5);
  const rays: Array<Array<[number, number]>> = [];

  for (let i = 0; i < spokes; i++) {
    const base = (i / spokes) * Math.PI * 2 + random() * 0.45;
    const points: Array<[number, number]> = [[0, 0]];
    let radius = 0;
    const segments = 3 + Math.floor(random() * 4);
    for (let s = 0; s < segments; s++) {
      radius += 16 + random() * 30;
      const angle = base + (random() - 0.5) * 0.4;
      points.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
    }
    rays.push(points);
  }

  const toPath = (points: Array<[number, number]>) =>
    points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  const paths = rays.map(toPath);
  // Rings: join neighbouring rays at a similar distance, skipping some for a broken look.
  for (const ring of [1, 2]) {
    for (let i = 0; i < rays.length; i++) {
      if (random() < 0.35) continue;
      const a = rays[i][Math.min(ring, rays[i].length - 1)];
      const b = rays[(i + 1) % rays.length][Math.min(ring, rays[(i + 1) % rays.length].length - 1)];
      paths.push(toPath([a, [(a[0] + b[0]) / 2 + (random() - 0.5) * 8, (a[1] + b[1]) / 2 + (random() - 0.5) * 8], b]));
    }
  }
  return paths;
}

/** A glass crack drawn at a viewport point; fades itself out (see .crack in globals.css). */
export function Crack({ x, y, seed }: { x: number; y: number; seed: number }) {
  const paths = crackPaths(seed);
  return (
    <svg
      aria-hidden
      className="crack pointer-events-none fixed"
      style={{ left: x - 140, top: y - 140 }}
      width={280}
      height={280}
      viewBox="-140 -140 280 280"
      fill="none"
    >
      <g stroke="rgb(255 255 255 / 0.18)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      <g stroke="rgb(255 255 255 / 0.9)" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      <circle r={7} fill="rgb(255 255 255 / 0.85)" />
    </svg>
  );
}
