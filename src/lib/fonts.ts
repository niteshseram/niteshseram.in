import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { cn } from './utils';

export const geistSans = GeistSans;

export const geistMono = GeistMono;

export const fontVariables = cn(geistSans.variable, geistMono.variable);
