"use client";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Loaded on demand: phones never need the pinned section or smooth scrolling.
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
