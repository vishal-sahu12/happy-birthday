/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      'three': 'THREE',
    });
    return config;
  },
};

export default nextConfig;
