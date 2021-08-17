import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Text,
	useMediaQuery,
} from '@chakra-ui/react'
import Image from 'next/image'
import Container from '../components/Container'

export default function Home() {
	return (
		<Container>
			<Hero />
			<FeaturedProjects />
		</Container>
	)
}

const Hero = () => (
	<Flex
		minH='90vh'
		align='center'
		justify='center'
		direction={{ base: 'column-reverse', lg: 'row' }}
		w={{ base: '95vw', lg: '90vw', '2xl': '72vw' }}
	>
		<Flex
			flex='1.3'
			align={{ base: 'center', lg: 'start' }}
			justify='center'
			direction='column'
		>
			<Heading as='h1' variant='h1'>
				Hi, I&apos;m Nitesh Seram
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
			<Button w='184px' h='50px' variant='primaryThemed'>
				Get in Touch
			</Button>
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

const FeaturedProjects = () => {
	const [isLarge] = useMediaQuery('(min-width: 992px)')
	return (
		<Box w='100%' m='auto'>
			<FeatureHeading>Featured Projects</FeatureHeading>
			<Flex
				mb='2.5rem'
				direction={{ base: 'column', lg: 'row' }}
				justify='space-evenly'
				align='center'
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
