'use client';

import { cva } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import type React from 'react';
import type { HTMLAttributeAnchorTarget } from 'react';

import { cn } from '@/lib/utils';

export type Props<RouteType> = LinkProps &
  Readonly<{
    'aria-label'?: string;
    children?: React.ReactNode;
    className?: string;
    onPointerDown?: React.PointerEventHandler<HTMLAnchorElement>;
    onPointerLeave?: React.PointerEventHandler<HTMLAnchorElement>;
    rel?: string;
    target?: HTMLAttributeAnchorTarget;
    variant?: AnchorVariant;
    weight?: AnchorWeight;
    scroll?: LinkProps<RouteType>['scroll'];
    ref?: React.Ref<HTMLAnchorElement>;
  }>;

export function Anchor<RouteType>({
  'aria-label': ariaLabelProp,
  children,
  className: classNameProp,
  href,
  onClick,
  ref,
  rel: relProp,
  target: targetProp,
  variant,
  weight,
  ...props
}: Props<RouteType>) {
  const isExternalURL = typeof href === 'string' && /^https?:/.test(href);
  const usesNativeAnchor =
    typeof href === 'string' && /^(https?:|mailto:|tel:)/.test(href);

  const target = targetProp ?? (isExternalURL ? '_blank' : undefined);
  const opensInNewTab = target === '_blank';
  const rel = relProp ?? (opensInNewTab ? 'noreferrer noopener' : undefined);
  const ariaLabel =
    opensInNewTab && ariaLabelProp
      ? `${ariaLabelProp} (opens in a new tab)`
      : ariaLabelProp;
  const newTabDescription =
    opensInNewTab && !ariaLabelProp ? (
      <span className="sr-only"> (opens in a new tab)</span>
    ) : null;
  const className = anchorVariants({
    className: cn(classNameProp),
    variant,
    weight,
  });

  if (usesNativeAnchor) {
    return (
      <a
        aria-label={ariaLabel}
        ref={ref}
        className={className}
        href={href}
        rel={rel}
        target={target}
        onClick={onClick}
        {...props}
      >
        {children}
        {newTabDescription}
      </a>
    );
  }

  return (
    <Link
      aria-label={ariaLabel}
      ref={ref}
      className={className}
      href={href}
      rel={rel}
      target={target}
      onClick={onClick}
      {...props}
    >
      {children}
      {newTabDescription}
    </Link>
  );
}

export type AnchorVariant = 'default' | 'primary' | 'prose' | 'unstyled';

export type AnchorWeight = 'inherit' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  default: cn(
    'text-muted-foreground hover:text-foreground active:text-foreground',
  ),
  primary: cn(
    'text-foreground hover:text-muted-foreground active:text-foreground',
  ),
  prose: cn(
    'underline underline-offset-[3px] decoration-[1.5px]',
    'text-foreground decoration-link',
    'hover:decoration-foreground',
  ),
  unstyled: '',
};

const anchorWeightClasses: Record<AnchorWeight, string> = {
  inherit: '',
  medium: 'font-medium',
  normal: 'font-normal',
};

export const anchorVariants = cva(cn('transition-colors', 'break-words'), {
  defaultVariants: {
    variant: 'default',
    weight: 'medium',
  },
  variants: {
    variant: anchorVariantClasses,
    weight: anchorWeightClasses,
  },
});
