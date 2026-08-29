import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <footer className={cn('grid gap-7 sm:grid-cols-2', 'mt-16')}>
      {prev ? (
        <Anchor
          href={prev.url as never}
          variant="unstyled"
          weight="inherit"
          className={cn(
            'group flex flex-col gap-y-2 sm:col-start-1',
            'transition-colors',
          )}
        >
          <span
            className={cn(
              'inline-flex items-center gap-x-1',
              'font-mono text-[10px] uppercase tracking-[0.1em]',
              'text-muted-foreground',
            )}
          >
            <ArrowLeft aria-hidden="true" className="size-3" />
            Previous
          </span>
          <span
            className={cn(
              'text-base font-medium leading-snug',
              'text-foreground',
              'transition-colors',
              'group-hover:text-muted-foreground',
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
            'group flex flex-col items-end gap-y-2 sm:col-start-2',
            'text-right',
            'transition-colors',
          )}
        >
          <span
            className={cn(
              'inline-flex items-center gap-x-1',
              'font-mono text-[10px] uppercase tracking-[0.1em]',
              'text-muted-foreground',
            )}
          >
            Next
            <ArrowRight aria-hidden="true" className="size-3" />
          </span>
          <span
            className={cn(
              'text-base font-medium leading-snug',
              'text-foreground',
              'transition-colors',
              'group-hover:text-muted-foreground',
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
