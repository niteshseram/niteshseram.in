import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

import { cn } from './utils';

export const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: '400',
});

export const fontVariables = cn(
  dmSans.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
);
