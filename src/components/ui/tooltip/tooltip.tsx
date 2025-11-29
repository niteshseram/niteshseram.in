'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip';
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
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 10,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Positioner>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} {...props}>
        <TooltipPrimitive.Popup
          className={cn(
            //Size,
            'max-w-sm',
            // Layout
            'flex origin-(--transform-origin) flex-col',
            'rounded-sm px-2 py-1',
            // Appearance
            'bg-foreground',
            // Text
            'text-background text-sm',
            // Animation & transition
            'transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:duration-0 data-starting-style:scale-90 data-starting-style:opacity-0',
            className,
          )}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={cn(
              // Positioning
              'data-[side=bottom]:-top-2 data-[side=top]:-bottom-2',
              'data-[side=left]:right-[-13px] data-[side=right]:left-[-13px]',
              // Rotation
              'data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180',
            )}
          >
            <ArrowSvg />
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

function ArrowSvg(props: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden={true}
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      {...props}
    >
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-foreground"
      />
    </svg>
  );
}
