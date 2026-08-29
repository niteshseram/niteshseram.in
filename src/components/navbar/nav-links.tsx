'use client';

import { usePathname } from 'next/navigation';
import type { PointerEvent } from 'react';

import { Anchor } from '@/components/ui/anchor';
import { navItems } from '@/config/nav';
import { isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';

import { NavLabel } from './nav-label';

export function NavLinks() {
  const pathname = usePathname();

  const visible: typeof navItems = [];
  for (const item of navItems) {
    if (!item.hide) visible.push(item);
  }

  return (
    <nav
      aria-label="Primary"
      className={cn('hidden items-center gap-x-5 sm:flex', 'mr-2.5')}
    >
      {visible.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Anchor
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            variant="unstyled"
            weight="medium"
            onPointerDown={handleNavPointerDown}
            onPointerLeave={handleNavPointerLeave}
            className={cn(
              'group/nav',
              'text-[13px]',
              active ? 'text-foreground' : 'text-muted-foreground',
              !active && 'hover:text-foreground',
            )}
          >
            <NavLabel>{item.label}</NavLabel>
          </Anchor>
        );
      })}
    </nav>
  );
}

function handleNavPointerDown(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse') return;

  event.currentTarget.dataset.pressed = 'true';
}

function handleNavPointerLeave(event: PointerEvent<HTMLAnchorElement>) {
  delete event.currentTarget.dataset.pressed;
}
