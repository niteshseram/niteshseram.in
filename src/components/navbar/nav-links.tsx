'use client';

import { usePathname } from 'next/navigation';

import { Anchor } from '@/components/ui/anchor';
import { navItems } from '@/config/nav';
import { isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn('flex flex-wrap items-center gap-x-4 sm:gap-x-5')}
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
                'inline-flex min-h-11 items-center',
                'text-sm underline-offset-6',
                active ? 'text-foreground' : 'text-muted-foreground',
                'hover:text-foreground',
                'aria-[current=page]:underline',
              )}
            >
              {item.label}
            </Anchor>
          );
        })}
    </nav>
  );
}
