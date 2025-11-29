import clsx from 'clsx';
import { capitalize } from 'lodash-es';

import { UIExamplesGroup } from '@/components/ui/misc/ui-examples-group';

import { Text } from '../text';
import { Anchor } from './anchor';
import type { AnchorVariant } from './anchor-styles';

const anchorVariants: ReadonlyArray<{
  className?: string;
  description: string;
  variant: AnchorVariant;
}> = [
  {
    description: 'Default text color',
    variant: 'primary',
  },
  {
    description: 'Inherit text color',
    variant: 'blend',
  },
  {
    description: 'No styling, not even on hover',
    variant: 'unstyled',
  },
];

export function AnchorExamples() {
  return (
    <UIExamplesGroup title="Anchor" gapSize="lg">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          {anchorVariants.map(({ className, description, variant }) => (
            <div className={clsx('py-2')} key={variant}>
              <div className="text-foreground">
                <Anchor className={className} href="#" variant={variant}>
                  {capitalize(variant)}
                </Anchor>
              </div>
              <Text className="block" size="body3">
                {description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </UIExamplesGroup>
  );
}
