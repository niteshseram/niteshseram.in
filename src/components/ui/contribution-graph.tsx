'use client';

import {
  type CSSProperties,
  createContext,
  Fragment,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from 'react';

import type {
  Activity,
  Labels,
  MonthLabel,
  Week,
} from '@/lib/contribution-graph';
import { cn } from '@/lib/utils';

export type { Activity, Labels, MonthLabel, Week };

const DEFAULT_LABELS: Labels = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  totalCount: '{{count}} activities in {{year}}',
  legend: {
    less: 'Less',
    more: 'More',
  },
};

type ContributionGraphContextType = {
  weeks: Week[];
  monthLabels: MonthLabel[];
  blockMargin: number;
  blockRadius: number;
  blockSize: number;
  fontSize: number;
  labels: Labels;
  labelHeight: number;
  maxLevel: number;
  totalCount: number;
  year: number;
  width: number;
  height: number;
};

const ContributionGraphContext =
  createContext<ContributionGraphContextType | null>(null);

const useContributionGraph = () => {
  const context = useContext(ContributionGraphContext);

  if (!context) {
    throw new Error(
      'ContributionGraph components must be used within a ContributionGraph',
    );
  }

  return context;
};

export type ContributionGraphProps = HTMLAttributes<HTMLDivElement> & {
  weeks: Week[];
  monthLabels: MonthLabel[];
  totalCount: number;
  year: number;
  blockMargin?: number;
  blockRadius?: number;
  blockSize?: number;
  fontSize?: number;
  labels?: Labels;
  maxLevel?: number;
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
};

export const ContributionGraph = ({
  weeks,
  monthLabels,
  totalCount,
  year,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,
  labels: labelsProp = undefined,
  maxLevel: maxLevelProp = 4,
  style = {},
  className,
  ...props
}: ContributionGraphProps) => {
  const maxLevel = Math.max(1, maxLevelProp);
  const LABEL_MARGIN = 8;

  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const labelHeight = fontSize + LABEL_MARGIN;

  const width = weeks.length * (blockSize + blockMargin) - blockMargin;
  const height = labelHeight + (blockSize + blockMargin) * 7 - blockMargin;

  if (weeks.length === 0) {
    return null;
  }

  return (
    <ContributionGraphContext.Provider
      value={{
        weeks,
        monthLabels,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        labels,
        labelHeight,
        maxLevel,
        totalCount,
        year,
        width,
        height,
      }}
    >
      <div
        className={cn('flex w-max max-w-full flex-col gap-2', className)}
        style={{ fontSize, ...style }}
        {...props}
      />
    </ContributionGraphContext.Provider>
  );
};

export type ContributionGraphBlockProps = HTMLAttributes<SVGRectElement> & {
  activity: Activity;
  dayIndex: number;
  weekIndex: number;
};

export const ContributionGraphBlock = ({
  activity,
  dayIndex,
  weekIndex,
  className,
  ...props
}: ContributionGraphBlockProps) => {
  const { blockSize, blockMargin, blockRadius, labelHeight, maxLevel } =
    useContributionGraph();

  if (activity.level < 0 || activity.level > maxLevel) {
    throw new RangeError(
      `Provided activity level ${activity.level} for ${activity.date} is out of range. It must be between 0 and ${maxLevel}.`,
    );
  }

  return (
    <rect
      className={cn(
        'data-[level="0"]:fill-muted',
        'data-[level="1"]:fill-muted-foreground/20',
        'data-[level="2"]:fill-muted-foreground/40',
        'data-[level="3"]:fill-muted-foreground/60',
        'data-[level="4"]:fill-muted-foreground/80',
        className,
      )}
      data-count={activity.count}
      data-date={activity.date}
      data-level={activity.level}
      height={blockSize}
      rx={blockRadius}
      ry={blockRadius}
      width={blockSize}
      x={(blockSize + blockMargin) * weekIndex}
      y={labelHeight + (blockSize + blockMargin) * dayIndex}
      {...props}
    />
  );
};

export type ContributionGraphCalendarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  hideMonthLabels?: boolean;
  className?: string;
  children: (props: {
    activity: Activity;
    dayIndex: number;
    weekIndex: number;
  }) => ReactNode;
};

export const ContributionGraphCalendar = ({
  hideMonthLabels = false,
  className,
  children,
  ...props
}: ContributionGraphCalendarProps) => {
  const { weeks, width, height, blockSize, blockMargin, monthLabels } =
    useContributionGraph();

  return (
    <div
      className={cn('max-w-full overflow-x-auto overflow-y-hidden', className)}
      {...props}
    >
      <svg
        className="block overflow-visible"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        {!hideMonthLabels && (
          <g className="fill-current">
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                dominantBaseline="hanging"
                key={weekIndex}
                x={(blockSize + blockMargin) * weekIndex}
              >
                {label}
              </text>
            ))}
          </g>
        )}
        {weeks.map((week, weekIndex) =>
          week.map((activity, dayIndex) => {
            if (!activity) {
              return null;
            }

            return (
              <Fragment key={`${weekIndex}-${dayIndex}`}>
                {children({ activity, dayIndex, weekIndex })}
              </Fragment>
            );
          }),
        )}
      </svg>
    </div>
  );
};

export type ContributionGraphFooterProps = HTMLAttributes<HTMLDivElement>;

export const ContributionGraphFooter = ({
  className,
  ...props
}: ContributionGraphFooterProps) => (
  <div
    className={cn(
      'flex flex-wrap gap-1 whitespace-nowrap sm:gap-x-4',
      className,
    )}
    {...props}
  />
);

export type ContributionGraphTotalCountProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: (props: { totalCount: number; year: number }) => ReactNode;
};

export const ContributionGraphTotalCount = ({
  className,
  children,
  ...props
}: ContributionGraphTotalCountProps) => {
  const { totalCount, year, labels } = useContributionGraph();

  if (children) {
    return <>{children({ totalCount, year })}</>;
  }

  return (
    <div className={cn('text-muted-foreground', className)} {...props}>
      {labels.totalCount ? (
        labels.totalCount
          .replace('{{count}}', String(totalCount))
          .replace('{{year}}', String(year))
      ) : (
        <>
          {totalCount} activities in {year}
        </>
      )}
    </div>
  );
};

export type ContributionGraphLegendProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: (props: { level: number }) => ReactNode;
};

export const ContributionGraphLegend = ({
  className,
  children,
  ...props
}: ContributionGraphLegendProps) => {
  const { labels, maxLevel, blockSize, blockRadius } = useContributionGraph();

  return (
    <div
      className={cn('ml-auto flex items-center gap-[3px]', className)}
      {...props}
    >
      <span className="mr-1 text-muted-foreground">
        {labels.legend?.less || 'Less'}
      </span>
      {Array.from({ length: maxLevel + 1 }).map((_, level) =>
        children ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: legend levels are stable
          <Fragment key={level}>{children({ level })}</Fragment>
        ) : (
          <svg
            height={blockSize}
            // biome-ignore lint/suspicious/noArrayIndexKey: legend levels are stable
            key={level}
            width={blockSize}
          >
            <title>{`${level} contributions`}</title>
            <rect
              className={cn(
                'stroke-[1px] stroke-border',
                'data-[level="0"]:fill-muted',
                'data-[level="1"]:fill-muted-foreground/20',
                'data-[level="2"]:fill-muted-foreground/40',
                'data-[level="3"]:fill-muted-foreground/60',
                'data-[level="4"]:fill-muted-foreground/80',
              )}
              data-level={level}
              height={blockSize}
              rx={blockRadius}
              ry={blockRadius}
              width={blockSize}
            />
          </svg>
        ),
      )}
      <span className="ml-1 text-muted-foreground">
        {labels.legend?.more || 'More'}
      </span>
    </div>
  );
};
