// next.config.js
import path from 'path';
import { fileURLToPath } from 'url';

// Em ES Modules, __dirname não existe por padrão. Criamos assim:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
    };
    return config;
  },
};

export default nextConfig;
