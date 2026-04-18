import { PiHand } from 'react-icons/pi';

import {
  FallingStack,
  type FallingStackItem,
} from '@/components/ui/falling-stack';
import { TECH_STACKS } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

export function TechStackSection() {
  return (
    <section
      aria-label="Tech stack"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <div className={cn('mb-5 flex items-end justify-between gap-3')}>
        <h2
          className={cn(
            'font-serif text-2xl font-medium',
            'text-muted-foreground',
          )}
        >
          Tools I reach for
        </h2>
        <p
          className={cn(
            'inline-flex items-center gap-x-1.5',
            'text-xs',
            'text-muted-foreground/70',
          )}
        >
          <PiHand aria-hidden="true" className="size-3.5" />
          drag to play
        </p>
      </div>
      <FallingStack
        items={items}
        className={cn(
          'h-40',
          'rounded-lg border border-border',
          'bg-surface/30',
        )}
      />
    </section>
  );
}

const items: FallingStackItem[] = TECH_STACKS.map(({ icon: Icon, label }) => ({
  id: label,
  node: (
    <div
      className={cn(
        'flex items-center gap-x-2',
        'px-3.5 py-2',
        'rounded-full border border-border',
        'bg-surface',
        'text-sm font-medium whitespace-nowrap',
        'text-muted-foreground hover:text-foreground',
        'transition-colors',
        'cursor-grab select-none active:cursor-grabbing',
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </div>
  ),
}));
