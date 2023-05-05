import Link from 'next/link'

const navigation = {
	general: [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Blog', href: '/blog' },
	],
	extra: [
		{ name: 'Source Code', href: 'https://github.com/niteshseram/niteshseram.in' },
		{ name: 'Resume', href: '/resume.pdf' },
	],
	social: [
		{
			name: 'Twitter',
			href: 'https://twitter.com/niteshseram',
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/in/niteshseram',
		},
		{
			name: 'GitHub',
			href: 'https://github.com/niteshseram',
		},
	],
}

const Footer = () => (
	<footer className='pt-10'>
		<div className='py-10 border-t-2 border-gray-200 dark:border-gray-700'>
			<div className='grid grid-cols-2 gap-8 xl:col-span-2'>
				<div className='md:grid md:grid-cols-2 md:gap-8'>
					<div>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Pages
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.general.map((item) => (
								<FooterLink name={item.name} href={item.href} key={item.name} />
							))}
						</div>
					</div>
					<div className='mt-12 md:mt-0'>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Socials
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.social.map((item) => (
								<FooterLink
									name={item.name}
									href={item.href}
									key={item.name}
									newTab
								/>
							))}
						</div>
					</div>
				</div>
				<div className='md:grid md:grid-cols-2 md:gap-8'>
					<div>
						<h3 className='text-sm font-semibold tracking-wider uppercase'>
							Extra
						</h3>
						<div role='list' className='mt-4 flex flex-col items-start'>
							{navigation.extra.map((item) => (
								<FooterLink
									name={item.name}
									href={item.href}
									key={item.name}
									newTab
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between mt-12'>
				<p className='order-1 text-base font-medium'>
					&copy; {new Date().getFullYear()} Nitesh Seram
				</p>
			</div>
		</div>
	</footer>
)

interface FooterLinkProps {
  href: string,
  name: string,
  newTab?: boolean,
}

const FooterLink = ({ href, name, newTab }: FooterLinkProps) => (
  <Link
    href={href}
    className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mt-2 horizontal-underline tracking-wide'
    aria-label={name}
    {...(newTab && {
      target:'_blank',
      rel:'noopener noreferrer',
    })}
  >
    {name}
  </Link>
)
export default Footer
