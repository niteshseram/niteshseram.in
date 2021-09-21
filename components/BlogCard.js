import Link from 'next/link'
import { parseISO, format } from 'date-fns'

const BlogCard = ({ post }) => (
	<div className='border rounded border-gray-200 dark:border-gray-600 mb-4'>
		<Link href={`/blog/${post.slug}`} passHref>
			<div className='cursor-pointer p-2 md:p-4'>
				<div className='flex flex-col'>
					<h3 className='font-bold text-xl mb-2'>{post.title}</h3>
					<p>{post.summary}</p>
				</div>
				<p className='mt-2 text-sm'>
					{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
					{` • `}
					{post.frontMatter.readingTime.text}
				</p>
			</div>
		</Link>
	</div>
)

export default BlogCard
