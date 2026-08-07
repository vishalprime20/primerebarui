import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
/** Must match the GitHub repository name for project Pages URLs */
const repoName = "primerebarui";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Hide the Next.js "N" / nextjs-portal badge in local dev
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
