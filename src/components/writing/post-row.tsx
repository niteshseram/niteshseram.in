import { format } from 'date-fns';

import { Anchor } from '@/components/ui/anchor';
import { externalLinkTitleClassName } from '@/components/ui/external-link-row';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = {
  headingLevel?: 2 | 3;
  post: Post;
  minutes?: number;
};

export function PostRow({ headingLevel = 3, post, minutes }: Props) {
  const date = new Date(post.data.publishedAt);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <li>
      <Anchor
        href={post.url}
        variant="unstyled"
        weight="inherit"
        className={cn(
          'flex flex-col gap-y-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6',
          'group/external-link',
        )}
      >
        <div className={cn('min-w-0 flex-1')}>
          <Heading
            className={cn(
              'text-base font-medium leading-6 tracking-[-0.01em]',
              'text-foreground',
              externalLinkTitleClassName,
            )}
          >
            {post.data.title}
          </Heading>
          {post.data.summary && (
            <p
              className={cn(
                'line-clamp-2',
                'mt-1',
                'text-[0.9375rem] leading-6',
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
            'text-xs tabular-nums',
            'text-muted-foreground',
          )}
        >
          <time dateTime={date.toISOString()}>
            {format(date, 'MMM d, yyyy')}
          </time>
          {minutes != null && <span> · {minutes} min</span>}
        </div>
      </Anchor>
    </li>
  );
}
