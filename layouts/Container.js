import { Box, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import useToggle from '@/hooks/useToggle'
import Footer from '@/components/Footer'
import { MobileNavMenu, NavBar } from '@/components/NavBar'

const Container = ({ children, ...customMeta }) => {
	const [isOpen, toggleIsOpen] = useToggle()

	return (
		<Box>
			<Seo {...customMeta} />
			<Box
				w={{ base: '92vw', sm: '90vw', '2xl': '80vw', '3xl': '72vw' }}
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
			'Software Engineer, Full Stack Developer, and Open Source enthusiast',
		image: 'https://niteshseram.in/static/images/banner.png',
		type: 'website',
		keywords:
			'Software Engineer, Full Stack Developer, Open Source, Web Developer, Programmer, Seram Nitesh Singh, Nitesh Seram, Nitesh Singh',
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
			<meta name='keywords' content={meta.keywords} />
			{meta.date && (
				<meta property='article:published_time' content={meta.date} />
			)}
			<meta
				name='google-site-verification'
				content='cTvq0i7fkRjh7wtvWKlnG42rayvxZBES7MzLl8CoC4k'
			/>
			<meta name='yandex-verification' content='75318e4097177399' />
		</Head>
	)
}

export default Container
