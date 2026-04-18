import { GithubContributionClient } from '@/components/home/github-contribution/github-contribution-client';
import type { Activity } from '@/components/ui/contribution-graph';

type GithubContributionsResponse = {
  total: Record<string, number>;
  contributions: Activity[];
};

type Props = {
  username: string;
  className?: string;
};

async function getContributions(
  username: string,
): Promise<GithubContributionsResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as GithubContributionsResponse;
  } catch {
    return null;
  }
}

export async function GithubContribution({ username, className }: Props) {
  const data = await getContributions(username);
  if (!data || data.contributions.length === 0) return null;

  const total = Object.values(data.total).reduce((sum, n) => sum + n, 0);

  return (
    <GithubContributionClient
      className={className}
      data={data.contributions}
      total={total}
    />
  );
}
