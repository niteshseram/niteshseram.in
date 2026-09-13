import { cn } from '@/lib/utils';

import styles from './annotation-circle.module.css';

export function AnnotationCircle() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      aria-hidden="true"
      data-doodle="circle"
      className={cn(
        'absolute -inset-1.5 size-11',
        'text-foreground-secondary',
        'pointer-events-none',
      )}
    >
      <path
        d="M32 5C22 1 7 5 4 17C0 29 9 40 22 40C35 41 42 30 40 18C38 7 28 2 17 5C12 6 8 8 6 12"
        pathLength="1"
        className={styles.stroke}
      />
    </svg>
  );
}
