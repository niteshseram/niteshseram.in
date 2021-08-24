import { Heading, Link, Text } from '@chakra-ui/react'
import Container from '../layout/container'

const Blog = () => (
	<Container title='Blog | Nitesh Seram'>
		<Heading as='h1' variant='h2'>
			Blog 🖊
		</Heading>
		<Text>
			This page will soon be my{' '}
			<Link href='https://niteshseram.in'>digital garden</Link> <span>🌱</span>
		</Text>
		<Text>
			It will be home to all of my thoughts and ideas around web development and
			design.{' '}
		</Text>
	</Container>
)

export default Blog
