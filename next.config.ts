import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "pizzaria-api.duckdns.org",
      pathname: "/uploads/pizzas/**",
    },
  ],
},
};

export default nextConfig;