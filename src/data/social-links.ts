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

const EMAIL = atob('bml0ZXNoc2VyYW1AZ21haWwuY29t');

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
    href: `mailto:${EMAIL}`,
    username: EMAIL,
    icon: PiEnvelope,
  },
};
