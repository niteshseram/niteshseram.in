import { cva } from 'class-variance-authority';

export type HeadingColor = 'default' | 'custom';

const headingColorClasses: Record<HeadingColor, string> = {
  default: 'text-foreground',
  custom: '',
};

export const headingCVA = cva('text-pretty', {
  defaultVariants: {
    color: 'default',
  },
  variants: {
    color: headingColorClasses,
  },
});
