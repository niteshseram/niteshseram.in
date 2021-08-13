import {
	Box,
	Center,
	Divider,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	Text,
	useColorMode,
	useMediaQuery,
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
			<Box w={{ base: '95vw', lg: '90vw', '2xl': '72vw' }} minH='70vh' m='auto'>
				<NavBar toggleIsOpen={toggleIsOpen} />
				<VStack as='main' minH='70vh'>
					{isOpen ? <MobileNavMenu /> : children}
				</VStack>
				<Footer />
			</Box>
		</Box>
	)
}

const NavBar = ({ isOpen, toggleIsOpen }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex as='nav' h='10vh' alignItems='center' justify='space-between'>
			<MenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
			<Logo />
			<HStack spacing={{ base: 0, md: 8 }} align='center'>
				<Flex display={{ base: 'none', lg: 'flex' }} as='ul'>
					<Item variant='noStyle' href='/'>
						Home
					</Item>
					<Item variant='noStyle' href='/about'>
						About
					</Item>
					<Item variant='noStyle' href='/projects'>
						Projects
					</Item>
					<Item variant='noStyle' href='/blog'>
						Blog
					</Item>
				</Flex>
				<IconButton
					borderRadius='sm'
					variant='icon'
					onClick={toggleColorMode}
					aria-label={
						colorMode === 'light' ? 'Toggle dark mode' : 'Toggle light Mode'
					}
					icon={
						colorMode === 'light' ? (
							<IoMoon size='1.25rem' />
						) : (
							<IoSunnyOutline size='1.25rem' />
						)
					}
				/>
			</HStack>
		</Flex>
	)
}

const MobileNavMenu = () => (
	<VStack spacing={4} w='100%'>
		<VStack p={4} w='100%' my={8} spacing={8} as='ul'>
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
		</VStack>
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
		borderRadius='1px'
		as='span'
		position='absolute'
		height='4px'
		transition='all 0.3s ease-in-out'
	/>
)

const Item = ({ children, href, ...props }) => {
	const [isLarge] = useMediaQuery('(min-width: 992px)')
	return (
		<VStack
			align='start'
			spacing={4}
			w='100%'
			h='100%'
			as='li'
			listStyleType='none'
		>
			<StyledLink {...props} href={href}>
				{children}
			</StyledLink>
			{!isLarge && <Divider />}
		</VStack>
	)
}

const Footer = () => (
	<VStack
		borderTop='1px solid'
		borderColor='neutral.200'
		h='20vh'
		py='32px'
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
		<Text>© Designed &amp; Built by Nitesh Seram</Text>
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
