import { cacheLife } from 'next/cache';

import { GithubContributionClient } from '@/components/home/github-contribution/github-contribution-client';
import type { Activity } from '@/components/ui/contribution-graph';
import { SOCIAL_LINKS } from '@/data/social-links';

type GithubContributionsResponse = {
  contributions: Activity[];
};

type Props = {
  className?: string;
};

async function getContributions(): Promise<Activity[]> {
  'use cache';
  cacheLife('hours');
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${SOCIAL_LINKS.github.username}?y=last`,
  );
  const data = (await res.json()) as GithubContributionsResponse;
  return data.contributions;
}

export async function GithubContribution({ className }: Props) {
  const contributions = await getContributions();

  return (
    <GithubContributionClient
      className={className}
      contributions={contributions}
    />
  );
}
