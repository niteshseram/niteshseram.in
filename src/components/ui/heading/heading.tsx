'use client';

import type { HTMLAttributes } from 'react';

import { useHeadingLevel } from './heading-context';
import type { HeadingColor } from './heading-styles';
import { headingCVA } from './heading-styles';

type Props = HTMLAttributes<HTMLHeadingElement> &
  Readonly<{
    className: string;
    color?: HeadingColor;
    tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  }>;

export function Heading({
  className,
  color,
  tag,
  ...props
}: Props & { ref?: React.Ref<HTMLHeadingElement> }) {
  const { level } = useHeadingLevel();
  const HeadingTag = tag ?? `h${level}`;

  return (
    // @ts-expect-error TS doesn't know the tags are h1/h2/etc.
    <HeadingTag className={headingCVA({ className, color })} {...props} />
  );
}
