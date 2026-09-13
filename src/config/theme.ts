import { Monitor, Moon, Sun } from 'lucide-react';

export const THEMES = {
  system: {
    label: 'System',
    icon: Monitor,
    keywords: ['theme', 'mode', 'auto'],
  },
  dark: {
    label: 'Dark',
    icon: Moon,
    keywords: ['theme', 'mode', 'night'],
  },
  light: {
    label: 'Light',
    icon: Sun,
    keywords: ['theme', 'mode', 'bright'],
  },
};

// Runs in the document head, before streamed body content or React hydration.
// Keep the storage key and system fallback aligned with next-themes.
export const THEME_INIT_SCRIPT = `
  (function () {
    var preference = 'system';
    try {
      preference = localStorage.getItem('theme') || 'system';
    } catch (error) {}

    var appearance = preference === 'light' || preference === 'dark'
      ? preference
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(appearance);
    root.style.colorScheme = appearance;
  })();
`;
