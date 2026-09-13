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
              'hover:underline hover:underline-offset-4',
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
      className={cn('my-4', 'leading-7', 'text-inherit', className)}
      {...props}
    />
  ),
  h1: headingAnchor(
    'h1',
    cn(
      'scroll-mt-8',
      'mt-10 mb-3',
      'text-[1.375rem] font-[550] leading-8 tracking-[-0.015em]',
      'text-foreground-strong',
    ),
  ),
  h2: headingAnchor(
    'h2',
    cn(
      'scroll-mt-8',
      'mt-12 mb-3',
      'text-xl font-[550] leading-7 tracking-[-0.015em]',
      'text-foreground-strong',
    ),
  ),
  h3: headingAnchor(
    'h3',
    cn(
      'scroll-mt-8',
      'mt-8 mb-2.5',
      'text-[1.0625rem] font-[550] leading-6',
      'text-foreground-strong',
    ),
  ),
  h4: headingAnchor(
    'h4',
    cn(
      'scroll-mt-8',
      'mt-6 mb-2',
      'text-base font-[550] leading-6',
      'text-foreground-strong',
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
        'my-4 pl-5 space-y-2',
        'list-disc',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-4 pl-5 space-y-2',
        'list-decimal',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('leading-7', 'text-inherit', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-5 pl-4',
        'border-l-2',
        'text-base leading-7',
        'text-foreground-subtle border-link',
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
        className={cn(
          'h-auto max-w-full',
          'my-7',
          'rounded-sm border',
          'border-border',
          className,
        )}
        {...props}
      />
    );
  },
  hr: ({ className, ...props }) => (
    <hr
      className={cn('w-8', 'my-10', 'border-divider', className)}
      {...props}
    />
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
          'text-sm',
          'text-muted-foreground',
        )}
      >
        Scroll to explore <span aria-hidden="true">→</span>
      </div>
      <div
        aria-label="Scrollable table"
        role="region"
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Wide tables need a keyboard focus target for horizontal scrolling.
        tabIndex={0}
        className={cn(
          'overflow-x-auto',
          'rounded-sm',
          'outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        <table
          className={cn(
            'w-full min-w-144 border-separate border-spacing-0',
            'text-sm leading-6',
            'text-foreground-secondary',
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
        'px-4 py-3',
        'border-b',
        'text-left text-sm font-medium leading-6 align-top',
        'border-border bg-surface text-foreground-strong',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'px-4 py-3',
        'border-b',
        'align-top',
        'border-border text-inherit',
        className,
      )}
      {...props}
    />
  ),
};

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...baseMdxComponents, ...overrides };
}
