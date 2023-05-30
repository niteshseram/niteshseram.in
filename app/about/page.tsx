import Timeline from '@/components/Timeline'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About',
	description: 'Software Engineer and Open Source enthusiast',
}

const About = () => {

	return (
		<section className='prose max-w-4xl w-[92vw] sm:w-[90vw] mt-10'>
			<h1 className='heading'>About me</h1>
			<p>
				Hello there, I&apos;m a <b>Software Engineer</b> with a passion for all
				things frontend. I work at a vibrant startup called <b>Auzmor</b>, where
				I spend my days building innovative learning management solutions that
				make a difference in people&apos;s lives.
			</p>
			<p>
				As a lifelong learner, I&apos;m always looking for opportunities to grow
				and push myself to new heights. That&apos;s why I love contributing to{' '}
				<b>Open Source</b> projects whenever I can - it&apos;s a chance to
				collaborate with other talented developers and make a real impact on the
				world.
			</p>

			<h3 className='dark:text-light text-dark'>
				When I&apos; not at my desk...
			</h3>
			<p>
				on&apos;t let all that talk of coding fool you - I&apos;m also a
				big believer in having fun and trying to have balance between work and
				play. That&apos;s why you&apos;ll often find me hitting the gym trying
				to stay fit and healthy, hanging out with friends or enjoying a good
				Netflix and chill session, I&apos;m always up for an adventure.
			</p>
			<h2 className='text-dark dark:text-light'>Timeline</h2>
			<Timeline />
		</section>
	)
}

export default About
