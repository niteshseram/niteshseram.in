import Container from '@/layouts/Container'
import Link from 'next/link'

const PageNotFound = () => (
	<Container title='404 | Nitesh Seram'>
		<div className='flex flex-col items-center justify-center h-[70vh]'>
			<h1 className='font-bold text-6xl md:text-9xl'>
				4<span className='text-primary dark:text-secondary'>0</span>4
			</h1>
			<p className='font-medium text-lg md:text-xl text-center mt-2'>
				Oops! I think you&apos;re lost.
			</p>
			<p className='md:text-lg mb-4'>Let&apos;s get you back...</p>

			<Link href='/' passHref>
				<button className='btn btn-themed'>Go Back Home</button>
			</Link>
		</div>
	</Container>
)

export default PageNotFound
