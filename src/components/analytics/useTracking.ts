"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { labelOf, sectionOf, track } from "@/lib/analytics";

const PROJECT = /^\/(?:lt\/projektai|en\/projects)\/([^/?#]+)/;
const BOARD = /^\/(?:lt\/projektai|en\/projects)\/?$/;

// Every link and button click gets one named event, with the label and the section it was in.
function onClick(event: MouseEvent) {
  const target = (event.target as Element | null)?.closest?.("a, button, [data-track]");
  if (!target) return;

  const base = { label: labelOf(target), section: sectionOf(target), page: location.pathname };

  const custom = target.getAttribute("data-track");
  if (custom) return track(custom, base);

  if (target.hasAttribute("data-hero-card")) {
    // aria-pressed flips after this handler, so "false" here means the card is being opened.
    if (target.getAttribute("aria-pressed") === "false") track("card_flip", base);
    return;
  }

  if (!(target instanceof HTMLAnchorElement)) return track("button_click", base);

  const href = target.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return track("email_click", base);
  if (href.startsWith("tel:")) return track("phone_click", base);

  const url = new URL(target.href, location.href);
  if (url.pathname.endsWith(".pdf")) return track("cv_download", { ...base, file: url.pathname });
  if (url.origin !== location.origin) return track("outbound_click", { ...base, destination: url.hostname });

  const project = url.pathname.match(PROJECT)?.[1];
  if (project) return track("project_open", { ...base, project });
  if (BOARD.test(url.pathname)) return track("board_open", base);
  if (url.hash) return track("nav_click", { ...base, target: url.hash.slice(1) });
  if (url.pathname.startsWith("/en") !== location.pathname.startsWith("/en"))
    return track("language_switch", { ...base, to: url.pathname.slice(1, 3) });
  track("link_click", base);
}

// Which sections people actually reach, once per page view, plus scroll depth at 25/50/75 %
// (GA4 enhanced measurement only reports 90 %).
function watchPage(path: string) {
  const seen = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = sectionOf(entry.target.querySelector("h1, h2") ?? entry.target);
        if (seen.has(name)) continue;
        seen.add(name);
        track("section_view", { section: name, page: path });
      }
    },
    // A section counts once it covers the middle band of the screen.
    { rootMargin: "-45% 0px -45% 0px" },
  );
  document.querySelectorAll("main section").forEach((section) => observer.observe(section));

  const marks = [25, 50, 75];
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max <= 0) return;
    const percent = (scrollY / max) * 100;
    while (marks.length && percent >= marks[0]) {
      track("scroll_depth", { percent: marks.shift()!, page: path });
    }
  };
  addEventListener("scroll", onScroll, { passive: true });

  return () => {
    observer.disconnect();
    removeEventListener("scroll", onScroll);
  };
}

export function useTracking(enabled: boolean) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    // Wait a frame so the new page's sections are in the DOM after client-side navigation.
    let stop = () => {};
    const frame = requestAnimationFrame(() => (stop = watchPage(pathname)));
    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, [enabled, pathname]);
}
