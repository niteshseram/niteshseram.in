const { spacing, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark: '#111827',
				light: '#fcfcfc',
				primary: {
					100: '#D1C1F4',
					200: '#B199E7',
					300: '#9C7DE4',
					400: '#8F67D7',
					500: '#8f46af',
					600: '#3D0A6D',
					700: '#311968',
				},
				secondary: {
					100: '#E6FFFA',
					200: '#244B75',
					300: '#05B19A',
					400: '#05B19A',
					500: '#244B75',
					600: '#244B75',
					700: '#244B75',
				},
				neutral: {
					100: '#F4F4F4',
					200: '#D9D9D9',
					300: '#A6A6A6',
					400: '#8C8C8C',
					500: '#737373',
					600: '#595959',
					700: '#404040',
				},
				accent: {
					successLight: '#68D391',
					successDark: '#276749',
					errorLight: '#FC8181',
					errorDark: '#AA0000',
				},
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.neutral.700'),
						a: {
							color: theme('colors.primary.500'),
							code: { color: theme('colors.blue.400') },
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32],
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
				dark: {
					css: {
						color: theme('colors.neutral.300'),
						a: {
							color: theme('colors.secondary.300'),
							code: { color: theme('colors.blue.400') },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300'),
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32],
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') },
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
