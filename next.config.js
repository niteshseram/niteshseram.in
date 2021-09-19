module.exports = {
	experimental: { esmExternals: true },
	reactStrictMode: true,
	webpack: (config, { dev, isServer }) => {
		// Replace React with Preact only in client production build
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			})
		}

		return config
	},
	eslint: {
		dirs: ['components', 'pages', 'lib', 'layouts', 'scripts', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
}
