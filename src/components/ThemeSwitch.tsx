import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

import { useMounted } from '@/hooks/useMounted';

const ThemeSwitch = () => {
  const mounted = useMounted();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-[40px] w-[40px] rounded rounded-xl bg-slate-300 p-3 dark:bg-slate-800"
        disabled
      />
    );
  }

  return (
    <button
      aria-label={
        currentTheme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'
      }
      className="h-[40px] w-[40px] rounded rounded-xl bg-slate-300 p-3 dark:bg-slate-800"
      title={
        currentTheme === 'dark' ? 'Enable Light Theme' : 'Enable Dark Theme'
      }
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeSwitch;
