"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";

import { clearGaCookies, GA_ID, readConsent, subscribeConsent } from "@/lib/consent";
import { ConsentBanner } from "./ConsentBanner";
import { useTracking } from "./useTracking";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 in "basic" consent mode: nothing loads until the visitor accepts. Page views on client-side
// navigation come from GA4 enhanced measurement; clicks, sections and scroll depth from useTracking.
export function GoogleAnalytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);

  useEffect(() => {
    // Only matters when the choice changes after gtag has already loaded in this tab.
    if (consent === null || consent === "unset" || !window.gtag) return;
    window.gtag("consent", "update", { analytics_storage: consent });
    if (consent === "denied") clearGaCookies();
  }, [consent]);

  useTracking(consent === "granted");

  if (!GA_ID || consent === null) return null;

  return (
    <>
      <ConsentBanner consent={consent} />
      {consent === "granted" && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
    </>
  );
}
