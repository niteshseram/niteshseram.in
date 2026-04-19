import { PostMeta } from '@/components/writing/post-meta';
import { TagChip } from '@/components/writing/tag-chip';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  summary?: string;
  publishedAt: string | Date;
  minutes?: number;
  tags?: string[];
};

export function PostHeader({
  title,
  summary,
  publishedAt,
  minutes,
  tags = [],
}: Props) {
  return (
    <header className={cn('mb-8 pb-6', 'border-b border-border')}>
      {tags.length > 0 && (
        <ul className={cn('mb-4 flex flex-wrap items-center gap-1.5')}>
          {tags.map((tag) => (
            <li key={tag}>
              <TagChip label={tag} />
            </li>
          ))}
        </ul>
      )}
      <h1
        className={cn(
          'font-serif text-[clamp(1.75rem,6vw,2.25rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        {title}
      </h1>
      {summary && (
        <p
          className={cn(
            'mt-3',
            'text-base leading-relaxed',
            'text-muted-foreground',
          )}
        >
          {summary}
        </p>
      )}
      <PostMeta date={publishedAt} minutes={minutes} className="mt-5" />
    </header>
  );
}
