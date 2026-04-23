'use client';

import type { ClassValue } from 'clsx';
import type { AriaAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import type { Props as AnchorProps } from './anchor';
import { Anchor } from './anchor';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonVariant = 'brand' | 'outline' | 'ghost' | 'primary';

type IconType = ReactNode;

type BaseProps = Readonly<{
  addonPosition?: 'end' | 'start';
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-current'?: AriaAttributes['aria-current'];
  'aria-label'?: string;
  children?: ReactNode;
  className?: ClassValue;
  disabled?: boolean;
  display?: ButtonDisplay;
  icon?: IconType;
  iconClassName?: string;
  isLabelHidden?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  tooltip?: ReactNode;
  tooltipAlign?: React.ComponentProps<typeof TooltipContent>['align'];
  tooltipSide?: React.ComponentProps<typeof TooltipContent>['side'];
  variant: ButtonVariant;
}>;

export type ButtonProps = BaseProps &
  Readonly<{
    type?: 'button' | 'submit';
    ref?: React.Ref<HTMLButtonElement>;
  }>;

export type Props<RouteType> =
  | (BaseProps &
      Readonly<{
        href: AnchorProps<RouteType>['href'];
        prefetch?: AnchorProps<RouteType>['prefetch'];
        target?: AnchorProps<RouteType>['target'];
        ref?: React.Ref<HTMLAnchorElement>;
      }>)
  | ButtonProps;

const heightClasses: Record<ButtonSize, string> = {
  xs: 'h-8',
  sm: 'h-8.5',
  md: 'h-9',
  lg: 'h-10',
  xl: 'h-10.5',
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  xs: 'size-8',
  sm: 'size-8.5',
  md: 'size-9',
  lg: 'size-10',
  xl: 'size-10.5',
};

const fontSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-sm',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  xs: 'size-4',
  sm: 'size-4',
  md: 'size-4',
  lg: 'size-4.5',
  xl: 'size-5',
};

const paddingClasses: Record<ButtonSize, string> = {
  xs: 'px-3',
  sm: 'px-3',
  md: 'px-3',
  lg: 'px-4',
  xl: 'px-6',
};

const spacingClasses: Record<ButtonSize, string> = {
  xs: 'gap-x-1',
  sm: 'gap-x-1',
  md: 'gap-x-1.5',
  lg: 'gap-x-2',
  xl: 'gap-x-2',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'text-background bg-foreground',
    'hover:bg-foreground/90',
    'active:bg-foreground/80',
  ),
  brand: cn(
    'text-brand-foreground bg-brand',
    'hover:bg-brand/90',
    'active:bg-brand/80',
  ),
  outline: cn(
    'text-muted-foreground bg-transparent',
    'border border-border',
    'hover:text-foreground hover:bg-muted',
    'active:bg-muted',
  ),
  ghost: cn(
    'text-muted-foreground bg-transparent',
    'hover:text-foreground hover:bg-muted',
    'active:bg-muted',
  ),
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  primary: cn('text-background/70 bg-foreground/70'),
  brand: cn('text-muted-foreground bg-muted'),
  outline: cn('text-muted-foreground border-border/50 bg-transparent'),
  ghost: cn('text-muted-foreground bg-transparent'),
};

export function Button<RouteType>({
  addonPosition = 'end',
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-label': ariaLabel,
  children: children_USE_SPARINGLY,
  className,
  disabled = false,
  display = 'inline',
  icon: Icon,
  iconClassName,
  isLabelHidden = false,
  label,
  onClick,
  size = 'md',
  tooltip,
  tooltipAlign,
  tooltipSide,
  variant,
  ...props
}: Props<RouteType> & {
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
}) {
  const addOnSizeClass = sizeIconClasses[size];

  const addOn =
    Icon != null ? (
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          addOnSizeClass,
          '[&>svg]:size-full',
          iconClassName,
        )}
      >
        {Icon}
      </span>
    ) : null;

  const labelContent = children_USE_SPARINGLY ?? label;

  const children = (
    <>
      {addonPosition === 'start' && addOn}
      {isLabelHidden ? (
        <span className="sr-only">{labelContent}</span>
      ) : (
        labelContent
      )}
      {addonPosition === 'end' && addOn}
    </>
  );

  const resolvedClassName = cn(
    'cursor-pointer',
    display === 'block' && !isLabelHidden ? 'flex w-full' : 'inline-flex',
    'items-center justify-center',
    isLabelHidden
      ? [iconOnlySizeClasses[size]]
      : [heightClasses[size], paddingClasses[size]],
    spacingClasses[size],
    fontSizeClasses[size],
    'rounded-full',
    'whitespace-nowrap font-medium',
    'transition-colors',
    disabled
      ? cn(
          variantDisabledClasses[variant],
          'cursor-not-allowed pointer-events-none',
        )
      : variantClasses[variant],
    className,
  );

  const sharedA11y = {
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
  };

  let el: React.ReactElement;

  if ('href' in props) {
    const {
      href,
      prefetch,
      ref: anchorRef,
      target,
      ...restAnchorProps
    } = props;
    el = (
      <Anchor
        {...restAnchorProps}
        ref={anchorRef as React.Ref<HTMLAnchorElement>}
        aria-disabled={disabled || undefined}
        className={resolvedClassName}
        href={href}
        onClick={onClick}
        prefetch={prefetch}
        target={target}
        variant="unstyled"
        {...sharedA11y}
      >
        {children}
      </Anchor>
    );
  } else {
    const { ref, type, ...restButtonProps } = props as ButtonProps;
    el = (
      <button
        {...restButtonProps}
        ref={ref}
        className={resolvedClassName}
        disabled={disabled}
        onClick={onClick}
        type={type === 'submit' ? 'submit' : 'button'}
        {...sharedA11y}
      >
        {children}
      </button>
    );
  }

  if (tooltip == null || disabled) {
    return el;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={el} />
      <TooltipContent align={tooltipAlign} side={tooltipSide}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
