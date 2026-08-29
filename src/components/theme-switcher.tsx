'use client';

import { Popover } from '@base-ui/react/popover';
import {
  Check,
  Clock3,
  CloudSun,
  MoonStar,
  Palette,
  Sparkles,
  Sun,
  Sunrise,
} from 'lucide-react';
import { useState } from 'react';

import { useAtmosphere } from '@/components/atmosphere-provider';
import { Button } from '@/components/ui/button';
import {
  ATMOSPHERE_OPTIONS,
  type Atmosphere,
  type AtmosphereOption,
  type AtmospherePreference,
  resolveAtmosphere,
} from '@/config/atmosphere';
import type { IconComponent } from '@/lib/icon-types';
import { cn } from '@/lib/utils';
import { useMounted } from '@/utils/use-mounted';

const ATMOSPHERE_ICONS: Record<AtmospherePreference, IconComponent> = {
  default: Sparkles,
  auto: Clock3,
  morning: Sunrise,
  day: Sun,
  evening: CloudSun,
  night: MoonStar,
};

export function ThemeSwitcher() {
  const { isReady, preference, previewAtmosphere, setAtmosphere } =
    useAtmosphere();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const selectedAtmosphere = isReady ? preference : 'default';
  const automaticAtmosphere = mounted ? resolveAtmosphere('auto') : 'default';

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) previewAtmosphere(null);
  }

  return (
    <div
      className={cn(
        'fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50',
        'theme-switcher-floating',
      )}
    >
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger
          render={
            <Button
              className={cn(
                'size-10',
                'border shadow-md backdrop-blur-md',
                'bg-background/90 text-brand border-border shadow-shadow/15',
                'group',
                'hover:bg-muted',
              )}
              icon={<Palette />}
              iconClassName="group-hover:animate-wiggle"
              isLabelHidden={true}
              label="Customize color theme"
              size="lg"
              tooltip="Color themes"
              tooltipSide="right"
              variant="ghost"
            />
          }
        />
        <Popover.Portal>
          <Popover.Positioner
            align="start"
            className="z-[60]"
            side="top"
            sideOffset={10}
          >
            <Popover.Popup
              initialFocus={(interactionType) => interactionType === 'keyboard'}
              className={cn(
                'flex max-h-[min(28rem,calc(100vh-5rem))] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-y-auto origin-(--transform-origin)',
                'p-2.5',
                'rounded-xl border shadow-lg',
                'border-border bg-popover text-popover-foreground shadow-shadow/25',
                'transition-[transform,scale,opacity,background-color,color,border-color] duration-[var(--motion-duration-fast)] ease-standard',
                'data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
              )}
            >
              <Popover.Title className="sr-only">Color themes</Popover.Title>
              <Popover.Description className="sr-only">
                Choose a color atmosphere for the site.
              </Popover.Description>

              <section aria-labelledby="atmosphere-heading">
                <div className="flex items-baseline justify-between gap-3 px-1 pb-2">
                  <h2
                    className={cn(
                      'text-xs font-medium uppercase tracking-[0.08em]',
                      'text-muted-foreground',
                    )}
                    id="atmosphere-heading"
                  >
                    Atmosphere
                  </h2>
                  <p className="text-[11px] text-muted-foreground">
                    Preview on hover
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {ATMOSPHERE_OPTIONS.map((option) => (
                    <AtmosphereOptionButton
                      key={option.value}
                      automaticAtmosphere={automaticAtmosphere}
                      option={option}
                      selected={option.value === selectedAtmosphere}
                      onPreview={previewAtmosphere}
                      onSelect={setAtmosphere}
                    />
                  ))}
                </div>
              </section>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

function AtmosphereOptionButton({
  automaticAtmosphere,
  onPreview,
  onSelect,
  option,
  selected,
}: Readonly<{
  automaticAtmosphere: Atmosphere;
  onPreview: (preference: AtmospherePreference | null) => void;
  onSelect: (preference: AtmospherePreference) => void;
  option: AtmosphereOption;
  selected: boolean;
}>) {
  const Icon = ATMOSPHERE_ICONS[option.value];
  const description =
    option.value === 'auto'
      ? `${capitalize(automaticAtmosphere)} now · local time`
      : option.description;

  return (
    <button
      aria-pressed={selected}
      className={cn(
        'flex min-h-16 items-start gap-2.5',
        'p-2.5',
        'rounded-lg',
        'text-left',
        'cursor-pointer outline-none',
        'transition-[background-color,color,box-shadow] duration-[var(--motion-duration-fast)] ease-standard',
        'hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
        selected
          ? 'bg-brand-muted text-foreground ring-1 ring-brand/25'
          : 'text-foreground',
      )}
      onBlur={() => onPreview(null)}
      onClick={() => onSelect(option.value)}
      onFocus={() => onPreview(option.value)}
      onPointerEnter={() => onPreview(option.value)}
      onPointerLeave={() => onPreview(null)}
      type="button"
    >
      <span
        aria-hidden="true"
        className="atmosphere-option-icon"
        data-atmosphere-preview={
          option.value === 'auto' ? automaticAtmosphere : option.value
        }
      >
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium leading-5">{option.label}</span>
          {selected ? (
            <Check aria-hidden="true" className="size-3.5 text-brand" />
          ) : null}
        </span>
        <span
          className={cn(
            'mt-0.5 block',
            'text-[11px] leading-4',
            selected ? 'text-foreground/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </span>
      </span>
    </button>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
