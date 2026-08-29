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
  children,
  ...props
}: Omit<ComponentProps<typeof TooltipPrimitive.Positioner>, 'className'> & {
  className?: ClassValue;
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
            'rounded-md border shadow-sm backdrop-blur-md',
            'text-xs font-medium leading-tight',
            'border-border bg-popover/95 text-popover-foreground shadow-shadow/15',
            'transition-[transform,opacity,background-color,color,border-color] duration-[var(--motion-duration-fast)] ease-enter',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            'data-instant:duration-0',
            className,
          )}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={cn(
              'data-[side=bottom]:-top-2 data-[side=top]:-bottom-2',
              'data-[side=left]:right-[-13px] data-[side=right]:left-[-13px]',
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
      className="block"
      {...props}
    >
      <g transform="translate(0 10) scale(1 -1)">
        <path
          d="M10.3356 7.39793L15.1924 3.02682C15.9269 2.36577 16.8801 2 17.8683 2H20V0H0V2H1.4651C2.4532 2 3.4064 2.36577 4.1409 3.02682L8.9977 7.39793C9.378 7.7402 9.9553 7.74021 10.3356 7.39793Z"
          className="fill-popover"
        />
        <path
          d="M9.6667 6.65461L14.5235 2.28352C15.4416 1.45721 16.6331 1 17.8683 1H20V2H17.8683C16.8801 2 15.9269 2.36577 15.1924 3.02682L10.3356 7.39793C9.9553 7.74021 9.378 7.7402 8.9977 7.39793L4.1409 3.02682C3.4064 2.36577 2.4532 2 1.4651 2H0V1H1.4651C2.7002 1 3.8917 1.45722 4.8099 2.28352L9.6667 6.65461Z"
          className="fill-border"
        />
      </g>
    </svg>
  );
}
