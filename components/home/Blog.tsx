import { AiOutlineArrowRight } from 'react-icons/ai'
import Link from 'next/link'

import { allBlogs } from 'contentlayer/generated'
import BlogList from '../blog/BlogList'

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
			<div className='mt-10'>
				<Link href='/blog'>
					<button className='flex items-center'>
							<span className='link'>See All Blog Posts&nbsp;</span>
							<span className='animate-bounce-right'>
								<AiOutlineArrowRight />
							</span>
					</button>
				</Link>
			</div>
		</section>
	)
}

export default Blog
