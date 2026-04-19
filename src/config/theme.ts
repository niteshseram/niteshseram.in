import { PiDesktop, PiMoon, PiSun } from 'react-icons/pi';

export const THEMES = {
  system: {
    label: 'System',
    icon: PiDesktop,
    keywords: ['theme', 'mode', 'auto'],
  },
  dark: {
    label: 'Dark',
    icon: PiMoon,
    keywords: ['theme', 'mode', 'night'],
  },
  light: {
    label: 'Light',
    icon: PiSun,
    keywords: ['theme', 'mode', 'bright'],
  },
};
