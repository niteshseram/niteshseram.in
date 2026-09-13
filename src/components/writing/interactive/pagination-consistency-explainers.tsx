'use client';

import { RotateCcw } from 'lucide';
import { useId, useState } from 'react';

import { AnnotationCircle } from '@/components/illustrations/annotation-circle';
import { OffsetMarginNote } from '@/components/illustrations/offset-margin-note';
import { IconButton } from '@/components/ui/icon-button';
import { SiteIcon } from '@/components/ui/site-icon';
import { cn } from '@/lib/utils';

import styles from './pagination-consistency-explainers.module.css';

type Strategy = 'offset' | 'cursor' | 'snapshot';
type Mutation = 'insert' | 'delete' | null;

const INITIAL_ITEMS = 'ABCDEFGH'.split('');
const ALL_ITEMS = ['N', ...INITIAL_ITEMS];
const PAGE_SIZE = 4;
const SLOT_WIDTH = 42;
const strategies = {
  offset: {
    title: 'Offset remembers a position',
    description:
      'Change the collection. Then request the next four records, starting at offset 4.',
  },
  cursor: {
    title: 'A cursor remembers the boundary',
    description:
      'Change the collection. Then request the next four records after D.',
  },
  snapshot: {
    title: 'A snapshot remembers the view',
    description:
      'Change the live collection. Then read page two from the captured view, v1.',
  },
} as const;

function getServerItems(mutation: Mutation) {
  if (mutation === 'insert') return ['N', ...INITIAL_ITEMS];
  if (mutation === 'delete')
    return INITIAL_ITEMS.filter((item) => item !== 'B');
  return INITIAL_ITEMS;
}

function RecordChip({
  record,
  highlighted = false,
  anchor = false,
  empty = false,
  missing = false,
}: {
  record: string;
  highlighted?: boolean;
  anchor?: boolean;
  empty?: boolean;
  missing?: boolean;
}) {
  return (
    <span
      role={empty ? undefined : 'img'}
      aria-label={
        empty
          ? undefined
          : `Record ${record}${highlighted ? ', duplicated across pages' : ''}${missing ? ', skipped by page two' : ''}${anchor ? ', cursor anchor' : ''}${record === 'N' ? ', newly inserted' : ''}`
      }
      aria-hidden={empty || undefined}
      data-record={empty ? undefined : record}
      className={cn(
        'relative inline-flex size-8 shrink-0 items-center justify-center',
        'rounded-md border',
        empty && 'border-dashed',
        'text-sm font-medium',
        highlighted
          ? 'border-amber-600/60 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200'
          : anchor
            ? 'border-foreground/45 bg-muted text-foreground'
            : 'border-border bg-background text-foreground',
        'transition-colors duration-300 motion-reduce:transition-none',
      )}
    >
      {empty ? <span className="text-muted-foreground">·</span> : record}
      {(highlighted || missing) && !empty && <AnnotationCircle />}
      {record === 'N' && !empty && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute -top-1 -right-1 size-2',
            'rounded-full',
            'bg-foreground',
          )}
        />
      )}
    </span>
  );
}

function RecordTrack({
  items,
  label,
  boundaryIndex,
  boundaryLabel,
  anchor,
  duplicate,
  missing,
}: {
  items: string[];
  label: string;
  boundaryIndex?: number;
  boundaryLabel?: string;
  anchor?: boolean;
  duplicate?: string;
  missing?: string;
}) {
  return (
    <div>
      <p className={cn('text-xs leading-5', 'text-muted-foreground')}>
        {label}
      </p>
      <div
        role="region"
        aria-label={`${label}, records in order`}
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The record strip needs keyboard access for horizontal scrolling.
        tabIndex={0}
        className={cn(
          'overflow-x-auto',
          'mt-2',
          'rounded-sm',
          styles.scroll,
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        )}
      >
        <div className={cn('relative h-25 w-98')}>
          <ol
            aria-label={label}
            className={cn('relative h-10', 'm-0 p-0', 'list-none')}
          >
            {ALL_ITEMS.map((record) => {
              const itemIndex = items.indexOf(record);
              const hidden = itemIndex === -1;
              const position = hidden
                ? Math.max(0, INITIAL_ITEMS.indexOf(record))
                : itemIndex;
              return (
                <li
                  key={record}
                  aria-hidden={hidden || undefined}
                  data-hidden={hidden}
                  data-missing={record === missing}
                  className={cn('absolute top-1 left-0', styles.record)}
                  style={{
                    transform: `translateX(${position * SLOT_WIDTH}px)`,
                  }}
                >
                  <RecordChip
                    record={record}
                    anchor={anchor && record === 'D'}
                    highlighted={record === duplicate}
                    missing={record === missing}
                  />
                </li>
              );
            })}
          </ol>
          <div
            aria-hidden="true"
            className={cn(
              'flex',
              'text-[10px] leading-4 tabular-nums',
              'text-muted-foreground',
            )}
          >
            {ALL_ITEMS.map((record, index) => (
              <span key={record} className={cn('w-10.5 shrink-0', 'pl-3')}>
                {index}
              </span>
            ))}
          </div>
          {boundaryIndex !== undefined && (
            <div
              aria-hidden="true"
              className={cn('absolute top-0 left-0 h-17', styles.boundary)}
              style={{
                transform: `translateX(${boundaryIndex * SLOT_WIDTH - 5}px)`,
              }}
            >
              <span
                className={cn(
                  'absolute top-0 left-0 h-10 w-px',
                  'bg-foreground/55',
                )}
              />
              <span
                className={cn(
                  'absolute top-15 -left-1 w-36',
                  'text-xs leading-5',
                  'text-muted-foreground',
                )}
              >
                <svg
                  viewBox="0 0 22 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                  className={cn('absolute -top-4 left-0 h-4 w-6')}
                >
                  <path
                    d="M19 16C8 17 5 12 5 3m-3 4 3-4 4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {boundaryLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PageRow({
  label,
  items,
  duplicate,
}: {
  label: string;
  items: string[] | null;
  duplicate?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2')}>
      <span
        className={cn(
          'w-12 shrink-0',
          'text-xs leading-5',
          'text-muted-foreground',
        )}
      >
        {label}
      </span>
      <div
        className={cn('flex gap-2')}
        aria-label={`${label}: ${items ? items.join(', ') : 'not requested'}`}
      >
        {Array.from({ length: PAGE_SIZE }, (_, index) => {
          const record = items?.[index];
          return (
            <RecordChip
              key={index}
              record={record ?? ''}
              empty={!record}
              highlighted={record !== undefined && record === duplicate}
            />
          );
        })}
      </div>
    </div>
  );
}

function getExplanation(
  strategy: Strategy,
  mutation: Mutation,
  fetched: boolean,
) {
  if (mutation === null)
    return {
      title: 'Page one is already in your browser.',
      detail:
        'Insert a new record or delete B to change the collection before the next request.',
    };
  if (!fetched)
    return {
      title:
        mutation === 'insert'
          ? 'N arrived. The existing records moved right.'
          : 'B was deleted. The remaining records moved left.',
      detail:
        strategy === 'offset'
          ? 'The boundary stays at position 4. Fetch page two to see which records it returns.'
          : strategy === 'cursor'
            ? 'The boundary follows D. Fetch page two to see what comes after it.'
            : 'The live order changed, but the pinned view did not. Fetch page two from v1.',
    };
  if (strategy === 'offset')
    return mutation === 'insert'
      ? {
          title: 'D is returned twice.',
          detail:
            'D moved from position 3 to 4. Page one already contains it, and offset 4 returns it again.',
        }
      : {
          title: 'E is skipped.',
          detail:
            'E moved back to position 3. Page two starts at F, so E appears in neither page.',
        };
  if (strategy === 'cursor')
    return {
      title: 'Page two still starts at E.',
      detail:
        'The positions changed; the ordering after D did not. The cursor continues from the same record.',
    };
  return {
    title: 'Page two reads E–H from view v1.',
    detail:
      'The snapshot keeps the original collection for this traversal, trading freshness for a stable view.',
  };
}

function PaginationDemo({ strategy }: { strategy: Strategy }) {
  const headingId = useId();
  const [mutation, setMutation] = useState<Mutation>(null);
  const [fetched, setFetched] = useState(false);
  const items = getServerItems(mutation);
  const cursorIndex = items.indexOf('D') + 1;
  const pageTwo = !fetched
    ? null
    : strategy === 'offset'
      ? items.slice(PAGE_SIZE, PAGE_SIZE * 2)
      : strategy === 'cursor'
        ? items.slice(cursorIndex, cursorIndex + PAGE_SIZE)
        : INITIAL_ITEMS.slice(PAGE_SIZE);
  const duplicate =
    fetched && strategy === 'offset' && mutation === 'insert' ? 'D' : undefined;
  const missing =
    fetched && strategy === 'offset' && mutation === 'delete' ? 'E' : undefined;
  const explanation = getExplanation(strategy, mutation, fetched);
  const explanationSizes = [
    getExplanation(strategy, null, false),
    getExplanation(strategy, 'insert', false),
    getExplanation(strategy, 'delete', false),
    getExplanation(strategy, 'insert', true),
    getExplanation(strategy, 'delete', true),
  ];

  function changeCollection(nextMutation: Exclude<Mutation, null>) {
    setMutation(nextMutation);
    setFetched(false);
  }
  function reset() {
    setMutation(null);
    setFetched(false);
  }

  return (
    <div className={cn('relative @container', 'my-10')}>
      <figure
        aria-labelledby={headingId}
        data-pagination={strategy}
        className={cn(
          'not-prose overflow-hidden',
          'rounded-lg border',
          'border-divider bg-surface/50',
        )}
      >
        <header
          className={cn(
            'flex items-start justify-between gap-3',
            'px-4 pt-4 sm:px-5 sm:pt-5',
          )}
        >
          <div>
            <h3
              id={headingId}
              className={cn('text-sm font-medium leading-6', 'text-foreground')}
            >
              {strategies[strategy].title}
            </h3>
            <p
              className={cn(
                'mt-1',
                'text-sm leading-6',
                'text-muted-foreground',
              )}
            >
              {strategies[strategy].description}
            </p>
          </div>
          <IconButton
            label="Reset demo"
            size="sm"
            icon={<SiteIcon icon={RotateCcw} />}
            onClick={reset}
          />
        </header>
        <div className={cn('space-y-3', 'px-4 pt-5 sm:px-5')}>
          <RecordTrack
            items={items}
            label={strategy === 'snapshot' ? 'Live collection' : 'Server order'}
            boundaryIndex={
              strategy === 'snapshot'
                ? undefined
                : strategy === 'cursor'
                  ? cursorIndex
                  : PAGE_SIZE
            }
            boundaryLabel={
              strategy === 'offset' ? 'always offset 4' : 'always after D'
            }
            anchor={strategy === 'cursor'}
            duplicate={duplicate}
            missing={missing}
          />
          {strategy === 'snapshot' && (
            <RecordTrack
              items={INITIAL_ITEMS}
              label="Pinned view · v1"
              boundaryIndex={PAGE_SIZE}
              boundaryLabel="view v1 · after D"
              anchor
            />
          )}
          <p
            className={cn(
              'sm:hidden',
              'text-xs leading-5',
              'text-muted-foreground',
            )}
          >
            Swipe the record strip to see the full order.
          </p>
          <div
            className={cn('space-y-2', 'py-4', 'border-t', 'border-divider')}
          >
            <PageRow
              label="Page 1"
              items={INITIAL_ITEMS.slice(0, PAGE_SIZE)}
              duplicate={duplicate}
            />
            <PageRow label="Page 2" items={pageTwo} duplicate={duplicate} />
          </div>
        </div>
        <div
          className={cn(
            'flex flex-wrap items-center gap-2',
            'px-4 pb-4 sm:px-5',
          )}
        >
          {(['insert', 'delete'] as const).map((action) => (
            <button
              key={action}
              type="button"
              aria-pressed={mutation === action}
              onClick={() => changeCollection(action)}
              className={cn(
                'inline-flex min-h-11 items-center justify-center',
                'px-3 py-2',
                'rounded-md border',
                'text-xs font-medium',
                mutation === action
                  ? 'border-foreground/40 bg-muted text-foreground'
                  : 'border-border bg-background text-muted-foreground',
                'cursor-pointer',
                'transition-colors duration-200 motion-reduce:transition-none',
                'hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              )}
            >
              {action === 'insert' ? 'Insert N' : 'Delete B'}
            </button>
          ))}
          <button
            type="button"
            disabled={mutation === null || fetched}
            onClick={() => setFetched(true)}
            className={cn(
              'inline-flex min-h-11 items-center justify-center',
              'px-3 py-2',
              'rounded-md border',
              'text-xs font-medium',
              'border-foreground/40 bg-background text-foreground',
              'cursor-pointer',
              'transition-colors duration-200 motion-reduce:transition-none',
              'hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-40',
            )}
          >
            Fetch page 2{' '}
            <span aria-hidden="true" className="ml-1.5">
              →
            </span>
          </button>
        </div>
        <figcaption
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            'grid min-h-32',
            'px-4 py-4 sm:px-5',
            'border-t',
            'text-sm leading-6',
            'border-divider',
          )}
        >
          {explanationSizes.map((size, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={cn('invisible col-start-1 row-start-1')}
            >
              <p className="font-medium">{size.title}</p>
              <p className="mt-1">{size.detail}</p>
            </div>
          ))}
          <div className={cn('col-start-1 row-start-1')}>
            <p className={cn('font-medium', 'text-foreground')}>
              {explanation.title}
            </p>
            <p className={cn('mt-1', 'text-muted-foreground')}>
              {explanation.detail}
            </p>
          </div>
        </figcaption>
      </figure>
      {strategy === 'offset' && <OffsetMarginNote />}
    </div>
  );
}

export function OffsetBoundaryDemo() {
  return <PaginationDemo strategy="offset" />;
}
export function CursorBoundaryDemo() {
  return <PaginationDemo strategy="cursor" />;
}
export function SnapshotSessionDemo() {
  return <PaginationDemo strategy="snapshot" />;
}
