'use client';

import { format, parseISO } from 'date-fns';

import {
  type Activity,
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
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Props = {
  data: Activity[];
  total: number;
  className?: string;
};

function formatTooltip(activity: Activity) {
  const date = format(parseISO(activity.date), 'MMM d, yyyy');
  if (activity.count === 0) return `No contributions on ${date}`;
  const unit = activity.count === 1 ? 'contribution' : 'contributions';
  return `${activity.count} ${unit} on ${date}`;
}

export function GithubContributionClient({ data, total, className }: Props) {
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
        data={data}
        blockMargin={3}
        blockRadius={2}
        blockSize={11}
        fontSize={11}
        totalCount={total}
      >
        <TooltipProvider>
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
                <TooltipContent>{formatTooltip(activity)}</TooltipContent>
              </Tooltip>
            )}
          </ContributionGraphCalendar>
        </TooltipProvider>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <p className="text-muted-foreground">
                <span className="text-foreground">{totalCount}</span>{' '}
                contributions in {year}
              </p>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
