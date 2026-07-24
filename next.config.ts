import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/services", destination: "/#services", permanent: false },
      { source: "/products", destination: "/#products", permanent: false },
      { source: "/projects", destination: "/#projects", permanent: false },
      { source: "/gallery", destination: "/#gallery", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
