import { Anchor } from '@/components/ui/anchor';
import { formatPostDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/writing';

type Props = Readonly<{
  className?: string;
  headingLevel?: 2 | 3;
  posts: Post[];
  showSummary?: boolean;
}>;

export function EditorialPostList({
  className,
  headingLevel = 3,
  posts,
  showSummary = false,
}: Props) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ol className={cn('focus-list', 'border-t', 'border-divider', className)}>
      {posts.map((post) => (
        <li key={post.url} className={cn('border-b', 'border-divider')}>
          <Anchor
            href={post.url}
            variant="unstyled"
            weight="normal"
            className={cn(
              'group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto]',
              '-mx-2 px-2 py-4',
              'rounded-sm',
            )}
          >
            <div className="min-w-0">
              <Heading className={cn('text-base font-normal leading-6')}>
                {post.data.title}
              </Heading>
              {showSummary && post.data.summary ? (
                <p
                  className={cn(
                    'mt-1.5',
                    'text-sm leading-6',
                    'text-muted-foreground',
                  )}
                >
                  {post.data.summary}
                </p>
              ) : null}
            </div>
            <time
              dateTime={new Date(post.data.publishedAt).toISOString()}
              className={cn(
                'shrink-0',
                'text-[0.8125rem] leading-6 whitespace-nowrap tabular-nums',
                'text-muted-foreground',
              )}
            >
              {formatPostDate(post.data.publishedAt)}
            </time>
          </Anchor>
        </li>
      ))}
    </ol>
  );
}
