'use client';

import { PiPlus } from 'react-icons/pi';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Anchor } from '@/components/ui/anchor';
import type { AnchorVariant, AnchorWeight } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import type { ButtonSize, ButtonVariant } from '@/components/ui/button';

const variants: AnchorVariant[] = ['default', 'brand', 'unstyled'];
const weights: AnchorWeight[] = ['inherit', 'medium', 'normal'];

const buttonVariants: ButtonVariant[] = ['brand', 'outline', 'ghost'];
const buttonSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function DesignPage() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-foreground text-2xl">Design System</h1>
        <ThemeSwitcher />
      </div>

      <section className="mb-10">
        <h2 className="font-serif text-muted-foreground text-lg mb-5">
          Button
        </h2>

        <div className="space-y-6">
          {buttonVariants.map((variant) => (
            <div key={variant}>
              <h3 className="font-mono text-xs text-muted-foreground mb-3">
                variant=&quot;{variant}&quot;
              </h3>
              <div className="flex flex-wrap items-end gap-3">
                {buttonSizes.map((size) => (
                  <Button
                    key={size}
                    label={size}
                    size={size}
                    variant={variant}
                  />
                ))}
                <Button
                  disabled={true}
                  label="disabled"
                  size="md"
                  variant={variant}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                {buttonSizes.map((size) => (
                  <Button
                    key={size}
                    icon={PiPlus}
                    isLabelHidden={true}
                    label={`Add (${size})`}
                    size={size}
                    variant={variant}
                  />
                ))}
                <Button
                  borderRadius="full"
                  label="Send an email"
                  size="xl"
                  variant="brand"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-muted-foreground text-lg mb-5">
          Tooltip
        </h2>

        <div className="flex flex-wrap gap-3">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Button
              key={side}
              label={side}
              size="sm"
              tooltip={`Tooltip on ${side}`}
              tooltipSide={side}
              variant="outline"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-muted-foreground text-lg mb-5">
          Anchor
        </h2>

        <div className="space-y-6">
          {variants.map((variant) => (
            <div key={variant}>
              <h3 className="font-mono text-xs text-muted-foreground mb-3">
                variant=&quot;{variant}&quot;
              </h3>
              <div className="flex flex-wrap items-baseline gap-4">
                {weights.map((weight) => (
                  <div key={weight} className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      weight=&quot;{weight}&quot;
                    </span>
                    <Anchor
                      href="https://example.com"
                      variant={variant}
                      weight={weight}
                    >
                      Example link
                    </Anchor>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
