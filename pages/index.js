import {
	Button,
	Center,
	Flex,
	Heading,
	Text,
	useMediaQuery,
	VStack,
} from '@chakra-ui/react'

import Container from '../components/Container'

export default function Home() {
	return (
		<Container>
			<Hero />
		</Container>
	)
}

const Hero = () => {
	const [isLarge] = useMediaQuery('(min-width: 992px)')
	return (
		<Flex align='center' justify='space-between' w='100%' minH='70vh'>
			<VStack align='left' h='100%'>
				<Heading as='h1' variant='h1'>
					Hi, I&apos;m Nitesh Seram.
				</Heading>
				<Heading as='h4' variant='h4'>
					Software Engineer based in India
				</Heading>
				<Text variant='subtitle'>
					Welcome to my corner of the internet, where you can find my works,
					thoughts and random things.
				</Text>
				<Button w='184px' h='50px' variant='primaryThemed'>
					Get in Touch
				</Button>
			</VStack>
			{isLarge && (
				<Center border='1px solid' boxSize='600px'>
					<Text>Hero Visual</Text>
				</Center>
			)}
		</Flex>
	)
}
