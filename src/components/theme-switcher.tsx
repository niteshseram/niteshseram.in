'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  function handleClick() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    playToggleSound(audioCtxRef.current);
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <Button
      className="group"
      icon={mounted ? isDark ? <PiMoon /> : <PiSun /> : undefined}
      iconClassName="group-hover:animate-wiggle"
      isLabelHidden={true}
      label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={handleClick}
      size="sm"
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
