import type { IconType } from 'react-icons';
import {
  PiEnvelope,
  PiGithubLogo,
  PiLinkedinLogo,
  PiXLogo,
} from 'react-icons/pi';

export type SocialLink = {
  label: string;
  href: string;
  username: string;
  icon: IconType;
};

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/niteshseram',
    username: 'niteshseram',
    icon: PiGithubLogo,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/niteshseram',
    username: 'niteshseram',
    icon: PiLinkedinLogo,
  },
  x: {
    label: 'Twitter/X',
    href: 'https://twitter.com/niteshseram',
    username: 'niteshseram',
    icon: PiXLogo,
  },
  email: {
    label: 'Email',
    href: 'mailto:niteshseram@gmail.com',
    username: 'niteshseram@gmail.com',
    icon: PiEnvelope,
  },
};
