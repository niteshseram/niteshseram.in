import type { Metadata } from 'next'
import { parseISO, format } from 'date-fns'
import { notFound } from 'next/navigation'

import { allBlogs } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx'
import ViewCounter from '../view-counter'

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
	const ogImage = `https://niteshseram.in${image}`

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
		<section className='mb-20 mt-10'>
			<script type='application/ld+json'>
				{JSON.stringify(post.structuredData)}
			</script>
			<h1 className='font-bold heading mb-2'>{post.title}</h1>
			<div className='mt-4 text-sm mb-8 text-slate-700 dark:text-slate-400'>
				{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')} /{' '}
				{post.readingTime.text} /{' '}
				<ViewCounter slug={post.slug} trackView />
			</div>
			<Mdx code={post.body.code} />
		</section>
	)
}
