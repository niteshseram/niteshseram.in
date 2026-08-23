import { ContentSection } from '@/components/ui/content-section';
import { PRINCIPLES } from '@/data/about';
import { cn } from '@/lib/utils';

export function PrinciplesSection() {
  return (
    <ContentSection ariaLabel="Principles" title="Principles">
      <ol className="flex flex-col gap-y-7">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle.hash}
            className="grid gap-3 sm:grid-cols-[2.5rem_1fr] sm:gap-5"
          >
            <span
              aria-hidden="true"
              className={cn(
                'font-mono text-xs tabular-nums',
                'text-muted-foreground',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3
                className={cn(
                  'text-[1.0625rem] font-medium leading-6 tracking-[-0.012em]',
                  'text-foreground',
                )}
              >
                {principle.title}
              </h3>
              <p
                className={cn(
                  'max-w-[56ch]',
                  'mt-1.5',
                  'text-[0.9375rem] leading-6',
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
