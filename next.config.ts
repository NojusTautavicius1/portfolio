import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // ntdev.lt used to be a studio landing page; send its old service pages to the portfolio.
  async redirects() {
    return [{ source: "/paslaugos/:path*", destination: "/", permanent: true }];
  },
};

export default withNextIntl(nextConfig);
