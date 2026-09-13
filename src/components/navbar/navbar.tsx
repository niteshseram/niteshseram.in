import { CommandMenu } from '@/components/command-menu';
import { Anchor } from '@/components/ui/anchor';
import { AUTHOR } from '@/config/site';
import { cn } from '@/lib/utils';
import type { PostIndexEntry } from '@/lib/writing';

import { NavLinks } from './nav-links';

export function Navbar({ posts }: Readonly<{ posts: PostIndexEntry[] }>) {
  return (
    <header className={cn('site-container', 'pt-7 sm:pt-14')}>
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
        )}
      >
        <Anchor
          href="/"
          variant="unstyled"
          weight="medium"
          className={cn('inline-flex min-h-11 items-center', 'text-base')}
        >
          {AUTHOR.name}
        </Anchor>
        <div
          className={cn('flex min-w-0 flex-wrap items-center gap-2 sm:gap-4')}
        >
          <NavLinks />
          <CommandMenu posts={posts} />
        </div>
      </div>
    </header>
  );
}
