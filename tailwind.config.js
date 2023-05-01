const { spacing, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	mode: 'jit',
	purge: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./content/**/*.mdx',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: '#10101A',
				light: '#fcfcfc',
				primary: '#8353E2',
				'primary-light': '#8353E260',
				secondary: '#05B19A',
				'secondary-light': '#05B19A60',
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.neutral.700'),
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32],
						},
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
				dark: {
					css: {
						color: theme('colors.gray.400'),
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300'),
						},
						'h2,h3,h4': {
							color: theme('colors.light'),
							'scroll-margin-top': spacing[32],
						},
						hr: { borderColor: theme('colors.gray.700') },
						strong: { color: theme('colors.gray.300') },
						thead: {
							color: theme('colors.gray.100'),
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700'),
							},
						},
					},
				},
				quoteless: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			}),
			keyframes: {
				bounceRight: {
					'0%': { transform: 'translateX(-20%)' },
					'50%': { transform: 'translateX(20%)' },
					'100%': { transform: 'translateX(-20%)' },
				},
			},
			animation: {
				'bounce-right': 'bounceRight 2s linear infinite',
			},
		},
	},
	variants: {
		typography: ['dark'],
	},
	plugins: [require('@tailwindcss/typography')],
}
