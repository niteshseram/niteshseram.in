import Container from './Container'
import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import ViewCounter from '@/components/ViewCounter'

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

					<svg viewBox='0 0 24 24' className='fill-current w-4 h-4 mr-1 ml-2'>
						<path
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							d='M12,21 C7,21 1,16 1,12 C1,8 7,3 12,3 C17,3 23,8 23,12 C23,16 17,21 12,21 Z M12,7 C9.23875,7 7,9.23875 7,12 C7,14.76125 9.23875,17 12,17 C14.76125,17 17,14.76125 17,12 C17,9.23875 14.76125,7 12,7 L12,7 Z'
						/>
					</svg>
					<ViewCounter slug={frontMatter.slug} />
				</p>
			</div>
			<div className='prose dark:prose-dark max-w-none w-full'>{children}</div>
		</article>
	</Container>
)

export default BlogLayout
