import type { Day as WeekDay } from 'date-fns';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatISO,
  getDay,
  getMonth,
  getYear,
  nextDay,
  parseISO,
  subWeeks,
} from 'date-fns';

export type Activity = {
  date: string;
  count: number;
  level: number;
};

export type Week = Array<Activity | undefined>;

export type MonthLabel = {
  weekIndex: number;
  label: string;
};

export type Labels = {
  months?: string[];
  weekdays?: string[];
  totalCount?: string;
  legend?: {
    less?: string;
    more?: string;
  };
};

export type ContributionGraphData = {
  weeks: Week[];
  monthLabels: MonthLabel[];
  totalCount: number;
  year: number;
  tooltips: Record<string, string>;
};

const DEFAULT_MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function fillHoles(activities: Activity[]): Activity[] {
  if (activities.length === 0) {
    return [];
  }

  const sortedActivities = activities.toSorted((a, b) =>
    a.date.localeCompare(b.date),
  );

  const calendar = new Map<string, Activity>(
    activities.map((a) => [a.date, a]),
  );

  const firstActivity = sortedActivities[0] as Activity;
  const lastActivity = sortedActivities.at(-1);

  if (!lastActivity) {
    return [];
  }

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: 'date' });

    if (calendar.has(date)) {
      return calendar.get(date) as Activity;
    }

    return {
      date,
      count: 0,
      level: 0,
    };
  });
}

function groupByWeeks(activities: Activity[], weekStart: WeekDay = 0): Week[] {
  if (activities.length === 0) {
    return [];
  }

  const normalizedActivities = fillHoles(activities);
  const firstActivity = normalizedActivities[0] as Activity;
  const firstDate = parseISO(firstActivity.date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1);

  const paddedActivities = [
    ...(Array.from<Activity | undefined>({
      length: differenceInCalendarDays(firstDate, firstCalendarDate),
    }) as Activity[]),
    ...normalizedActivities,
  ];

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);

  return Array.from({ length: numberOfWeeks }, (_, weekIndex) =>
    paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
}

function getMonthLabels(
  weeks: Week[],
  monthNames: string[] = DEFAULT_MONTH_LABELS,
): MonthLabel[] {
  return weeks
    .reduce<MonthLabel[]>((labels, week, weekIndex) => {
      const firstActivity = week.find((activity) => activity !== undefined);

      if (!firstActivity) {
        throw new Error(
          `Unexpected error: Week ${weekIndex + 1} is empty: [${week}].`,
        );
      }

      const month = monthNames[getMonth(parseISO(firstActivity.date))];

      if (!month) {
        const monthName = new Date(firstActivity.date).toLocaleString('en-US', {
          month: 'short',
        });
        throw new Error(
          `Unexpected error: undefined month label for ${monthName}.`,
        );
      }

      const prevLabel = labels.at(-1);

      if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
        return labels.concat({ weekIndex, label: month });
      }

      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3;

      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }

      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }

      return true;
    });
}

function formatTooltip(activity: Activity): string {
  const date = format(parseISO(activity.date), 'MMM d, yyyy');
  if (activity.count === 0) return `No contributions on ${date}`;
  const unit = activity.count === 1 ? 'contribution' : 'contributions';
  return `${activity.count} ${unit} on ${date}`;
}

type BuildOptions = Readonly<{
  weekStart?: WeekDay;
  monthLabels?: string[];
}>;

export function buildContributionGraph(
  activities: Activity[],
  options: BuildOptions = {},
): ContributionGraphData {
  const weeks = groupByWeeks(activities, options.weekStart ?? 0);
  const monthLabels = getMonthLabels(weeks, options.monthLabels);
  const totalCount = activities.reduce(
    (sum, activity) => sum + activity.count,
    0,
  );
  const year =
    activities.length > 0
      ? getYear(parseISO(activities[0].date))
      : new Date().getFullYear();

  const tooltips: Record<string, string> = {};
  for (const activity of activities) {
    tooltips[activity.date] = formatTooltip(activity);
  }

  return { weeks, monthLabels, totalCount, year, tooltips };
}
