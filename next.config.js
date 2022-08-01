/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    domains: ['media.graphassets.com', 'lh3.googleusercontent.com'],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
