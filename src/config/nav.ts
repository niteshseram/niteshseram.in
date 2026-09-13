import {
  Briefcase,
  FilePenLine,
  Folder,
  House,
  Mail,
  User,
} from 'lucide-react';

import { PROJECTS_LABEL } from '@/config/site';
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
  { href: '/#projects', label: PROJECTS_LABEL, icon: Folder, hide: true },
  {
    href: '/writing',
    label: 'Writing',
    icon: FilePenLine,
    keywords: ['blog', 'blogs', 'posts'],
  },
  {
    href: '/about#experience',
    label: 'Experience',
    icon: Briefcase,
    hide: true,
    keywords: ['work', 'career', 'jobs'],
  },
  { href: '/about', label: 'About', icon: User },
  { href: '/#contact', label: 'Contact', icon: Mail, hide: true },
];
