import type { Metadata } from 'next'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'
import StickySocial from '@/components/StickySocial'

import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

export const metadata: Metadata = {
	title: {
		default: 'Nitesh Seram | Software Engineer',
		template: '%s | Nitesh Seram',
	},
	description: 'Software Engineer and Open Source enthusiast',
	openGraph: {
		title: 'Nitesh Seram',
		description: 'Software Engineer and Open Source enthusiast',
		url: 'https://niteshseram.in',
		siteName: 'Nitesh Seram',
		images: [
			{
				url: 'https://niteshseram.in/static/images/banner.png',
				width: 1920,
				height: 1080,
			},
		],
		locale: 'en-US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'Nitesh Seram',
		card: 'summary_large_image',
	},
	icons: {
		shortcut: '/favicon.ico',
	},
	verification: {
		google: 'cTvq0i7fkRjh7wtvWKlnG42rayvxZBES7MzLl8CoC4k',
		yandex: '75318e4097177399',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={clsx('antialiased bg-light dark:bg-dark', inter.variable)}
			>
				<Provider>
					<Navbar />
					<div className='max-w-4xl w-[92vw] sm:w-[90vw] mx-auto'>
						<StickySocial />
						{children}
						<Footer />
						<Analytics />
					</div>
				</Provider>
			</body>
		</html>
	)
}
