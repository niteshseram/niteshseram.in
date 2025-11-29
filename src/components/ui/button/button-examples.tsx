import { capitalize } from 'lodash-es';
import { PiArrowRight, PiDownload } from 'react-icons/pi';

import { UIExamplesGroup } from '../misc/ui-examples-group';
import type { TooltipContent } from '../tooltip/tooltip';
import type { ButtonVariant } from './button';
import { Button } from './button';
import type { ButtonSize } from './button-styles';

const sizes: ReadonlyArray<ButtonSize> = ['xs', 'sm', 'md', 'lg'];
const variants: ReadonlyArray<ButtonVariant> = [
  'primary',
  'secondary',
  'tertiary',
];
const tooltipSides: ReadonlyArray<
  React.ComponentProps<typeof TooltipContent>['side']
> = ['top', 'bottom', 'left', 'right'];

export function ButtonExamples() {
  return (
    <UIExamplesGroup title="Button">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <Button
              key={size}
              label={`${capitalize(variant)} Button`}
              size={size}
              variant={variant}
            />
          ))}
          <Button
            disabled={true}
            label={`${capitalize(variant)} Button`}
            size="lg"
            variant={variant}
          />
        </div>
      ))}
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <Button
              key={size}
              label={`${capitalize(variant)} Button`}
              size={size}
              icon={PiDownload}
              isLabelHidden={true}
              variant={variant}
            />
          ))}
          <Button
            disabled={true}
            label={`${capitalize(variant)} Button`}
            size="lg"
            icon={PiDownload}
            isLabelHidden={true}
            variant={variant}
          />
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <Button
            key={size}
            icon={PiArrowRight}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          icon={PiArrowRight}
          disabled={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <Button
            key={size}
            addonPosition="start"
            icon={PiDownload}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          addonPosition="start"
          icon={PiDownload}
          disabled={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size) => (
          <Button
            key={size}
            display="block"
            icon={PiArrowRight}
            label="Button text"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          display="block"
          icon={PiArrowRight}
          disabled={true}
          label="Button text"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {tooltipSides.map((side) => (
          <Button
            key={side}
            label={`Tooltip ${side}`}
            size="md"
            tooltip={`Tooltip ${side}`}
            tooltipSide={side}
            variant="primary"
          />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
