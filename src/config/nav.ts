import type { IconType } from 'react-icons';
import {
  PiBriefcase,
  PiEnvelope,
  PiFolder,
  PiHouse,
  PiNotePencil,
  PiUser,
} from 'react-icons/pi';

export type NavItem = {
  href: string;
  label: string;
  icon: IconType;
  hide?: boolean;
  keywords?: string[];
};

export const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: PiHouse,
    hide: true,
    keywords: ['start', 'landing'],
  },
  { href: '/about', label: 'About', icon: PiUser },
  {
    href: '/writing',
    label: 'Writing',
    icon: PiNotePencil,
    keywords: ['blog', 'blogs', 'posts'],
  },
  { href: '/#projects', label: 'Projects', icon: PiFolder },
  {
    href: '/#experience',
    label: 'Experience',
    icon: PiBriefcase,
    hide: true,
    keywords: ['work', 'career', 'jobs'],
  },
  { href: '/#contact', label: 'Contact', icon: PiEnvelope },
];
