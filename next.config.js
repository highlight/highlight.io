const getStaticPages = require('./scripts/get-static-pages');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    domains: ['media.graphassets.com', 'lh3.googleusercontent.com'],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    staticPages: getStaticPages(),
  },
};

module.exports = nextConfig;
