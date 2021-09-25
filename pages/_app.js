import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import '@/styles/globals.css'
import { pageview, GA_TRACKING_ID } from '@/lib/analytics'

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const isProduction = process.env.NODE_ENV === 'production'

	const Analytics = () =>
		isProduction && (
			<>
				<Script
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>

				<Script strategy='afterInteractive' id='ga-script'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `}
				</Script>
			</>
		)

	useEffect(() => {
		const handleRouteChange = (url) => {
			pageview(url)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return (
		<ThemeProvider attribute='class' enableSystem={false}>
			<Analytics />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
