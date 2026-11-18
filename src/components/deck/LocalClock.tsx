"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("lt-LT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Vilnius",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// Renders "--:--" on the server to avoid a hydration mismatch.
export function LocalClock() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "--:--",
  );
  return <time suppressHydrationWarning>{time}</time>;
}
