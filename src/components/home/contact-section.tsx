import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { externalLinkArrowClassName } from '@/components/ui/external-link-row';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

const contactLinks = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.x,
];

export function ContactSection() {
  return (
    <ContentSection id="contact" ariaLabel="Contact" title="Let’s talk">
      <p
        className={cn(
          'max-w-[54ch]',
          'text-base leading-7',
          'text-muted-foreground',
        )}
      >
        Open to project ideas, collaborations, and interesting conversations
        about the web. I read every message and usually reply within a day or
        two.
      </p>
      <Anchor
        href={SOCIAL_LINKS.email.href}
        aria-label="Send an email"
        variant="primary"
        weight="medium"
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'mt-5',
          'text-base leading-6',
          'group/external-link',
        )}
      >
        {SOCIAL_LINKS.email.username}
        <PiArrowUpRight
          aria-hidden="true"
          className={cn('size-4', externalLinkArrowClassName)}
        />
      </Anchor>
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-5 gap-y-2',
          'mt-5',
          'text-sm',
        )}
        aria-label="Social links"
      >
        {contactLinks.map((social) => (
          <Anchor
            key={social.label}
            href={social.href}
            variant="default"
            weight="normal"
          >
            {social.label}
          </Anchor>
        ))}
      </div>
    </ContentSection>
  );
}
