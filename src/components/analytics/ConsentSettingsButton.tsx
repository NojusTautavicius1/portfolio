"use client";

import { OPEN_SETTINGS } from "@/lib/consent";

export function ConsentSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS))}
      className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {label}
    </button>
  );
}
