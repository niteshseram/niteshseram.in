import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { ContentSection } from '@/components/ui/content-section';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  return (
    <ContentSection id="projects" ariaLabel="Projects" title="Selected work">
      <ul className="flex flex-col gap-y-8">
        {PROJECTS.map((project) => {
          const projectUrl = project.liveUrl ?? project.githubUrl;

          return (
            <li key={project.name}>
              <article>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        'text-base font-medium leading-6 tracking-[-0.01em]',
                        'text-foreground',
                      )}
                    >
                      {projectUrl ? (
                        <Anchor
                          href={projectUrl}
                          variant="primary"
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
                        'mt-0.5',
                        'text-sm leading-5',
                        'text-muted-foreground',
                      )}
                    >
                      {project.tagline}
                    </p>
                  </div>
                  {projectUrl ? (
                    <Button
                      href={projectUrl}
                      className={cn('shrink-0', '-mt-1 -mr-1')}
                      icon={<PiArrowUpRight />}
                      isLabelHidden={true}
                      label={`Visit ${project.name}`}
                      size="xs"
                      variant="ghost"
                    />
                  ) : null}
                </div>
                <p
                  className={cn(
                    'max-w-[56ch]',
                    'mt-2.5',
                    'text-[0.9375rem] leading-6',
                    'text-muted-foreground',
                  )}
                >
                  {project.description}
                </p>
                <div
                  className={cn(
                    'flex flex-wrap items-center gap-x-4 gap-y-2',
                    'mt-2.5',
                    'text-xs leading-relaxed',
                    'text-muted-foreground',
                  )}
                >
                  <span>{project.tech.join(' · ')}</span>
                  {project.githubUrl ? (
                    <Anchor
                      href={project.githubUrl}
                      variant="default"
                      weight="normal"
                    >
                      Source
                    </Anchor>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </ContentSection>
  );
}
