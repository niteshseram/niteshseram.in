import type { IconType } from 'react-icons';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

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
  label: string;
  href: string;
  icon: IconType;
};

export const SOCIAL: Array<SocialItem> = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/niteshseram',
    icon: FiLinkedin,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/niteshseram',
    icon: FiTwitter,
  },
  {
    label: 'Github',
    href: 'https://github.com/niteshseram',
    icon: FiGithub,
  },
];

export const REACTION = {
  like: 'LIKE',
  love: 'LOVE',
};
