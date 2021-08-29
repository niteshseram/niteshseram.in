import {
	Box,
	Flex,
	HStack,
	IconButton,
	useColorMode,
	VStack,
	Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'
import useColorModeSwitcher from '../../utils/hooks/useColorModeSwitcher'
import useToggle from '../../utils/hooks/useToggle'
import Logo from '../svg/logo'
import { StyledLink } from '../styled'

export const NavBar = ({ toggleIsOpen }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex as='nav' h='10vh' alignItems='center' justify='space-between'>
			<MenuButton toggleIsOpen={toggleIsOpen} />
			<NextLink href='/' passHref>
				<Link aria-label='logo' href _focus={{ outline: 'none' }}>
					<Logo />
				</Link>
			</NextLink>
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

export const MobileNavMenu = () => (
	<VStack spacing={4} w='100%'>
		<VStack p={4} w='100%' my={8} spacing={8} as='ul'>
			<Item spacing={4} variant='large' href='/'>
				Home
			</Item>
			<Item spacing={4} variant='large' href='/about'>
				About
			</Item>
			<Item spacing={4} variant='large' href='/projects'>
				Projects
			</Item>
			<Item spacing={4} variant='large' href='/blog'>
				Blog
			</Item>
		</VStack>
	</VStack>
)

const MenuButton = ({ toggleIsOpen }) => {
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
			icon={<MenuIcon clicked={clicked} />}
		/>
	)
}

const MenuIcon = ({ clicked }) => {
	const { colorDark } = useColorModeSwitcher()
	return (
		<Box w='100%' h='100%' position='relative' aria-label='Menu Icon'>
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
	const { colorGrey } = useColorModeSwitcher()
	return (
		<VStack
			align='start'
			spacing={4}
			w='100%'
			h='100%'
			as='li'
			pb={{ base: 4, lg: 0 }}
			borderBottom={{ base: '1px solid', lg: 'none' }}
			borderColor={colorGrey}
			listStyleType='none'
		>
			<StyledLink {...props} href={href}>
				{children}
			</StyledLink>
		</VStack>
	)
}
