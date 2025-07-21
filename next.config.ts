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
      {
        protocol: "https",
        hostname: "content.linkedin.com",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
  experimental: {
    turbo: {
      rules: {
        "**/test/**": ["ignore"],
      },
    },
    serverComponentsExternalPackages: ["@notionhq/client"],
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
