const { withAxiom } = require('next-axiom');
const { withHighlightConfig } = require('@highlight-run/next');
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
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = withHighlightConfig(withAxiom(nextConfig), {
  uploadSourceMaps: true,
  configureHighlightProxy: true,
  apiKey: 'bvh0kh353uhqk4sfv0lg',
});
