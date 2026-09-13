'use client';

import { Moon, Sun } from 'lucide';
import { useTheme } from 'next-themes';

import { IconButton } from '@/components/ui/icon-button';
import { SiteIcon } from '@/components/ui/site-icon';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';
import { useMounted } from '@/utils/use-mounted';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  function handleToggle() {
    const currentTheme =
      resolvedTheme ??
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  useGlobalShortcut((event) => {
    if (
      !event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.isComposing ||
      event.repeat ||
      event.code !== 'KeyT'
    )
      return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.isContentEditable || target.closest('input, textarea, select'))
    )
      return;
    event.preventDefault();
    handleToggle();
  });

  return (
    <IconButton
      label={label}
      aria-keyshortcuts="Alt+T"
      onClick={handleToggle}
      icon={<SiteIcon icon={isDark ? Sun : Moon} />}
      tooltip={`${label} · Alt+T`}
    />
  );
}
