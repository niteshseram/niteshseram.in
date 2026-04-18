import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 30 }: Props) {
  return (
    <svg
      viewBox="0 0 188 200"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn('text-foreground', className)}
    >
      <g
        transform="translate(0,200) scale(0.1,-0.1)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
        <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
      </g>
    </svg>
  );
}
