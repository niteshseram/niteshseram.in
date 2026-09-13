import { cn } from '@/lib/utils';

import styles from './project-doodle.module.css';

export function ProjectDoodle({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('size-10', 'text-muted-foreground', styles.doodle)}
    >
      {name === 'OGCanvas' ? (
        <>
          <path d="M7 11.5 39.5 10.5 40 36.5 7.5 37Z M7.5 17.5 39.5 17" />
          <path d="M11 14h.1m3.4-.1h.1m3.4-.1h.1" strokeWidth="2" />
          <path d="m13 29 6-6 5 4 5-7 6 10" />
          <path
            d="M11 21v-1h3m19-.5h3v3m.2 8v3h-3m-19 .5h-3v-3"
            className={styles.selection}
          />
          <path
            d="m33 32 2 11 2.5-4 4.5-1.5Z"
            fill="var(--background)"
            className={styles.cursor}
          />
        </>
      ) : (
        <>
          <path d="m8 10 13-.5.5 15-13 .5Z" className={styles.tileOne} />
          <path d="m26 9.5 13 .5-.5 10.5-13-.5Z" className={styles.tileTwo} />
          <path d="m8.5 30 13-.5.5 10-13 .5Z" className={styles.tileThree} />
          <path d="m26 25 12.5 1 .5 14-13-.5Z" className={styles.tileFour} />
          <path
            d="m11.5 14 6-.2m12-1 5 .2m-23 20 6-.2m12-4 5 .2"
            opacity=".45"
          />
        </>
      )}
    </svg>
  );
}
