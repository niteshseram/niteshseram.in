'use client';

import { MorphIcon } from 'morphicons/react';
import type { ComponentProps } from 'react';

export function SiteIcon(props: ComponentProps<typeof MorphIcon>) {
  return (
    <MorphIcon
      aria-hidden="true"
      size={16}
      strokeWidth={1.5}
      reducedMotion="user"
      spring="snappy"
      {...props}
    />
  );
}
