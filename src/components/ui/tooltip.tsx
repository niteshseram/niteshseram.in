'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import type { ClassValue } from 'clsx';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function TooltipProvider({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider {...props} />;
}

export function Tooltip({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />;
}

export function TooltipTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof TooltipPrimitive.Trigger>, 'className'> & {
  className?: ClassValue;
}) {
  return <TooltipPrimitive.Trigger className={cn(className)} {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 8,
  showArrow = true,
  children,
  ...props
}: Omit<ComponentProps<typeof TooltipPrimitive.Positioner>, 'className'> & {
  className?: ClassValue;
  showArrow?: boolean;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        sideOffset={sideOffset}
        className="z-[60]"
        {...props}
      >
        <TooltipPrimitive.Popup
          className={cn(
            'flex w-fit max-w-64 origin-(--transform-origin) flex-col',
            'px-2.5 py-1.5',
            'rounded-md border shadow-sm',
            'text-xs font-medium leading-tight',
            'border-border bg-popover text-popover-foreground shadow-shadow/15',
            'transition-[transform,opacity,background-color,color,border-color] duration-[var(--motion-duration-fast)] ease-enter',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            'data-instant:duration-0',
            className,
          )}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow
              aria-hidden="true"
              className={cn(
                'size-2 rotate-45',
                'border-border bg-popover',
                'data-[side=top]:-bottom-[5px] data-[side=top]:border-r data-[side=top]:border-b',
                'data-[side=bottom]:-top-[5px] data-[side=bottom]:border-t data-[side=bottom]:border-l',
                'data-[side=left]:-right-[5px] data-[side=left]:border-t data-[side=left]:border-r',
                'data-[side=right]:-left-[5px] data-[side=right]:border-b data-[side=right]:border-l',
              )}
            />
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
