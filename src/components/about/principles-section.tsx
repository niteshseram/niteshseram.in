import { ContentSection } from '@/components/ui/content-section';
import { PRINCIPLES } from '@/data/about';
import { cn } from '@/lib/utils';

export function PrinciplesSection() {
  return (
    <ContentSection ariaLabel="Principles" title="Principles">
      <ol className={cn('border-y', 'border-border/55')}>
        {PRINCIPLES.map((principle, principleIndex) => (
          <li
            key={principle.hash}
            className={cn(
              'grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3',
              'px-3 py-5',
              principleIndex > 0 ? 'border-t' : '',
              'border-border/55',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'pt-0.5',
                'font-mono text-[0.6875rem] font-medium tabular-nums',
                'text-brand',
              )}
            >
              {String(principleIndex + 1).padStart(2, '0')}
            </span>
            <div>
              <p
                className={cn(
                  'font-mono text-[0.625rem] font-medium tracking-[0.1em] uppercase',
                  'text-muted-foreground',
                )}
              >
                {principle.type}
              </p>
              <h3
                className={cn(
                  'mt-2',
                  'text-[1.0625rem] font-semibold leading-6 tracking-[-0.012em]',
                  'text-foreground',
                )}
              >
                {principle.title}
              </h3>
              <p
                className={cn(
                  'max-w-[54ch]',
                  'mt-1.5',
                  'text-sm leading-6',
                  'text-muted-foreground',
                )}
              >
                {principle.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
