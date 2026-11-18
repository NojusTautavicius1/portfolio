"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useRenderTier } from "@/lib/renderTier";
import { useTheme } from "@/lib/useTheme";

const ProbeCanvas = dynamic(() => import("./ProbeCanvas"), { ssr: false });

/**
 * The poster is always rendered first (it is the loading state and the reduced-motion /
 * weak-device fallback). The 3D canvas mounts after the browser is idle, then fades in
 * over the poster once the model is ready.
 */
export function ProbeStage({ className = "" }: { className?: string }) {
  const tier = useRenderTier();
  const theme = useTheme();
  const stage = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const wants3d = tier === "lite" || tier === "full";

  useEffect(() => {
    if (!wants3d) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setArmed(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setArmed(true), 300);
    return () => clearTimeout(id);
  }, [wants3d]);

  // Stop rendering frames while the hero is scrolled out of view.
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: "120px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const show3d = armed && wants3d;

  return (
    <div ref={stage} aria-hidden className={`relative aspect-square w-full ${className}`}>
      <div className="absolute inset-x-[22%] bottom-[18%] h-[7%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--text)_14%,transparent),transparent)] blur-md" />
      <Image
        src="/images/zondas-poster.webp"
        alt=""
        fill
        loading="eager"
        sizes="(min-width: 1024px) 560px, 80vw"
        className={`object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {show3d && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <ProbeCanvas tier={tier} theme={theme} active={onScreen} stage={stage} onReady={handleReady} />
        </div>
      )}
    </div>
  );
}
