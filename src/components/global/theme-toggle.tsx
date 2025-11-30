'use client';
import { useTheme } from 'next-themes';
import { PiMoonStars, PiSun } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/useMounted';

export function ThemeToggle() {
  const isMounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const Icon = !isMounted
    ? undefined
    : resolvedTheme === 'dark'
      ? PiMoonStars
      : PiSun;

  return (
    <Button
      className="group"
      iconClassName="group-hover:animate-wiggle"
      isLabelHidden={true}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      variant="tertiary"
      label="Toggle Theme"
      icon={Icon}
    />
  );
}
