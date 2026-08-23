'use client';

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from '@/components/ui/contribution-graph';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ContributionGraphData } from '@/lib/contribution-graph';
import { cn } from '@/lib/utils';

type Props = {
  graph: ContributionGraphData;
  className?: string;
};

export function GithubContributionClient({ graph, className }: Props) {
  const { weeks, monthLabels, totalCount, year, tooltips } = graph;

  return (
    <div className={cn('overflow-hidden', 'text-xs', className)}>
      <ContributionGraph
        weeks={weeks}
        monthLabels={monthLabels}
        totalCount={totalCount}
        year={year}
        blockMargin={3}
        blockRadius={1.5}
        blockSize={10}
        fontSize={11}
      >
        <div
          aria-label={`Contribution activity calendar for ${year}: ${totalCount} contributions.`}
          role="img"
        >
          <ContributionGraphCalendar>
            {({ activity, dayIndex, weekIndex }) => (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  }
                />
                <TooltipContent>{tooltips[activity.date]}</TooltipContent>
              </Tooltip>
            )}
          </ContributionGraphCalendar>
        </div>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount>
            {(props) => (
              <p className="text-muted-foreground">
                <span className="text-foreground">{props.totalCount}</span>{' '}
                contributions in {props.year}
              </p>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
