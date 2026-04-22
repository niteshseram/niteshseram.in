'use client';

import { usePathname } from 'next/navigation';

import { Anchor } from '@/components/ui/anchor';
import { navItems } from '@/config/nav';
import { isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-x-5 sm:flex">
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
  );
}
