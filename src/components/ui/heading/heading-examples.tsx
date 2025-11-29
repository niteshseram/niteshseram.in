import { capitalize } from 'lodash-es';
import { useRef } from 'react';

import { UIExamplesGroup } from '../misc/ui-examples-group';
import { TypographyProperties } from '../utils/typography-properties';
import { Heading } from './heading';

const levels = [
  ['Heading 1', 'text-heading1'],
  ['Heading 2', 'text-heading2'],
  ['Heading 3', 'text-heading3'],
  ['Heading 4', 'text-heading4'],
  ['Heading 5', 'text-heading5'],
  ['Heading 6', 'text-heading6'],
] as const;

function HeadingExampleItem({ level }: { level: (typeof levels)[number] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Heading className={level[1]} ref={ref}>
        {capitalize(level[0])}
      </Heading>
      <div className="flex gap-8">
        <div className="text-muted-foreground">
          Class: <code className="text-primary">{level[1]}</code>
        </div>
        <TypographyProperties elementRef={ref} />
      </div>
    </div>
  );
}

export function HeadingExamples() {
  return (
    <UIExamplesGroup title="Heading">
      <div className="flex gap-12">
        <div className="flex flex-col gap-8">
          {levels.map((level) => (
            <HeadingExampleItem key={level[1]} level={level} />
          ))}
        </div>
      </div>
    </UIExamplesGroup>
  );
}
