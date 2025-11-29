import type React from 'react';
import type { HTMLAttributes } from 'react';

import type { TextColor, TextSize, TextWeight } from './text-styles';
import { textVariants } from './text-styles';

type Props = HTMLAttributes<HTMLSpanElement> &
  Readonly<{
    children?: React.ReactNode;
    className?: string;
    color?: TextColor;
    id?: string;
    size?: TextSize;
    weight?: TextWeight;
  }>;

export function Text({
  children,
  className,
  color,
  size,
  weight,
  ...props
}: Props & { ref?: React.Ref<HTMLSpanElement> }) {
  const { ref } = props;
  return (
    <span
      ref={ref}
      className={textVariants({
        className,
        color,
        size,
        weight,
      })}
      {...props}
    >
      {children}
    </span>
  );
}
