import Head from 'next/head'
import {
	Button,
	Center,
	Flex,
	Heading,
	Link,
	useColorMode,
	VStack,
} from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import Logo from '../components/assets/logo'
import Construction from '../components/assets/construction'

export default function Home() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex minH='100vh' direction='column'>
			<Head>
				<title>Nitesh Seram</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Flex p='2rem' justify='space-between' align='center'>
				<Logo />
				<Button onClick={toggleColorMode}>
					Lights
					{colorMode === 'light' ? ' off' : ' on'}
				</Button>
			</Flex>
			<Center mt='20vh'>
				<VStack textAlign='center' spacing='4'>
					<Construction boxSize='7rem' />
					<Heading as='h1' variant='h1'>
						This site is currently under construction
					</Heading>
					<Heading variant='h2'>
						For now visit my current{' '}
						<Link
							color={colorMode === 'light' ? 'purple.600' : 'purple.300'}
							isExternal
							href='https://niteshseram.in'
						>
							Portfolio
						</Link>
					</Heading>
				</VStack>
			</Center>
		</Flex>
	)
}
