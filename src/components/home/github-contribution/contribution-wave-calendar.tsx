'use client';

import { useState } from 'react';

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
  animationState: 'idle' | 'playing' | 'waiting';
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

export function ContributionWaveCalendar({ animationState, tooltips }: Props) {
  const [hoveredCell, setHoveredCell] = useState<CellPosition | null>(null);

  function handlePointerLeave() {
    setHoveredCell(null);
  }

  return (
    <div
      className={styles.wave}
      data-wave-state={animationState === 'idle' ? undefined : animationState}
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
