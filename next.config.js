const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Habilitar cache para melhorar o tempo de build
    turboDeps: true,
  },
  // Garantir que o painel administrativo seja incluído na build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Configuração para o deploy na Vercel
  distDir: '.next',
}