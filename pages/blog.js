import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react'
import Container from '@/layouts/container'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import BlogCard from '@/components/blogCard'

const Blog = ({ posts }) => (
	<Container
		title='Blog | Nitesh Seram'
		description='A small digital corner sharing my thoughts, learning, and random things'
	>
		<Box maxW={{ base: '100%', sm: '30rem', md: '42rem' }}>
			<Heading as='h2' variant='h2' mt='2rem' mb='2rem'>
				Blog
			</Heading>
			<Text>
				A small digital corner where I would be sharing my thoughts, learning,
				and some random things.😅
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
	const posts = await getAllFilesFrontMatter('blog')
	console.log(posts)
	return {
		props: { posts },
	}
}

export default Blog
