import { useTheme } from 'next-themes'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

const ThemeSwitch = () => {
	const { systemTheme, theme, setTheme } = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<button
			aria-label={theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
			className='p-3 bg-gray-200 rounded dark:bg-gray-800 rounded-xl'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{currentTheme === 'dark' ? <BsSunFill /> : <BsMoonFill />}
		</button>
	)
}

export default ThemeSwitch
