'use client';

import clsx from 'clsx';
import type { AriaAttributes, ReactNode } from 'react';
import type { IconType } from 'react-icons';

import type { Props as AnchorProps } from '../anchor';
import { Anchor } from '../anchor';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import type { ButtonVariant } from './button-styles';
import {
  type ButtonSize,
  buttonVariants,
  sizeIconClasses,
} from './button-styles';

export type ButtonDisplay = 'block' | 'inline';

type BaseProps = Readonly<{
  addonPosition?: 'end' | 'start';
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-current'?: AriaAttributes['aria-current'];
  'aria-label'?: AriaAttributes['aria-controls'];
  children?: ReactNode;
  className?: string;
  display?: ButtonDisplay;
  icon?: IconType;
  iconClassName?: string;
  disabled?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  tooltip?: ReactNode;
  tooltipAlign?: React.ComponentProps<typeof TooltipContent>['align'];
  tooltipSide?: React.ComponentProps<typeof TooltipContent>['side'];
  variant: ButtonVariant;
  isLabelHidden?: boolean;
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
        locale?: AnchorProps<RouteType>['locale'];
        target?: AnchorProps<RouteType>['target'];
        ref?: React.Ref<HTMLAnchorElement>;
      }>)
  | ButtonProps;

export function Button<RouteType>({
  addonPosition = 'end',
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-label': ariaLabel,
  children: children_USE_SPARINGLY,
  className,
  display = 'inline',
  icon: Icon,
  iconClassName,
  disabled = false,
  label,
  onClick,
  size = 'md',
  tooltip,
  tooltipAlign,
  tooltipSide,
  variant,
  isLabelHidden = false,
  ...props
}: Props<RouteType> & {
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
}) {
  const { ref } = props;
  const addOnSizeClass = sizeIconClasses[size];

  const addOn =
    Icon != null ? (
      <Icon
        aria-hidden="true"
        className={clsx('shrink-0', addOnSizeClass, iconClassName)}
      />
    ) : null;

  const children = isLabelHidden ? (
    addOn
  ) : (
    <>
      {addonPosition === 'start' && addOn}
      {children_USE_SPARINGLY ?? label}
      {addonPosition === 'end' && addOn}
    </>
  );

  const commonProps = {
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-label': isLabelHidden ? label : ariaLabel,
    children,
    className: clsx(
      buttonVariants({ variant, size, display, isLabelHidden }),
      // Cannot use `disabled:` modifier for classes because they aren't applied to `<a>`.
      disabled && ['opacity-50', 'cursor-not-allowed pointer-events-none'],
      className,
    ),
    disabled,
    onClick,
  };

  const el =
    'href' in props ? (
      <Anchor
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={props.href}
        {...commonProps}
        target={props.target}
        variant="unstyled"
      />
    ) : (
      <button
        type={
          'type' in props
            ? props.type === 'button'
              ? 'button'
              : 'submit'
            : 'button'
        }
        {...commonProps}
        {...props}
      />
    );

  return tooltip == null || disabled ? (
    el
  ) : (
    <Tooltip>
      <TooltipTrigger render={el} />
      <TooltipContent align={tooltipAlign} side={tooltipSide}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
