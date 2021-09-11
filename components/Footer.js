import {
	Text,
	VStack,
	Flex,
	Heading,
	Link,
	useColorModeValue,
} from '@chakra-ui/react'
import { github, linkedin, twitter } from '@/data/socials'
import NextLink from 'next/link'
import useColorModeSwitcher from '@/utils/hooks/useColorModeSwitcher'

const Footer = () => {
	const { colorGrey } = useColorModeSwitcher()
	return (
		<VStack
			borderTop='1px solid'
			borderColor={colorGrey}
			py='32px'
			px={{ base: '15px', sm: '32px' }}
			spacing={{ base: '16px' }}
			as='footer'
			alignItems={{ base: 'start', md: 'center' }}
		>
			<FooterContent />
			<Text>&copy; Nitesh Seram 2021</Text>
		</VStack>
	)
}

const FooterContent = () => (
	<Flex
		flexDirection={{ base: 'column', sm: 'row' }}
		mb={{ base: '1rem', md: '2rem' }}
	>
		<Flex flexDirection='row'>
			<VStack alignItems='start'>
				<Heading>PAGES</Heading>
				<FooterLink href='/'>Home</FooterLink>
				<FooterLink href='/about'>About</FooterLink>
				<FooterLink href='/projects'>Projects</FooterLink>
				<FooterLink href='/blog'>Blog</FooterLink>
			</VStack>
			<VStack alignItems='start' ml={{ base: '100%', sm: '5rem', md: '10rem' }}>
				<Heading>SOCIALS</Heading>
				<FooterLink href={github.href} name={github.name}>
					Github
				</FooterLink>
				<FooterLink href={linkedin.href} name={linkedin.name}>
					LinkedIn
				</FooterLink>
				<FooterLink href={twitter.href} name={twitter.name}>
					Twitter
				</FooterLink>
			</VStack>
		</Flex>
		<VStack
			alignItems='start'
			ml={{ base: 0, sm: '5rem', md: '10rem' }}
			mt={{ base: '3rem', sm: 0 }}
		>
			<Heading>EXTRA</Heading>
			<FooterLink href='https://github.com/niteshseram/niteshseram.in'>
				Source code
			</FooterLink>
		</VStack>
	</Flex>
)

const FooterLink = ({ href, name, children }) => {
	const color = useColorModeValue('neutral.700', 'neutral.300')
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
	if (isInternalLink) {
		return (
			<NextLink href={href}>
				<Link
					color={color}
					href={href}
					_focus={{ outline: 'none' }}
					_hover={{ textDecoration: 'none' }}
					textDecoration='none'
					aria-label={name}
				>
					{children}
				</Link>
			</NextLink>
		)
	}

	return (
		<Link
			target='_blank'
			rel='noopener noreferrer'
			color={color}
			href={href}
			_focus={{ outline: 'none' }}
			_hover={{ textDecoration: 'none' }}
			textDecoration='none'
			aria-label={name}
			isExternal
		>
			{children}
		</Link>
	)
}

export default Footer
