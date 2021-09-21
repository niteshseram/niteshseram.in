import BlogCard from '@/components/BlogCard'
import Container from '@/layouts/Container'
import { getAllFilesFrontMatter } from '@/lib/mdx'

const Blog = ({ posts }) => (
	<Container
		title='Blog | Nitesh Seram'
		description='A digital corner sharing my thoughts, learning, and random things'
	>
		<div className='self-center max-w-full sm:max-w-[30rem] md:max-w-[42rem] my-8'>
			<h1 className='heading'>Blog</h1>
			<p>
				My digital corner where I would be sharing my thoughts, learning, and
				some random things.😅
			</p>
			<ul className='mt-5'>
				{posts.map((post, index) => (
					<li key={index}>
						<BlogCard post={post} />
					</li>
				))}
			</ul>
		</div>
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
