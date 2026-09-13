import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = { prev: Post | null; next: Post | null };

export function PostFooter({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <footer className={cn('mt-12 pt-6', 'border-t', 'border-divider')}>
      {(prev || next) && (
        <nav
          aria-label="More writing"
          className={cn('grid gap-6 sm:grid-cols-2')}
        >
          {prev ? (
            <Anchor
              href={prev.url}
              variant="unstyled"
              weight="normal"
              className={cn('block', 'py-2', 'hover:text-muted-foreground')}
            >
              <span
                className={cn(
                  'block',
                  'mb-2',
                  'text-sm',
                  'text-muted-foreground',
                )}
              >
                ← Newer
              </span>
              <span className={cn('text-base leading-6')}>
                {prev.data.title}
              </span>
            </Anchor>
          ) : (
            <div />
          )}
          {next && (
            <Anchor
              href={next.url}
              variant="unstyled"
              weight="normal"
              className={cn(
                'block',
                'py-2',
                'sm:text-right',
                'hover:text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'block',
                  'mb-2',
                  'text-sm',
                  'text-muted-foreground',
                )}
              >
                Older →
              </span>
              <span className={cn('text-base leading-6')}>
                {next.data.title}
              </span>
            </Anchor>
          )}
        </nav>
      )}
    </footer>
  );
}
