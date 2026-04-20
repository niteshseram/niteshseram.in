import type { ReactNode } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

import { cn } from '@/lib/utils';

const MOD_KEY = '⌘';

type TriggerVariant = 'inline' | 'floating';

export function CommandMenuTrigger({
  onClick,
  onPrefetch,
  variant,
}: Readonly<{
  onClick: () => void;
  onPrefetch?: () => void;
  variant: TriggerVariant;
}>) {
  const floating = variant === 'floating';
  return (
    <button
      type="button"
      aria-label={`Open command menu${floating ? '' : ` (${MOD_KEY}K)`}`}
      onClick={onClick}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      onTouchStart={onPrefetch}
      className={cn(
        floating
          ? 'group fixed bottom-5 left-1/2 z-50 inline-flex h-10 min-w-40 -translate-x-1/2 items-center justify-center gap-x-2 sm:hidden'
          : 'group hidden h-8.5 items-center gap-x-2 sm:inline-flex',
        floating ? 'px-4' : 'pl-2.5 pr-1.5',
        floating
          ? 'rounded-xl border border-border backdrop-blur'
          : 'rounded-full border border-border',
        floating
          ? 'bg-popover text-foreground/70'
          : 'bg-transparent text-muted-foreground',
        'cursor-pointer',
        'transition-colors',
        'hover:bg-muted hover:text-foreground',
      )}
    >
      <PiMagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
      {floating ? (
        <span className="text-sm">Menu</span>
      ) : (
        <span aria-hidden="true" className="inline-flex items-center gap-x-0.5">
          <TriggerKey>{MOD_KEY}</TriggerKey>
          <TriggerKey>K</TriggerKey>
        </span>
      )}
    </button>
  );
}

function TriggerKey({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center',
        'px-1 rounded border border-border',
        'bg-muted/70 group-hover:bg-background/60',
        'font-mono text-sm/none text-foreground/70',
        'transition-colors',
      )}
    >
      {children}
    </kbd>
  );
}
