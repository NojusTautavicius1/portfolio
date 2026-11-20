import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    // GA4 stream for ntdev.lt (public anyway, it shows in the page source). Only production builds
    // report, so previews and local runs stay out of the stats; NEXT_PUBLIC_GA_ID overrides it.
    GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? (process.env.VERCEL_ENV === "production" ? "G-03X6EK4ZVB" : ""),
  },
  // ntdev.lt used to be a studio landing page; send its old service pages to the portfolio.
  async redirects() {
    return [{ source: "/paslaugos/:path*", destination: "/", permanent: true }];
  },
};

export default withNextIntl(nextConfig);
