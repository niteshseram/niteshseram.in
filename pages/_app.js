import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import customTheme from '../styles/theme'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={customTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
