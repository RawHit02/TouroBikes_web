import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    domains: ["localhost"], // Add domains for your images
  },
};

export default nextConfig;
