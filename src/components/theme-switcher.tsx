'use client';

import { Popover } from '@base-ui/react/popover';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  PiCheck,
  PiClockAfternoon,
  PiCloudSun,
  PiDesktop,
  PiMoon,
  PiMoonStars,
  PiPalette,
  PiSparkle,
  PiSun,
  PiSunHorizon,
} from 'react-icons/pi';

import { useAtmosphere } from '@/components/atmosphere-provider';
import { Button } from '@/components/ui/button';
import {
  ATMOSPHERE_OPTIONS,
  type Atmosphere,
  type AtmosphereOption,
  type AtmospherePreference,
  resolveAtmosphere,
} from '@/config/atmosphere';
import { cn } from '@/lib/utils';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';
import { useMounted } from '@/utils/use-mounted';

type Appearance = 'dark' | 'light' | 'system';

const APPEARANCE_OPTIONS: ReadonlyArray<{
  icon: IconType;
  label: string;
  value: Appearance;
}> = [
  { icon: PiSun, label: 'Light', value: 'light' },
  { icon: PiMoon, label: 'Dark', value: 'dark' },
  { icon: PiDesktop, label: 'System', value: 'system' },
];

const ATMOSPHERE_ICONS: Record<AtmospherePreference, IconType> = {
  default: PiSparkle,
  auto: PiClockAfternoon,
  morning: PiSunHorizon,
  day: PiSun,
  evening: PiCloudSun,
  night: PiMoonStars,
};

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const { isReady, preference, previewAtmosphere, setAtmosphere } =
    useAtmosphere();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const audioContextReference = useRef<AudioContext | null>(null);
  const popupReference = useRef<HTMLDivElement>(null);
  const triggerReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      audioContextReference.current?.close().catch(() => {});
      audioContextReference.current = null;
    };
  }, []);

  useGlobalShortcut(
    useCallback((event) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing)
        return;
      if (event.key.toLowerCase() !== 't') return;
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        if (
          tagName === 'INPUT' ||
          tagName === 'TEXTAREA' ||
          tagName === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        popupReference.current
          ?.querySelector<HTMLButtonElement>('button')
          ?.focus();
      });
    }, []),
  );

  const selectedAppearance = mounted ? normalizeAppearance(theme) : 'system';
  const selectedAtmosphere = isReady ? preference : 'default';
  const automaticAtmosphere = mounted ? resolveAtmosphere('auto') : 'default';

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) previewAtmosphere(null);
  }

  function handleAppearanceChange(nextAppearance: Appearance) {
    if (!audioContextReference.current) {
      audioContextReference.current = new AudioContext();
    }
    playToggleSound(audioContextReference.current);
    setTheme(nextAppearance);
  }

  return (
    <>
      <Button
        ref={triggerReference}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group"
        icon={<PiPalette />}
        iconClassName="text-brand group-hover:animate-wiggle"
        isLabelHidden={true}
        label="Customize theme"
        onClick={() => handleOpenChange(!open)}
        size="sm"
        tooltip={
          <span className="inline-flex items-center gap-x-1.5">
            Theme settings
            <kbd
              className={cn(
                'inline-flex h-5 min-w-5 items-center justify-center',
                'px-1',
                'font-mono text-sm/none',
                'bg-background/10 text-background',
              )}
            >
              T
            </kbd>
          </span>
        }
        tooltipSide="bottom"
        variant="ghost"
      />
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Portal>
          <Popover.Positioner
            align="end"
            anchor={triggerReference}
            className="z-[60]"
            sideOffset={8}
          >
            <Popover.Popup
              ref={popupReference}
              initialFocus={(interactionType) => interactionType === 'keyboard'}
              className={cn(
                'flex max-h-[min(32rem,calc(100vh-5rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-y-auto origin-(--transform-origin)',
                'p-2.5',
                'rounded-xl border shadow-lg',
                'border-border bg-popover text-popover-foreground shadow-shadow/25',
                'transition-[transform,scale,opacity,background-color,color,border-color] duration-[var(--motion-duration-fast)] ease-standard',
                'data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
              )}
            >
              <Popover.Title className="sr-only">Theme settings</Popover.Title>
              <Popover.Description className="sr-only">
                Choose an appearance and atmosphere for the site.
              </Popover.Description>

              <section aria-labelledby="appearance-heading">
                <h2
                  className={cn(
                    'px-1 pb-2',
                    'text-xs font-medium uppercase tracking-[0.08em]',
                    'text-muted-foreground',
                  )}
                  id="appearance-heading"
                >
                  Appearance
                </h2>
                <div className="grid grid-cols-3 gap-1">
                  {APPEARANCE_OPTIONS.map((option) => (
                    <AppearanceOption
                      key={option.value}
                      option={option}
                      selected={option.value === selectedAppearance}
                      onSelect={handleAppearanceChange}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-5" aria-labelledby="atmosphere-heading">
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
    </>
  );
}

function AppearanceOption({
  onSelect,
  option,
  selected,
}: Readonly<{
  onSelect: (appearance: Appearance) => void;
  option: (typeof APPEARANCE_OPTIONS)[number];
  selected: boolean;
}>) {
  const Icon = option.icon;

  return (
    <button
      aria-pressed={selected}
      className={cn(
        'inline-flex h-9 items-center justify-center gap-1.5',
        'px-2',
        'rounded-lg',
        'text-xs font-medium',
        'cursor-pointer outline-none',
        'transition-colors',
        'hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
        selected ? 'bg-brand-muted text-brand' : 'text-muted-foreground',
      )}
      onClick={() => onSelect(option.value)}
      type="button"
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {option.label}
    </button>
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
            <PiCheck aria-hidden="true" className="size-3.5 text-brand" />
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

function normalizeAppearance(theme: string | undefined): Appearance {
  if (theme === 'light' || theme === 'dark' || theme === 'system') return theme;
  return 'system';
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function playToggleSound(audioContext: AudioContext) {
  const currentTime = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(440, currentTime + 0.12);

  gainNode.gain.setValueAtTime(0.0001, currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.12, currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.15);

  oscillator.start(currentTime);
  oscillator.stop(currentTime + 0.15);
}
