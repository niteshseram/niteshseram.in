import { allBlogs } from 'contentlayer/generated'
import BlogList from '../BlogList'

const Blog = () => {
	return (
		<section id='recent-blog' className='min-h-screen'>
			<h2 className='heading underline'>Recently Published</h2>
			<BlogList
				blogs={allBlogs
					.sort((a, b) => {
						if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
							return -1
						}
						return 1
					})
					.slice(0, 4)}
			/>
		</section>
	)
}

export default Blog
