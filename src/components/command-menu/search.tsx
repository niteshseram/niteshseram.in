import { create } from '@orama/orama';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { PiFileText, PiHash, PiTextAlignLeft } from 'react-icons/pi';

import { CommandItem, CommandItemIcon } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export const ORAMA_PREFIX = 'orama:';

export function initOrama() {
  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

export type OramaResult = {
  id: string;
  url: string;
  type: 'page' | 'heading' | 'text';
  content: string;
};

const ICONS: Record<OramaResult['type'], IconType> = {
  page: PiFileText,
  heading: PiHash,
  text: PiTextAlignLeft,
};

export function OramaResultRow({
  result,
  onSelect,
}: Readonly<{ result: OramaResult; onSelect: () => void }>) {
  const Icon = ICONS[result.type];
  const isNested = result.type !== 'page';
  return (
    <CommandItem value={`${ORAMA_PREFIX}${result.id}`} onSelect={onSelect}>
      <CommandItemIcon className={cn(isNested && 'ml-4')}>
        <Icon aria-hidden="true" />
      </CommandItemIcon>
      <span className="flex-1 truncate">
        {renderHighlighted(result.content)}
      </span>
    </CommandItem>
  );
}

const MARK_SPLIT = /(<mark>[\s\S]*?<\/mark>)/g;
const MARK_MATCH = /^<mark>([\s\S]*)<\/mark>$/;

function stripInlineMarkdown(content: string): string {
  return content
    .replace(/`+([^`]+)`+/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/(?<!\*)\*(?!\*)([^*\n]+?)\*(?!\*)/g, '$1')
    .replace(/(?<!_)_(?!_)([^_\n]+?)_(?!_)/g, '$1')
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1');
}

function renderHighlighted(content: string): ReactNode {
  return stripInlineMarkdown(content)
    .split(MARK_SPLIT)
    .map((part, i) => {
      const match = part.match(MARK_MATCH);
      const key = `${i}-${part}`;
      if (match) {
        return (
          <mark
            key={key}
            className={cn('rounded-sm', 'bg-brand-muted text-brand')}
          >
            {match[1]}
          </mark>
        );
      }
      return <span key={key}>{part}</span>;
    });
}
