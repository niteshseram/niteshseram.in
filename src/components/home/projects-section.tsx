import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import {
  ExternalLinkArrow,
  externalLinkTitleClassName,
} from '@/components/ui/external-link-row';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  return (
    <ContentSection id="projects" ariaLabel="Projects" title="Selected work">
      <ul className="flex flex-col gap-y-8">
        {PROJECTS.map((project) => {
          const projectUrl = project.liveUrl ?? project.githubUrl;

          return (
            <li key={project.name} className="group/external-link">
              <article className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        'text-base font-medium leading-6 tracking-[-0.01em]',
                        'text-foreground',
                        externalLinkTitleClassName,
                      )}
                    >
                      {project.name}
                    </h3>
                    {projectUrl ? (
                      <Anchor
                        href={projectUrl}
                        aria-label={`Visit ${project.name}`}
                        className="absolute inset-0 z-10"
                        variant="unstyled"
                        weight="inherit"
                      />
                    ) : null}
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
                  {projectUrl ? <ExternalLinkArrow /> : null}
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
                      className="relative z-20"
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
