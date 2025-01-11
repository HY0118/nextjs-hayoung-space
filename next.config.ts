import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  webpack: (config) => {
    // test 폴더 무시
    config.watchOptions = {
      ignored: ["**/test/**"],
    };
    return config;
  },
};

export default nextConfig;
