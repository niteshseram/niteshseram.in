import { cva } from 'class-variance-authority';

export type SpinnerVariant = 'primary' | 'secondary' | 'muted' | 'accent';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const spinnerVariants = cva(['animate-spin'], {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
    },
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
