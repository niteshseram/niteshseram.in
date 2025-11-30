import clsx from 'clsx';

export function Logo({
  size = 32,
  className,
}: Readonly<{
  size?: number;
  className?: string;
}>) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 188 200"
      className={clsx('text-current', className)}
    >
      <title>Nitesh Seram&apos;s logo</title>
      <g
        transform="translate(0,200) scale(0.1,-0.1)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
        <path
          d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84
  165 -239 238 -526 249 l-148 6 0 -912z"
        />
      </g>
    </svg>
  );
}
