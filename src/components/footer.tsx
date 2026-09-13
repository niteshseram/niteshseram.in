import { ArrowUpRight } from 'lucide';

import { LocalClock } from '@/components/local-clock';
import { ThemeToggle } from '@/components/theme-toggle';
import { Anchor } from '@/components/ui/anchor';
import { SiteIcon } from '@/components/ui/site-icon';
import { FEED } from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className={cn('site-container', 'pb-8 sm:pb-12')}>
      <div
        className={cn(
          'relative flex flex-wrap items-center justify-between gap-x-8 gap-y-4',
          'pt-6',
          'border-t',
          'text-sm',
          'border-divider text-muted-foreground',
        )}
      >
        <LocalClock />
        <nav
          aria-label="Footer"
          className={cn('flex flex-wrap items-center gap-x-4', '-mr-3')}
        >
          <Anchor
            href={SOCIAL_LINKS.email.href}
            weight="normal"
            className={cn('inline-flex min-h-11 items-center gap-1.5')}
          >
            Say hello
            <SiteIcon
              icon={ArrowUpRight}
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.5}
            />
          </Anchor>
          <Anchor
            href="/about"
            weight="normal"
            className={cn('inline-flex min-h-11 items-center')}
          >
            About
          </Anchor>
          <a
            href={FEED.path}
            className={cn(
              'inline-flex min-h-11 items-center',
              'transition-colors',
              'hover:text-foreground',
            )}
          >
            RSS
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </footer>
  );
}
