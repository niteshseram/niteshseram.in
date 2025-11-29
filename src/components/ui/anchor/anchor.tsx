'use client';

import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import type React from 'react';
import type { HTMLAttributeAnchorTarget } from 'react';
import url from 'url';

import { themeOutlineElement_FocusVisible } from '../theme';
import {
  type AnchorVariant,
  anchorVariants,
  type AnchorWeight,
} from './anchor-styles';

export type Props<RouteType> = Omit<LinkProps<RouteType>, 'prefetch'> &
  Readonly<{
    children?: React.ReactNode;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
    variant?: AnchorVariant;
    weight?: AnchorWeight;
    href?: LinkProps<RouteType>['href'];
  }>;

export function Anchor<RouteType>({
  children,
  className: classNameProp,
  href,
  onClick,
  target: targetProp,
  variant,
  weight,
  ...props
}: Props<RouteType> & {
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  const isExternalURL =
    typeof href === 'string' ? /^(http|mailto)/.test(href ?? '') : false;

  const rel = isExternalURL ? 'noreferrer noopener' : undefined;
  const className = anchorVariants({
    className: clsx(themeOutlineElement_FocusVisible, classNameProp),
    variant,
    weight,
  });

  const target = targetProp ?? (isExternalURL ? '_blank' : undefined);

  const finalHrefString = url.format(href ?? '#');

  if (isExternalURL) {
    return (
      <a
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
      className={className}
      href={finalHrefString}
      rel={rel}
      target={target}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
