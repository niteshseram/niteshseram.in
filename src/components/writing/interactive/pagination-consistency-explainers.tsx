'use client';

import { Fragment, useState } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ItemOrigin = 'initial' | 'inserted';
type Mutation = 'insert' | 'delete' | null;

type FeedItem = {
  id: string;
  origin: ItemOrigin;
};

type RecordChipProps = {
  anchor?: boolean;
  duplicate?: boolean;
  item: FeedItem;
  missing?: boolean;
};

const PAGE_SIZE = 4;
const INITIAL_ITEMS: FeedItem[] = 'ABCDEFGH'.split('').map((id) => ({
  id,
  origin: 'initial',
}));
const EMPTY_SLOTS = ['empty-1', 'empty-2', 'empty-3', 'empty-4'];

function getServerItems(mutation: Mutation) {
  if (mutation === 'insert') {
    return [{ id: 'N', origin: 'inserted' as const }, ...INITIAL_ITEMS];
  }

  if (mutation === 'delete') {
    return INITIAL_ITEMS.filter((item) => item.id !== 'B');
  }

  return INITIAL_ITEMS;
}

function ExplainerFrame({
  children,
  description,
  eyebrow,
  onReset,
  title,
}: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  onReset: () => void;
  title: string;
}) {
  return (
    <aside
      className={cn(
        'not-prose overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-background',
      )}
    >
      <header
        className={cn(
          'flex items-start justify-between gap-5',
          'px-5 py-5 sm:px-6',
        )}
      >
        <div className={cn('max-w-xl')}>
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              'text-brand',
            )}
          >
            {eyebrow}
          </p>
          <h3
            className={cn(
              'mt-1.5',
              'text-base font-semibold tracking-tight sm:text-lg',
              'text-foreground',
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'mt-1.5',
              'text-sm leading-relaxed',
              'text-muted-foreground',
            )}
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className={cn(
            'shrink-0',
            'px-1 py-1',
            'text-xs font-medium',
            'text-muted-foreground',
            'outline-none',
            'transition-colors',
            'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          Reset
        </button>
      </header>
      {children}
    </aside>
  );
}

function RecordChip({
  anchor = false,
  duplicate = false,
  item,
  missing = false,
}: RecordChipProps) {
  const accessibleDescription = [
    `Record ${item.id}`,
    item.origin === 'inserted' ? 'newly inserted' : null,
    anchor ? 'cursor anchor' : null,
    duplicate ? 'duplicated across pages' : null,
    missing ? 'skipped by page two' : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <span
      aria-label={accessibleDescription}
      className={cn(
        'relative inline-flex size-9 shrink-0 items-center justify-center',
        'rounded-md border',
        'text-sm font-semibold tabular-nums',
        missing
          ? 'border-rose-400/80 bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-200'
          : duplicate
            ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100'
            : anchor
              ? 'border-brand bg-brand/10 text-brand'
              : item.origin === 'inserted'
                ? 'border-brand/40 bg-brand/10 text-brand'
                : 'border-border bg-background text-foreground',
        'transition-colors duration-300',
      )}
    >
      {item.id}
      {item.origin === 'inserted' && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute -right-1.5 -top-1.5 inline-flex size-4 items-center justify-center',
            'rounded-full',
            'text-[9px] font-bold leading-none',
            'bg-brand text-brand-foreground',
          )}
        >
          +
        </span>
      )}
    </span>
  );
}

function BoundaryRule() {
  return (
    <span
      aria-hidden="true"
      className={cn('h-11 w-px shrink-0', 'mx-1', 'bg-brand/80')}
    />
  );
}

function SequenceRow({
  anchorItemId,
  boundaryIndex,
  boundaryLabel,
  duplicateItemIds = [],
  indexItems = false,
  items,
  label,
  missingItemIds = [],
}: {
  anchorItemId?: string;
  boundaryIndex?: number;
  boundaryLabel?: string;
  duplicateItemIds?: string[];
  indexItems?: boolean;
  items: FeedItem[];
  label: string;
  missingItemIds?: string[];
}) {
  return (
    <div>
      <div className={cn('flex items-center justify-between gap-4')}>
        <p className={cn('text-xs font-medium', 'text-muted-foreground')}>
          {label}
        </p>
        {boundaryLabel && (
          <p className={cn('text-xs font-semibold', 'text-brand')}>
            {boundaryLabel}
          </p>
        )}
      </div>
      <div
        className={cn('flex min-h-14 items-start overflow-x-auto', 'mt-3 pb-3')}
      >
        {items.map((item, itemIndex) => (
          <Fragment key={item.id}>
            {boundaryIndex === itemIndex && <BoundaryRule />}
            <div className={cn('flex shrink-0 flex-col items-center gap-1.5')}>
              <RecordChip
                item={item}
                anchor={item.id === anchorItemId}
                duplicate={duplicateItemIds.includes(item.id)}
                missing={missingItemIds.includes(item.id)}
              />
              {indexItems && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'text-[10px] font-medium tabular-nums',
                    'text-muted-foreground',
                  )}
                >
                  {itemIndex}
                </span>
              )}
            </div>
            {itemIndex < items.length - 1 && (
              <span
                aria-hidden="true"
                className={cn('mt-4 h-px w-2 shrink-0 sm:w-3', 'bg-border')}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function EmptyPageSlots() {
  return (
    <div className={cn('flex gap-2')}>
      {EMPTY_SLOTS.map((emptySlot) => (
        <span
          key={emptySlot}
          aria-hidden="true"
          className={cn(
            'size-9',
            'rounded-md border border-dashed',
            'border-border bg-muted/30',
          )}
        />
      ))}
    </div>
  );
}

function PagePair({
  duplicateItemIds = [],
  pageTwo,
}: {
  duplicateItemIds?: string[];
  pageTwo: FeedItem[] | null;
}) {
  return (
    <div className={cn('grid gap-3')}>
      <div className={cn('flex items-center gap-3')}>
        <span
          className={cn(
            'w-12 shrink-0',
            'text-xs font-medium tabular-nums',
            'text-muted-foreground',
          )}
        >
          Page 1
        </span>
        <div className={cn('flex gap-2')}>
          {INITIAL_ITEMS.slice(0, PAGE_SIZE).map((item) => (
            <RecordChip
              key={item.id}
              item={item}
              duplicate={duplicateItemIds.includes(item.id)}
            />
          ))}
        </div>
      </div>
      <div className={cn('flex items-center gap-3')}>
        <span
          className={cn(
            'w-12 shrink-0',
            'text-xs font-medium tabular-nums',
            'text-muted-foreground',
          )}
        >
          Page 2
        </span>
        {pageTwo ? (
          <div className={cn('flex gap-2')}>
            {pageTwo.map((item) => (
              <RecordChip
                key={item.id}
                item={item}
                duplicate={duplicateItemIds.includes(item.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyPageSlots />
        )}
      </div>
    </div>
  );
}

function MutationControls({
  mutation,
  onChange,
}: {
  mutation: Mutation;
  onChange: (mutation: Exclude<Mutation, null>) => void;
}) {
  return (
    <div>
      <p className={cn('text-xs font-medium', 'text-muted-foreground')}>
        Change the collection before page 2
      </p>
      <div className={cn('flex flex-wrap gap-2', 'mt-3')}>
        <button
          type="button"
          aria-pressed={mutation === 'insert'}
          onClick={() => onChange('insert')}
          className={cn(
            'inline-flex min-h-10 items-center justify-center',
            'px-4 py-2',
            'rounded-md border',
            'text-sm font-semibold',
            mutation === 'insert'
              ? 'border-brand bg-brand text-brand-foreground'
              : 'border-border bg-background text-foreground',
            'outline-none',
            'transition-colors',
            'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          Insert N before A
        </button>
        <button
          type="button"
          aria-pressed={mutation === 'delete'}
          onClick={() => onChange('delete')}
          className={cn(
            'inline-flex min-h-10 items-center justify-center',
            'px-4 py-2',
            'rounded-md border',
            'text-sm font-semibold',
            mutation === 'delete'
              ? 'border-brand bg-brand text-brand-foreground'
              : 'border-border bg-background text-foreground',
            'outline-none',
            'transition-colors',
            'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          Delete B
        </button>
      </div>
    </div>
  );
}

function ResultMessage({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div
      aria-live="polite"
      className={cn(
        'px-5 py-4 sm:px-6',
        'border-t',
        'border-border bg-muted/20',
      )}
    >
      <p
        className={cn(
          'text-xs font-semibold uppercase tracking-wide',
          'text-brand',
        )}
      >
        What changed
      </p>
      <p className={cn('mt-1.5', 'text-sm font-semibold', 'text-foreground')}>
        {title}
      </p>
      <p
        className={cn(
          'mt-1',
          'text-sm leading-relaxed',
          'text-muted-foreground',
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function OffsetBoundaryDemo() {
  const [mutation, setMutation] = useState<Mutation>(null);
  const serverItems = getServerItems(mutation);
  const pageTwo =
    mutation === null ? null : serverItems.slice(PAGE_SIZE, PAGE_SIZE * 2);
  const duplicateItemIds = mutation === 'insert' ? ['D'] : [];
  const missingItemIds = mutation === 'delete' ? ['E'] : [];

  return (
    <ExplainerFrame
      eyebrow="Offset in motion"
      title="Offset remembers a position"
      description="Page 1 is already in the browser. Change the collection, then watch what still lives at position 4."
      onReset={() => setMutation(null)}
    >
      <div
        className={cn(
          'grid gap-6 md:grid-cols-[1fr_auto_1fr]',
          'px-5 py-5 sm:px-6',
        )}
      >
        <div className={cn('min-w-0')}>
          <SequenceRow
            label="Server order now"
            items={serverItems}
            indexItems
            boundaryIndex={PAGE_SIZE}
            boundaryLabel="offset 4"
            duplicateItemIds={duplicateItemIds}
            missingItemIds={missingItemIds}
          />
        </div>
        <div className={cn('hidden w-px md:block', 'bg-border')} />
        <div className={cn('min-w-0')}>
          <p
            className={cn(
              'mb-3',
              'text-xs font-medium',
              'text-muted-foreground',
            )}
          >
            Browser history
          </p>
          <PagePair pageTwo={pageTwo} duplicateItemIds={duplicateItemIds} />
        </div>
      </div>
      <div className={cn('px-5 pb-5 sm:px-6')}>
        <MutationControls mutation={mutation} onChange={setMutation} />
      </div>
      {mutation === null ? (
        <ResultMessage title="The boundary is currently safe">
          Nothing has moved yet. Offset 4 begins at E, immediately after page 1.
        </ResultMessage>
      ) : mutation === 'insert' ? (
        <ResultMessage title="D is returned twice">
          N pushed D from index 3 to index 4. The number stayed fixed while the
          record at that number changed.
        </ResultMessage>
      ) : (
        <ResultMessage title="E disappears from the traversal">
          Deleting B pulled E back to index 3. Offset 4 now begins at F, so page
          2 steps over E.
        </ResultMessage>
      )}
    </ExplainerFrame>
  );
}

export function CursorBoundaryDemo() {
  const [mutation, setMutation] = useState<Mutation>(null);
  const serverItems = getServerItems(mutation);
  const cursorAnchorIndex = serverItems.findIndex((item) => item.id === 'D');
  const pageTwo =
    mutation === null ? null : INITIAL_ITEMS.slice(PAGE_SIZE, PAGE_SIZE * 2);

  return (
    <ExplainerFrame
      eyebrow="Cursor in motion"
      title="A cursor remembers the boundary"
      description="The client keeps D's ordered value. Move records before it and the next query still starts after D."
      onReset={() => setMutation(null)}
    >
      <div
        className={cn(
          'grid gap-6 md:grid-cols-[1fr_auto_1fr]',
          'px-5 py-5 sm:px-6',
        )}
      >
        <div className={cn('min-w-0')}>
          <SequenceRow
            label="Live server order"
            items={serverItems}
            anchorItemId="D"
            boundaryIndex={cursorAnchorIndex + 1}
            boundaryLabel="after D"
          />
        </div>
        <div className={cn('hidden w-px md:block', 'bg-border')} />
        <div className={cn('min-w-0')}>
          <p
            className={cn(
              'mb-3',
              'text-xs font-medium',
              'text-muted-foreground',
            )}
          >
            Browser history
          </p>
          <PagePair pageTwo={pageTwo} />
        </div>
      </div>
      <div className={cn('px-5 pb-5 sm:px-6')}>
        <MutationControls mutation={mutation} onChange={setMutation} />
      </div>
      {mutation === null ? (
        <ResultMessage title="The next request is anchored to D">
          Choose a mutation. Unlike offset 4, the phrase “after D” keeps its
          meaning when earlier records move.
        </ResultMessage>
      ) : (
        <ResultMessage title="Page 2 still begins at E">
          {mutation === 'insert'
            ? 'N changed the positions before D, but it did not change which records sort after D.'
            : 'B disappeared above the boundary, but the cursor still describes the same place in the ordered feed.'}
        </ResultMessage>
      )}
    </ExplainerFrame>
  );
}

export function SnapshotSessionDemo() {
  const [mutation, setMutation] = useState<Mutation>(null);
  const liveItems = getServerItems(mutation);
  const pageTwo =
    mutation === null ? null : INITIAL_ITEMS.slice(PAGE_SIZE, PAGE_SIZE * 2);

  return (
    <ExplainerFrame
      eyebrow="Snapshot in motion"
      title="A snapshot remembers the view"
      description="Page 1 captured view v1. Change the live collection and compare it with the version used for the rest of the traversal."
      onReset={() => setMutation(null)}
    >
      <div className={cn('grid gap-5', 'px-5 py-5 sm:px-6')}>
        <SequenceRow label="Live collection now" items={liveItems} />
        <SequenceRow
          label="Pinned snapshot"
          items={INITIAL_ITEMS}
          boundaryIndex={PAGE_SIZE}
          boundaryLabel="view v1 · after D"
          anchorItemId="D"
        />
      </div>
      <div
        className={cn(
          'grid gap-5 md:grid-cols-[1fr_auto_1fr]',
          'px-5 pb-5 sm:px-6',
        )}
      >
        <MutationControls mutation={mutation} onChange={setMutation} />
        <div className={cn('hidden w-px md:block', 'bg-border')} />
        <div>
          <p
            className={cn(
              'mb-3',
              'text-xs font-medium',
              'text-muted-foreground',
            )}
          >
            Pages from view v1
          </p>
          <PagePair pageTwo={pageTwo} />
        </div>
      </div>
      {mutation === null ? (
        <ResultMessage title="The live collection and snapshot still match">
          Choose a mutation to make the two views diverge. Page 2 will continue
          through the pinned version.
        </ResultMessage>
      ) : (
        <ResultMessage title="The live feed changed; view v1 did not">
          Page 2 reads E–H from the captured view. The snapshot trades some
          freshness for a stable traversal.
        </ResultMessage>
      )}
    </ExplainerFrame>
  );
}
