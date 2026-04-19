import type { IconType } from 'react-icons';
import { PiEnvelope, PiFolder, PiNotePencil, PiUser } from 'react-icons/pi';

export type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { href: '/about', label: 'About', icon: PiUser },
  { href: '/writing', label: 'Writing', icon: PiNotePencil },
  { href: '/#projects', label: 'Projects', icon: PiFolder },
  { href: '/#contact', label: 'Contact', icon: PiEnvelope },
];
