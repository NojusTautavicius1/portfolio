"use client";

import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 6;
const FRICTION = 0.92;
const KEY_STEP = 160;

type ProjectBoardProps = {
  width: number;
  height: number;
  label: string;
  hint: string;
  start?: { x: number; y: number };
  children: React.ReactNode;
};

/**
 * Infinite, draggable board. The world (children) is rendered 2 × 2 and the plane is wrapped
 * modulo the world size, so it repeats seamlessly in every direction. Drag with inertia, scroll
 * / trackpad pans, arrow keys pan when the board is focused. A drag never triggers a link click.
 * Only the first copy is exposed to assistive tech; the other three are inert duplicates.
 */
export function ProjectBoard({ width, height, label, hint, start = { x: 0, y: 0 }, children }: ProjectBoardProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const coords = useRef<HTMLSpanElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    const planeElement = plane.current;
    if (!element || !planeElement) return;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = start.x;
    let y = start.y;
    let velocityX = 0;
    let velocityY = 0;
    let frame = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const render = () => {
      const wrappedX = ((x % width) + width) % width;
      const wrappedY = ((y % height) + height) % height;
      planeElement.style.transform = `translate3d(${-wrappedX}px, ${-wrappedY}px, 0)`;
      if (coords.current) coords.current.textContent = `X ${String(Math.round(wrappedX)).padStart(4, "0")} · Y ${String(Math.round(wrappedY)).padStart(4, "0")}`;
    };

    const glide = () => {
      velocityX *= FRICTION;
      velocityY *= FRICTION;
      x += velocityX;
      y += velocityY;
      render();
      if (Math.abs(velocityX) + Math.abs(velocityY) > 0.15) frame = requestAnimationFrame(glide);
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      cancelAnimationFrame(frame);
      dragging = true;
      moved = 0;
      velocityX = velocityY = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = performance.now();
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > DRAG_THRESHOLD && element.dataset.dragging !== "true") {
        element.dataset.dragging = "true";
        element.setPointerCapture(event.pointerId);
        setTouched(true);
      }
      const now = performance.now();
      const elapsed = Math.max(1, now - lastTime);
      x -= dx;
      y -= dy;
      velocityX = (-dx / elapsed) * 16;
      velocityY = (-dy / elapsed) * 16;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
      render();
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete element.dataset.dragging;
      // A pause before letting go means "stop here", not "fling".
      if (performance.now() - lastTime > 80) velocityX = velocityY = 0;
      if (!reduceMotion) frame = requestAnimationFrame(glide);
    };

    // A drag must not end in a link click.
    const onClickCapture = (event: MouseEvent) => {
      if (moved > DRAG_THRESHOLD) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      x += event.shiftKey ? event.deltaY : event.deltaX;
      y += event.shiftKey ? 0 : event.deltaY;
      render();
      setTouched(true);
    };

    const onKey = (event: KeyboardEvent) => {
      const steps: Record<string, [number, number]> = {
        ArrowLeft: [-KEY_STEP, 0],
        ArrowRight: [KEY_STEP, 0],
        ArrowUp: [0, -KEY_STEP],
        ArrowDown: [0, KEY_STEP],
      };
      const step = steps[event.key];
      if (!step || event.target !== element) return;
      event.preventDefault();
      x += step[0];
      y += step[1];
      render();
      setTouched(true);
    };

    render();
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerup", onUp);
    element.addEventListener("pointercancel", onUp);
    element.addEventListener("click", onClickCapture, true);
    element.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointercancel", onUp);
      element.removeEventListener("click", onClickCapture, true);
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("keydown", onKey);
    };
  }, [width, height, start.x, start.y]);

  return (
    <div
      ref={viewport}
      tabIndex={0}
      role="region"
      aria-label={label}
      className="fixed inset-x-0 bottom-0 top-16 cursor-grab touch-none select-none overflow-hidden bg-bg outline-none data-[dragging=true]:cursor-grabbing"
    >
      <div ref={plane} className="absolute left-0 top-0 will-change-transform" style={{ width: width * 2, height: height * 2 }}>
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            inert={copy > 0}
            className="absolute bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[length:400px_400px]"
            style={{ left: (copy % 2) * width, top: Math.floor(copy / 2) * height, width, height }}
          >
            {children}
          </div>
        ))}
      </div>

      {/* HUD */}
      <span
        ref={coords}
        aria-hidden
        className="pointer-events-none fixed bottom-6 right-6 z-10 rounded-full border border-line bg-bg/85 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-muted backdrop-blur-md"
      />
      <p
        className={`pointer-events-none fixed bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-line bg-bg/85 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text backdrop-blur-md transition-opacity duration-700 ${touched ? "opacity-0" : "opacity-100"}`}
      >
        ✥ {hint}
      </p>
    </div>
  );
}
