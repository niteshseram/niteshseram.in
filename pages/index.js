import { Heading, Link, Text } from '@chakra-ui/react'

import Container from '../components/Container'
import ContentWrapper from '../components/contentWrapper'

export default function Home() {
	return (
		<Container>
			<ContentWrapper>
				<Heading as='h1' variant='h2'>
					site under construction 🏗
				</Heading>
				<Text>
					For now you can visit my current portfolio{' '}
					<Link href='https://niteshseram.in'>here</Link>
				</Text>
				<Text>
					Feel free to navigate through the pages to find out what content will
					be there in future!
				</Text>
			</ContentWrapper>
		</Container>
	)
}
