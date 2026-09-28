import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The first docs group lives at /docs itself.
    return [{ source: "/docs/get-started", destination: "/docs", permanent: true }];
  },
};

export default nextConfig;
