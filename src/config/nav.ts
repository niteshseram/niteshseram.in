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
  { href: '/#projects', label: 'Projects', icon: PiFolder },
  {
    href: '/writing',
    label: 'Writing',
    icon: PiNotePencil,
    keywords: ['blog', 'blogs', 'posts'],
  },
  {
    href: '/#experience',
    label: 'Experience',
    icon: PiBriefcase,
    hide: true,
    keywords: ['work', 'career', 'jobs'],
  },
  { href: '/about', label: 'About', icon: PiUser },
  { href: '/#contact', label: 'Contact', icon: PiEnvelope, hide: true },
];
