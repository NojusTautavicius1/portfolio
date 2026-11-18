"use client";

import { Environment, Lightformer } from "@react-three/drei";

import type { Theme } from "@/lib/useTheme";

/**
 * Procedural studio environment: the polished metal reflects these cards instead of a
 * downloaded HDRI. Mirrors the light cards used for the Blender preview renders.
 * frames={1} renders it once; the key remounts it when the theme changes.
 */
export function StudioLights({ theme, resolution }: { theme: Theme; resolution: number }) {
  const light = theme === "light";

  return (
    <Environment key={theme} frames={1} resolution={resolution}>
      {/* What the metal reflects between the cards. Kept dark in both themes: a paper-coloured
          environment turns the chrome into flat white plastic on the light page. */}
      <color attach="background" args={[light ? "#2c2e33" : "#0e0f11"]} />
      {/* long strip overhead */}
      <Lightformer form="rect" intensity={3} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[10, 1.4, 1]} />
      {/* tall card on the left */}
      <Lightformer form="rect" intensity={light ? 2.6 : 2.2} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[2, 6, 1]} />
      {/* soft fill on the right */}
      <Lightformer form="rect" intensity={0.8} position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
      {/* brand-orange rim from behind */}
      <Lightformer form="rect" color="#e8643c" intensity={3} position={[3, 2, -5]} scale={[4, 2, 1]} />
      {/* floor bounce so the underside is not black */}
      <Lightformer form="rect" intensity={light ? 0.9 : 0.5} position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[10, 4, 1]} />
    </Environment>
  );
}
