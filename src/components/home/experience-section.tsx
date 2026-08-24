import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import {
  ExternalLinkArrow,
  externalLinkTitleClassName,
} from '@/components/ui/external-link-row';
import { EXPERIENCES } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  return (
    <ContentSection
      id="experience"
      ariaLabel="Experience"
      title="Work experience"
    >
      <ol className="flex flex-col gap-y-9">
        {EXPERIENCES.map((experience) => (
          <li key={experience.company}>
            <div
              className={cn(
                'flex items-start justify-between gap-4 relative',
                'group/external-link',
              )}
            >
              <h3
                className={cn(
                  'text-[1.0625rem] font-medium leading-6 tracking-[-0.012em]',
                  'text-foreground',
                  externalLinkTitleClassName,
                )}
              >
                {experience.company}
              </h3>
              {experience.href ? (
                <Anchor
                  href={experience.href}
                  aria-label={`Visit ${experience.company}`}
                  className="absolute inset-0 z-10"
                  variant="unstyled"
                  weight="inherit"
                />
              ) : null}
              {experience.href ? <ExternalLinkArrow /> : null}
            </div>
            <ul className={cn('flex flex-col gap-y-5', 'mt-4')}>
              {experience.roles.map((role) => (
                <li key={role.title + role.start}>
                  <div
                    className={cn(
                      'flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5',
                    )}
                  >
                    <h4
                      className={cn(
                        'text-[0.9375rem] font-medium leading-5',
                        'text-foreground',
                      )}
                    >
                      {role.title}
                    </h4>
                    <span
                      className={cn(
                        'shrink-0',
                        'text-xs tabular-nums',
                        role.current
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {role.start} — {role.end}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'max-w-[56ch]',
                      'mt-1.5',
                      'text-[0.9375rem] leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {role.brief}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
