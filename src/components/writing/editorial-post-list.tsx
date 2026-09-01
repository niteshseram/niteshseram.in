import { format } from 'date-fns';

import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = Readonly<{
  className?: string;
  headingLevel?: 2 | 3;
  posts: Post[];
  startIndex?: number;
}>;

export function EditorialPostList({
  className,
  headingLevel = 3,
  posts,
  startIndex = 0,
}: Props) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <ol className={cn(className)}>
      {posts.map((post, postIndex) => {
        const publishedAt = new Date(post.data.publishedAt);

        return (
          <li
            key={post.url}
            className={cn('py-1', 'border-t', 'border-border/55')}
          >
            <Anchor
              href={post.url}
              className={cn(
                'group/editorial grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2.5rem_minmax(0,1fr)_5.75rem] sm:gap-x-4',
                'px-3 py-4',
                'rounded-md',
                'transition-colors',
                'hover:bg-brand-muted focus-visible:bg-brand-muted',
              )}
              variant="unstyled"
              weight="inherit"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'pt-0.5',
                  'font-mono text-[0.6875rem] leading-5 tabular-nums',
                  'text-brand',
                )}
              >
                {String(startIndex + postIndex + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <Heading
                  className={cn(
                    'text-base font-semibold leading-6 tracking-[-0.012em]',
                    'text-foreground',
                    'transition-colors',
                    'group-hover/editorial:text-brand group-focus-visible/editorial:text-brand',
                  )}
                >
                  {post.data.title}
                </Heading>
                {post.data.summary ? (
                  <p
                    className={cn(
                      'line-clamp-3',
                      'mt-1.5',
                      'text-sm leading-5',
                      'text-muted-foreground',
                    )}
                  >
                    {post.data.summary}
                  </p>
                ) : null}
                <p
                  className={cn(
                    'mt-2 sm:hidden',
                    'text-[0.6875rem] leading-4 tabular-nums',
                    'text-muted-foreground',
                  )}
                >
                  {format(publishedAt, 'MMM d, yyyy')} ·{' '}
                  {post.data.readingTime.minutes} min
                </p>
              </div>
              <div
                className={cn(
                  'hidden flex-col items-end justify-between sm:flex',
                  'text-[0.6875rem] leading-4 tabular-nums',
                  'text-muted-foreground',
                )}
              >
                <time dateTime={publishedAt.toISOString()}>
                  {format(publishedAt, 'MMM d')}
                </time>
                <span>{post.data.readingTime.minutes} min read</span>
              </div>
            </Anchor>
          </li>
        );
      })}
    </ol>
  );
}
