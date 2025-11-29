import { cva } from 'class-variance-authority';

import {
  themeOutlineElement_FocusVisible,
  themeOutlineFocusedColor,
} from '@/components/ui/theme';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

export const buttonVariants = cva(
  [
    'cursor-pointer',
    'items-center justify-center',
    'whitespace-nowrap font-medium',
    'rounded-md',
    'transition-colors',
    themeOutlineElement_FocusVisible,
    'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-primary-foreground',
          'bg-primary',
          'hover:bg-primary/90',
          'active:bg-primary/90',
          themeOutlineFocusedColor,
        ],
        secondary: [
          'text-secondary-foreground',
          'bg-secondary',
          'hover:bg-secondary/90',
          'active:bg-secondary/90',
          themeOutlineFocusedColor,
        ],
        tertiary: [
          'text-foreground',
          'bg-transparent',
          'hover:bg-accent',
          'active:bg-accent',
          themeOutlineFocusedColor,
        ],
        unstyled: '',
      },
      size: {
        lg: 'h-10 px-3 py-1.5 gap-x-2 text-sm',
        md: 'h-9 px-2.5 py-1.5 gap-x-1 text-sm',
        sm: 'h-8 px-2 py-1.5 gap-x-1 text-xs',
        xs: 'h-7 px-2 py-1 gap-x-1 text-xs',
      },
      display: {
        block: 'flex w-full',
        inline: 'inline-flex',
      },
      isLabelHidden: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'lg',
        isLabelHidden: true,
        class: 'w-10',
      },
      {
        size: 'md',
        isLabelHidden: true,
        class: 'w-9',
      },
      {
        size: 'sm',
        isLabelHidden: true,
        class: 'w-8',
      },
      {
        size: 'xs',
        isLabelHidden: true,
        class: 'w-7',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      display: 'inline',
      isLabelHidden: false,
    },
  },
);

export const sizeIconClasses: Record<ButtonSize, string> = {
  lg: 'size-5',
  md: 'size-4',
  sm: 'size-4',
  xs: 'size-4',
};
