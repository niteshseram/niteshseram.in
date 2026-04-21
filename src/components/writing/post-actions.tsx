'use client';

import { Popover } from '@base-ui/react/popover';
import { useMemo, useState } from 'react';
import {
  PiArrowSquareOut,
  PiCaretDown,
  PiCheck,
  PiCopy,
  PiGithubLogo,
  PiMarkdownLogo,
  PiOpenAiLogo,
} from 'react-icons/pi';
import { SiClaude } from 'react-icons/si';

import { cn } from '@/lib/utils';

type Props = Readonly<{
  markdownUrl: string;
  githubUrl: string;
  pageUrl: string;
}>;

const markdownCache = new Map<string, Promise<string>>();

function fetchMarkdown(url: string): Promise<string> {
  let cached = markdownCache.get(url);
  if (!cached) {
    cached = fetch(url).then((res) => {
      if (!res.ok) {
        markdownCache.delete(url);
        throw new Error(`Failed to fetch markdown: ${res.status}`);
      }
      return res.text();
    });
    markdownCache.set(url, cached);
  }
  return cached;
}

export function PostActions({ markdownUrl, githubUrl, pageUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const aiLinks = useMemo(() => {
    const query = `Read ${pageUrl}, I want to ask questions about it.`;
    return {
      chatgpt: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q: query })}`,
      claude: `https://claude.ai/new?${new URLSearchParams({ q: query })}`,
      cursor: `https://cursor.com/link/prompt?${new URLSearchParams({ text: query })}`,
    };
  }, [pageUrl]);

  const onCopy = async () => {
    try {
      const text = await fetchMarkdown(markdownUrl);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silently ignore — clipboard failures are non-critical
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center',
        'rounded-md',
        'border border-border',
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy page as Markdown"
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'h-8 px-2.5',
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
          {copied ? <PiCheck /> : <PiCopy />}
        </span>
        <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
      </button>
      <Popover.Root>
        <Popover.Trigger
          aria-label="Open page in another app"
          className={cn(
            'inline-flex items-center gap-x-1',
            'h-8 px-2',
            'border-l border-border',
            'rounded-r-md',
            'text-xs font-medium',
            'text-muted-foreground',
            'cursor-pointer',
            'transition-colors',
            'hover:text-foreground hover:bg-muted',
            'data-popup-open:text-foreground data-popup-open:bg-muted',
          )}
        >
          <span>Open</span>
          <span
            aria-hidden="true"
            className="inline-flex size-3 items-center justify-center"
          >
            <PiCaretDown />
          </span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={6} align="end" className="z-50">
            <Popover.Popup
              className={cn(
                'flex min-w-52 flex-col origin-(--transform-origin)',
                'p-1',
                'rounded-lg border border-border shadow-lg',
                'bg-popover text-popover-foreground',
                'transition-[transform,scale,opacity]',
                'data-starting-style:scale-95 data-starting-style:opacity-0',
                'data-ending-style:scale-95 data-ending-style:opacity-0',
              )}
            >
              <MenuLink
                href={githubUrl}
                label="Open in GitHub"
                icon={<PiGithubLogo />}
              />
              <MenuLink
                href={markdownUrl}
                label="View as Markdown"
                icon={<PiMarkdownLogo />}
              />
              <MenuLink
                href={aiLinks.chatgpt}
                label="Open in ChatGPT"
                icon={<PiOpenAiLogo />}
              />
              <MenuLink
                href={aiLinks.claude}
                label="Open in Claude"
                icon={<SiClaude />}
              />
              <MenuLink
                href={aiLinks.cursor}
                label="Open in Cursor"
                icon={<CursorIcon />}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

function MenuLink({
  href,
  label,
  icon,
}: Readonly<{ href: string; label: string; icon: React.ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'flex items-center justify-between gap-x-3',
        'px-2.5 py-2',
        'rounded-md',
        'text-sm',
        'text-foreground',
        'transition-colors',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
      )}
    >
      <span className="inline-flex items-center gap-x-2.5">
        <span
          aria-hidden="true"
          className="inline-flex size-4 items-center justify-center text-muted-foreground"
        >
          {icon}
        </span>
        <span>{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-3.5 items-center justify-center text-muted-foreground"
      >
        <PiArrowSquareOut />
      </span>
    </a>
  );
}

function CursorIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cursor</title>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}
