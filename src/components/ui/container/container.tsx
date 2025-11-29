import clsx from 'clsx';
import type React from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

type ContainerWidth = 'app' | '4xl';

type Props = HTMLAttributes<HTMLElement> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    tag?: 'div' | 'section';
    width?: ContainerWidth;
  }>;

const widthStyles: Record<ContainerWidth, string> = {
  app: clsx('max-w-2xl', 'max-xl:px-4'),
  '4xl': clsx('max-w-4xl', 'max-xl:px-4'),
};

export function Container({
  children,
  className,
  tag: ContainerTag = 'div',
  width = 'app',
  ...props
}: Props) {
  return (
    <ContainerTag
      className={clsx('mx-auto w-full', widthStyles[width], className)}
      {...props}
    >
      {children}
    </ContainerTag>
  );
}
