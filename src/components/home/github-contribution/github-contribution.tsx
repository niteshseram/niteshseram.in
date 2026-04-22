import { cacheLife } from 'next/cache';

import { GithubContributionClient } from '@/components/home/github-contribution/github-contribution-client';
import { SOCIAL_LINKS } from '@/data/social-links';
import {
  type Activity,
  buildContributionGraph,
  type ContributionGraphData,
} from '@/lib/contribution-graph';

type GithubContributionsResponse = {
  contributions: Activity[];
};

type Props = {
  className?: string;
};

async function getContributionsGraph(): Promise<ContributionGraphData> {
  'use cache';
  cacheLife('hours');
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${SOCIAL_LINKS.github.username}?y=last`,
  );
  const data = (await res.json()) as GithubContributionsResponse;
  return buildContributionGraph(data.contributions);
}

export async function GithubContribution({ className }: Props) {
  const graph = await getContributionsGraph();

  return <GithubContributionClient className={className} graph={graph} />;
}
