import { capitalize } from 'lodash-es';
import { useRef } from 'react';

import { UIExamplesGroup } from '../misc/ui-examples-group';
import { TypographyProperties } from '../utils/typography-properties';
import { Text } from './text';

const colors = ['default', 'secondary'] as const;

const sizes = ['body0', 'body1', 'body2', 'body3', 'body4'] as const;
const weights = ['normal', 'medium', 'bold'] as const;

function TextExampleItem({ size, weight }: React.ComponentProps<typeof Text>) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Text
        ref={ref}
        key={weight}
        className="whitespace-nowrap"
        size={size}
        weight={weight}
      >
        {capitalize(size)}/{capitalize(weight)}
      </Text>
      <TypographyProperties elementRef={ref} className="flex flex-col gap-1" />
    </div>
  );
}

export function TextExamples() {
  return (
    <UIExamplesGroup title="Text">
      <div className="flex flex-wrap items-center gap-4">
        {colors.map((color) => (
          <Text
            key={color}
            className="whitespace-nowrap"
            color={color}
            size="body1"
          >
            {capitalize(color)}
          </Text>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        {weights.map((weight) => (
          <div key={weight} className="flex flex-col gap-8">
            {sizes.map((size) => (
              <TextExampleItem key={size} size={size} weight={weight} />
            ))}
          </div>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
