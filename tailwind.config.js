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
				secondary: '#05B19A',
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
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.400') },
							},
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') },
							},
						},
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
			}),
		},
	},
	variants: {
		typography: ['dark'],
	},
	plugins: [require('@tailwindcss/typography')],
}
