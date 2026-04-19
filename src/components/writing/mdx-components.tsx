import type { MDXComponents } from 'mdx/types';

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
      className={cn('my-5 leading-[1.75]', 'text-muted-foreground', className)}
      {...props}
    />
  ),
  h1: headingAnchor(
    'h1',
    cn(
      'scroll-mt-20 mt-12 mb-4',
      'font-serif text-3xl leading-tight',
      'text-foreground',
    ),
  ),
  h2: headingAnchor(
    'h2',
    cn(
      'scroll-mt-20 mt-12 mb-3',
      'font-serif text-2xl font-medium leading-tight',
      'text-foreground',
    ),
  ),
  h3: headingAnchor(
    'h3',
    cn(
      'scroll-mt-20 mt-10 mb-2',
      'font-serif text-xl leading-snug',
      'text-foreground',
    ),
  ),
  h4: headingAnchor(
    'h4',
    cn(
      'scroll-mt-20 mt-8 mb-2',
      'font-sans text-sm font-medium uppercase tracking-[0.08em]',
      'text-foreground',
    ),
  ),
  a: ({ href, className, children, ref: _ref, ...props }) => (
    <Anchor
      href={(href ?? '') as never}
      variant="brand"
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
        'my-5 pl-6 space-y-2 list-disc',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-5 pl-6 space-y-2 list-decimal',
        'marker:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn('leading-[1.75]', 'text-muted-foreground', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-6 pl-5',
        'border-l-2 border-brand/40',
        'font-serif text-lg italic leading-relaxed',
        'text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      className={cn('my-8 rounded-lg border border-border', className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-12 border-border', className)} {...props} />
  ),
  pre: ({ ref: _ref, ...props }) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn(
          'w-full text-sm border-collapse',
          'text-foreground/90',
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'px-3 py-2 text-left',
        'border-b border-border',
        'font-medium text-foreground',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'px-3 py-2',
        'border-b border-border',
        'text-foreground/90',
        className,
      )}
      {...props}
    />
  ),
};

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...baseMdxComponents, ...overrides };
}
