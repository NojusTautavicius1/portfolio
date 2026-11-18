"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string };

// Muted loop that only plays while it is on screen. With reduced motion it waits for a click.
export function MotionClip({ src, poster, label }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={video}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={false}
      onClick={(event) => {
        const element = event.currentTarget;
        if (element.paused) element.play().catch(() => {});
        else element.pause();
      }}
      className="aspect-[9/16] w-full cursor-pointer rounded-xl border border-line bg-surface object-cover"
    />
  );
}
