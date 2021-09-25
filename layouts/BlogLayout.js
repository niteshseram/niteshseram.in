import Container from './Container'
import Image from 'next/image'
import { parseISO, format } from 'date-fns'

const BlogLayout = ({ children, frontMatter }) => (
	<Container
		title={`${frontMatter.title} | Nitesh Seram`}
		description={frontMatter.summary}
		image={`https://niteshseram.in${frontMatter.image}`}
		keywords={frontMatter.keywords}
		date={new Date(frontMatter.publishedAt).toISOString()}
		type='article'
	>
		<article className='mx-auto my-8 flex flex-col max-w-full sm:max-w-[30rem] w-full md:max-w-[42rem] mb-16'>
			<h2 className='heading mb-2'>{frontMatter.title}</h2>
			<div className='flex flex-col md:flex-row items-start md:items-center mt-4 mb-2 justify-between'>
				<div className='flex items-center'>
					<Image
						alt='Nitesh Seram'
						height={24}
						width={24}
						src='/static/images/dp.png'
					/>
					<p className='ml-2 text-sm'>
						{frontMatter.by}
						{'Nitesh Seram / '}
						{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
					</p>
				</div>
				<p className='flex items-center text-sm mt-2 md:mt-0'>
					<span className='sr-only'>Timelapse</span>
					<svg viewBox='0 0 24 24' className='fill-current w-4 h-4 mr-1'>
						<path d='M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
					</svg>
					{frontMatter.readingTime.text}
				</p>
			</div>
			<div className='prose dark:prose-dark max-w-none w-full'>{children}</div>
		</article>
	</Container>
)

export default BlogLayout
