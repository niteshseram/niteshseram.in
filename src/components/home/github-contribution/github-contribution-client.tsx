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
    <div
      className={cn(
        'text-xs',
        'border border-border rounded-lg',
        'p-4',
        className,
      )}
    >
      <ContributionGraph
        weeks={weeks}
        monthLabels={monthLabels}
        totalCount={totalCount}
        year={year}
        blockMargin={3}
        blockRadius={2}
        blockSize={11}
        fontSize={11}
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
