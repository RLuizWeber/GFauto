// next.config.js
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // possivelmente outras configurações…

  // ➊ Adiciona alias '@' para resolver imports absolutos
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
    };
    return config;
  },
};

export default nextConfig;
