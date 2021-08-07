import Head from 'next/head'
import { Center, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

export default function Home() {
	return (
		<Flex
			minH='100vh'
			p='0 0.5rem'
			direction='column'
			justify='center'
			align='center'
		>
			<Head>
				<title>Nitesh Seram</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Flex
				as='main'
				p='5rem 0'
				flex='1'
				direction='column'
				justify='center'
				align='center'
			>
				<Center>
					<VStack textAlign='center' spacing='4'>
						<Heading as='h2' variant='h2'>
							This site is currently under construction
						</Heading>
						<Text variant='preTitle'>
							For now you can visit my current{' '}
							<Link color='purple.600' isExternal href='https://niteshseram.in'>
								portfolio
							</Link>
						</Text>
					</VStack>
				</Center>
			</Flex>
		</Flex>
	)
}
