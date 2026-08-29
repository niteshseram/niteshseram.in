import { ArrowUpRight } from 'lucide-react';

import { GithubContribution } from '@/components/home/github-contribution/github-contribution';
import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function GithubContributionSection() {
  return (
    <ContentSection ariaLabel="GitHub contributions" title="GitHub activity">
      <div
        className={cn(
          'overflow-hidden',
          'rounded-lg border shadow-[0_12px_32px_-28px_var(--shadow)]',
          'bg-surface border-border',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4',
            'px-4 py-3',
            'border-b',
            'font-mono text-[0.6875rem] leading-4',
            'bg-muted/50 text-muted-foreground border-border',
          )}
        >
          <span className={cn('inline-flex items-center gap-2')}>
            <span
              aria-hidden="true"
              className={cn('size-2', 'rounded-full', 'bg-brand')}
            />
            activity.graph
          </span>
          <Anchor
            href={SOCIAL_LINKS.github.href}
            className={cn(
              'inline-flex items-center gap-1',
              'text-muted-foreground',
              'hover:text-foreground',
            )}
            variant="unstyled"
            weight="normal"
          >
            @{SOCIAL_LINKS.github.username}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Anchor>
        </div>
        <div className={cn('p-4 sm:p-5')}>
          <GithubContribution />
        </div>
      </div>
    </ContentSection>
  );
}
