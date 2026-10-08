import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // 301s from the SEO hand-off's redirect map (statusCode, not `permanent`, which would send 308).
    return [
      { source: "/docs/core-concepts", destination: "/docs/concepts", statusCode: 301 },
      { source: "/docs/get-started", destination: "/docs", statusCode: 301 },
    ];
  },
};

export default nextConfig;
