import ProjectCard from '@/components/ProjectCard'
import projects from '@/data/projects'
import Container from '@/layouts/Container'
import ContentWrapper from '@/layouts/ContentWrapper'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<Container>
			<ContentWrapper>
				<Hero />
				<FeaturedProjects />
			</ContentWrapper>
		</Container>
	)
}

const Hero = () => (
	<div className='flex items-center justify-evenly lg:justify-between flex-col-reverse lg:flex-row w-full min-h-[90vh]'>
		<div className='flex lg:flex-1 items-center lg:items-start justify-center flex-col max-w-xl'>
			<h1 className='font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-dark dark:text-light'>
				Hi, I&apos;m
				<span className='text-primary dark:text-secondary'> Nitesh Seram</span>
			</h1>
			<h2 className='font-bold text-md md:text-xl lg:text-2xl mb-4 lg:mb-8'>
				Software Engineer based in India
			</h2>
			<p className='text-center lg:text-left text-base md:text-lg lg:text-xl pb-4 lg:pb-8'>
				Welcome to my digital corner where you can find my works, thoughts and
				random things.
			</p>
			<Link href='/' passHref>
				<button className='btn btn-themed uppercase'>Get in Touch</button>
			</Link>
		</div>
		<div className='flex items-center justify-center flex-none lg:flex-1'>
			<div className='w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] p-1 lg:p-2 border-2 lg:border-4 border-solid border-primary dark:border-secondary rounded-full'>
				<Image
					src='/static/images/dp.png'
					width={400}
					height={400}
					alt='Profile Picture'
				/>
			</div>
		</div>
	</div>
)

const FeaturedProjects = () => (
	<div className='flex flex-col w-full m-auto'>
		<h2 className='text-center heading'>Featured Projects</h2>
		<div className='flex flex-col xl:flex-row justify-evenly w-full mb-10'>
			<Projects />
		</div>
		<Link href='/projects' passHref>
			<a className='btn btn-secondary-themed capitalize text-center self-center'>
				Sell all projects
			</a>
		</Link>
	</div>
)

const Projects = () => (
	<div className='mx-auto justify-between block 2xl:flex'>
		{projects
			.filter((project) => project.feature)
			.map((project) => (
				<ProjectCard
					role='listitem'
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
