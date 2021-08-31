import {
	Box,
	Heading,
	Text,
	Container as ChakraContainer,
	Grid,
	GridItem,
	Icon,
} from '@chakra-ui/react'
import Container from '@/layouts/container'
import ContentWrapper from '@/layouts/contentWrapper'
import useToggle from '@/hooks/useToggle'
import * as tools from '@/data/tools'
import Timeline from '@/components/timeline'

const About = () => (
	<Container title='About | Nitesh Seram'>
		<ContentWrapper>
			<Intro />
			<Skills />
			<TimelineContainer />
		</ContentWrapper>
	</Container>
)

const Intro = () => (
	<Box as='section'>
		<Heading
			mt='2rem'
			mb={{ base: '2rem', xl: '4.5rem' }}
			w={{ base: '100%', sm: '100%' }}
			as='h2'
			variant='h2'
		>
			About Me
		</Heading>
		<ChakraContainer maxW={{ base: '100%', sm: '30rem', md: '40rem' }} p={0}>
			<Text mb='2rem'>
				Hello there! I&apos;m Seram Nitesh Singh, a Software Engineer and also
				an Open Source enthusiast. I have done my graduation in Computer Science
				and Engineering.
			</Text>
			<Text mb='2rem'>
				I am deeply passionate about software development. I love spending time
				building production-ready web applications and also doing open source
				projects.
			</Text>
			<Text mb='3.5rem'>
				My core interest lies mainly in web development but not restricted to
				it. I always love exploring and learning new technologies.
			</Text>
			<Heading mb='0.5rem' as='h3' variant='h3'>
				Interests
			</Heading>
			<Text mb='2rem'>
				I&apos;m currently interested and curious to learn about{' '}
				<em>System Design</em> and <em>Cloud Native</em> technologies like
				Docker, Kubernetes, etc for building highly scalable applications and
				products. I have also always wanted to learn <em>UI/UX design </em>.
				That&apos;s a lot of learning to do, but I will get there eventually.
			</Text>
			<Text>
				When I&apos;m not coding, I would probably be watching a movie or a
				series. I&apos;m really a movie buff and watch a lot of movies. I also
				love doing Photoshop whenever I find some free time.
			</Text>
		</ChakraContainer>
	</Box>
)

const Skills = () => {
	const skills = Object.values(tools).filter((tool) => tool.include)
	return (
		<Box alignSelf='center' as='section'>
			<Heading as='h3' variant='h3' mb='0.5rem'>
				Tools & Technologies
			</Heading>
			<ChakraContainer maxW={{ base: '100%', sm: '30rem', md: '40rem' }} p={0}>
				<Text mb='1rem'>
					Here are all the tools and technologies that I used most frequently
					but It doesn&apos;t mean I am an expert in all these.
				</Text>
			</ChakraContainer>
			<Grid
				templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
				gap={{ base: 1, md: 6 }}
				as='ul'
			>
				{skills.map((skill) => (
					<Skill
						name={skill.name}
						icon={skill.icon}
						color={skill.color}
						key={skill.name}
					/>
				))}
			</Grid>
		</Box>
	)
}

const Skill = ({ name, icon, color }) => {
	const [hover, toggleHover] = useToggle()
	return (
		<GridItem
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			p={{ base: '0.5rem', '2xl': '1rem' }}
			textAlign='center'
			alignContent='center'
			display='flex'
			flexDirection='column'
			listStyleType='none'
			as='li'
		>
			<Icon
				mx='auto'
				mb='0.5rem'
				boxSize={{ base: '2rem', lg: '3rem', '2xl': '4rem' }}
				as={icon}
				fill={hover && color}
				transitionDuration='500ms'
			/>
			{name}
		</GridItem>
	)
}

const TimelineContainer = () => (
	<Box as='section' w='100%'>
		<Heading as='h3' variant='h3' mb='0.5rem'>
			Timeline
		</Heading>
		<ChakraContainer w='100%' p={0} m={0}>
			<Timeline />
		</ChakraContainer>
	</Box>
)

export default About
