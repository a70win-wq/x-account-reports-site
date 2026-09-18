import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/x-account-reports-site";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubPages
    ? {
        basePath: repoBase,
        assetPrefix: repoBase,
      }
    : {}),
};

export default nextConfig;
