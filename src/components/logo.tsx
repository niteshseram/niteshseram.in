import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 28 }: Props) {
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
      <g transform="translate(0,200) scale(0.1,-0.1)" stroke="none">
        <g
          className={cn(
            '[transform-box:fill-box]',
            'text-current',
            'origin-center transition-[transform,color] duration-[var(--logo-motion-duration)] ease-emphasized motion-reduce:transform-none motion-reduce:transition-colors',
            'group-hover/logo:translate-x-[var(--logo-left-shift-x)] group-hover/logo:translate-y-[var(--logo-left-shift-y)] group-hover/logo:rotate-[var(--logo-left-rotate)] group-focus-visible/logo:translate-x-[var(--logo-left-shift-x)] group-focus-visible/logo:translate-y-[var(--logo-left-shift-y)] group-focus-visible/logo:rotate-[var(--logo-left-rotate)] group-active/logo:-translate-x-[1%] group-active/logo:translate-y-0 group-active/logo:rotate-0',
          )}
          fill="currentColor"
        >
          <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
        </g>
        <g
          className={cn(
            '[transform-box:fill-box]',
            'text-current',
            'origin-center transition-[transform,color] duration-[var(--logo-motion-duration)] ease-emphasized motion-reduce:transform-none motion-reduce:transition-colors',
            'group-hover/logo:translate-x-[var(--logo-right-shift-x)] group-hover/logo:translate-y-[var(--logo-right-shift-y)] group-hover/logo:rotate-[var(--logo-right-rotate)] group-hover/logo:text-brand group-focus-visible/logo:translate-x-[var(--logo-right-shift-x)] group-focus-visible/logo:translate-y-[var(--logo-right-shift-y)] group-focus-visible/logo:rotate-[var(--logo-right-rotate)] group-focus-visible/logo:text-brand group-active/logo:translate-x-[1%] group-active/logo:translate-y-0 group-active/logo:rotate-0',
          )}
          fill="currentColor"
        >
          <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
        </g>
      </g>
    </svg>
  );
}
