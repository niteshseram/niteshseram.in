import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx'

interface Params {
	slug: string
}

export async function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Params
}): Promise<Metadata | undefined> {
	const post = allBlogs.find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		slug,
	} = post
	const ogImage = image
		? `https://niteshseram.in${image}`
		: `https://niteshseram.in/api/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://niteshseram.in/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

interface BlogProps {
	params: Params
}

export default async function Blog({ params }: BlogProps) {
	const post = allBlogs.find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<section>
			<script type='application/ld+json'>
				{JSON.stringify(post.structuredData)}
			</script>
			<h1 className='font-bold heading'>{post.title}</h1>
			<div className='grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm'>
				<div className='bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter'>
					{post.publishedAt}
				</div>
				<div className='h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2' />
			</div>
			<Mdx code={post.body.code} />
		</section>
	)
}
