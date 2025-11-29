import { cva } from 'class-variance-authority';

export type TextColor = 'default' | 'secondary' | 'inherit';
export type TextSize =
  | 'body0'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'inherit';
export type TextWeight = 'bold' | 'inherit' | 'medium' | 'normal';

const sizeClasses: Record<TextSize, string> = {
  body0: 'text-lg',
  body1: 'text-base',
  body2: 'text-sm',
  body3: 'text-xs',
  body4: 'text-[10px]',
  inherit: '',
};

const weightClasses: Record<TextWeight, string> = {
  bold: 'font-semibold',
  inherit: '',
  medium: 'font-medium',
  normal: 'font-normal',
};

const colorClasses: Record<TextColor, string> = {
  inherit: '',
  default: 'text-foreground',
  secondary: 'text-muted-foreground',
};

export const textVariants = cva('', {
  defaultVariants: {
    color: 'default',
    size: 'inherit',
    weight: 'inherit',
  },
  variants: {
    color: colorClasses,
    size: sizeClasses,
    weight: weightClasses,
  },
});
