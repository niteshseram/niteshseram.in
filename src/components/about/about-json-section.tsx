import { ContentSection } from '@/components/ui/content-section';
import { ABOUT_FACTS } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutJsonSection() {
  return (
    <ContentSection ariaLabel="At a glance" title="At a glance">
      <div
        className={cn(
          'overflow-hidden',
          'rounded-lg border',
          'bg-surface border-border',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4',
            'px-4 py-3',
            'border-b',
            'font-mono text-[0.6875rem] leading-4',
            'bg-muted/45 text-muted-foreground border-border',
          )}
        >
          <span className={cn('inline-flex items-center gap-1.5')}>
            <span className={cn('size-1.5', 'rounded-full', 'bg-brand')} />
            profile.json
          </span>
          <span>{ABOUT_FACTS.length} keys</span>
        </div>
        <dl className={cn('grid sm:grid-cols-2')}>
          {ABOUT_FACTS.map((fact, factIndex) => (
            <div
              key={fact.key}
              className={cn(
                'min-w-0',
                'p-4 sm:p-5',
                'border-border',
                factIndex > 0 ? 'border-t' : '',
                factIndex === 1 ? 'sm:border-t-0 sm:border-l' : '',
                factIndex > 1 && factIndex % 2 === 1 ? 'sm:border-l' : '',
              )}
            >
              <dt
                className={cn(
                  'font-mono text-[0.625rem] font-medium tracking-[0.1em] uppercase',
                  'text-brand',
                )}
              >
                {formatFactLabel(fact.key)}
              </dt>
              <dd
                className={cn(
                  'm-0 mt-2',
                  'text-sm leading-5',
                  'text-foreground',
                )}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </ContentSection>
  );
}

function formatFactLabel(label: string) {
  return label.replaceAll('_', ' ');
}
