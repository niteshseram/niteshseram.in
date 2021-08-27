import { Center, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react'
import { github, linkedin, twitter } from '../../content/socials'
import useToggle from '../../utils/hooks/useToggle'

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
			<SocialLink icon={github.icon} href={github.href} name={github.name} />
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

const SocialLink = ({ icon, href, name }) => {
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
				aria-label={name}
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
			</Link>
		</Center>
	)
}

export default Footer
