'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeSwitch from './ThemeSwitch'
import MobileNavbar from './MobileNavbar'
import AnimatedText from './AnimatedText'
import Logo from './Logo'

import { NAV_ITEMS } from '@/constants'

const NavBar = () => {
	const pathname = usePathname()

	return (
		<header className='z-40 sticky top-0'>
			<div className='absolute inset-0 bg-white/95 supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:backdrop-blur-lg dark:bg-dark/90 dark:supports-[backdrop-filter]:bg-dark/50' />
			<div className='relative bg-transparent py-5 flex items-center justify-between max-w-2xl w-[92vw] sm:w-[90vw] mx-auto'>
				<MobileNavbar />
				<Link
					href='/'
					className='flex items-center justify-between'
					aria-label='Home'
				>
					<Logo />
				</Link>
				<div className='flex items-center space-x-0 sm:space-x-12 text-base leading-5'>
					<div className='hidden space-x-12 sm:flex'>
						{NAV_ITEMS.map((item, idx) => {
							const active = pathname === item.page
							return (
								<Link
									key={idx}
									href={item.page}
									className={clsx('horizontal-underline text-base', {
										'horizontal-underline-active font-bold': active,
									})}
									aria-label={item.label}
								>
									<span className='tracking-wide text-gray-900 dark:text-gray-100'>
										<AnimatedText text={item.label} />
									</span>
								</Link>
							)
						})}
					</div>
					<ThemeSwitch />
				</div>
			</div>
		</header>
	)
}

export default NavBar
