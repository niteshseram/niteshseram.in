'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent, ReactNode } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type TocItem = { title: ReactNode; url: string; depth: number };

export function TableOfContents({ items }: Readonly<{ items: TocItem[] }>) {
  const headings = useMemo(
    () => items.filter((item) => item.depth <= 3),
    [items],
  );
  const [activeUrl, setActiveUrl] = useState<string | undefined>(
    headings[0]?.url,
  );
  const mobileRef = useRef<HTMLDetailsElement>(null);
  const [pointerPosition, setPointerPosition] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const emphasizedPosition = focusedIndex ?? pointerPosition;

  function handlePointerMove(event: PointerEvent<HTMLOListElement>) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const rowHeight = bounds.height / headings.length;
    setPointerPosition((event.clientY - bounds.top) / rowHeight - 0.5);
  }

  useEffect(() => {
    const sections = headings.flatMap((item) => {
      const element = document.getElementById(
        decodeURIComponent(item.url.slice(1)),
      );
      return element ? [{ element, url: item.url }] : [];
    });
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      let currentUrl: string | undefined = sections[0]?.url;
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top > 120) break;
        currentUrl = section.url;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        currentUrl = sections.at(-1)?.url;
      }
      setActiveUrl(currentUrl);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    const article = sections[0]?.element.closest('article');
    if (article) observer.observe(article);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      observer.disconnect();
    };
  }, [headings]);

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const url = event.currentTarget.hash;
    const heading = document.getElementById(decodeURIComponent(url.slice(1)));
    if (mobileRef.current) mobileRef.current.open = false;
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  function renderLinks() {
    return (
      <ol className={cn('space-y-0.5')}>
        {headings.map((item) => (
          <li key={item.url} className={cn(item.depth === 3 && 'pl-3')}>
            <a
              href={item.url}
              aria-current={activeUrl === item.url ? 'location' : undefined}
              onClick={handleNavigate}
              className={cn(
                'block',
                'px-2 py-2',
                'rounded-sm',
                'text-sm leading-5',
                'text-muted-foreground',
                'transition-colors',
                'hover:bg-muted hover:text-foreground',
                'aria-[current=location]:text-foreground',
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    );
  }

  if (headings.length < 2) return null;

  return (
    <>
      <details
        ref={mobileRef}
        className={cn('xl:hidden', 'mb-8', 'border-b', 'border-border')}
      >
        <summary
          className={cn(
            'w-fit',
            'py-3',
            'text-sm',
            'text-muted-foreground',
            'cursor-pointer',
            'hover:text-foreground',
          )}
        >
          On this page
        </summary>
        <nav aria-label="On this page" className={cn('pb-4')}>
          {renderLinks()}
        </nav>
      </details>
      <nav
        aria-label="On this page"
        className={cn(
          'fixed top-1/2 left-[max(1rem,calc(50%-38.5rem))] z-30 hidden max-h-[calc(100dvh-8rem)] -translate-y-1/2 overflow-y-auto xl:block',
        )}
      >
        <ol
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPointerPosition(null)}
        >
          {headings.map((item, index) => {
            const isCurrent = activeUrl === item.url;
            const proximity =
              emphasizedPosition === null
                ? 0
                : Math.max(0, 1 - Math.abs(index - emphasizedPosition) / 3);
            const restingWidth = isCurrent ? 14 : item.depth === 3 ? 10 : 12;
            const markerWidth =
              proximity > 0
                ? Math.max(restingWidth, 12 + 10 * proximity)
                : restingWidth;
            return (
              <li key={item.url}>
                <Tooltip>
                  <TooltipTrigger
                    delay={0}
                    closeDelay={0}
                    render={
                      <a
                        href={item.url}
                        aria-current={isCurrent ? 'location' : undefined}
                        onClick={handleNavigate}
                        onFocus={(event) => {
                          if (event.currentTarget.matches(':focus-visible'))
                            setFocusedIndex(index);
                        }}
                        onBlur={() => setFocusedIndex(null)}
                        className={cn(
                          'flex h-3 w-8 items-center pointer-coarse:h-6',
                          'pl-2',
                          'rounded-sm',
                          'focus-visible:-outline-offset-2',
                        )}
                      >
                        <span className="sr-only">{item.title}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-[1.5px] shrink-0',
                            'rounded-full',
                            'bg-foreground',
                            'transition-[width,opacity] duration-150 ease-out motion-reduce:transition-none',
                          )}
                          style={{
                            width: markerWidth,
                            opacity: isCurrent ? 1 : 0.35 + 0.65 * proximity,
                          }}
                        />
                      </a>
                    }
                  />
                  <TooltipContent
                    side="right"
                    sideOffset={8}
                    className={cn(
                      'max-w-56',
                      'px-2 py-1',
                      'text-xs font-normal leading-4',
                      'transition-opacity duration-150 motion-reduce:transition-none',
                      'data-starting-style:scale-100 data-ending-style:scale-100',
                    )}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
