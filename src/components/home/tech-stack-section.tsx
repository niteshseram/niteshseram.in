import { ContentSection } from '@/components/ui/content-section';
import { TECH_STACK_GROUPS } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

export function TechStackSection() {
  return (
    <ContentSection id="tech-stack" ariaLabel="Tech stack" title="Tech stack">
      <dl className={cn('space-y-3', 'text-sm leading-6')}>
        {TECH_STACK_GROUPS.map((group) => (
          <div
            key={group.label}
            className={cn('flex flex-wrap gap-x-4 gap-y-0.5')}
          >
            <dt className={cn('w-22 shrink-0', 'text-muted-foreground')}>
              {group.label}
            </dt>
            <dd className={cn('min-w-0 flex-1 basis-48')}>
              {group.items.map((item) => item.label).join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </ContentSection>
  );
}
