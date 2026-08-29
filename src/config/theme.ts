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
