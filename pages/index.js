import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Text,
	useMediaQuery,
} from '@chakra-ui/react'

import Container from '../components/Container'

export default function Home() {
	return (
		<Container>
			<Hero />
			<FeaturedProjects />
		</Container>
	)
}

const Hero = () => {
	const [isLarge] = useMediaQuery('(min-width: 992px)')
	return (
		<Flex
			minH='90vh'
			align='center'
			w={{ base: '95vw', lg: '90vw', '2xl': '72vw' }}
		>
			<Box flex='1.3'>
				<Heading as='h1' variant='h1'>
					Hi, I&apos;m Nitesh Seram.
				</Heading>
				<Heading as='h4' variant='h4' mb={{ base: '1rem', lg: '2rem' }}>
					Software Engineer based in India
				</Heading>
				<Text mb={{ base: '2rem', lg: '3rem' }} variant='subtitle'>
					Welcome to my corner of the internet, where you can find my works,
					thoughts and random things.
				</Text>
				<Button w='184px' h='50px' variant='primaryThemed'>
					Get in Touch
				</Button>
			</Box>
			{isLarge && (
				<Center border='1px solid' flex='1'>
					<Text>Hero Visual</Text>
				</Center>
			)}
		</Flex>
	)
}

const FeaturedProjects = () => {
	const [isLarge] = useMediaQuery('(min-width: 992px)')
	return (
		<Box w='100%' m='auto'>
			<FeatureHeading>Featured Projects</FeatureHeading>
			<Flex
				mb='2.5rem'
				direction={{ base: 'column', lg: 'row' }}
				justify='space-evenly'
			>
				<Center
					mb={!isLarge && '2.5rem'}
					border='1px solid'
					boxSize={{ base: '20rem', lg: '30rem' }}
				>
					Project 1
				</Center>
				<Center border='1px solid' boxSize={{ base: '20rem', lg: '30rem' }}>
					Project 2
				</Center>
			</Flex>
			<Center>
				<Button variant='primaryThemed'>See All Projects</Button>
			</Center>
		</Box>
	)
}

// const ContentWrapper = ({ children }) => (
// 	<VStack spacing={{ base: '10rem', lg: '15rem' }}>{children}</VStack>
// )

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
