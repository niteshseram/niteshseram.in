import { PostMeta } from '@/components/writing/post-meta';
import { cn } from '@/lib/utils';

const EMPTY_TAGS: readonly string[] = [];

type Props = {
  minutes?: number;
  publishedAt: string | Date;
  summary?: string;
  tags?: readonly string[];
  title: string;
};

export function PostHeader({
  minutes,
  publishedAt,
  summary,
  tags = EMPTY_TAGS,
  title,
}: Props) {
  return (
    <header className="mb-10 sm:mb-12">
      <h1 className={cn('type-article-title font-semibold', 'text-foreground')}>
        {title}
      </h1>
      {summary && (
        <p
          className={cn(
            'max-w-[56ch]',
            'mt-4',
            'text-base leading-7',
            'text-muted-foreground',
          )}
        >
          {summary}
        </p>
      )}
      <div
        className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', 'mt-4')}
      >
        <PostMeta date={publishedAt} minutes={minutes} />
        {tags.length > 0 ? (
          <ul
            aria-label="Topics"
            className={cn(
              'flex flex-wrap items-center gap-x-2',
              'font-mono text-xs',
              'text-muted-foreground',
            )}
          >
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
