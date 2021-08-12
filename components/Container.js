import {
	Box,
	Center,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	Text,
	useColorMode,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'
import useColorModeSwitcher from '../utils/hooks/useColorModeSwitcher'
import useToggle from '../utils/hooks/useToggle'
import { github, linkedin, twitter } from '../content/socials'
import Logo from './assets/logo'
import StyledLink from './styled'

const Container = ({ children }) => {
	const router = useRouter()
	const [isOpen, toggleIsOpen] = useToggle()
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
			<Box
				w={{ base: '100vw', lg: '90vw', '2xl': '72vw' }}
				minH='100vh'
				m='auto'
			>
				<NavBar toggleIsOpen={toggleIsOpen} />
				<VStack spacing='32rem' id='skip' as='main'>
					{isOpen ? <MobileNavMenu /> : children}
					<Footer />
				</VStack>
			</Box>
		</Box>
	)
}

const NavBar = ({ isOpen, toggleIsOpen }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex p='4' alignItems='center' justify='space-between'>
			<MenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
			<Logo />
			<Flex alignItems='center'>
				<Flex display={{ base: 'none', lg: 'flex' }} as='ul'>
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

const MobileNavMenu = () => (
	<VStack h='80vh' w='100%'>
		<Flex
			h='100%'
			direction='column'
			alignItems='center'
			justifyContent='space-around'
			as='ul'
		>
			<Item variant='large' href='/'>
				Home
			</Item>
			<Item variant='large' href='/about'>
				About
			</Item>
			<Item variant='large' href='/projects'>
				Projects
			</Item>
			<Item variant='large' href='/blog'>
				Blog
			</Item>
		</Flex>
	</VStack>
)

const MenuButton = ({ toggleIsOpen, ...props }) => {
	const [clicked, toggleClicked] = useToggle()

	const handleClick = () => {
		toggleIsOpen()
		toggleClicked()
	}
	return (
		<IconButton
			borderRadius='sm'
			onClick={handleClick}
			display={{ base: 'block', lg: 'none' }}
			w='48px'
			h='48px'
			variant='ghost'
			_hover={{ variant: 'ghost' }}
			{...props}
			icon={<MenuIcon clicked={clicked} />}
		/>
	)
}

const MenuIcon = ({ clicked }) => {
	const { colorDark } = useColorModeSwitcher()
	return (
		<Box w='100%' h='100%' position='relative'>
			<Line
				left={clicked ? '8px' : '4px'}
				bg={colorDark}
				top={clicked ? '22px' : '10px'}
				transform={clicked ? 'rotate(45deg)' : 'none'}
				width={clicked ? '32px' : '40px'}
			/>
			<Line
				left={clicked ? '8px' : '4px'}
				top={clicked ? '22px' : '20px'}
				transform={clicked ? 'translateX(30px)' : 'none'}
				bg={clicked ? 'transparent' : colorDark}
				width={clicked ? '32px' : '26px'}
			/>
			<Line
				left={clicked ? '8px' : '4px'}
				transform={clicked ? 'rotate(-45deg)' : 'none'}
				bg={colorDark}
				bottom={clicked ? '22px' : '14px'}
				width={clicked ? '32px' : '16px'}
			/>
		</Box>
	)
}

const Line = ({ ...props }) => (
	<Box
		{...props}
		borderRadius='5px'
		as='span'
		position='absolute'
		height='4px'
		transition='all 0.4s ease-in-out'
	/>
)

const Item = ({ children, href, ...props }) => (
	<Box as='li' listStyleType='none'>
		<StyledLink {...props} href={href}>
			{children}
		</StyledLink>
	</Box>
)

const Footer = () => (
	<VStack
		borderTop='1px solid'
		borderColor='neutral.200'
		h='150px'
		py='32px'
		w='80%'
		spacing={{ base: '16px' }}
		as='footer'
	>
		<HStack as='ul'>
			<SocialLink icon={github.icon} href={github.href} />
			<SocialLink
				icon={linkedin.icon}
				href={linkedin.href}
				name={linkedin.name}
			/>
			<SocialLink icon={twitter.icon} href={twitter.href} name={twitter.name} />
		</HStack>
		<Text align='center'>© Designed &amp; Built by Nitesh Seram</Text>
	</VStack>
)

const SocialLink = ({ children, icon, href }) => {
	const [hover, toggleHover] = useToggle()
	return (
		<Center
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			as='li'
			listStyleType='none'
		>
			<Link
				variant='subtle'
				display='flex'
				alignItems='center'
				p={2}
				href={href}
				isExternal
			>
				<Icon
					transform={hover ? 'translateY(-4px)' : 'none'}
					transitionProperty='transform'
					transitionDuration='500ms'
					mr={{ lg: '1rem' }}
					ml={{ lg: '1rem' }}
					boxSize={{ base: '1.5rem', lg: '1.7rem' }}
					aria-hidden
					as={icon}
				/>
				{children}
			</Link>
		</Center>
	)
}

export default Container
