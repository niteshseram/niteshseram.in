import {
	Box,
	Flex,
	Heading,
	IconButton,
	Link,
	useColorMode,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import NextLink from 'next/link'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'
import Logo from './assets/logo'

const Container = ({ children }) => {
	const router = useRouter()

	const meta = {
		title: 'Nitesh Seram - Software Engineer',
		description:
			'Nitesh Seram is a Software Engineer and also an Open Source enthusiast. He is passionate about software development and also love learning and exploring new technologies.',
		image: '',
		type: 'website',
	}

	return (
		<Box>
			<Head>
				<title>{meta.title}</title>
				<link rel='icon' href='../favicons/favicon.ico' />
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
			<Box as='main' w='100vw' h='100vh'>
				<NavBar />
				{children}
				<Footer />
			</Box>
		</Box>
	)
}

const NavBar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex p='4' alignItemsc='center' justify='space-between'>
			<Logo />
			<Flex alignItems='center'>
				<Flex as='ul'>
					<Item href='/'>Home</Item>
					<Item href='/about'>About</Item>
					<Item href='/projects'>Projects</Item>
					<Item href='/blog'>Blog</Item>
				</Flex>
				<IconButton
					onClick={toggleColorMode}
					variant='icon'
					aria-label={
						colorMode === 'light' ? 'Toggle dark mode' : 'Toggle light mode'
					}
					icon={
						colorMode === 'light' ? (
							<IoMoon size='1.5rem' />
						) : (
							<IoSunnyOutline size='1.5rem' />
						)
					}
				/>
			</Flex>
		</Flex>
	)
}

const Item = ({ children, href }) => (
	<Box as='li' listStyleType='none'>
		<NextLink href={href}>
			<Link href={href} mr='1rem' variant='body'>
				{children}
			</Link>
		</NextLink>
	</Box>
)

const Footer = () => <Heading variant='h3'>Footer</Heading>

export default Container
