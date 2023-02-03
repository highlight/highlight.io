const { withAxiom } = require('next-axiom')
const { withHighlightConfig } = require('@highlight-run/next')
const getStaticPages = require('./scripts/get-static-pages')

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		// If you use remark-gfm, you'll need to use next.config.mjs
		// as the package is ESM only
		// https://github.com/remarkjs/remark-gfm#install
		remarkPlugins: [],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		// providerImportSource: "@mdx-js/react",
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
			// by next.js will be dropped. Doesn't make much sense, but how it is
			fs: false, // the solution
		}

		return config
	},
	compress: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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
				source: '/careers/:slug*',
				destination: 'https://careers.highlight.io',
				permanent: false,
			},
			{
				source: '/community/:slug*',
				destination: 'https://discord.com/invite/yxaXEAqgwN',
				permanent: false,
			},
			{
				source: '/github/:slug*',
				destination: 'https://github.com/highlight/highlight',
				permanent: false,
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
		]
	},
}

module.exports = withHighlightConfig(withAxiom(withMDX(nextConfig)))
