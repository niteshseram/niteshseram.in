'use client';

import url from 'url';

import { cva } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import type React from 'react';
import type { HTMLAttributeAnchorTarget } from 'react';

import { cn } from '@/lib/utils';

export type Props<RouteType> = LinkProps &
  Readonly<{
    children?: React.ReactNode;
    className?: string;
    rel?: string;
    target?: HTMLAttributeAnchorTarget;
    variant?: AnchorVariant;
    weight?: AnchorWeight;
    scroll?: LinkProps<RouteType>['scroll'];
    ref?: React.Ref<HTMLAnchorElement>;
  }>;

export function Anchor<RouteType>({
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
  const isExternalURL =
    typeof href === 'string' && /^(https?:|mailto:|tel:)/.test(href);

  const rel = relProp ?? (isExternalURL ? 'noreferrer noopener' : undefined);
  const className = anchorVariants({
    className: cn(classNameProp),
    variant,
    weight,
  });

  const target = targetProp ?? (isExternalURL ? '_blank' : undefined);

  if (isExternalURL) {
    const finalHrefString = url.format(href);

    return (
      <a
        ref={ref}
        className={className}
        href={finalHrefString}
        rel={rel}
        target={target}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      className={className}
      href={href}
      rel={rel}
      target={target}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}

export type AnchorVariant = 'default' | 'brand' | 'unstyled';

export type AnchorWeight = 'inherit' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  default: cn(
    'text-muted-foreground hover:text-foreground active:text-foreground',
  ),
  brand: cn(
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
