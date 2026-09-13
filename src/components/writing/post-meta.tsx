import { formatPostDate } from '@/lib/date';
import { cn } from '@/lib/utils';

type Props = {
  date: string | Date;
  label?: string;
  minutes?: number;
  className?: string;
};

export function PostMeta({ date, label, minutes, className }: Props) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-x-2 gap-y-1',
        'text-[0.8125rem] leading-6 tabular-nums',
        'text-foreground-subtle',
        className,
      )}
    >
      <time dateTime={new Date(date).toISOString()}>
        {label ? `${label} ` : ''}
        {formatPostDate(date)}
      </time>
      {minutes != null && (
        <>
          <span aria-hidden="true">·</span>
          <span>{minutes} min read</span>
        </>
      )}
    </div>
  );
}
