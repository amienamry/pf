/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
	experimental: {
		scrollRestoration: true,
	},
};

module.exports = nextConfig;
