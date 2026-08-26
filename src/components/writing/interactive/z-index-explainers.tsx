'use client';

import type { ChangeEvent, ReactNode, RefObject } from 'react';
import { useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';

import { cn } from '@/lib/utils';

import './z-index-explainers.css';

function ExplainerHeader({
  eyebrow,
  title,
  titleId,
  trailing,
}: Readonly<{
  eyebrow: string;
  title: string;
  titleId?: string;
  trailing?: ReactNode;
}>) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4',
        'px-4 py-3.5 sm:px-5',
        'border-b',
        'border-border bg-background',
      )}
    >
      <div className={cn('min-w-0')}>
        <p
          className={cn(
            'm-0',
            'font-mono text-[10px] font-medium uppercase tracking-[0.14em]',
            'text-brand',
          )}
        >
          {eyebrow}
        </p>
        <h3
          id={titleId}
          className={cn(
            'm-0 mt-1',
            'text-sm font-semibold tracking-[-0.015em]',
            'text-foreground',
          )}
        >
          {title}
        </h3>
      </div>
      {trailing}
    </div>
  );
}

function ScopeButton({
  isSelected,
  label,
  onClick,
}: Readonly<{
  isSelected: boolean;
  label: string;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={cn(
        'relative min-h-9 after:absolute after:inset-x-0 after:bottom-0 after:h-px',
        'px-1 py-2',
        'text-xs font-medium',
        isSelected
          ? 'text-foreground after:bg-brand'
          : 'text-muted-foreground after:bg-transparent',
        'cursor-pointer',
        'transition-colors after:transition-colors',
        'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      {label}
    </button>
  );
}

const stackingContextLabels = {
  card: 'Card context',
  cardLevel: 'stack level: 0',
  document: 'document',
  header: 'Header',
  headerLevel: 'z-index: 10',
  modal: 'Modal',
  modalLevel: 'z-index: 9999',
  root: 'ROOT',
} as const;

export function StackingContextMap() {
  const [activeScope, setActiveScope] = useState<'card' | 'root'>('root');
  const isRootActive = activeScope === 'root';

  return (
    <figure
      aria-labelledby="stacking-context-map-title"
      className={cn(
        'overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-surface',
      )}
    >
      <ExplainerHeader
        eyebrow="Context map"
        title="The browser resolves one scope at a time"
        titleId="stacking-context-map-title"
        trailing={
          <div className={cn('flex shrink-0 items-center gap-3')}>
            <ScopeButton
              isSelected={isRootActive}
              label="Root"
              onClick={() => setActiveScope('root')}
            />
            <ScopeButton
              isSelected={!isRootActive}
              label="Inside card"
              onClick={() => setActiveScope('card')}
            />
          </div>
        }
      />

      <div className={cn('px-3 py-4 sm:px-5')}>
        <div className={cn('grid gap-3 sm:hidden')}>
          <div
            className={cn(
              'flex w-fit flex-col',
              'px-3 py-2',
              isRootActive
                ? 'rounded-md border-2 opacity-100'
                : 'rounded-md border-2 opacity-45',
              'font-mono text-[11px] font-semibold',
              'border-brand bg-background text-foreground',
              'transition-opacity duration-300 motion-reduce:transition-none',
            )}
          >
            <span>{stackingContextLabels.root}</span>
            <span
              className={cn(
                'mt-0.5',
                'text-[10px] font-normal',
                'text-muted-foreground',
              )}
            >
              {stackingContextLabels.document}
            </span>
          </div>
          <div
            className={cn(
              'grid gap-3',
              'ml-4 pl-4',
              'border-l-2',
              'border-border',
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between gap-3',
                'px-3 py-2',
                isRootActive
                  ? 'rounded-md border-2 opacity-100'
                  : 'rounded-md border opacity-45',
                'text-xs',
                'border-brand bg-background text-foreground',
                'transition-opacity duration-300 motion-reduce:transition-none',
              )}
            >
              <span className={cn('font-medium')}>
                {stackingContextLabels.header}
              </span>
              <span
                className={cn('font-mono text-[10px]', 'text-muted-foreground')}
              >
                {stackingContextLabels.headerLevel}
              </span>
            </div>
            <div className={cn('grid gap-2')}>
              <div
                className={cn(
                  'flex items-center justify-between gap-3',
                  'px-3 py-2',
                  isRootActive
                    ? 'rounded-md border-2 opacity-100'
                    : 'rounded-md border opacity-55',
                  'text-xs',
                  isRootActive
                    ? 'border-brand bg-background text-foreground'
                    : 'border-border bg-background text-foreground',
                  'transition-[border-color,opacity] duration-300 motion-reduce:transition-none',
                )}
              >
                <span className={cn('font-medium')}>
                  {stackingContextLabels.card}
                </span>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    'text-muted-foreground',
                  )}
                >
                  {stackingContextLabels.cardLevel}
                </span>
              </div>
              <div
                className={cn(
                  'ml-3 pl-3',
                  'border-l border-dashed',
                  'border-border',
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-between gap-3',
                    'px-3 py-2',
                    isRootActive
                      ? 'rounded-md border opacity-35'
                      : 'rounded-md border-2 opacity-100',
                    'text-xs',
                    'border-brand bg-brand-muted text-foreground',
                    'transition-[border-width,opacity] duration-300 motion-reduce:transition-none',
                  )}
                >
                  <span className={cn('font-medium')}>
                    {stackingContextLabels.modal}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px]',
                      'text-muted-foreground',
                    )}
                  >
                    {stackingContextLabels.modalLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          aria-labelledby="stacking-context-map-svg-title stacking-context-map-description"
          className={cn('hidden h-auto w-full sm:block')}
          role="img"
          viewBox="0 0 560 190"
        >
          <title id="stacking-context-map-svg-title">
            Nested stacking-context hierarchy
          </title>
          <desc id="stacking-context-map-description">
            The root compares the header with the card. Only inside the card is
            the modal compared with other card content.
          </desc>

          <path
            d="M 112 95 H 178 V 48 H 230"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M 178 95 V 142 H 230"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M 354 142 H 424"
            fill="none"
            stroke="var(--border)"
            strokeDasharray="4 5"
            strokeWidth="2"
          />

          <g
            className={cn(
              isRootActive ? 'opacity-100' : 'opacity-45',
              'transition-opacity duration-300 motion-reduce:transition-none',
            )}
          >
            <rect
              x="16"
              y="69"
              width="96"
              height="52"
              rx="8"
              fill="var(--background)"
              stroke="var(--brand)"
              strokeWidth="2"
            />
            <text
              x="64"
              y="91"
              fill="var(--foreground)"
              fontFamily="var(--font-mono)"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
            >
              {stackingContextLabels.root}
            </text>
            <text
              x="64"
              y="107"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="10"
              textAnchor="middle"
            >
              {stackingContextLabels.document}
            </text>

            <rect
              x="230"
              y="23"
              width="124"
              height="50"
              rx="8"
              fill="var(--background)"
              stroke="var(--brand)"
              strokeWidth={isRootActive ? 2 : 1}
            />
            <text
              x="244"
              y="44"
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fontWeight="600"
            >
              {stackingContextLabels.header}
            </text>
            <text
              x="244"
              y="60"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {stackingContextLabels.headerLevel}
            </text>
          </g>

          <g
            className={cn(
              isRootActive ? 'opacity-100' : 'opacity-55',
              'transition-opacity duration-300 motion-reduce:transition-none',
            )}
          >
            <rect
              x="230"
              y="117"
              width="124"
              height="50"
              rx="8"
              fill="var(--background)"
              stroke={isRootActive ? 'var(--brand)' : 'var(--border)'}
              strokeWidth={isRootActive ? 2 : 1}
            />
            <text
              x="244"
              y="138"
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fontWeight="600"
            >
              {stackingContextLabels.card}
            </text>
            <text
              x="244"
              y="154"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {stackingContextLabels.cardLevel}
            </text>
          </g>

          <g
            className={cn(
              isRootActive ? 'opacity-35' : 'opacity-100',
              'transition-opacity duration-300 motion-reduce:transition-none',
            )}
          >
            <rect
              x="424"
              y="117"
              width="120"
              height="50"
              rx="8"
              fill="var(--brand-muted)"
              stroke="var(--brand)"
              strokeWidth={isRootActive ? 1 : 2}
            />
            <text
              x="438"
              y="138"
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fontWeight="600"
            >
              {stackingContextLabels.modal}
            </text>
            <text
              x="438"
              y="154"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {stackingContextLabels.modalLevel}
            </text>
          </g>
        </svg>
      </div>

      <figcaption
        aria-live="polite"
        className={cn(
          'px-4 py-3 sm:px-5',
          'border-t',
          'text-xs leading-5',
          'border-border bg-code/65 text-muted-foreground',
        )}
      >
        {isRootActive
          ? 'At the root, the browser compares header 10 with the transformed card at stack level 0. The header wins.'
          : 'Inside the card, modal 9999 wins—but that result cannot escape the card context.'}
      </figcaption>
    </figure>
  );
}

export function ZIndexEscalation() {
  const [exponent, setExponent] = useState(4);
  const modalZIndex = 10 ** exponent - 1;

  function handleExponentChange(event: ChangeEvent<HTMLInputElement>) {
    setExponent(Number(event.target.value));
  }

  return (
    <figure
      aria-labelledby="z-index-escalation-title"
      className={cn(
        'overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-surface',
      )}
    >
      <ExplainerHeader
        eyebrow="Try the instinctive fix"
        title="Add another 9"
        titleId="z-index-escalation-title"
        trailing={
          <output
            className={cn(
              'shrink-0',
              'font-mono text-xs font-medium tabular-nums',
              'text-brand',
            )}
          >
            z-index: {modalZIndex}
          </output>
        }
      />

      <div
        className={cn('relative isolate h-56 overflow-hidden', 'bg-background')}
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--border) 34%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 34%, transparent) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: 'translateZ(0)',
        }}
      >
        <div
          className={cn(
            'sticky top-4 z-10 flex h-12 items-center justify-between',
            'mx-4 px-3',
            'rounded-md border',
            'font-mono text-[10px]',
            'border-border bg-foreground text-background',
          )}
        >
          <span>Sticky header</span>
          <span>10</span>
        </div>

        <div
          className={cn(
            'absolute inset-x-8 top-24 h-32',
            'p-3',
            'rounded-lg border',
            'border-border bg-surface',
          )}
          style={{ transform: 'translateY(0)' }}
        >
          <p className={cn('m-0', 'text-xs font-semibold', 'text-foreground')}>
            Transformed card
          </p>
          <p
            className={cn(
              'm-0 mt-1',
              'font-mono text-[9px]',
              'text-muted-foreground',
            )}
          >
            root stack level: 0
          </p>
          <div
            className={cn(
              'fixed -top-14 right-3 w-[min(15rem,calc(100%-1.5rem))]',
              'px-3 py-2.5',
              'rounded-md border shadow-lg',
              'text-xs font-medium',
              'border-brand/40 bg-popover text-popover-foreground',
            )}
            style={{ zIndex: modalZIndex }}
          >
            Modal · fixed · {modalZIndex}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'grid gap-2',
          'px-4 py-4 sm:px-5',
          'border-t',
          'border-border bg-background',
        )}
      >
        <div className={cn('flex items-center justify-between gap-4')}>
          <label
            htmlFor="z-index-exponent"
            className={cn('text-xs font-medium', 'text-foreground')}
          >
            Modal value
          </label>
          <span className={cn('text-xs', 'text-muted-foreground')}>
            Header still wins
          </span>
        </div>
        <input
          id="z-index-exponent"
          type="range"
          min="4"
          max="7"
          step="1"
          value={exponent}
          onChange={handleExponentChange}
          aria-valuetext={`z-index ${modalZIndex}`}
          className={cn('w-full', 'accent-brand', 'cursor-pointer')}
        />
      </div>
    </figure>
  );
}

function PortalModal({ isAtRoot }: Readonly<{ isAtRoot: boolean }>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        isAtRoot
          ? 'fixed right-4 top-8 z-[300] w-[min(16rem,calc(100%-2rem))]'
          : 'fixed -top-14 right-3 z-[9999] w-[min(16rem,calc(100%-1.5rem))]',
        'px-3 py-3',
        'rounded-md border shadow-lg',
        'border-brand/40 bg-popover text-popover-foreground',
      )}
      style={{ viewTransitionName: 'portal-modal' }}
    >
      <div className={cn('flex items-center justify-between gap-3')}>
        <span className={cn('text-xs font-semibold')}>Account settings</span>
        <span className={cn('font-mono text-[9px]', 'text-muted-foreground')}>
          {isAtRoot ? 'lab root · fixed · 300' : 'card · fixed · 9999'}
        </span>
      </div>
      <div className={cn('mt-3 h-2', 'rounded-full', 'bg-muted')} />
    </div>
  );
}

export function PortalEscapeDemo() {
  const [isPortaled, setIsPortaled] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);

  function handlePortalToggle() {
    function commitPortalState() {
      flushSync(() => {
        setIsPortaled((currentValue) => !currentValue);
      });
    }

    if (
      typeof document.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      commitPortalState();
      return;
    }

    document.startViewTransition(commitPortalState);
  }

  return (
    <figure
      aria-labelledby="portal-escape-title"
      className={cn(
        'overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-surface',
      )}
    >
      <ExplainerHeader
        eyebrow="DOM placement"
        title="Move the modal, not its number"
        titleId="portal-escape-title"
        trailing={
          <button
            type="button"
            aria-pressed={isPortaled}
            onClick={handlePortalToggle}
            className={cn(
              'shrink-0',
              'px-3 py-2',
              'rounded-full',
              'text-xs font-medium',
              isPortaled
                ? 'bg-foreground text-background'
                : 'bg-brand text-brand-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            {isPortaled ? 'Put it back' : 'Portal outside card'}
          </button>
        }
      />

      <div
        className={cn('relative isolate h-56 overflow-hidden', 'bg-background')}
        style={{ transform: 'translateZ(0)' }}
      >
        <div
          className={cn(
            'absolute inset-x-4 top-4 z-10 flex h-11 items-center justify-between',
            'px-3',
            'rounded-md',
            'font-mono text-[10px]',
            'bg-foreground text-background',
          )}
        >
          <span>Header</span>
          <span>10</span>
        </div>

        <div
          className={cn(
            'absolute inset-x-7 top-24 h-28',
            'p-3',
            'rounded-lg border',
            'border-border bg-brand-muted',
          )}
          style={{ transform: 'translateY(0)' }}
        >
          <p className={cn('m-0', 'text-xs font-semibold', 'text-foreground')}>
            Card context
          </p>
          <p
            className={cn(
              'm-0 mt-1',
              'font-mono text-[9px]',
              'text-muted-foreground',
            )}
          >
            transform: translateY(0)
          </p>
          {!isPortaled ? <PortalModal isAtRoot={false} /> : null}
        </div>

        <div ref={setPortalTarget} />
        {isPortaled && portalTarget
          ? createPortal(<PortalModal isAtRoot={true} />, portalTarget)
          : null}

        <span
          className={cn(
            'absolute bottom-2 left-3',
            'font-mono text-[9px]',
            'text-muted-foreground',
          )}
        >
          lab root stands in for document.body
        </span>
      </div>

      <figcaption
        aria-live="polite"
        className={cn(
          'grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center',
          'px-4 py-3 sm:px-5',
          'border-t',
          'text-xs',
          'border-border bg-code/65 text-muted-foreground',
        )}
      >
        <code className={cn('font-mono text-[10px]', 'text-foreground')}>
          {isPortaled
            ? 'lab root → modal (300)'
            : 'lab root → card (level 0) → modal (9999)'}
        </code>
        <span className={cn(isPortaled ? 'text-brand' : 'text-foreground')}>
          {isPortaled ? 'Modal wins' : 'Header wins'}
        </span>
      </figcaption>
    </figure>
  );
}

function NativeTopLayerDialog({
  dialogReference,
}: Readonly<{
  dialogReference: RefObject<HTMLDialogElement | null>;
}>) {
  return (
    <dialog
      ref={dialogReference}
      aria-labelledby="native-top-layer-title"
      className={cn(
        'fixed inset-0 w-[min(23rem,calc(100%-2rem))] max-w-none overflow-hidden',
        'm-auto p-0',
        'rounded-xl border shadow-2xl backdrop:backdrop-blur-[2px]',
        'border-border bg-popover text-popover-foreground backdrop:bg-foreground/25',
      )}
    >
      <form method="dialog">
        <div
          className={cn(
            'flex items-start justify-between gap-4',
            'p-5',
            'border-b',
            'border-border bg-muted/45',
          )}
        >
          <div>
            <p
              className={cn(
                'm-0',
                'font-mono text-[10px] font-medium uppercase tracking-[0.14em]',
                'text-brand',
              )}
            >
              Browser top layer
            </p>
            <h4
              id="native-top-layer-title"
              className={cn(
                'm-0 mt-1.5',
                'text-lg font-semibold tracking-[-0.02em]',
                'text-foreground',
              )}
            >
              No z-index required.
            </h4>
          </div>
          <button
            type="submit"
            aria-label="Close dialog"
            className={cn(
              'grid size-8 shrink-0 place-items-center',
              'rounded-full',
              'text-lg leading-none',
              'text-muted-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            ×
          </button>
        </div>
        <div className={cn('grid gap-5', 'p-5')}>
          <p className={cn('m-0', 'text-sm leading-6', 'text-foreground/85')}>
            This dialog remains nested inside a transformed element in the DOM.
            The browser promoted it above the ordinary stacking-context tree and
            made the rest of the page inert.
          </p>
          <button
            type="submit"
            className={cn(
              'inline-flex min-h-9 items-center justify-center justify-self-end',
              'px-4 py-2',
              'rounded-full',
              'text-xs font-medium',
              'bg-foreground text-background',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Close dialog
          </button>
        </div>
      </form>
    </dialog>
  );
}

export function TopLayerDemo() {
  const dialogReference = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogReference.current?.showModal();
  }

  return (
    <figure
      aria-labelledby="top-layer-demo-title"
      className={cn(
        'overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-surface',
      )}
    >
      <ExplainerHeader
        eyebrow="Platform primitive"
        title="Open a dialog from inside a transformed parent"
        titleId="top-layer-demo-title"
      />
      <div
        className={cn(
          'relative isolate flex min-h-44 items-center justify-center overflow-hidden',
          'p-5',
          'bg-background',
        )}
      >
        <div
          className={cn(
            'grid w-full max-w-sm gap-4',
            'p-4',
            'rounded-lg border border-dashed',
            'border-brand/45 bg-brand-muted',
          )}
          style={{ transform: 'translateY(0)' }}
        >
          <div className={cn('flex items-center justify-between gap-4')}>
            <span className={cn('text-xs font-semibold', 'text-foreground')}>
              Transformed parent
            </span>
            <code
              className={cn('font-mono text-[9px]', 'text-muted-foreground')}
            >
              stack level: 0
            </code>
          </div>
          <button
            type="button"
            onClick={openDialog}
            className={cn(
              'inline-flex min-h-10 items-center justify-center',
              'px-4 py-2',
              'rounded-full',
              'text-xs font-medium',
              'bg-brand text-brand-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Run dialog.showModal()
          </button>
          <NativeTopLayerDialog dialogReference={dialogReference} />
        </div>
      </div>
      <figcaption
        className={cn(
          'px-4 py-3 sm:px-5',
          'border-t',
          'text-xs leading-5',
          'border-border bg-code/65 text-muted-foreground',
        )}
      >
        The dialog is a descendant in the DOM, but a top-layer element in the
        browser&apos;s rendering model.
      </figcaption>
    </figure>
  );
}
