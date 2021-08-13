import { Heading, Text } from '@chakra-ui/react'
import Container from '../components/Container'
import ContentWrapper from '../components/contentWrapper'

const Projects = () => (
	<Container>
		<ContentWrapper>
			<Heading as='h1' variant='h2'>
				Projects 🎲
			</Heading>
			<Text>
				This page will contain a list of projects I&apos;ve made or have worked
				on.
			</Text>
			<Text>
				Each project will contain a summary, live link (if applicable) and a
				link to the project repository.
			</Text>
		</ContentWrapper>
	</Container>
)

export default Projects
