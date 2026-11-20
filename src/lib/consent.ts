// Analytics consent, kept in localStorage. GA4 only loads after "granted".
export type Consent = "granted" | "denied" | "unset";

// Set in next.config.ts; empty outside production.
export const GA_ID = process.env.GA_ID || undefined;

const KEY = "ntdev-consent";
const CHANGE = "consent:change";
export const OPEN_SETTINGS = "consent:open";

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function saveConsent(value: Exclude<Consent, "unset">) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// GA sets _ga cookies on the apex domain; remove them when consent is withdrawn.
export function clearGaCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=.${host}`, `; domain=${host}`]) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}
