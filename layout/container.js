import { Box, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import useToggle from '../utils/hooks/useToggle'
import Footer from '../components/footer'
import { MobileNavMenu, NavBar } from '../components/navBar'

const Container = ({ children, ...customMeta }) => {
	const [isOpen, toggleIsOpen] = useToggle()

	return (
		<Box>
			<Seo {...customMeta} />
			<Box
				w={{ base: '95vw', sm: '90vw', '2xl': '80vw', '3xl': '72vw' }}
				m='auto'
			>
				<NavBar toggleIsOpen={toggleIsOpen} />
				<VStack as='main' minH='70vh'>
					{isOpen ? <MobileNavMenu /> : children}
				</VStack>
				{!isOpen && <Footer />}
			</Box>
		</Box>
	)
}

const Seo = ({ ...customMeta }) => {
	const router = useRouter()
	const meta = {
		title: 'Nitesh Seram - Software Engineer',
		description:
			'Nitesh Seram is a Software Engineer and also an Open Source enthusiast. He is passionate about software development and also love learning and exploring new technologies.',
		image: '',
		type: 'website',
		...customMeta,
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name='robots' content='follow, index' />
			<meta content={meta.description} name='description' />
			<meta
				property='og:url'
				content={`https://niteshseram.in${router.asPath}`}
			/>
			<link rel='canonical' href={`https://niteshseram.in${router.asPath}`} />
			<meta property='og:type' content={meta.type} />
			<meta property='og:site_name' content='Nitesh Seram' />
			<meta property='og:description' content={meta.description} />
			<meta property='og:title' content={meta.title} />
			<meta property='og:image' content={meta.image} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content='@niteshseram' />
			<meta name='twitter:title' content={meta.title} />
			<meta name='twitter:description' content={meta.description} />
			<meta name='twitter:image' content={meta.image} />
		</Head>
	)
}

export default Container
