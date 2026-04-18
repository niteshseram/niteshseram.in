import { Folder, type LucideIcon, Mail, NotebookPen, User } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: '/about', label: 'About', icon: User },
  { href: '/writing', label: 'Writing', icon: NotebookPen },
  { href: '/projects', label: 'Projects', icon: Folder },
  { href: '/contact', label: 'Contact', icon: Mail },
];
