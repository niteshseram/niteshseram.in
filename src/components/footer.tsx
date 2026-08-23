import { cacheLife } from 'next/cache';

import { Anchor } from '@/components/ui/anchor';
import { AUTHOR } from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

const footerLinks = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.x,
];

export async function Footer() {
  'use cache';
  cacheLife('days');

  const year = new Date().getFullYear();

  return (
    <footer>
      <div
        className={cn(
          'flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6',
          'mx-auto px-4.5 py-6 sm:py-7',
          'text-xs',
          'text-muted-foreground',
        )}
      >
        <p>
          <span aria-hidden="true">©</span> {year} {AUTHOR.name}
        </p>
        <p>{AUTHOR.location}</p>
        <nav
          aria-label="Footer navigation"
          className={cn(
            'flex flex-wrap items-center gap-x-4 gap-y-2 sm:ml-auto',
          )}
        >
          {footerLinks.map((social) => (
            <Anchor
              key={social.label}
              href={social.href}
              variant="unstyled"
              weight="normal"
              className="hover:text-foreground"
            >
              {social.label}
            </Anchor>
          ))}
          <Anchor
            href="#main-content"
            variant="unstyled"
            weight="normal"
            className="hover:text-foreground"
          >
            Back to top ↑
          </Anchor>
        </nav>
      </div>
    </footer>
  );
}
