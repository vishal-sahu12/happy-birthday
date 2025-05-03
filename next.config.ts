import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: any) => {
    config.externals.push({
      'three': 'THREE',
    });
    return config;
  },
};

export default nextConfig;
