import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import Container from '@/layouts/container'
import useColorModeSwitcher from '@/hooks/useColorModeSwitcher'

const Blog = () => {
	const { themed } = useColorModeSwitcher()
	return (
		<Container title='404 | Nitesh Seram'>
			<VStack alignItems='center' justifyContent='center' h='70vh'>
				<Heading fontSize={{ base: '6xl', md: '9xl' }}>
					4
					<Box as='span' color={themed}>
						0
					</Box>
					4
				</Heading>
				<Text variant='preTitle' textAlign='center' pt={2}>
					Oops! I think you&apos;re lost.
				</Text>
				<Text variant='subtitle' pb={1}>
					Let&apos;s get you back...
				</Text>
				<Link href='/' passHref>
					<Button variant='primaryThemed'>Go Back Home</Button>
				</Link>
			</VStack>
		</Container>
	)
}

export default Blog
