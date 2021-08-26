import { Box, Heading, List, Text } from '@chakra-ui/react'
import Container from '../layout/container'
import ContentWrapper from '../layout/contentWrapper'
import projects from '../content/projects'
import ProjectCard from '../components/projectCard'

const Projects = () => (
	<Container title='Projects | Nitesh Seram'>
		<ContentWrapper>
			<Intro />
		</ContentWrapper>
	</Container>
)

const Intro = () => (
	<Box w={{ base: '100%', lg: '90%' }} as='section' mb='2rem' mt='2rem'>
		<Heading as='h1' variant='h1'>
			Projects
		</Heading>
		<Text variant='subtitle' mb='4rem' w='100%'>
			Here are some projects that I&apos;ve recently worked on.
		</Text>
		<ProjectList />
	</Box>
)

const ProjectList = () => (
	<List
		mx='auto'
		justifyContent='space-between'
		display={{ base: 'block', '2xl': 'flex' }}
		flexWrap='wrap'
	>
		{projects.map((project) => (
			<ProjectCard
				mb={{ base: '2rem', lg: '8rem' }}
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

export default Projects
