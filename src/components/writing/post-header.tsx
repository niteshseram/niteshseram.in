import { PostMeta } from '@/components/writing/post-meta';
import { cn } from '@/lib/utils';

type Props = {
  minutes?: number;
  publishedAt: string | Date;
  updatedAt?: string | Date;
  summary?: string;
  tags?: readonly string[];
  title: string;
};

export function PostHeader({ minutes, publishedAt, updatedAt, title }: Props) {
  return (
    <header className={cn('mb-8 pb-7', 'border-b', 'border-border')}>
      <h1
        className={cn(
          'type-article-title font-[550]',
          'text-foreground-strong',
        )}
      >
        {title}
      </h1>
      <div
        className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', 'mt-4')}
      >
        <PostMeta date={publishedAt} minutes={minutes} />
        {updatedAt &&
        new Date(updatedAt).getTime() !== new Date(publishedAt).getTime() ? (
          <PostMeta date={updatedAt} label="Updated" />
        ) : null}
      </div>
    </header>
  );
}
