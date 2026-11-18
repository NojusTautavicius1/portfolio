"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useRenderTier } from "@/lib/renderTier";
import { useTheme } from "@/lib/useTheme";

const ProbeCanvas = dynamic(() => import("./ProbeCanvas"), { ssr: false });

/**
 * Mounts the full-screen 3D layer once the browser is idle, if the device tier allows it.
 * When the model is ready it flags <html data-probe="ready"> so the hero poster fades out.
 */
export function ProbeLayer() {
  const tier = useRenderTier();
  const theme = useTheme();
  const [armed, setArmed] = useState(false);
  const wants3d = tier === "lite" || tier === "full";

  const handleReady = useCallback(() => {
    document.documentElement.dataset.probe = "ready";
  }, []);

  useEffect(() => {
    if (!wants3d) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setArmed(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setArmed(true), 300);
    return () => clearTimeout(id);
  }, [wants3d]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.probe;
    },
    [],
  );

  if (!armed || !wants3d) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
      <ProbeCanvas tier={tier} theme={theme} onReady={handleReady} />
    </div>
  );
}
