import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = {
  prev: Post | null;
  next: Post | null;
};

export function PostFooter({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <footer
      className={cn(
        'grid gap-4',
        'mt-16 pt-8',
        'sm:grid-cols-2',
        'border-t border-border',
      )}
    >
      {prev ? (
        <Anchor
          href={prev.url as never}
          variant="unstyled"
          weight="inherit"
          className={cn(
            'group flex flex-col gap-y-1.5',
            'p-4 sm:col-start-1',
            'rounded-lg border border-border',
            'bg-surface/30',
            'transition-colors',
            'hover:border-brand/40',
          )}
        >
          <span
            className={cn(
              'inline-flex items-center gap-x-1',
              'font-mono text-[10px] uppercase tracking-[0.08em]',
              'text-muted-foreground',
            )}
          >
            <PiArrowLeft aria-hidden="true" className="size-3" />
            Previous
          </span>
          <span
            className={cn(
              'font-serif text-base leading-snug',
              'text-foreground',
              'transition-colors',
              'group-hover:text-brand',
            )}
          >
            {prev.data.title}
          </span>
        </Anchor>
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
      {next ? (
        <Anchor
          href={next.url as never}
          variant="unstyled"
          weight="inherit"
          className={cn(
            'group flex flex-col items-end gap-y-1.5',
            'p-4 sm:col-start-2',
            'rounded-lg border border-border',
            'bg-surface/30 text-right',
            'transition-colors',
            'hover:border-brand/40',
          )}
        >
          <span
            className={cn(
              'inline-flex items-center gap-x-1',
              'font-mono text-[10px] uppercase tracking-[0.08em]',
              'text-muted-foreground',
            )}
          >
            Next
            <PiArrowRight aria-hidden="true" className="size-3" />
          </span>
          <span
            className={cn(
              'font-serif text-base leading-snug',
              'text-foreground',
              'transition-colors',
              'group-hover:text-brand',
            )}
          >
            {next.data.title}
          </span>
        </Anchor>
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
    </footer>
  );
}
