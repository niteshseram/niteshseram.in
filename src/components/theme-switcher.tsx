'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleTheme = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    playToggleSound(audioCtxRef.current);
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  useGlobalShortcut(
    useCallback(
      (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;
        if (e.key.toLowerCase() !== 't') return;
        const target = e.target as HTMLElement | null;
        if (target) {
          const tag = target.tagName;
          if (
            tag === 'INPUT' ||
            tag === 'TEXTAREA' ||
            tag === 'SELECT' ||
            target.isContentEditable
          ) {
            return;
          }
        }
        e.preventDefault();
        toggleTheme();
      },
      [toggleTheme],
    ),
  );

  return (
    <Button
      className="group"
      icon={mounted ? isDark ? <PiMoon /> : <PiSun /> : undefined}
      iconClassName="group-hover:animate-wiggle"
      isLabelHidden={true}
      label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      size="sm"
      tooltip={
        <span className="inline-flex items-center gap-x-1.5">
          Toggle theme
          <kbd
            className={cn(
              'inline-flex h-5 min-w-5 items-center justify-center',
              'px-1',
              'bg-background/10',
              'font-mono text-sm/none text-black',
              'transition-colors',
            )}
          >
            T
          </kbd>
        </span>
      }
      tooltipSide="bottom"
      variant="outline"
    />
  );
}

function playToggleSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

  osc.start(now);
  osc.stop(now + 0.15);
}
