'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ContributionGraphBlock,
  ContributionGraphCalendar,
} from '@/components/ui/contribution-graph';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import styles from './contribution-wave.module.css';

type CellPosition = Readonly<{
  dayIndex: number;
  weekIndex: number;
}>;

type Props = Readonly<{
  tooltips: Record<string, string>;
}>;

function getWaveDistance(
  hoveredCell: CellPosition | null,
  currentCell: CellPosition,
) {
  if (!hoveredCell) return undefined;

  const distance =
    Math.abs(hoveredCell.weekIndex - currentCell.weekIndex) +
    Math.abs(hoveredCell.dayIndex - currentCell.dayIndex);

  return distance <= 2 ? distance : undefined;
}

export function ContributionWaveCalendar({ tooltips }: Props) {
  const calendarReference = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<CellPosition | null>(null);

  useEffect(() => {
    const calendarElement = calendarReference.current;

    if (
      !calendarElement ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    calendarElement.dataset.waveState = 'waiting';

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        calendarElement.dataset.waveState = 'playing';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    observer.observe(calendarElement);

    return () => observer.disconnect();
  }, []);

  function handlePointerLeave() {
    setHoveredCell(null);
  }

  return (
    <div
      ref={calendarReference}
      className={styles.wave}
      onPointerLeave={handlePointerLeave}
    >
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => {
          const cellPosition = { dayIndex, weekIndex };
          const waveDistance = getWaveDistance(hoveredCell, cellPosition);

          return (
            <Tooltip>
              <TooltipTrigger
                render={
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    className={styles.cell}
                    data-wave-distance={waveDistance}
                    onPointerEnter={() => setHoveredCell(cellPosition)}
                    style={{
                      animationDelay: `${weekIndex * 7 + dayIndex * 11}ms`,
                    }}
                  />
                }
              />
              <TooltipContent>{tooltips[activity.date]}</TooltipContent>
            </Tooltip>
          );
        }}
      </ContributionGraphCalendar>
    </div>
  );
}
