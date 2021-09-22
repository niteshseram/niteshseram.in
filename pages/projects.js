import ProjectCard from '@/components/ProjectCard'
import projects from '@/data/projects'
import Container from '@/layouts/Container'
import ContentWrapper from '@/layouts/ContentWrapper'

const Projects = () => (
	<Container title='Projects | Nitesh Seram'>
		<ContentWrapper className='self-center'>
			<Project />
		</ContentWrapper>
	</Container>
)

const Project = () => (
	<section className='mt-4 md:mt-8'>
		<h1 className='heading mb-2'>Projects</h1>
		<p className='text-lg mb-8'>
			Here are some side projects that I&apos;ve recently worked on.
		</p>
		<ProjectList />
	</section>
)

const ProjectList = () => (
	<div className='grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-6 mx-auto'>
		{projects.map((project) => (
			<ProjectCard
				className='mb-6 lg:mb-16'
				title={project.title}
				description={project.description}
				tools={project.tools}
				live={project.live}
				repo={project.repo}
				key={project.id}
			/>
		))}
	</div>
)

export default Projects
