import { useTheme } from 'next-themes'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

import { useMounted } from '@/hooks/useMounted'

const ThemeSwitch = () => {
	const mounted = useMounted()
	const { systemTheme, theme, setTheme } = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<button
			aria-label={theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
			className='p-3 bg-gray-200 rounded dark:bg-gray-800 rounded-xl w-[40px] h-[40px]'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{mounted && (currentTheme === 'dark' ? <BsSunFill /> : <BsMoonFill />)}
		</button>
	)
}

export default ThemeSwitch
