import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NAV_ITEMS } from '@/constants'

const MobileNavbar = () => {
	const pathname = usePathname()
	const [showNavbar, setShowNavbar] = useState(false)

	useEffect(() => {
		if (showNavbar) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [showNavbar])

	return (
		<div className='sm:hidden'>
			<button
				type='button'
				aria-label='Menu Button'
				onClick={() => setShowNavbar(!showNavbar)}
				className='flex items-center justify-center'
			>
				<svg
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-8 h-8 text-dark dark:text-light'
					aria-label='Menu Button'
					role='button'
				>
					{showNavbar ? (
						<g>
							<path fill='none' d='M0 0h24v24H0z' />
							<path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
						</g>
					) : (
						<g>
							<path fill='none' d='M0 0h24v24H0z' />
							<path d='M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z' />
						</g>
					)}
				</svg>
			</button>
			<div
				className={`fixed top-[80px] right-0 z-20 h-full w-full pl-[4vw] sm:pl-[5vw] transform bg-light duration-300 opacity-95 ease-in-out dark:bg-dark ${
					showNavbar ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<nav className='fixed p-4 w-full my-8 space-y-8 flex gap-8 flex-col pl-0'>
					{NAV_ITEMS.map((item, idx) => {
						const active = pathname === item.page

						return (
							<div key={idx}>
								<Link
									href={item.page}
									onClick={() => setShowNavbar(!showNavbar)}
									className={clsx(
										'horizontal-underline text-2xl tracking-widest text-gray-900 backdrop:text-2xl dark:text-gray-100',
										{ 'horizontal-underline-active font-bold': active }
									)}
									aria-label={item.label}
								>
									{item.label}
								</Link>
							</div>
						)
					})}
				</nav>
			</div>
		</div>
	)
}

export default MobileNavbar
