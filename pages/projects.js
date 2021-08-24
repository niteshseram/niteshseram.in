import { Heading, Text } from '@chakra-ui/react'
import Container from '../layout/container'

const Projects = () => (
	<Container title='Projects | Nitesh Seram'>
		<Heading as='h1' variant='h2'>
			Projects 🎲
		</Heading>
		<Text>
			This page will contain a list of projects I&apos;ve made or have worked
			on.
		</Text>
		<Text>
			Each project will contain a summary, live link (if applicable) and a link
			to the project repository.
		</Text>
	</Container>
)

export default Projects
