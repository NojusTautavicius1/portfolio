import { useEffect, useRef } from "react";

const DRAG_THRESHOLD = 6;
const FRICTION = 0.92;
const KEY_STEP = 160;

const KEY_STEPS: Record<string, [number, number]> = {
  ArrowLeft: [-KEY_STEP, 0],
  ArrowRight: [KEY_STEP, 0],
  ArrowUp: [0, -KEY_STEP],
  ArrowDown: [0, KEY_STEP],
};

type Options = {
  width: number;
  height: number;
  start: { x: number; y: number };
  onMove: (x: number, y: number) => void;
  onFirstInteraction: () => void;
};

const wrap = (value: number, size: number) => ((value % size) + size) % size;

// Drag (with inertia), wheel and arrow-key panning over a plane that wraps around every
// `width` × `height` px. A drag never ends in a link click.
export function useInfinitePan({ width, height, start, onMove, onFirstInteraction }: Options) {
  const viewport = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const { x: startX, y: startY } = start;

  useEffect(() => {
    const element = viewport.current;
    const planeElement = plane.current;
    if (!element || !planeElement) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = startX;
    let y = startY;
    let velocityX = 0;
    let velocityY = 0;
    let frame = 0;
    let dragging = false;
    let moved = 0;
    let last = { x: 0, y: 0, time: 0 };

    const render = () => {
      const wrappedX = wrap(x, width);
      const wrappedY = wrap(y, height);
      planeElement.style.transform = `translate3d(${-wrappedX}px, ${-wrappedY}px, 0)`;
      onMove(wrappedX, wrappedY);
    };

    const panBy = (dx: number, dy: number) => {
      x += dx;
      y += dy;
      render();
    };

    const glide = () => {
      velocityX *= FRICTION;
      velocityY *= FRICTION;
      panBy(velocityX, velocityY);
      if (Math.abs(velocityX) + Math.abs(velocityY) > 0.15) frame = requestAnimationFrame(glide);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      cancelAnimationFrame(frame);
      dragging = true;
      moved = 0;
      velocityX = velocityY = 0;
      last = { x: event.clientX, y: event.clientY, time: performance.now() };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - last.x;
      const dy = event.clientY - last.y;
      moved += Math.abs(dx) + Math.abs(dy);

      if (moved > DRAG_THRESHOLD && element.dataset.dragging !== "true") {
        element.dataset.dragging = "true";
        element.setPointerCapture(event.pointerId);
        onFirstInteraction();
      }

      const now = performance.now();
      const elapsed = Math.max(1, now - last.time);
      velocityX = (-dx / elapsed) * 16;
      velocityY = (-dy / elapsed) * 16;
      last = { x: event.clientX, y: event.clientY, time: now };
      panBy(-dx, -dy);
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      delete element.dataset.dragging;
      // Holding still before letting go means "stop here", not "fling".
      if (performance.now() - last.time > 80) velocityX = velocityY = 0;
      if (!reduceMotion) frame = requestAnimationFrame(glide);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (moved <= DRAG_THRESHOLD) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      if (event.shiftKey) panBy(event.deltaY, 0);
      else panBy(event.deltaX, event.deltaY);
      onFirstInteraction();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const step = KEY_STEPS[event.key];
      if (!step || event.target !== element) return;
      event.preventDefault();
      panBy(...step);
      onFirstInteraction();
    };

    const listeners: [string, EventListener, AddEventListenerOptions?][] = [
      ["pointerdown", onPointerDown as EventListener],
      ["pointermove", onPointerMove as EventListener],
      ["pointerup", onPointerUp],
      ["pointercancel", onPointerUp],
      ["click", onClickCapture as EventListener, { capture: true }],
      ["wheel", onWheel as EventListener, { passive: false }],
      ["keydown", onKeyDown as EventListener],
    ];

    render();
    listeners.forEach(([type, listener, options]) => element.addEventListener(type, listener, options));
    return () => {
      cancelAnimationFrame(frame);
      listeners.forEach(([type, listener, options]) => element.removeEventListener(type, listener, options));
    };
  }, [width, height, startX, startY, onMove, onFirstInteraction]);

  return { viewport, plane };
}
