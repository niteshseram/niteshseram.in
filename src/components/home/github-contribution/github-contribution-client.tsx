'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ContributionGraph,
  ContributionGraphFooter,
  ContributionGraphLegend,
} from '@/components/ui/contribution-graph';
import type { ContributionGraphData } from '@/lib/contribution-graph';
import { cn } from '@/lib/utils';

import { ContributionWaveCalendar } from './contribution-wave-calendar';

type Props = {
  graph: ContributionGraphData;
  className?: string;
};

export function GithubContributionClient({ graph, className }: Props) {
  const { weeks, monthLabels, totalCount, year, tooltips } = graph;
  const containerReference = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<
    'idle' | 'playing' | 'waiting'
  >('idle');
  const animatedTotalCount = useAnimatedTotalCount(
    totalCount,
    animationState === 'playing',
  );

  useEffect(() => {
    const containerElement = containerReference.current;

    if (
      !containerElement ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setAnimationState('waiting');

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setAnimationState('playing');
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    observer.observe(containerElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerReference}
      className={cn('overflow-hidden', 'text-xs', className)}
    >
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
          <ContributionWaveCalendar
            animationState={animationState}
            tooltips={tooltips}
          />
        </div>
        <ContributionGraphFooter
          className={cn(
            'items-center',
            'mt-2 pt-3',
            'border-t',
            'border-border',
          )}
        >
          <p className={cn('font-mono tabular-nums', 'text-muted-foreground')}>
            {animatedTotalCount.toLocaleString('en-US')} contributions · last 12
            months
          </p>
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}

function useAnimatedTotalCount(totalCount: number, playing: boolean) {
  const [animatedTotalCount, setAnimatedTotalCount] = useState(totalCount);

  useEffect(() => {
    if (!playing) {
      setAnimatedTotalCount(totalCount);
      return;
    }

    const animationDuration = 850;
    const animationStart = performance.now();
    let animationFrame = 0;

    setAnimatedTotalCount(0);

    function updateCount(timestamp: number) {
      const progress = Math.max(
        0,
        Math.min((timestamp - animationStart) / animationDuration, 1),
      );
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedTotalCount(Math.round(totalCount * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    }

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [playing, totalCount]);

  return animatedTotalCount;
}
