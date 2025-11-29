import clsx from 'clsx';

import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Heading } from '../heading';
import { HeadingLevelIncrease } from '../heading/heading-context';

type Props = Readonly<{
  children: React.ReactNode;
  gapSize?: GapSize;
  title?: string;
}>;

type GapSize = 'lg' | 'md';

const gapClasses: Record<GapSize, string> = {
  lg: 'gap-8',
  md: 'gap-4',
};

export function UIExamplesGroup({ children, gapSize = 'md', title }: Props) {
  return (
    <Container width="4xl">
      <div className={cn('flex flex-col gap-1.5', 'p-1')}>
        {title && (
          <div className="flex pt-1">
            <Heading className="text-heading4 font-medium">{title}</Heading>
          </div>
        )}
        <HeadingLevelIncrease>
          <div className={clsx('grid w-full', gapClasses[gapSize], 'py-4')}>
            {children}
          </div>
        </HeadingLevelIncrease>
      </div>
    </Container>
  );
}
