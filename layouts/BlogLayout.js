import Container from './Container'
import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import { MdTimelapse } from 'react-icons/md'

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
				<p className='text-sm mt-2 md:mt-0'>
					<MdTimelapse className='mr-1 h-4 w-4 inline' />
					{frontMatter.readingTime.text}
				</p>
			</div>
			<div className='prose dark:prose-dark max-w-none w-full'>{children}</div>
		</article>
	</Container>
)

export default BlogLayout
