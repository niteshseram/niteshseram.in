import type { IconType } from 'react-icons';
import { PiGithubLogo, PiLinkedinLogo, PiTwitterLogo } from 'react-icons/pi';

type NavItem = {
  label: string;
  href: string;
};

export const NavItems: Record<string, NavItem> = {
  home: {
    label: 'Home',
    href: '/',
  },
  about: {
    label: 'About',
    href: '/about',
  },
  blog: {
    label: 'Blog',
    href: '/blog',
  },
};

type SocialItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const Social: Array<SocialItem> = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/niteshseram',
    icon: PiLinkedinLogo,
  },
  {
    name: 'Twitter/X',
    href: 'https://x.com/niteshseram',
    icon: PiTwitterLogo,
  },
  {
    name: 'Github',
    href: 'https://github.com/niteshseram',
    icon: PiGithubLogo,
  },
];

export const REACTION = {
  like: 'LIKE',
  love: 'LOVE',
};
