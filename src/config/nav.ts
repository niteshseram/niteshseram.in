import {
  EnvelopeSimpleIcon,
  FolderIcon,
  type IconProps,
  NotePencilIcon,
  UserIcon,
} from '@phosphor-icons/react';
import type { ComponentType } from 'react';

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
};

export const navItems: NavItem[] = [
  { href: '/about', label: 'About', icon: UserIcon },
  { href: '/writing', label: 'Writing', icon: NotePencilIcon },
  { href: '/projects', label: 'Projects', icon: FolderIcon },
  { href: '/contact', label: 'Contact', icon: EnvelopeSimpleIcon },
];
