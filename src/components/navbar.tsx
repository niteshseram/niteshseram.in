'use client';

import { usePathname } from 'next/navigation';

import { CommandMenu } from '@/components/command-menu';
import { Logo } from '@/components/logo';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Anchor } from '@/components/ui/anchor';
import { navItems } from '@/config/nav';
import { isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';
import type { PostIndexEntry } from '@/lib/writing';

type Props = Readonly<{
  posts: PostIndexEntry[];
}>;

export function Navbar({ posts }: Props) {
  const pathname = usePathname();

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
          <nav
            aria-label="Primary"
            className="hidden items-center gap-x-5 sm:flex"
          >
            {navItems
              .filter((item) => !item.hide)
              .map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Anchor
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    variant="unstyled"
                    weight="normal"
                    className={cn(
                      'text-sm',
                      active ? 'text-foreground' : 'text-muted-foreground',
                      !active && 'hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Anchor>
                );
              })}
          </nav>
          <CommandMenu posts={posts} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
