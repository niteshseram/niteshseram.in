'use client';

import { Menu } from '@base-ui/react/menu';
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useIdlePrefetch } from '@/utils/use-idle-prefetch';

type Props = Readonly<{
  markdownUrl: string;
  githubUrl: string;
  pageUrl: string;
}>;

type CopyStatus = 'copied' | 'error' | 'idle';

const markdownCache = new Map<string, Promise<string>>();

function fetchMarkdown(url: string): Promise<string> {
  let cached = markdownCache.get(url);
  if (!cached) {
    cached = fetch(url).then((response) => {
      if (!response.ok) {
        markdownCache.delete(url);
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }
      return response.text();
    });
    markdownCache.set(url, cached);
  }
  return cached;
}

const PostActionsMenu = dynamic(
  () =>
    import('./post-actions-menu').then(
      (menuModule) => menuModule.PostActionsMenu,
    ),
  { ssr: false },
);

function prefetchMenu() {
  void import('./post-actions-menu');
}

export function PostActions({ markdownUrl, githubUrl, pageUrl }: Props) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const copyFeedbackTimerReference = useRef<number | null>(null);
  const copied = copyStatus === 'copied';

  useIdlePrefetch(prefetchMenu);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimerReference.current != null) {
        window.clearTimeout(copyFeedbackTimerReference.current);
      }
    };
  }, []);

  function showCopyFeedback(nextStatus: Exclude<CopyStatus, 'idle'>) {
    if (copyFeedbackTimerReference.current != null) {
      window.clearTimeout(copyFeedbackTimerReference.current);
    }

    setCopyStatus(nextStatus);
    copyFeedbackTimerReference.current = window.setTimeout(() => {
      setCopyStatus('idle');
      copyFeedbackTimerReference.current = null;
    }, 1_500);
  }

  async function onCopy() {
    try {
      const text = await fetchMarkdown(markdownUrl);
      await navigator.clipboard.writeText(text);
      showCopyFeedback('copied');
    } catch {
      showCopyFeedback('error');
    }
  }

  function handleOpenChange(next: boolean) {
    if (next) setMenuMounted(true);
    setMenuOpen(next);
  }

  return (
    <div
      className={cn(
        'inline-flex items-center',
        'rounded-md border',
        'border-border',
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Markdown copied' : 'Copy page as Markdown'}
        className={cn(
          'inline-flex h-8 items-center gap-x-1.5',
          'px-2.5',
          'rounded-l-md',
          'text-xs font-medium',
          'text-muted-foreground',
          'cursor-pointer',
          'transition-colors',
          'hover:text-foreground hover:bg-muted',
        )}
      >
        <span
          aria-hidden="true"
          className="inline-flex size-3.5 items-center justify-center"
        >
          <MorphIcon
            icon={copied ? Check : Copy}
            reducedMotion="user"
            size="100%"
            spring="snappy"
          />
        </span>
        <span className="hidden sm:inline w-[91px]">
          {copied ? 'Copied' : 'Copy Markdown'}
        </span>
      </button>
      <Menu.Root open={menuOpen} onOpenChange={handleOpenChange}>
        <Menu.Trigger
          render={
            <button
              type="button"
              aria-label="Open page in another app"
              onMouseEnter={prefetchMenu}
              onFocus={prefetchMenu}
              className={cn(
                'inline-flex h-8 items-center gap-x-1',
                'px-2',
                'rounded-r-md border-l',
                'text-xs font-medium',
                menuOpen
                  ? 'border-border text-foreground bg-muted'
                  : 'border-border text-muted-foreground',
                'cursor-pointer',
                'transition-colors',
                'hover:text-foreground hover:bg-muted',
              )}
            >
              <span>Open</span>
              <span
                aria-hidden="true"
                className="inline-flex size-3 items-center justify-center"
              >
                <MorphIcon
                  icon={menuOpen ? ChevronUp : ChevronDown}
                  reducedMotion="user"
                  size="100%"
                  spring="snappy"
                />
              </span>
            </button>
          }
        />
        {menuMounted && (
          <PostActionsMenu
            githubUrl={githubUrl}
            markdownUrl={markdownUrl}
            pageUrl={pageUrl}
          />
        )}
      </Menu.Root>
      <span className="sr-only" role="status">
        {copyStatus === 'copied'
          ? 'Page Markdown copied to the clipboard.'
          : copyStatus === 'error'
            ? 'Could not copy the page Markdown.'
            : ''}
      </span>
    </div>
  );
}
