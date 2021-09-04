import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react'
import Container from '@/layouts/container'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import BlogCard from '@/components/blogCard'

const Blog = ({ posts }) => (
	<Container
		title='Blog | Nitesh Seram'
		description='A digital corner sharing my thoughts, learning, and random things'
	>
		<Box maxW={{ base: '100%', sm: '30rem', md: '42rem' }}>
			<Heading as='h2' variant='h2' mt='2rem' mb='2rem'>
				Blog
			</Heading>
			<Text>
				My digital corner where I would be sharing my thoughts, learning, and
				some random things.😅
			</Text>
			<List mt={5}>
				{posts.map((post, index) => (
					<ListItem key={index}>
						<BlogCard post={post} />
					</ListItem>
				))}
			</List>
		</Box>
	</Container>
)

export const getStaticProps = async () => {
	let posts = await getAllFilesFrontMatter('blog')
	posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
	return {
		props: { posts },
	}
}

export default Blog
