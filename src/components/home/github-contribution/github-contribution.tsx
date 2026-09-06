import { cacheLife } from 'next/cache';

import { GithubContributionClient } from '@/components/home/github-contribution/github-contribution-client';
import { Anchor } from '@/components/ui/anchor';
import { SOCIAL_LINKS } from '@/data/social-links';
import {
  type Activity,
  buildContributionGraph,
  type ContributionGraphData,
} from '@/lib/contribution-graph';
import { cn } from '@/lib/utils';

type GithubContributionsResponse = {
  contributions: Activity[];
};

type Props = {
  className?: string;
};

async function getContributionsGraph(): Promise<ContributionGraphData | null> {
  'use cache';
  cacheLife('hours');

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${SOCIAL_LINKS.github.username}?y=last`,
      { signal: AbortSignal.timeout(5_000) },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GithubContributionsResponse;

    if (!Array.isArray(data.contributions)) {
      return null;
    }

    return buildContributionGraph(data.contributions);
  } catch {
    return null;
  }
}

export async function GithubContribution({ className }: Props) {
  const graph = await getContributionsGraph();

  if (graph) {
    return <GithubContributionClient className={className} graph={graph} />;
  }

  return (
    <p className={cn('text-sm leading-6', 'text-muted-foreground', className)}>
      GitHub activity is temporarily unavailable.{' '}
      <Anchor href={SOCIAL_LINKS.github.href} variant="prose">
        View contributions on GitHub
      </Anchor>
      .
    </p>
  );
}
