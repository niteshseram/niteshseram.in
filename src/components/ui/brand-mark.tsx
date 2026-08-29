import type { SVGProps } from 'react';
import type { SimpleIcon } from 'simple-icons';

export type BrandIconData = Readonly<Pick<SimpleIcon, 'path'>>;

type Props = Omit<SVGProps<SVGSVGElement>, 'children'> &
  Readonly<{
    icon: BrandIconData;
    label?: string;
  }>;

export function BrandMark({ icon, label, ...props }: Props) {
  return (
    <svg
      aria-hidden={label ? undefined : true}
      fill="currentColor"
      focusable="false"
      height="1em"
      role={label ? 'img' : undefined}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {label ? <title>{label}</title> : null}
      <path d={icon.path} />
    </svg>
  );
}
