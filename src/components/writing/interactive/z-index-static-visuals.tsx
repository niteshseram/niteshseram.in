import { cn } from '@/lib/utils';

const GLOBAL_LAYERS = [
  { name: '--z-tooltip', use: 'Tooltips', value: 500 },
  { name: '--z-toast', use: 'Toasts', value: 400 },
  { name: '--z-modal', use: 'Modals', value: 300 },
  { name: '--z-dropdown', use: 'Dropdowns', value: 200 },
  { name: '--z-sticky', use: 'Sticky UI', value: 100 },
  { name: '--z-base', use: 'Base content', value: 0 },
] as const;

export function LayerTokenScale() {
  return (
    <figure
      aria-labelledby="layer-token-scale-title"
      className={cn(
        'overflow-hidden',
        'my-8',
        'rounded-xl border',
        'border-border bg-surface',
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-4',
          'px-4 py-3.5 sm:px-5',
          'border-b',
          'border-border bg-background',
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
            Global scale
          </p>
          <h3
            id="layer-token-scale-title"
            className={cn(
              'm-0 mt-1',
              'text-sm font-semibold tracking-[-0.015em]',
              'text-foreground',
            )}
          >
            Six named layers, one deliberate order
          </h3>
        </div>
        <span
          className={cn(
            'shrink-0',
            'font-mono text-[9px] uppercase tracking-[0.1em]',
            'text-muted-foreground',
          )}
        >
          front ↑
        </span>
      </div>

      <ol className={cn('m-0 list-none p-0')}>
        {GLOBAL_LAYERS.map((layer, layerIndex) => (
          <li
            key={layer.name}
            className={cn(
              'grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3',
              'px-4 py-3 sm:px-5',
              layerIndex < GLOBAL_LAYERS.length - 1 && 'border-b',
              'border-border/70',
            )}
          >
            <span
              className={cn(
                'font-mono text-xs font-medium tabular-nums',
                layer.value >= 300 ? 'text-brand' : 'text-muted-foreground',
              )}
            >
              {layer.value}
            </span>
            <div className={cn('min-w-0')}>
              <code
                className={cn(
                  'font-mono text-[10px] font-medium',
                  'text-foreground',
                )}
              >
                {layer.name}
              </code>
              <div
                aria-hidden="true"
                className={cn(
                  'mt-1 h-px',
                  layer.value >= 300 ? 'bg-brand/55' : 'bg-border',
                )}
                style={{ width: `${86 - layerIndex * 10}%` }}
              />
            </div>
            <span className={cn('text-xs', 'text-muted-foreground')}>
              {layer.use}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
