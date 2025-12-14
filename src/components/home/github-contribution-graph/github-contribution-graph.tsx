'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { use } from 'react';

import {
  type Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from '@/components/contribution-graph';
import { Anchor } from '@/components/ui/anchor';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SOCIALS } from '@/data/social';

export function GithubContributionGraph({
  contributions,
}: {
  contributions: Promise<Array<Activity>>;
}) {
  const data = use(contributions);
  return (
    <ContributionGraph
      className="mx-auto py-2"
      data={data}
      blockSize={11}
      blockMargin={3}
      blockRadius={0}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-2"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger
              render={
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              }
            />
            <TooltipContent sideOffset={5}>
              {activity.count} contribution{activity.count === 0 ? null : 's'}{' '}
              on {format(new Date(activity.date), 'MMMM dd, yyyy')}
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <Text color="secondary">
              {totalCount.toLocaleString('en')} contributions in {year} on{' '}
              <Anchor href={SOCIALS.github.href}>GitHub</Anchor>
            </Text>
          )}
        </ContributionGraphTotalCount>
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GithubContributionGraphFallback() {
  return (
    <div
      className={clsx('h-[173px] w-full', 'flex items-center justify-center')}
    >
      <Spinner />
    </div>
  );
}
