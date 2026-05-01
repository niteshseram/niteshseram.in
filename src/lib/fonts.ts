import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Instrument_Serif } from 'next/font/google';

import { cn } from './utils';

export const geistSans = GeistSans;

export const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const geistMono = GeistMono;

export const fontVariables = cn(
  geistSans.variable,
  instrumentSerif.variable,
  geistMono.variable,
);
