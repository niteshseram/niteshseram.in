import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import Container from '@/layouts/Container'
import ContentWrapper from '@/layouts/ContentWrapper'
import projects from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

const Projects = () => (
	<Container title='Projects | Nitesh Seram'>
		<ContentWrapper>
			<Intro />
		</ContentWrapper>
	</Container>
)

const Intro = () => (
	<Box w={{ base: '100%', lg: '100%' }} as='section' mb='2rem' mt='2rem'>
		<Heading as='h2' variant='h2'>
			Projects
		</Heading>
		<Text variant='subtitle' mb='4rem' w='100%'>
			Here are some projects that I&apos;ve recently worked on.
		</Text>
		<ProjectList />
	</Box>
)

const ProjectList = () => (
	<Grid
		templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(2, 1fr)' }}
		gap={6}
		mx='auto'
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
	</Grid>
)

export default Projects
