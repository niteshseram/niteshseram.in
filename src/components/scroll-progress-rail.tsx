'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { type ReactNode, useRef } from 'react';

import { cn } from '@/lib/utils';

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  offset?: UseScrollOptions['offset'];
}>;

export function ScrollProgressRail({
  children,
  className,
  offset = ['start 70%', 'end 60%'],
}: Props) {
  const targetRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;
  const fillHeight = useTransform(progress, (value) => `${value * 100}%`);
  const tipOpacity = useTransform(progress, [0, 0.04], [0, 1]);

  return (
    <ol
      ref={targetRef}
      className={cn('relative flex flex-col gap-y-10', className)}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none',
          'absolute top-2 bottom-2 left-2 w-px',
        )}
      >
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
      {children}
    </ol>
  );
}
