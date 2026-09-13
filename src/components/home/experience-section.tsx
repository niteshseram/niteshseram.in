import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { EXPERIENCES } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  return (
    <ContentSection id="experience" ariaLabel="Experience" title="Experience">
      <ol className={cn('space-y-8')}>
        {EXPERIENCES.map((experience) => (
          <li key={experience.company}>
            <h3 className={cn('text-base font-medium leading-6')}>
              {experience.href ? (
                <Anchor href={experience.href} variant="prose" weight="inherit">
                  {experience.company}
                </Anchor>
              ) : (
                experience.company
              )}
            </h3>
            <ol className={cn('space-y-5', 'mt-4')}>
              {experience.roles.map((role) => (
                <li key={role.title + role.start}>
                  <div
                    className={cn(
                      'flex flex-col gap-x-4 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between',
                    )}
                  >
                    <h4 className={cn('text-base font-normal leading-6')}>
                      {role.title}
                    </h4>
                    <p
                      className={cn(
                        'shrink-0',
                        'text-[0.8125rem] leading-6 tabular-nums',
                        'text-muted-foreground',
                      )}
                    >
                      {role.start} – {role.end}
                    </p>
                  </div>
                  <p
                    className={cn(
                      'mt-1.5',
                      'text-sm leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {role.brief}
                  </p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
