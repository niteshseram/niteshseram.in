'use client';

import { useDocsSearch } from 'fumadocs-core/search/client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';
import { useCallback, useMemo } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import type { PostIndexEntry } from '@/lib/writing';

import { buildGroups, CommandEntryRow, type CommandItemDef } from './groups';
import { initOrama, ORAMA_PREFIX, OramaResultRow } from './search';

type Props = Readonly<{
  open: boolean;
  onOpenChange: (next: boolean) => void;
  posts: PostIndexEntry[];
}>;

const dialogFilter: ComponentProps<typeof CommandDialog>['filter'] = (
  value,
  search,
  keywords,
) => {
  if (value.startsWith(ORAMA_PREFIX)) return 1;
  const haystack = [value, ...(keywords ?? [])].join(' ').toLowerCase();
  const terms = search.toLowerCase().trim().split(/\s+/);
  return terms.every((t) => haystack.includes(t)) ? 1 : 0;
};

export function CommandMenuDialog({ open, onOpenChange, posts }: Props) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
  });

  const navigate = useCallback(
    (href: string) => {
      if (
        (href.startsWith('/#') || href.startsWith('#')) &&
        window.location.pathname === '/'
      ) {
        document
          .getElementById(href.split('#')[1])
          ?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      router.push(href);
    },
    [router],
  );

  const openExternal = useCallback((href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  }, []);

  const isSearching = search.trim().length > 0;
  const hasOramaResponse = isSearching && Array.isArray(query.data);
  const oramaResults = Array.isArray(query.data) ? query.data : [];

  const groups = useMemo(
    () =>
      buildGroups({
        posts: hasOramaResponse ? [] : posts,
        navigate,
        openExternal,
        setTheme,
      }),
    [posts, navigate, openExternal, setTheme, hasOramaResponse],
  );

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const runItem = useCallback(
    (item: CommandItemDef) => {
      close();
      item.run();
    },
    [close],
  );

  const runOrama = useCallback(
    (url: string) => {
      close();
      navigate(url);
    },
    [close, navigate],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setSearch('');
      }}
      title="Command menu"
      description="Navigate the site, switch theme, or open social links."
      label="Command menu"
      loop={true}
      filter={dialogFilter}
    >
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
        loading={isSearching && query.isLoading}
      />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        {groups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandEntryRow
                  key={item.id}
                  item={item}
                  onSelect={() => runItem(item)}
                />
              ))}
            </CommandGroup>
          ))}
        {hasOramaResponse && oramaResults.length > 0 && (
          <CommandGroup heading="Writing">
            {oramaResults.map((result) => (
              <OramaResultRow
                key={result.id}
                result={result}
                onSelect={() => runOrama(result.url)}
              />
            ))}
          </CommandGroup>
        )}
      </CommandList>
      <CommandFooter>
        <div className="flex items-center gap-x-3">
          <CommandShortcut label="navigate" keys={['↑', '↓']} />
          <CommandShortcut label="select" keys={['↵']} />
        </div>
        <CommandShortcut label="close" keys={['esc']} />
      </CommandFooter>
    </CommandDialog>
  );
}
