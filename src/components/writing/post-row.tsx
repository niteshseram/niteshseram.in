import { format } from 'date-fns';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = {
  post: Post;
  minutes?: number;
};

export function PostRow({ post, minutes }: Props) {
  const date = new Date(post.data.publishedAt);

  return (
    <li>
      <Link
        href={post.url}
        className={cn(
          'group flex flex-col gap-y-2.5',
          'py-3',
          'sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6',
        )}
      >
        <div
          className={cn(
            'min-w-0 flex-1',
            'transition-transform',
            'group-hover:translate-x-1',
          )}
        >
          <h3
            className={cn(
              'text-lg tracking-tight leading-snug',
              'text-foreground',
              'transition-colors',
              'group-hover:text-brand',
            )}
          >
            {post.data.title}
          </h3>
          {post.data.summary && (
            <p
              className={cn(
                'mt-1',
                'text-base leading-relaxed',
                'text-muted-foreground',
              )}
            >
              {post.data.summary}
            </p>
          )}
        </div>
        <div
          className={cn(
            'shrink-0',
            'font-mono text-xs tabular-nums',
            'text-muted-foreground',
          )}
        >
          <time dateTime={date.toISOString()}>
            {format(date, 'MMM d, yyyy')}
          </time>
          {minutes != null && <span> · {minutes} min</span>}
        </div>
      </Link>
    </li>
  );
}
