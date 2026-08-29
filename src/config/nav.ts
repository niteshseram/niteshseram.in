import {
  Briefcase,
  FilePenLine,
  Folder,
  House,
  Mail,
  User,
} from 'lucide-react';

import type { IconComponent } from '@/lib/icon-types';

export type NavItem = {
  href: string;
  label: string;
  icon: IconComponent;
  hide?: boolean;
  keywords?: string[];
};

export const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: House,
    hide: true,
    keywords: ['start', 'landing'],
  },
  { href: '/#projects', label: 'Work', icon: Folder },
  {
    href: '/writing',
    label: 'Writing',
    icon: FilePenLine,
    keywords: ['blog', 'blogs', 'posts'],
  },
  {
    href: '/#experience',
    label: 'Experience',
    icon: Briefcase,
    hide: true,
    keywords: ['work', 'career', 'jobs'],
  },
  { href: '/about', label: 'About', icon: User },
  { href: '/#contact', label: 'Contact', icon: Mail, hide: true },
];
