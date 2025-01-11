import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        "**/test/**": ["ignore"],
      },
    },
  },
  webpack: (config) => {
    // webpack 설정은 프로덕션 빌드에서만 적용됨
    config.watchOptions = {
      ignored: ["**/test/**"],
    };
    return config;
  },
};

export default nextConfig;
