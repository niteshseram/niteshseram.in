'use client';

import { AnchorExamples } from '@/components/ui/anchor/anchor-examples';
import { ButtonExamples } from '@/components/ui/button/button-examples';
import { ColorPalette } from '@/components/ui/color-palette';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { HeadingLevelIncrease } from '@/components/ui/heading/heading-context';
import { HeadingExamples } from '@/components/ui/heading/heading-examples';
import { TextExamples } from '@/components/ui/text/text-examples';
import { TooltipExamples } from '@/components/ui/tooltip/tooltip-examples';

export function DesignSystemPage() {
  return (
    <div className="grid gap-y-6 py-12 lg:gap-y-12 lg:py-16">
      <Container width="4xl">
        <Heading className="text-heading3 mb-8">Design System</Heading>
      </Container>
      <HeadingLevelIncrease>
        {/* Basics */}
        <ColorPalette />
        <HeadingExamples />
        <TextExamples />
        <AnchorExamples />
        <ButtonExamples />
        <TooltipExamples />
      </HeadingLevelIncrease>
    </div>
  );
}
