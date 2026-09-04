'use client';

import { Moon, Sun } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';
import { useMounted } from '@/utils/use-mounted';

export function AppearanceToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const audioContextReference = useRef<AudioContext | null>(null);
  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  useEffect(() => {
    return () => {
      audioContextReference.current?.close().catch(() => {});
      audioContextReference.current = null;
    };
  }, []);

  useGlobalShortcut((event) => {
    if (
      !event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.isComposing ||
      event.repeat ||
      event.code !== 'KeyT' ||
      isEditableTarget(event.target)
    ) {
      return;
    }

    event.preventDefault();
    handleToggle();
  });

  function handleToggle() {
    const currentAppearance =
      resolvedTheme ??
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    if (!audioContextReference.current) {
      audioContextReference.current = new AudioContext();
    }

    playToggleSound(audioContextReference.current);
    setTheme(currentAppearance === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button
      aria-keyshortcuts="Alt+T"
      className="group"
      icon={
        <MorphIcon
          icon={isDark ? Sun : Moon}
          reducedMotion="user"
          spring="snappy"
        />
      }
      iconClassName={cn(
        'text-brand',
        'transition-transform duration-[var(--motion-duration-fast)] ease-standard',
        'group-hover:rotate-12',
      )}
      isLabelHidden={true}
      label={label}
      onClick={handleToggle}
      size="sm"
      tooltip={
        <span className="inline-flex items-center gap-x-1.5">
          {label}
          <kbd
            className={cn(
              'inline-flex h-5 items-center justify-center',
              'px-1.5',
              'rounded-sm',
              'font-mono text-xs/none',
              'bg-muted text-muted-foreground',
            )}
          >
            Alt T
          </kbd>
        </span>
      }
      tooltipSide="bottom"
      variant="ghost"
    />
  );
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

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'TEXTAREA'
  );
}
