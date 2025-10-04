/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: {
    domains: ['oraculo.app'],
  },
  experimental: {
    optimizePackageImports: ['recharts', 'framer-motion'],
  },
};

module.exports = nextConfig;
