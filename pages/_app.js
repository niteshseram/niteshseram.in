import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import '@/styles/globals.css'
import customTheme from '@/styles/theme'
import { pageview } from '@/lib/analytics'
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/analytics'

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
			{/* Global Site Tag (gtag.js) - Google Analytics */}
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
			/>
			<Script
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<ChakraProvider theme={customTheme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	)
}

export default MyApp
