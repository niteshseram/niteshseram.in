import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'

import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Sharing my knowledge with blog post',
}

export default async function BlogPage() {
	return (
		<section>
			<h1 className='heading underline'>Blog</h1>
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
