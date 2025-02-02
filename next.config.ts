import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.code4code.dev",
        pathname: "/images/**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
