import type { ReactNode } from 'react';
import {
  PiArrowSquareOut,
  PiArrowUpRight,
  PiDesktop,
  PiGithubLogo,
  PiHouse,
  PiMoon,
  PiNotePencil,
  PiPlus,
  PiSun,
  PiUser,
  PiXLogo,
} from 'react-icons/pi';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Anchor } from '@/components/ui/anchor';
import type { AnchorVariant, AnchorWeight } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import type { ButtonSize, ButtonVariant } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const anchorVariants: AnchorVariant[] = ['default', 'brand', 'unstyled'];
const anchorWeights: AnchorWeight[] = ['inherit', 'medium', 'normal'];
const buttonVariants: ButtonVariant[] = [
  'brand',
  'primary',
  'outline',
  'ghost',
];
const buttonSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const tooltipSides = ['top', 'right', 'bottom', 'left'] as const;

type ColorSwatch = Readonly<{
  name: string;
  className: string;
  hasBorder?: boolean;
}>;

const surfaceSwatches: ColorSwatch[] = [
  { name: 'background', className: 'bg-background', hasBorder: true },
  { name: 'foreground', className: 'bg-foreground' },
  { name: 'card', className: 'bg-card', hasBorder: true },
  { name: 'muted', className: 'bg-muted' },
  { name: 'surface', className: 'bg-surface', hasBorder: true },
  { name: 'popover', className: 'bg-popover', hasBorder: true },
  { name: 'border', className: 'bg-border' },
  { name: 'input', className: 'bg-input' },
];

const brandSwatches: ColorSwatch[] = [
  { name: 'brand', className: 'bg-brand' },
  {
    name: 'brand-foreground',
    className: 'bg-brand-foreground',
    hasBorder: true,
  },
  { name: 'brand-muted', className: 'bg-brand-muted' },
  { name: 'link', className: 'bg-link' },
  { name: 'ring', className: 'bg-ring' },
  { name: 'selection', className: 'bg-selection' },
];

type TypeSample = Readonly<{
  family: string;
  className: string;
  sample: string;
}>;

const typeSamples: TypeSample[] = [
  {
    family: 'font-serif · 2.4rem',
    className: 'font-serif text-[2.4rem] leading-[1.1]',
    sample: 'The quick brown fox',
  },
  {
    family: 'font-serif · italic · brand',
    className: 'font-serif italic text-[2rem] leading-[1.1] text-brand',
    sample: 'jumps over the lazy dog.',
  },
  {
    family: 'font-sans · base',
    className: 'font-sans text-base leading-relaxed',
    sample:
      'Design is not just what it looks like and feels like. Design is how it works.',
  },
  {
    family: 'font-sans · sm · muted',
    className: 'font-sans text-sm text-muted-foreground',
    sample: 'Supporting copy reads quieter but remains legible on both themes.',
  },
  {
    family: 'font-mono · xs',
    className: 'font-mono text-xs text-muted-foreground',
    sample: 'const vibe = "tactile & warm" as const;',
  },
];

export default function DesignPage() {
  return (
    <div className={cn('max-w-3xl', 'mx-auto px-4.5 pt-14 sm:pt-20 pb-20')}>
      <header
        className={cn(
          'flex items-start justify-between gap-4',
          'pb-10',
          'border-b border-border',
        )}
      >
        <div>
          <p
            className={cn(
              'font-mono text-xs uppercase tracking-[0.22em]',
              'text-brand',
            )}
          >
            Reference
          </p>
          <h1
            className={cn(
              'mt-4',
              'font-serif text-[clamp(1.8rem,6vw,2.4rem)] leading-[1.1]',
              'text-foreground',
            )}
          >
            Design <span className="italic text-brand">system</span>
          </h1>
          <p
            className={cn(
              'mt-3 max-w-md',
              'text-sm leading-relaxed',
              'text-muted-foreground',
            )}
          >
            A living reference for the tokens, typography, and components used
            across the site.
          </p>
        </div>
        <ThemeSwitcher />
      </header>

      <Section eyebrow="01" title="Colors">
        <SubHeading>Surface &amp; text</SubHeading>
        <div
          className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4', 'mt-3 mb-8')}
        >
          {surfaceSwatches.map((swatch) => (
            <Swatch key={swatch.name} swatch={swatch} />
          ))}
        </div>
        <SubHeading>Brand &amp; accents</SubHeading>
        <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4', 'mt-3')}>
          {brandSwatches.map((swatch) => (
            <Swatch key={swatch.name} swatch={swatch} />
          ))}
        </div>
      </Section>

      <Section eyebrow="02" title="Typography">
        <div
          className={cn(
            'flex flex-col gap-y-6',
            'p-6',
            'rounded-xl border border-border',
            'bg-surface/40',
          )}
        >
          {typeSamples.map((sample) => (
            <div key={sample.family}>
              <p
                className={cn(
                  'mb-2',
                  'font-mono text-[10px] uppercase tracking-wider',
                  'text-muted-foreground',
                )}
              >
                {sample.family}
              </p>
              <p className={cn(sample.className, 'text-foreground')}>
                {sample.sample}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="03" title="Buttons">
        <div className="flex flex-col gap-y-8">
          {buttonVariants.map((variant) => (
            <div key={variant}>
              <PropLabel prop="variant" value={variant} />
              <DemoRow label="Sizes">
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
              </DemoRow>
              <DemoRow label="Icon only">
                {buttonSizes.map((size) => (
                  <Button
                    key={size}
                    icon={<PiPlus />}
                    isLabelHidden={true}
                    label={`Add (${size})`}
                    size={size}
                    variant={variant}
                  />
                ))}
              </DemoRow>
              <DemoRow label="With addon">
                <Button
                  addonPosition="start"
                  icon={<PiPlus />}
                  label="Leading icon"
                  size="md"
                  variant={variant}
                />
                <Button
                  addonPosition="end"
                  icon={<PiArrowUpRight />}
                  label="Trailing icon"
                  size="md"
                  variant={variant}
                />
              </DemoRow>
            </div>
          ))}
          <div>
            <PropLabel prop="borderRadius" value="full" />
            <DemoRow>
              <Button label="Send an email" size="xl" variant="brand" />
              <Button
                addonPosition="start"
                icon={<PiPlus />}
                label="Follow along"
                size="lg"
                variant="outline"
              />
            </DemoRow>
          </div>
        </div>
      </Section>

      <Section eyebrow="04" title="Tooltip">
        <PropLabel prop="tooltipSide" value="top | right | bottom | left" />
        <DemoRow>
          {tooltipSides.map((side) => (
            <Button
              key={side}
              label={side}
              size="sm"
              tooltip={`Tooltip on ${side}`}
              tooltipSide={side}
              variant="outline"
            />
          ))}
        </DemoRow>
      </Section>

      <Section eyebrow="05" title="Anchor">
        <div className="flex flex-col gap-y-8">
          {anchorVariants.map((variant) => (
            <div key={variant}>
              <PropLabel prop="variant" value={variant} />
              <div
                className={cn(
                  'grid grid-cols-3 gap-4',
                  'mt-3',
                  'p-5',
                  'rounded-xl border border-border',
                  'bg-surface/40',
                )}
              >
                {anchorWeights.map((weight) => (
                  <div key={weight} className={cn('flex flex-col gap-y-1.5')}>
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-wider',
                        'text-muted-foreground',
                      )}
                    >
                      weight={weight}
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
      </Section>

      <Section eyebrow="06" title="Scroll area">
        <div className="flex flex-col gap-y-8">
          <div>
            <PropLabel prop="orientation" value="vertical" />
            <DemoRow>
              <ScrollArea
                className={cn(
                  'h-48 w-full',
                  'rounded-md border border-border',
                  'bg-background',
                )}
                viewportClassName="p-3"
              >
                <ul className={cn('flex flex-col gap-y-1.5', 'text-sm')}>
                  {Array.from({ length: 30 }, (_, index) => (
                    <li key={index}>Item {index + 1}</li>
                  ))}
                </ul>
              </ScrollArea>
            </DemoRow>
          </div>
          <div>
            <PropLabel prop="orientation" value="horizontal" />
            <DemoRow>
              <ScrollArea
                className={cn(
                  'w-full',
                  'rounded-md border border-border',
                  'bg-background',
                )}
                orientation="horizontal"
                viewportClassName="p-3"
              >
                <div className="flex w-max gap-x-2">
                  {Array.from({ length: 20 }, (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        'inline-flex items-center',
                        'px-3 py-1.5',
                        'rounded-full border border-border',
                        'text-xs whitespace-nowrap',
                        'bg-muted text-foreground',
                      )}
                    >
                      Tag {index + 1}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            </DemoRow>
          </div>
          <div>
            <PropLabel prop="orientation" value="both" />
            <DemoRow>
              <ScrollArea
                className={cn(
                  'h-48 w-full',
                  'rounded-md border border-border',
                  'bg-background',
                )}
                orientation="both"
                viewportClassName="p-3"
              >
                <ul
                  className={cn(
                    'flex flex-col gap-y-1.5 w-max',
                    'text-sm whitespace-nowrap',
                  )}
                >
                  {Array.from({ length: 20 }, (_, index) => (
                    <li key={index}>
                      Row {index + 1} — Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </DemoRow>
          </div>
        </div>
      </Section>

      <Section eyebrow="07" title="Command">
        <DemoRow>
          <Command
            className={cn(
              'w-full max-w-lg',
              'rounded-xl border border-input',
              'bg-popover',
            )}
            label="Design reference command palette"
          >
            <CommandInput placeholder="Type a command or search…" />
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="home">
                  <CommandItemIcon>
                    <PiHouse aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">Home</span>
                </CommandItem>
                <CommandItem value="about">
                  <CommandItemIcon>
                    <PiUser aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">About</span>
                </CommandItem>
                <CommandItem value="writing">
                  <CommandItemIcon>
                    <PiNotePencil aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">Writing</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Theme">
                <CommandItem value="light">
                  <CommandItemIcon>
                    <PiSun aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">Light</span>
                </CommandItem>
                <CommandItem value="dark">
                  <CommandItemIcon>
                    <PiMoon aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">Dark</span>
                </CommandItem>
                <CommandItem value="system">
                  <CommandItemIcon>
                    <PiDesktop aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">System</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Social">
                <CommandItem value="github">
                  <CommandItemIcon>
                    <PiGithubLogo aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">GitHub</span>
                  <PiArrowSquareOut
                    aria-hidden="true"
                    className="size-3.5 shrink-0 opacity-60"
                  />
                </CommandItem>
                <CommandItem value="twitter">
                  <CommandItemIcon>
                    <PiXLogo aria-hidden="true" />
                  </CommandItemIcon>
                  <span className="flex-1 truncate">X / Twitter</span>
                  <PiArrowSquareOut
                    aria-hidden="true"
                    className="size-3.5 shrink-0 opacity-60"
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandFooter>
              <div className="flex items-center gap-x-3">
                <CommandShortcut keys={['↑', '↓']} label="navigate" />
                <CommandShortcut keys={['↵']} label="select" />
              </div>
              <CommandShortcut keys={['esc']} label="close" />
            </CommandFooter>
          </Command>
        </DemoRow>
      </Section>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <section className={cn('pt-12')}>
      <div className={cn('flex items-baseline gap-x-3', 'mb-6')}>
        <span
          className={cn(
            'font-mono text-xs tracking-widest',
            'text-muted-foreground',
          )}
        >
          {eyebrow}
        </span>
        <h2
          className={cn('font-serif text-2xl leading-none', 'text-foreground')}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h3
      className={cn(
        'font-mono text-[11px] uppercase tracking-wider',
        'text-muted-foreground',
      )}
    >
      {children}
    </h3>
  );
}

function PropLabel({ prop, value }: Readonly<{ prop: string; value: string }>) {
  return (
    <p className={cn('mb-3', 'font-mono text-xs', 'text-muted-foreground')}>
      <span className="text-muted-foreground">{prop}=</span>
      <span className="text-brand">&quot;{value}&quot;</span>
    </p>
  );
}

function DemoRow({
  label,
  children,
}: Readonly<{ label?: string; children: ReactNode }>) {
  return (
    <div className={cn('mt-3')}>
      {label != null && (
        <p
          className={cn(
            'mb-2',
            'font-mono text-[10px] uppercase tracking-wider',
            'text-muted-foreground',
          )}
        >
          {label}
        </p>
      )}
      <div
        className={cn(
          'flex flex-wrap items-end gap-3',
          'p-5',
          'rounded-xl border border-border',
          'bg-surface/40',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Swatch({ swatch }: Readonly<{ swatch: ColorSwatch }>) {
  return (
    <div className={cn('flex flex-col gap-y-2')}>
      <div
        className={cn(
          'h-14 w-full',
          'rounded-lg',
          swatch.hasBorder && 'border border-border',
          swatch.className,
        )}
      />
      <p className={cn('font-mono text-[11px]', 'text-muted-foreground')}>
        {swatch.name}
      </p>
    </div>
  );
}
