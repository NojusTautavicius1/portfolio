const FINE_POINTER = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Pointer-move handler: tilts a .card toward the pointer and moves its sheen / foil (--mx, --my). */
export function tilt(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || !matchMedia(FINE_POINTER).matches) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  card.style.setProperty("--ry", `${(x - 0.5) * 26}deg`);
  card.style.setProperty("--rx", `${(0.5 - y) * 22}deg`);
  card.style.setProperty("--mx", `${x * 100}%`);
  card.style.setProperty("--my", `${y * 100}%`);
  card.style.setProperty("--lift", "28px");
  card.style.setProperty("--sheen", "0.75");
}

export function resetTilt(event: React.PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  for (const name of ["--ry", "--rx", "--mx", "--my", "--lift", "--sheen"]) card.style.removeProperty(name);
}

export const FINE_POINTER_QUERY = FINE_POINTER;
