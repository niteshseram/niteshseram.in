import { cn } from '@/lib/utils';

export function TagChip({ label }: { label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'px-2 py-0.5',
        'rounded-full border border-border',
        'font-mono text-[10px] uppercase tracking-[0.08em]',
        'text-muted-foreground',
      )}
    >
      {label}
    </span>
  );
}
