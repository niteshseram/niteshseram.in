import { cn } from '@/lib/utils';

import styles from './offset-margin-note.module.css';

export function OffsetMarginNote() {
  return (
    <aside
      aria-label="A note about offset pagination"
      className={cn(
        'flex flex-wrap items-center gap-4',
        'mt-5',
        'text-sm leading-6',
        'text-muted-foreground',
        styles.note,
      )}
    >
      <svg
        viewBox="0 0 148 116"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn('w-24 shrink-0 overflow-visible', styles.sketch)}
      >
        <text
          x="14"
          y="20"
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-mono)"
          fontSize="13"
        >
          offset = 4
        </text>
        <path d="M101 5C93 1 79 6 82 17C85 29 102 29 106 19C110 10 102 3 93 4" />
        <path d="M95 31C96 38 98 41 97 46m-4-4 4 5 4-5" />
        <path
          d="m15 55 23-1 1 20-24 1Zm31-1 23 1-1 20-23-1Zm30 1 23-1 1 20-24 1Z"
          opacity=".55"
        />
        <path d="m28 89 24-1-1 20-23 1Zm31 0 22 1 1 20-23-1Zm30 0 23-1 1 21-23 1Z" />
        <path d="M105 50 104 111" strokeDasharray="2 4" />
        <path d="M14 96C16 83 30 78 38 82m-5-4 5 4-5 3" />
      </svg>
      <p className={cn('text-sm italic leading-6', styles.caption)}>
        Positions move.
        <br />
        The offset doesn’t.
      </p>
    </aside>
  );
}
