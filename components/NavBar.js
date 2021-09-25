import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import useToggle from '@/utils/hooks/useToogle'
import Link from 'next/link'
import Logo from './svg/Logo'

const NavBar = ({ toggleIsOpen }) => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])
	return (
		<nav className='h-[10vh] flex items-center justify-between'>
			<MenuButton toggleIsOpen={toggleIsOpen} />
			<Link href='/'>
				<a aria-label='Logo'>
					<Logo />
				</a>
			</Link>
			<div className='flex items-center'>
				<div className='hidden lg:flex  flex-column'>
					<Item href='/'>Home</Item>
					<Item href='/about'>About</Item>
					<Item href='/projects'>Projects</Item>
					<Item href='/blog'>Blog</Item>
				</div>
				<button
					type='button'
					className='w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800 flex items-center justify-center'
					aria-label={
						theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'
					}
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{mounted && (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							stroke='currentColor'
							className='w-4 h-4 text-dark dark:text-light'
						>
							{theme === 'dark' ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
								/>
							)}
						</svg>
					)}
				</button>
			</div>
		</nav>
	)
}

export const MobileNavMenu = () => (
	<div className='p-4 w-full my-8 space-y-8 flex flex-col'>
		<Item href='/'>Home</Item>
		<Item href='/about'>About</Item>
		<Item href='/projects'>Projects</Item>
		<Item href='/blog'>Blog</Item>
	</div>
)

const MenuButton = ({ toggleIsOpen }) => {
	const [clicked, toggleClicked] = useToggle()

	const handleClick = () => {
		toggleIsOpen()
		toggleClicked()
	}
	return (
		<button
			type='button'
			aria-label='Menu Button'
			onClick={handleClick}
			className='lg:hidden text-dark dark:text-light flex items-center justify-center -ml-1'
		>
			<svg
				viewBox='0 0 24 24'
				className='w-8 h-8 fill-current'
				aria-label='Menu Button'
				role='Navigation'
			>
				{clicked ? (
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
	)
}

const Item = ({ children, href }) => {
	return (
		<div className='font-medium text-xl lg:text-base lg:mr-[2rem] pb-4 lg:pb-0 border-b-[1px] border-gray-200 dark:border-gray-600 lg:border-none text-dark dark:text-light'>
			<Link href={href}>{children}</Link>
		</div>
	)
}

export default NavBar
