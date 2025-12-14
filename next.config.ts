import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: true,
  env: {
    // 개발 환경에서만 블로그 활성화
    NEXT_PUBLIC_ENABLE_BLOG: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: 'content.linkedin.com',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      '**/test/**': ['ignore'],
    },
  },
  webpack: (config) => {
    // webpack 설정은 프로덕션 빌드에서만 적용됨
    config.watchOptions = {
      ignored: ['**/test/**'],
    };
    return config;
  },
};

export default nextConfig;
