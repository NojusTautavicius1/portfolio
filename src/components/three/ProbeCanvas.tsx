"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import type { Theme } from "@/lib/useTheme";

import { Probe, type PointerState } from "./Probe";
import { StudioLights } from "./StudioLights";

type ProbeCanvasProps = {
  tier: "lite" | "full";
  theme: Theme;
  onReady: () => void;
};

/** Full-viewport transparent canvas. Loaded with next/dynamic only when the device tier allows 3D. */
export default function ProbeCanvas({ tier, theme, onReady }: ProbeCanvasProps) {
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    function onMove(event: PointerEvent) {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.active = true;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={tier === "full" ? [1, 1.75] : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 30 }}
      gl={{ alpha: true, antialias: tier === "full", powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <StudioLights theme={theme} resolution={tier === "full" ? 256 : 128} />
        <Probe pointer={pointer} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
