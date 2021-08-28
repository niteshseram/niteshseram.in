import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import customTheme from '../styles/theme'
import { pageview } from '../lib/analytics'

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
		<ChakraProvider theme={customTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
