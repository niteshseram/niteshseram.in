import clsx from 'clsx';

type DividerDirection = 'horizontal' | 'vertical';

type Props = Readonly<{
  className?: string;
  direction?: DividerDirection;
}>;

const dividerDirectionClass: Record<DividerDirection, string> = {
  horizontal: 'h-px w-full',
  vertical: 'w-px',
};

export function Divider({ className, direction = 'horizontal' }: Props) {
  return (
    <div
      className={clsx(dividerDirectionClass[direction], 'bg-border', className)}
    />
  );
}
