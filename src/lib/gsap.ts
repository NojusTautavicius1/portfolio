"use client";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * GSAP is loaded on demand instead of in the initial bundle: phones never need the pinned
 * horizontal section or smooth scrolling, and the reveals can wait until the page is idle.
 */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
