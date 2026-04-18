import { cn } from '@/lib/utils';

type Props = Readonly<{
  className?: string;
}>;

export function Terminal({ className }: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        'rounded-xl border border-input/60',
        'bg-code',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between',
          'px-4 py-3',
          'border-b border-input/60',
          'bg-code-bar',
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#FF5F57]"
          />
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#FEBC2E]"
          />
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#28C840]"
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          nitesh.config.ts
        </span>
      </div>

      <pre
        className={cn(
          'p-5 overflow-x-auto',
          'font-mono text-[12.5px] leading-6',
          'text-code-foreground',
        )}
      >
        <div>
          <span className="text-brand">const</span> nitesh{' '}
          <span className="text-muted-foreground">{'= {'}</span>
        </div>
        <div>
          {'  '}
          <span className="text-muted-foreground">role</span>
          <span className="text-muted-foreground">:</span>{' '}
          <span className="text-brand">&quot;Software Engineer&quot;</span>
          <span className="text-muted-foreground">,</span>
        </div>
        <div>
          {'  '}
          <span className="text-muted-foreground">focus</span>
          <span className="text-muted-foreground">:</span>{' '}
          <span className="text-brand">&quot;Frontend &amp; UI&quot;</span>
          <span className="text-muted-foreground">,</span>
        </div>
        <div>
          {'  '}
          <span className="text-muted-foreground">stack</span>
          <span className="text-muted-foreground">: [</span>
          <span className="text-brand">&quot;React&quot;</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-brand">&quot;Next.js&quot;</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-brand">&quot;TypeScript&quot;</span>
          <span className="text-muted-foreground">],</span>
        </div>
        <div>
          <span className="text-muted-foreground">{'}'}</span>
          <TerminalCursor />
        </div>
      </pre>
    </div>
  );
}

export function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'ml-1 inline-block h-3 w-1.5 align-middle',
        'bg-brand',
        'animate-blink',
      )}
    />
  );
}
