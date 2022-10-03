const { withAxiom } = require('next-axiom');
const getStaticPages = require('./scripts/get-static-pages');

/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
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
  async redirects() {
    return [
      {
        source: '/docs',
        destination: `/docs/getting-started`,
        permanent: false,
      },
    ];
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

module.exports = withAxiom(nextConfig);
