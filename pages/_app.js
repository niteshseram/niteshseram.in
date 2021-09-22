import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import '@/styles/globals.css'
import { pageview, GA_TRACKING_ID } from '@/lib/analytics'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

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
			<ThemeProvider attribute='class' enableSystem={false}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default MyApp
