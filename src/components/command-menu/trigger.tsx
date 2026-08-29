import { Search } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function CommandMenuTrigger({
  onClick,
  onPrefetch,
}: Readonly<{
  onClick: () => void;
  onPrefetch?: () => void;
}>) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Open search"
            onClick={onClick}
            onMouseEnter={onPrefetch}
            onFocus={onPrefetch}
            onTouchStart={onPrefetch}
            className={cn(
              'inline-flex h-8.5 items-center justify-center gap-1.5',
              'px-2 sm:px-2.5',
              'rounded-full',
              'text-muted-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-muted hover:text-foreground',
            )}
          >
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <kbd
              aria-hidden="true"
              className={cn(
                'hidden h-5 items-center sm:inline-flex',
                'px-1',
                'rounded-sm border',
                'font-mono text-[0.625rem] leading-none',
                'bg-muted text-muted-foreground border-border',
              )}
            >
              ⌘K
            </kbd>
          </button>
        }
      />
      <TooltipContent side="bottom">
        <span className="inline-flex items-center gap-x-2">
          Search
          <kbd
            className={cn(
              'inline-flex h-5 min-w-5 items-center justify-center',
              'px-1',
              'rounded-sm border',
              'font-mono text-[11px] leading-none',
              'border-border bg-muted text-muted-foreground',
            )}
          >
            ⌘K
          </kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
