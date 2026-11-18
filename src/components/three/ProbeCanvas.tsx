"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import type { Theme } from "@/lib/useTheme";

import { Probe, type PointerTarget } from "./Probe";
import { StudioLights } from "./StudioLights";

type ProbeCanvasProps = {
  tier: "lite" | "full";
  theme: Theme;
  active: boolean;
  stage: React.RefObject<HTMLDivElement | null>;
  onReady: () => void;
};

/** Loaded with next/dynamic only when the device tier allows 3D. */
export default function ProbeCanvas({ tier, theme, active, stage, onReady }: ProbeCanvasProps) {
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });

  // Track the pointer across the whole page, relative to the probe's own position.
  useEffect(() => {
    function onMove(event: PointerEvent) {
      const rect = stage.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      pointer.current.x = clampUnit((event.clientX - centerX) / (window.innerWidth / 2));
      pointer.current.y = clampUnit(-(event.clientY - centerY) / (window.innerHeight / 2));
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [stage]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={tier === "full" ? [1, 2] : [1, 1.5]}
      camera={{ position: [0, 0.35, 9], fov: 30 }}
      gl={{ alpha: true, antialias: tier === "full", powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <StudioLights theme={theme} resolution={tier === "full" ? 256 : 128} />
        <Probe pointer={pointer} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

function clampUnit(value: number) {
  return Math.max(-1, Math.min(1, value));
}
