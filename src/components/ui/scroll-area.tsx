'use client';

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import type { ClassValue } from 'clsx';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type Orientation = 'vertical' | 'horizontal' | 'both';

type Props = Omit<
  ComponentProps<typeof ScrollAreaPrimitive.Root>,
  'className'
> & {
  className?: ClassValue;
  viewportClassName?: ClassValue;
  viewportProps?: Omit<ComponentProps<'div'>, 'className'>;
  orientation?: Orientation;
};

export function ScrollArea({
  className,
  viewportClassName,
  viewportProps,
  orientation = 'vertical',
  children,
  ...rootProps
}: Props) {
  const showVertical = orientation !== 'horizontal';
  const showHorizontal = orientation !== 'vertical';

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
      {...rootProps}
    >
      <ScrollAreaPrimitive.Viewport
        {...viewportProps}
        className={cn(
          'size-full max-h-[inherit]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          viewportClassName,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {showVertical && <Scrollbar orientation="vertical" />}
      {showHorizontal && <Scrollbar orientation="horizontal" />}
      {orientation === 'both' && <ScrollAreaPrimitive.Corner />}
    </ScrollAreaPrimitive.Root>
  );
}

function Scrollbar({
  orientation,
}: Readonly<{ orientation: 'vertical' | 'horizontal' }>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none select-none',
        orientation === 'vertical' && 'h-full w-2 p-0.5',
        orientation === 'horizontal' && 'h-2 w-full flex-col p-0.5',
        'opacity-0',
        'transition-opacity',
        'data-hovering:opacity-100 data-scrolling:opacity-100',
      )}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn('relative flex-1', 'rounded-full', 'bg-border')}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
