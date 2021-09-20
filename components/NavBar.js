import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import useToggle from '@/utils/hooks/useToogle'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'
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
					{mounted &&
						(theme === 'dark' ? (
							<IoSunnyOutline size='1.25rem' />
						) : (
							<IoMoon size='1.25rem' />
						))}
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
		<div
			onClick={handleClick}
			className='lg:hidden rounded-sm w-[48px] h-[48px] block'
		>
			<MenuIcon clicked={clicked} />
		</div>
	)
}

const MenuIcon = ({ clicked }) => {
	return (
		<div
			className='w-[100%] h-[100%] relative'
			aria-label='Menu Icon'
			role='button'
		>
			<Line
				className={`bg-dark dark:bg-light ${
					clicked
						? 'left-[8px] top-[22px] w-[32px] transform rotate-45'
						: 'left-[4px] top-[10px] w-[40px]'
				}`}
			/>
			<Line
				className={
					clicked
						? 'bg-transparent left-[8px] top-[22px] transform translate-x-[30px] w-[32px]'
						: 'left-[4px] top-[20px] bg-dark dark:bg-light w-[26px]'
				}
			/>
			<Line
				className={`bg-dark dark:bg-light ${
					clicked
						? 'left-[8px] bottom-[22px] transform -rotate-45 w-[32px]'
						: 'left-[4px] bottom-[14px] w-[16px]'
				}`}
			/>
		</div>
	)
}

const Line = (props) => {
	return (
		<div
			className={`rounded absolute h-[4px] transition-all duration-300 ease-in-out ${props.className}`}
		/>
	)
}

const Item = ({ children, href }) => {
	return (
		<div className='font-semibold text-xl lg:text-base lg:mr-[2rem] pb-4 lg:pb-0 border-b-[1px] border-gray-200 dark:border-gray-600 lg:border-none text-dark dark:text-light'>
			<Link href={href}>{children}</Link>
		</div>
	)
}

export default NavBar
