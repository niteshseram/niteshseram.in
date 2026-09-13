import { ArrowUpRight } from 'lucide';

import { Anchor } from '@/components/ui/anchor';
import { SiteIcon } from '@/components/ui/site-icon';
import { AUTHOR } from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      aria-labelledby="home-title"
      className={cn('site-container', 'pb-10 sm:pb-12')}
    >
      <h1 id="home-title" className="sr-only">
        {AUTHOR.name}, software engineer
      </h1>
      <p className={cn('text-sm leading-6', 'text-muted-foreground')}>
        Software engineer in {AUTHOR.location}
      </p>
      <div className={cn('space-y-3', 'mt-7', 'text-base leading-[1.65]')}>
        <p>
          I work at{' '}
          <Anchor href={AUTHOR.employer.url} variant="prose" weight="normal">
            GreatFrontEnd
          </Anchor>
          , building frontend products. Previously, I was at{' '}
          <Anchor href="https://auzmor.com" variant="prose" weight="normal">
            Auzmor
          </Anchor>
          .
        </p>
        <p>
          I like working through the details of an interface: how it responds,
          handles errors, and holds up as it grows.
        </p>
      </div>
      <nav
        id="contact"
        aria-label="Contact"
        className={cn(
          'flex flex-wrap items-center gap-x-6 gap-y-1 scroll-mt-8',
          'mt-4',
        )}
      >
        {[
          SOCIAL_LINKS.email,
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.x,
          SOCIAL_LINKS.linkedin,
        ].map((social) => (
          <Anchor
            key={social.label}
            href={social.href}
            variant="prose"
            weight="normal"
            className={cn('inline-flex min-h-11 items-center gap-1', 'text-sm')}
          >
            {social.label}
            <SiteIcon
              icon={ArrowUpRight}
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.5}
            />
          </Anchor>
        ))}
      </nav>
    </section>
  );
}
