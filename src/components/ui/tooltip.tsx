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
  sideOffset = 10,
  children,
  ...props
}: Omit<ComponentProps<typeof TooltipPrimitive.Positioner>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} {...props}>
        <TooltipPrimitive.Popup
          className={cn(
            'flex origin-(--transform-origin) flex-col',
            'rounded px-3 py-2',
            'bg-foreground',
            'text-xs font-medium',
            'text-background',
            'transition-[transform,scale,opacity]',
            'data-starting-style:scale-90 data-starting-style:opacity-0',
            'data-ending-style:scale-90 data-ending-style:opacity-0',
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
      {...props}
    >
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-foreground"
      />
    </svg>
  );
}
