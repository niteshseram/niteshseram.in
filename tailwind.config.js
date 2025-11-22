import typography from '@tailwindcss/typography'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
	content: [
		'./src/app/**/*.{ts,tsx}',
		'./src/components/**/*.{ts,tsx}',
		'./src/content/**/*.mdx',
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
			typography: {
				quoteless: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			},
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
	plugins: [typography],
}

export default config
