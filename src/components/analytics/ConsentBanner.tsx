"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { type Consent, OPEN_SETTINGS, saveConsent } from "@/lib/consent";

const button =
  "min-h-11 flex-1 rounded-full border px-4 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors";

// Shown until the visitor picks; the footer "Cookie settings" button reopens it.
export function ConsentBanner({ consent }: { consent: Consent }) {
  const t = useTranslations("consent");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS, open);
    return () => window.removeEventListener(OPEN_SETTINGS, open);
  }, []);

  if (consent !== "unset" && !reopened) return null;

  const choose = (value: "granted" | "denied") => {
    saveConsent(value);
    setReopened(false);
  };

  return (
    <section
      aria-label={t("label")}
      className="fixed inset-x-4 bottom-20 z-55 rounded-2xl border border-line bg-bg/90 p-4 backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm print:hidden"
    >
      <p className="text-sm text-muted">{t("text")}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${button} border-line text-text hover:border-muted`}
        >
          {t("deny")}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${button} border-accent-fill bg-accent-fill text-on-accent hover:bg-accent-fill/85`}
        >
          {t("accept")}
        </button>
      </div>
    </section>
  );
}
