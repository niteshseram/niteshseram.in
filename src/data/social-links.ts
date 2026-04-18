import { Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons/brand';

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/niteshseram',
    icon: GithubIcon,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/niteshseram',
    icon: LinkedinIcon,
  },
  x: {
    label: 'Twitter/X',
    href: 'https://twitter.com/niteshseram',
    icon: XIcon,
  },
  email: {
    label: 'Email',
    href: 'mailto:niteshseram@gmail.com',
    icon: Mail,
  },
};
