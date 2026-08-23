import { ContentSection } from '@/components/ui/content-section';
import { ABOUT_FACTS } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutJsonSection() {
  return (
    <ContentSection ariaLabel="At a glance" title="At a glance">
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {ABOUT_FACTS.map((fact) => (
          <div key={fact.key} className="flex flex-col gap-y-1.5">
            <dt
              className={cn(
                'text-xs font-medium uppercase tracking-[0.12em]',
                'text-muted-foreground',
              )}
            >
              {formatFactLabel(fact.key)}
            </dt>
            <dd
              className={cn(
                'm-0',
                'text-sm leading-relaxed',
                'text-foreground',
              )}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </ContentSection>
  );
}

function formatFactLabel(label: string) {
  return label.replaceAll('_', ' ');
}
