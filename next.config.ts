import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: "export"` — no Image Optimization server on static hosts
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/uxpilot-auth.appspot.com/**",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.graphassets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
