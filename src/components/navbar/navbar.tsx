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
        'sticky top-0 z-50 h-[58px]',
        'backdrop-blur-md',
        'bg-background/85',
        'transition-colors duration-[var(--motion-duration-base)] ease-standard',
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
          className={cn(
            'inline-flex size-8 items-center justify-start',
            'text-foreground',
            'group/logo',
          )}
        >
          <Logo size={23} />
        </Anchor>
        <div className={cn('flex items-center gap-x-1.5', 'ml-auto')}>
          <NavLinks />
          <CommandMenu posts={posts} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
