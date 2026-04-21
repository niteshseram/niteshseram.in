'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import type { RefObject } from 'react';

import { cn } from '@/lib/utils';

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

type Props = Readonly<{
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
  offset?: UseScrollOptions['offset'];
}>;

export function ScrollProgressRail({
  targetRef,
  className,
  offset = ['start 70%', 'end 60%'],
}: Props) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const fillHeight = useTransform(smoothProgress, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);

  return (
    <div aria-hidden="true" className={cn('pointer-events-none', className)}>
      <div className={cn('absolute inset-0', 'bg-border')} />
      <motion.div
        style={{ height: fillHeight }}
        className={cn('absolute inset-x-0 top-0', 'bg-brand')}
      />
      <motion.div
        style={{ top: fillHeight, opacity: tipOpacity }}
        className={cn(
          'absolute left-1/2 size-0 -translate-x-1/2 -translate-y-1/2',
          'rounded-full',
          'bg-brand shadow-[0_0_10px_6px_var(--color-brand)]',
        )}
      />
    </div>
  );
}
