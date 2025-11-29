'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { UIExamplesGroup } from './misc/ui-examples-group';

type ColorSwatchProps = {
  name: string;
  variable: string;
  className?: string;
};

function ColorSwatch({ name, variable, className }: ColorSwatchProps) {
  const [colorValue, setColorValue] = useState<string>('');

  useEffect(() => {
    const updateColor = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
      setColorValue(value);
    };

    updateColor();
    // Observer for theme changes if needed, or just run on mount/update
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    return () => observer.disconnect();
  }, [variable]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'border-border h-24 w-full rounded-md border shadow-sm',
          className,
        )}
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{name}</span>
        <div className="text-muted-foreground flex flex-col text-xs">
          <span>{variable}</span>
          <span className="font-mono opacity-75">{colorValue || '...'}</span>
        </div>
      </div>
    </div>
  );
}

export function ColorPalette() {
  const groups = [
    {
      title: 'Primary Theme Colors',
      colors: [
        { name: 'Background', variable: '--background' },
        { name: 'Foreground', variable: '--foreground' },
        { name: 'Primary', variable: '--primary' },
        { name: 'Primary Foreground', variable: '--primary-foreground' },
      ],
    },
    {
      title: 'Secondary & Accent Colors',
      colors: [
        { name: 'Secondary', variable: '--secondary' },
        { name: 'Secondary Foreground', variable: '--secondary-foreground' },
        { name: 'Accent', variable: '--accent' },
        { name: 'Accent Foreground', variable: '--accent-foreground' },
      ],
    },
    {
      title: 'UI Component Colors',
      colors: [
        { name: 'Card', variable: '--card' },
        { name: 'Card Foreground', variable: '--card-foreground' },
        { name: 'Popover', variable: '--popover' },
        { name: 'Popover Foreground', variable: '--popover-foreground' },
        { name: 'Muted', variable: '--muted' },
        { name: 'Muted Foreground', variable: '--muted-foreground' },
      ],
    },
    {
      title: 'Utility & Form Colors',
      colors: [
        { name: 'Border', variable: '--border' },
        { name: 'Input', variable: '--input' },
        { name: 'Ring', variable: '--ring' },
      ],
    },
  ];

  return (
    <UIExamplesGroup title="Colors">
      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wider">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {group.colors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
