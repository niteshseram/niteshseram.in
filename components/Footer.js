import Link from 'next/link'

const FooterEvent = async (action, value) => {
	const { event } = await import('@/lib/analytics')
	event({
		action: action,
		category: 'Footer',
		label: value,
		value: '',
	})
}

const Footer = () => (
	<footer className='flex flex-col border-t-2 border-gray-200 dark:border-gray-800 py-12 px-8 sm:px-16 space-y-8 items-start md:items-center'>
		<FooterContent />
		<p>&copy; Nitesh Seram 2021</p>
	</footer>
)

const FooterContent = () => (
	<div className='flex flex-col sm:flex-row mb-4 md:mb-8'>
		<div className='flex flex-row'>
			<div className='flex flex-col items-start'>
				<h4 className='font-bold'>PAGES</h4>
				<FooterLink href='/'>Home</FooterLink>
				<FooterLink href='/about'>About</FooterLink>
				<FooterLink href='/projects'>Projects</FooterLink>
				<FooterLink href='/blog'>Blog</FooterLink>
			</div>
			<div className='flex flex-col items-start ml-[100%] sm:ml-20 md:ml-40'>
				<h4 className='font-bold'>SOCIALS</h4>
				<FooterLink href='https://github.com/niteshseram'>Github</FooterLink>
				<FooterLink href='https://twitter.com/niteshseram'>Twitter</FooterLink>
				<FooterLink href='https://linkedin.com/in/niteshseram'>
					LinkedIn
				</FooterLink>
			</div>
		</div>
		<div className='flex flex-col items-start ml-0 sm:ml-20 md:ml-40 mt-12 sm:mt-0'>
			<h4 className='font-bold'>EXTRA</h4>
			<FooterLink href='https://github.com/niteshseram/niteshseram.in'>
				Source Code
			</FooterLink>
		</div>
	</div>
)

const FooterLink = ({ href, name, children }) => {
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
	if (isInternalLink) {
		return (
			<Link
				href={href}
				className='text-gray-900 dark:text-gray-400 mt-2'
				aria-label={name}
			>
				{children}
			</Link>
		)
	}

	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			href={href}
			onClick={() => FooterEvent(children, children)}
			className='text-gray-900 dark:text-gray-400 transition mt-2'
			aria-label={name}
		>
			{children}
		</a>
	)
}
export default Footer
