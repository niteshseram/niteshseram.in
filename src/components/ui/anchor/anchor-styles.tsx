import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { themeOutlineFocusedColor } from '../theme';

export type AnchorVariant =
  | 'primary' // Default text color, always underlined
  | 'blend' // Inherit text color, always underlined
  | 'unstyled';
export type AnchorWeight = 'bold' | 'inherit' | 'medium' | 'normal';

const anchorVariantClasses: Record<AnchorVariant, string> = {
  primary: cn(
    'text-foreground',
    'transition-all',
    'decoration-muted-foreground hover:decoration-foreground',
    'underline',
  ),
  blend: cn(
    'transition-all',
    'decoration-muted-foreground hover:decoration-foreground',
    'underline',
  ),
  unstyled: '',
};

const anchorWeightClasses: Record<AnchorWeight, string> = {
  bold: 'font-semibold',
  inherit: '',
  medium: 'font-medium',
  normal: 'font-normal',
};

export const anchorVariants = cva(
  cn(
    'transition-colors underline-offset-[3.5px]',
    'rounded',
    themeOutlineFocusedColor,
    'break-words', // Some links can be really long if the raw URL is used.
  ),
  {
    defaultVariants: {
      variant: 'primary',
      weight: 'medium',
    },
    variants: {
      variant: anchorVariantClasses,
      weight: anchorWeightClasses,
    },
  },
);
