import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	List,
	Text,
	VStack,
	Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import Container from '../layout/container'
import ProjectCard from '../components/projectCard'
import projects from '../content/projects'
import ContactForm from '../components/contactForm'
import useColorModeSwitcher from '../utils/hooks/useColorModeSwitcher'
import { twitter } from '../content/socials'
import ContentWrapper from '../layout/contentWrapper'

export default function Home() {
	return (
		<Container>
			<ContentWrapper>
				<Hero />
				<FeaturedProjects />
				<ContactSection />
			</ContentWrapper>
		</Container>
	)
}

const Hero = () => {
	const { themed } = useColorModeSwitcher()
	return (
		<Flex
			minH='90vh'
			align='center'
			justify='center'
			direction={{ base: 'column-reverse', lg: 'row' }}
			w='100%'
		>
			<Flex
				flex='1.3'
				align={{ base: 'center', lg: 'start' }}
				justify='center'
				direction='column'
			>
				<Heading as='h1' variant='h1'>
					Hi, I&apos;m{' '}
					<Box as='span' color={themed}>
						Nitesh Seram
					</Box>
				</Heading>
				<Heading as='h4' variant='h4' mb={{ base: '1rem', lg: '2rem' }}>
					Software Engineer based in India
				</Heading>
				<Text
					mb={{ base: '2rem', lg: '3rem' }}
					variant='subtitle'
					align={{ base: 'center', lg: 'left' }}
				>
					Welcome to my digital corner where you can find my works, thoughts and
					random things.
				</Text>
				<NextLink href='#contact' passHref>
					<Button w='184px' h='50px' variant='primaryThemed'>
						Get in Touch
					</Button>
				</NextLink>
			</Flex>
			<Center flex='1'>
				<Box
					w={{ base: '200px', lg: '400px' }}
					h={{ base: '200px', lg: '400px' }}
				>
					<Image
						src='/static/images/dp.png'
						width={400}
						height={400}
						alt='Profile Picture'
					/>
				</Box>
			</Center>
		</Flex>
	)
}

const FeaturedProjects = () => (
	<VStack w='100%' m='auto'>
		<FeatureHeading>Featured Projects</FeatureHeading>
		<Flex
			w='100%'
			mb='2.5rem'
			direction={{ base: 'column', xl: 'row' }}
			justify='space-evenly'
		>
			<Projects />
		</Flex>
		<NextLink href='/projects' passHref>
			<Button
				as='a'
				textTransform='capitalize'
				display='block'
				textAlign='center'
				fontSize={{ base: 'lg', lg: 'xl' }}
				variant='secondaryThemed'
			>
				See all projects
			</Button>
		</NextLink>
	</VStack>
)

const Projects = () => (
	<List
		mx='auto'
		justify='space-between'
		display={{ base: 'block', '2xl': 'flex' }}
	>
		{projects
			.filter((project) => project.feature)
			.map((project) => (
				<ProjectCard
					title={project.title}
					description={project.description}
					tools={project.tools}
					live={project.live}
					repo={project.repo}
					key={project.id}
				/>
			))}
	</List>
)

const FeatureHeading = ({ children }) => (
	<Heading
		textAlign='center'
		mb={{ base: '2.5rem', lg: '4rem' }}
		as='h2'
		variant='h2'
	>
		{children}
	</Heading>
)

const ContactSection = () => {
	const { themed } = useColorModeSwitcher()
	return (
		<VStack w='100%' m='auto' id='contact'>
			<FeatureHeading>Get In Touch</FeatureHeading>
			<Flex
				borderRadius='md'
				direction={{ base: 'column', lg: 'row' }}
				w='100%'
				alignItems='center'
				justifyContent='space-around'
			>
				<Box
					m={{ base: '0 0 4rem 0', xl: '0 4rem 0 0' }}
					p={0}
					flex='1'
					maxW={{ base: '100%', md: '70%' }}
				>
					<Text mb='1rem' variant='preTitle'>
						Let&apos;s chat!
					</Text>
					<Text mb='2rem'>
						If you want to collaborate or have any questions, opportunities, or
						might simply want to say hello then, feel free to fill out my
						contact form and I&apos;ll without a doubt hit you up in a hurry.
					</Text>
					<Text>
						Or if you would prefer to, you can also reach me on{' '}
						<Link color={themed} href={twitter.href}>
							Twitter
						</Link>
						.
					</Text>
				</Box>
				<ContactForm flex='1' />
			</Flex>
		</VStack>
	)
}
