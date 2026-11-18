"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { whenIdle } from "@/lib/idle";
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

    // three.js costs real CPU to parse and compile shaders, so it never competes with the first
    // paint: the poster shows the probe until the visitor first interacts. Phones wait for that
    // interaction (scroll/touch); desktops also start on their own 3 s after load.
    const events = ["pointermove", "pointerdown", "scroll", "touchstart", "keydown"] as const;
    let cancelIdle: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const arm = () => {
      if (cancelIdle) return;
      cancelIdle = whenIdle(() => setArmed(true));
    };
    const startFallback = () => {
      timer = setTimeout(arm, 3000);
    };

    events.forEach((name) => window.addEventListener(name, arm, { once: true, passive: true }));
    if (tier === "full") {
      if (document.readyState === "complete") startFallback();
      else window.addEventListener("load", startFallback, { once: true });
    }

    return () => {
      events.forEach((name) => window.removeEventListener(name, arm));
      window.removeEventListener("load", startFallback);
      clearTimeout(timer);
      cancelIdle?.();
    };
  }, [wants3d, tier]);

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
