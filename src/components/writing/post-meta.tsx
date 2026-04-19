import { format } from 'date-fns';

import { cn } from '@/lib/utils';

type Props = {
  date: string | Date;
  minutes?: number;
  className?: string;
};

export function PostMeta({ date, minutes, className }: Props) {
  const formatted = format(new Date(date), 'MMM d, yyyy');

  return (
    <div
      className={cn(
        'inline-flex items-center gap-x-2',
        'font-mono text-xs tabular-nums',
        'text-muted-foreground',
        className,
      )}
    >
      <time dateTime={new Date(date).toISOString()}>{formatted}</time>
      {minutes != null && (
        <>
          <span aria-hidden="true">·</span>
          <span>{minutes} min read</span>
        </>
      )}
    </div>
  );
}
