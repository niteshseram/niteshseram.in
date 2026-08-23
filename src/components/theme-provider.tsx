'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

import { AtmosphereProvider } from '@/components/atmosphere-provider';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <AtmosphereProvider>{children}</AtmosphereProvider>
    </NextThemesProvider>
  );
}
