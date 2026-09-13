import { cn } from '@/lib/utils';

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'writing-prose',
        'text-base',
        'text-foreground-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}
