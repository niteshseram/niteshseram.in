const { default: Container } = require('@/layouts/Container')
const { default: ContentWrapper } = require('@/layouts/ContentWrapper')
import Timeline from '@/components/Timeline'
import * as tools from '@/data/tools'
import React from 'react'

const About = () => (
	<Container title='About | Nitesh Seram'>
		<ContentWrapper className='self-center max-w-full sm:max-w-[30rem] md:max-w-[42rem]'>
			<Intro />
			<Skills />
			<TimelineContainer />
		</ContentWrapper>
	</Container>
)
const Intro = () => (
	<section className='mt-4 md:mt-8'>
		<h1 className='heading'>About Me</h1>
		<p className='mb-2 md:mb-4'>
			Hello there! I&apos;m Seram Nitesh Singh, a Software Engineer and also an
			Open Source enthusiast. I have done my graduation in Computer Science and
			Engineering.
		</p>
		<p className='mb-2 md:mb-4'>
			I am deeply passionate about software development. I love spending time
			building production-ready web applications and also doing open source
			projects.
		</p>
		<p>
			My core interest lies mainly in web development but not restricted to it.
			I always love exploring and learning new technologies.
		</p>
		<h2 className='heading text-xl md:text-2xl mt-8 mb-4'>Interests</h2>
		<p className='mb-2 md:mb-4'>
			I&apos;m currently interested and curious to learn about{' '}
			<em>System Design</em> and <em>Cloud Native</em> technologies like Docker,
			Kubernetes, etc for building highly scalable applications and products. I
			have also always wanted to learn <em>UI/UX design </em>. That&apos;s a lot
			of learning to do, but I will get there eventually.
		</p>
		<p>
			When I&apos;m not coding, I would probably be watching a movie or a
			series. I&apos;m really a movie buff and watch a lot of movies. I also
			love doing Photoshop whenever I find some free time.
		</p>
	</section>
)

const Skills = () => {
	const skills = Object.values(tools).filter((tool) => tool.include)
	return (
		<section>
			<h1 className='heading'>Tools & Technologies</h1>
			<p className='mb-4'>
				Here are all the tools and technologies that I used most frequently but
				It doesn&apos;t mean I am an expert in all these.
			</p>
			<ul className='grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-6'>
				{skills.map((skill) => (
					<Skill name={skill.name} icon={skill.icon} key={skill.name} />
				))}
			</ul>
		</section>
	)
}

const Skill = ({ name, icon }) => (
	<li className='flex flex-col text-center justify-center items-center m-2 2xl:m-4'>
		{React.createElement(icon, {
			className: 'h-8 w-8 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16 mb-2',
		})}
		{name}
	</li>
)

const TimelineContainer = () => (
	<section>
		<h1 className='heading'>Timeline</h1>
		<Timeline />
	</section>
)

export default About
