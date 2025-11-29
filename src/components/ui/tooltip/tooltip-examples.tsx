import type { ReactNode } from 'react';

import { UIExamplesGroup } from '../misc/ui-examples-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

type TooltipConfig = {
  label: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

type BoxProps = {
  children?: ReactNode;
  className?: string;
  tooltip: TooltipConfig;
};

function TooltipExample({ children, tooltip }: Readonly<BoxProps>) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={tooltip.side} align={tooltip.align}>
        {tooltip.label}
      </TooltipContent>
    </Tooltip>
  );
}

const shortLabel = 'Hello world!';
const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

export function TooltipExamples() {
  return (
    <UIExamplesGroup gapSize="lg" title="Tooltip">
      <TooltipProvider>
        <div className="flex gap-8">
          <TooltipExample tooltip={{ label: shortLabel, side: 'top' }}>
            Tooltip top
          </TooltipExample>
          <TooltipExample tooltip={{ label: shortLabel, side: 'bottom' }}>
            Tooltip bottom
          </TooltipExample>
          <TooltipExample tooltip={{ label: shortLabel, side: 'left' }}>
            Tooltip left
          </TooltipExample>
          <TooltipExample tooltip={{ label: shortLabel, side: 'right' }}>
            Tooltip right
          </TooltipExample>
        </div>
        <div className="flex gap-8">
          <TooltipExample tooltip={{ label: shortLabel, side: 'top' }}>
            Short label
          </TooltipExample>
          <TooltipExample tooltip={{ label: longLabel, side: 'top' }}>
            Long label
          </TooltipExample>
        </div>
      </TooltipProvider>
    </UIExamplesGroup>
  );
}
