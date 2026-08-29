import { Mail } from 'lucide-react';

import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/icons/brand-icons';
import type { IconComponent } from '@/lib/icon-types';

export type SocialLink = {
  label: string;
  href: string;
  username: string;
  icon: IconComponent;
};

const EMAIL = atob('bml0ZXNoc2VyYW1AZ21haWwuY29t');

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/niteshseram',
    username: 'niteshseram',
    icon: GitHubIcon,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/niteshseram',
    username: 'niteshseram',
    icon: LinkedInIcon,
  },
  x: {
    label: 'Twitter/X',
    href: 'https://twitter.com/niteshseram',
    username: 'niteshseram',
    icon: XIcon,
  },
  email: {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    username: EMAIL,
    icon: Mail,
  },
};
