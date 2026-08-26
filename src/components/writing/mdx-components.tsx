import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import { Anchor } from '@/components/ui/anchor';
import { CodeBlock, Pre } from '@/components/ui/codeblock';
import { cn } from '@/lib/utils';

function headingAnchor(
  Tag: 'h1' | 'h2' | 'h3' | 'h4',
  className: string,
): MDXComponents[keyof MDXComponents] {
  return function Heading({
    id,
    children,
    className: extraClassName,
    ...props
  }: React.ComponentProps<'h1'>) {
    return (
      <Tag id={id} className={cn(className, extraClassName)} {...props}>
        {id ? (
          <a
            href={`#${id}`}
            className={cn(
              'no-underline',
              'text-inherit',
              'transition-colors',
              'hover:text-brand',
            )}
          >
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

export const baseMdxComponents: MDXComponents = {
  p: ({ className, ...props }) => (
    <p
      className={cn('my-4', 'leading-7', 'text-foreground/90', className)}
      {...props}
    />
  ),
  h1: headingAnchor(
    'h1',
    cn(
      'scroll-mt-20',
      'mt-10 mb-3',
      'text-2xl font-semibold leading-tight tracking-[-0.022em]',
      'text-foreground',
    ),
  ),
  h2: headingAnchor(
    'h2',
    cn(
      'scroll-mt-20',
      'mt-10 mb-2.5',
      'text-xl font-semibold leading-7 tracking-[-0.018em]',
      'text-foreground',
    ),
  ),
  h3: headingAnchor(
    'h3',
    cn(
      'scroll-mt-20',
      'mt-8 mb-2',
      'text-[1.0625rem] font-semibold leading-6 tracking-[-0.012em]',
      'text-foreground',
    ),
  ),
  h4: headingAnchor(
    'h4',
    cn(
      'scroll-mt-20 mt-7 mb-2',
      'text-sm font-medium uppercase tracking-[0.08em]',
      'text-foreground',
    ),
  ),
  a: ({ href, className, children, ref: _ref, ...props }) => (
    <Anchor
      href={(href ?? '') as never}
      variant="prose"
      weight="inherit"
      className={className}
      {...props}
    >
      {children}
    </Anchor>
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'my-4 pl-6 space-y-1.5 list-disc',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-4 pl-6 space-y-1.5 list-decimal',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn('leading-7', 'text-foreground/90', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-5 pl-4',
        'border-l-2 border-brand/40',
        'text-base italic leading-7',
        'text-foreground/75',
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, src, width, height, ...props }) => {
    if (typeof src !== 'string' || !src) return null;
    return (
      <Image
        alt={alt ?? ''}
        src={src}
        width={typeof width === 'number' ? width : Number(width) || 1280}
        height={typeof height === 'number' ? height : Number(height) || 720}
        className={cn('my-8 rounded-lg border border-border', className)}
        {...props}
      />
    );
  },
  hr: ({ className, ...props }) => (
    <hr className={cn('w-8', 'my-10', 'border-border', className)} {...props} />
  ),
  pre: ({ ref: _ref, ...props }) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  table: ({ className, ...props }) => (
    <div className="my-7">
      <div
        className={cn(
          'flex items-center justify-end gap-1 sm:hidden',
          'mb-2 px-1',
          'text-[0.6875rem] font-medium tracking-wide',
          'text-muted-foreground',
        )}
      >
        Scroll to explore <span aria-hidden="true">→</span>
      </div>
      <div className="overflow-x-auto">
        <table
          className={cn(
            'w-full min-w-144 border-separate border-spacing-0',
            'text-sm leading-6',
            'text-foreground/90',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'px-4 py-3 align-middle',
        'first:rounded-l-xl last:rounded-r-xl border-y first:border-l last:border-r',
        'text-left text-sm font-medium leading-5',
        'border-border bg-surface/80 text-foreground',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'px-4 py-4 align-top',
        'border-b first:border-b-0',
        'first:font-semibold',
        'border-border/70 text-foreground/80 first:text-foreground',
        className,
      )}
      {...props}
    />
  ),
};

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...baseMdxComponents, ...overrides };
}
