import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'

import BlogList from '@/components/blog/BlogList'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Sharing learnings and thoughts on software development and beyond through my blog',
}

export default async function BlogPage() {
	return (
		<section className='min-h-screen  mt-10'>
			<h1 className='heading underline mb-6'>My Blog</h1>
			<p className='md:text-lg text-md mb-8'>
				Sharing learnings and thoughts on software development and beyond through my blog
			</p>
			<BlogList
				blogs={allBlogs.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1
					}
					return 1
				})}
			/>
		</section>
	)
}
