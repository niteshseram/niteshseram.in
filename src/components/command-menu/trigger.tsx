import { PiMagnifyingGlass } from 'react-icons/pi';

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
              'inline-flex size-8.5 items-center justify-center',
              'rounded-full',
              'text-muted-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-muted hover:text-foreground',
            )}
          >
            <PiMagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
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
              'border-background/25 bg-background/10 text-background',
            )}
          >
            ⌘K
          </kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
