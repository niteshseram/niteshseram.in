'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ClassValue } from 'clsx';
import {
  CommandEmpty as CmdkEmpty,
  CommandGroup as CmdkGroup,
  CommandInput as CmdkInput,
  CommandItem as CmdkItem,
  CommandList as CmdkList,
  Command as CmdkRoot,
} from 'cmdk';
import { Search } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function Command({
  className,
  ...props
}: Omit<ComponentProps<typeof CmdkRoot>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <CmdkRoot
      className={cn('flex flex-col overflow-hidden', className)}
      {...props}
    />
  );
}

type CommandDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  initialFocus?: ComponentProps<typeof Dialog.Popup>['initialFocus'];
}> &
  Omit<ComponentProps<typeof CmdkRoot>, 'children'>;

export function CommandDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  initialFocus,
  ...commandProps
}: CommandDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 z-50',
            'backdrop-blur-sm',
            'bg-background/65',
            'transition-opacity duration-[var(--motion-duration-fast)] ease-standard',
            'data-starting-style:opacity-0 data-ending-style:opacity-0',
          )}
        />
        <Dialog.Popup
          initialFocus={initialFocus}
          className={cn(
            'fixed top-[16%] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden',
            'rounded-2xl border shadow-[0_24px_80px_-24px]',
            'border-input bg-popover shadow-shadow/55',
            'transition-[transform,scale,opacity] duration-[var(--motion-duration-fast)] ease-standard',
            'data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            'data-ending-style:scale-[0.98] data-ending-style:opacity-0',
          )}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>
          )}
          <Command {...commandProps}>{children}</Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CommandInput({
  className,
  ref,
  loading,
  ...props
}: Omit<ComponentProps<typeof CmdkInput>, 'className'> & {
  className?: ClassValue;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-x-2.5',
        'h-13 px-4',
        'border-b border-border',
      )}
    >
      <Search
        aria-hidden="true"
        aria-busy={loading || undefined}
        className={cn(
          'size-4 shrink-0',
          'text-muted-foreground',
          loading && 'animate-pulse text-brand',
        )}
      />
      <CmdkInput
        ref={ref}
        className={cn(
          'flex-1 bg-transparent outline-none',
          'text-sm text-foreground placeholder:text-muted-foreground',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof CmdkList>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <CmdkList className={cn(className)} {...props}>
      <ScrollArea
        className="max-h-[min(24rem,55vh)]"
        viewportClassName="overscroll-contain p-1.5"
      >
        {children}
      </ScrollArea>
    </CmdkList>
  );
}

export function CommandEmpty({
  className,
  ...props
}: Omit<ComponentProps<typeof CmdkEmpty>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <CmdkEmpty
      className={cn(
        'py-10 text-center text-sm text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  ...props
}: Omit<ComponentProps<typeof CmdkGroup>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <CmdkGroup
      className={cn(
        '[&_[cmdk-group-heading]]:px-2.5',
        '[&_[cmdk-group-heading]]:pt-2',
        '[&_[cmdk-group-heading]]:pb-1',
        '[&_[cmdk-group-heading]]:font-mono',
        '[&_[cmdk-group-heading]]:text-[10px]',
        '[&_[cmdk-group-heading]]:uppercase',
        '[&_[cmdk-group-heading]]:tracking-[0.14em]',
        '[&_[cmdk-group-heading]]:text-muted-foreground',
        'mb-1 last:mb-0',
        className,
      )}
      {...props}
    />
  );
}

export function CommandItem({
  className,
  ...props
}: Omit<ComponentProps<typeof CmdkItem>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <CmdkItem
      className={cn(
        'group flex items-center gap-x-3',
        'px-2.5 py-2',
        'rounded-md',
        'text-sm text-muted-foreground',
        'cursor-pointer',
        'transition-colors',
        'data-[selected=true]:bg-muted',
        'data-[selected=true]:text-foreground',
        '[&_[data-icon]]:data-[selected=true]:text-brand',
        className,
      )}
      {...props}
    />
  );
}

export function CommandItemIcon({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: ClassValue }>) {
  return (
    <span
      data-icon
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center',
        'text-muted-foreground',
        '[&>svg]:size-full',
        'transition-colors',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CommandFooter({
  className,
  children,
  ...props
}: Omit<ComponentProps<'div'>, 'className'> & {
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-x-3',
        'px-3 py-2',
        'border-t border-border',
        'text-xs text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandShortcut({
  label,
  keys,
}: Readonly<{ label: string; keys: string[] }>) {
  return (
    <span className="inline-flex items-center gap-x-1">
      <span className="inline-flex items-center gap-x-0.5">
        {keys.map((key) => (
          <kbd
            key={key}
            className={cn(
              'inline-flex h-5 min-w-5 items-center justify-center',
              'px-1',
              'rounded border',
              'font-mono text-sm/none',
              'border-border bg-muted text-foreground/70',
            )}
          >
            {key}
          </kbd>
        ))}
      </span>
      <span>{label}</span>
    </span>
  );
}
