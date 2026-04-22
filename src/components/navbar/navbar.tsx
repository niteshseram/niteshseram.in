import { CommandMenu } from '@/components/command-menu';
import { Logo } from '@/components/logo';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';
import type { PostIndexEntry } from '@/lib/writing';

import { NavLinks } from './nav-links';

type Props = Readonly<{
  posts: PostIndexEntry[];
}>;

export function Navbar({ posts }: Props) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[52px]',
        'border-b border-border backdrop-blur',
        'bg-surface/50',
      )}
    >
      <div
        className={cn('flex h-full max-w-2xl items-center', 'mx-auto px-4.5')}
      >
        <Anchor
          href="/"
          aria-label="Home"
          variant="unstyled"
          weight="inherit"
          className="inline-flex items-center"
        >
          <Logo />
        </Anchor>
        <div className={cn('flex items-center gap-x-5', 'ml-auto')}>
          <NavLinks />
          <CommandMenu posts={posts} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
