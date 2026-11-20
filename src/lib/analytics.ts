// Sends a GA4 event. A no-op until the visitor accepts cookies (gtag only exists then).
export function track(name: string, params: Record<string, string | number> = {}) {
  window.gtag?.("event", name, params);
}

// Some interactions only matter the first time (every card throw would flood the reports).
const sent = new Set<string>();
export function trackOnce(name: string, params: Record<string, string | number> = {}) {
  const key = `${location.pathname}:${name}`;
  if (sent.has(key)) return;
  sent.add(key);
  track(name, params);
}

// Readable name for the part of the page an element sits in: the section heading if it has one.
export function sectionOf(element: Element): string {
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  const section = element.closest("section");
  if (!section) return "page";
  if (section.dataset.section) return section.dataset.section;
  const heading = section.getAttribute("aria-labelledby");
  const title = heading ? document.getElementById(heading) : section.querySelector("h1, h2");
  return clean(title?.textContent) || section.id || "section";
}

export function labelOf(element: Element): string {
  const text =
    element.getAttribute("data-track-label") || element.getAttribute("aria-label") || element.textContent;
  return clean(text).slice(0, 100);
}

function clean(text: string | null | undefined) {
  return (text ?? "").replace(/\s+/g, " ").replace(/[↗↓→]/g, "").trim();
}
