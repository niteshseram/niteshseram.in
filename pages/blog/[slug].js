import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { getFiles, getFileBySlug } from '@/lib/mdx'
import BlogLayout from '@/layouts/blog'
import MDXComponenets from '@/components/mdx'

const Blog = ({ code, frontMatter }) => {
	const Component = useMemo(() => getMDXComponent(code), [code])
	return (
		<BlogLayout frontMatter={frontMatter}>
			<Component
				components={{
					...MDXComponenets,
				}}
			/>
		</BlogLayout>
	)
}

export async function getStaticPaths() {
	const posts = await getFiles('blog')

	return {
		paths: posts.map((p) => ({
			params: {
				slug: p.replace(/\.mdx/, ''),
			},
		})),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const post = await getFileBySlug('blog', params.slug)

	return { props: { ...post } }
}

export default Blog
