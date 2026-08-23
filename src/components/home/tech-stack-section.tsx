import { ContentSection } from '@/components/ui/content-section';
import { TECH_STACK_GROUPS } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

export function TechStackSection() {
  return (
    <ContentSection ariaLabel="Tech stack" title="Tools I reach for">
      <div className={cn('grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2')}>
        {TECH_STACK_GROUPS.map((group) => (
          <div key={group.label}>
            <h3
              className={cn(
                'text-sm font-medium leading-snug',
                'text-foreground',
              )}
            >
              {group.label}
            </h3>
            <ul className={cn('flex flex-wrap gap-x-3 gap-y-1.5', 'mt-2')}>
              {group.items.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className={cn(
                    'inline-flex items-center gap-1.5',
                    'text-sm leading-relaxed',
                    'text-muted-foreground',
                  )}
                >
                  <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}
