import { ArrowUpRight } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  return (
    <ContentSection id="projects" ariaLabel="Projects" title="Selected work">
      <ol className={cn('border-y', 'border-border/55')}>
        {PROJECTS.map((project, projectIndex) => {
          const projectUrl = project.liveUrl ?? project.githubUrl;
          const projectHeadingId = `project-${projectIndex + 1}-title`;

          return (
            <li
              key={project.name}
              className={cn(
                'py-1',
                projectIndex > 0 ? 'border-t' : '',
                'border-border/55',
              )}
            >
              <article
                aria-labelledby={projectHeadingId}
                className={cn(
                  'group/project',
                  'p-4 sm:p-5',
                  'rounded-lg',
                  'bg-transparent',
                  'transition-colors',
                  'hover:bg-brand-muted focus-within:bg-brand-muted',
                )}
              >
                <div
                  className={cn(
                    'grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'font-mono text-[0.6875rem] font-medium tabular-nums',
                      'text-brand',
                    )}
                  >
                    {String(projectIndex + 1).padStart(2, '0')}
                  </span>
                  <p
                    className={cn(
                      'font-mono text-[0.6875rem] font-medium tracking-[0.1em] uppercase',
                      'text-muted-foreground',
                    )}
                  >
                    {project.tagline}
                  </p>
                  {projectUrl ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        'size-4',
                        'text-muted-foreground',
                        'transition-transform duration-200',
                        'group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5 group-focus-within/project:translate-x-0.5 group-focus-within/project:-translate-y-0.5',
                      )}
                    />
                  ) : null}
                </div>
                <div className={cn('pl-11')}>
                  <h3
                    id={projectHeadingId}
                    className={cn(
                      'mt-4',
                      'text-xl font-semibold leading-7 tracking-[-0.02em]',
                    )}
                  >
                    {projectUrl ? (
                      <Anchor
                        href={projectUrl}
                        className={cn(
                          'inline-flex min-h-7 items-center',
                          '-mx-1 px-1',
                          'rounded-sm',
                          'text-foreground',
                          'outline-none',
                          'transition-colors',
                          'hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        )}
                        variant="unstyled"
                        weight="inherit"
                      >
                        {project.name}
                      </Anchor>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p
                    className={cn(
                      'max-w-[54ch]',
                      'mt-2',
                      'text-sm leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {project.description}
                  </p>
                  <div
                    className={cn(
                      'flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
                      'mt-5 pt-3',
                      'font-mono text-[0.6875rem] leading-4',
                      'text-muted-foreground',
                    )}
                  >
                    <span>{project.tech.join(' · ')}</span>
                    {project.liveUrl && project.githubUrl ? (
                      <Anchor
                        href={project.githubUrl}
                        aria-label={`View ${project.name} source on GitHub`}
                        className={cn(
                          'inline-flex min-h-6 items-center',
                          '-mx-1 px-1',
                          'rounded-sm',
                          'outline-none',
                          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        )}
                        variant="default"
                        weight="normal"
                      >
                        Source
                      </Anchor>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </ContentSection>
  );
}
