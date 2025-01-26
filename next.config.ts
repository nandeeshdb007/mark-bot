import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1401842-5206056.cloudwaysapps.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
