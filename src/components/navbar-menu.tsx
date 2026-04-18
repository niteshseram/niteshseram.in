'use client';

import { Popover } from '@base-ui/react/popover';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import type { NavItem } from '@/config/nav';
import { isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';

type Props = Readonly<{
  items: NavItem[];
  pathname: string;
}>;

export function NavbarMenu({ items, pathname }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Button
            aria-label="Toggle menu"
            className="sm:hidden"
            icon={Menu}
            isLabelHidden={true}
            label="Menu"
            size="sm"
            variant="outline"
          />
        }
      />
      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={14}>
          <Popover.Popup
            className={cn(
              'w-56',
              'p-1.5',
              'rounded-xl border border-input shadow-[0_10px_40px_-10px]',
              'bg-popover shadow-black/40',
              'transition-[transform,scale,opacity] origin-(--transform-origin)',
              'data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
            )}
          >
            <div
              className={cn(
                'px-2.5 pt-1 pb-2',
                'font-mono text-[10px] uppercase tracking-[0.14em]',
                'text-muted-foreground',
              )}
            >
              Menu
            </div>
            <nav
              aria-label="Primary mobile"
              className="flex flex-col gap-y-0.5"
            >
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Anchor
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    variant="unstyled"
                    weight="normal"
                    onClick={() => setOpen(false)}
                    className={cn(
                      'group flex items-center gap-x-3',
                      'px-2.5 py-2',
                      'rounded-md',
                      'text-sm',
                      active
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground',
                      'focus-visible:outline-none',
                      !active &&
                        'hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground',
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn(
                        'size-4 shrink-0',
                        active ? 'text-brand' : 'text-muted-foreground',
                        'transition-colors',
                        !active &&
                          'group-hover:text-foreground group-focus-visible:text-foreground',
                      )}
                    />
                    {item.label}
                  </Anchor>
                );
              })}
            </nav>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
