import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

// Center-out sequencing adapted from Skiper UI's Text Roll Navigation.
type Props = Readonly<{
  children: string;
}>;

export function NavLabel({ children }: Props) {
  const characters = Array.from(children);
  const centerIndex = (characters.length - 1) / 2;

  return (
    <span
      aria-hidden="true"
      className={cn('relative block h-4 overflow-hidden', 'leading-4')}
    >
      <span className={cn('block h-4 whitespace-nowrap')}>
        {characters.map((character, characterIndex) => {
          const transitionStyle = getTransitionStyle(
            characterIndex,
            centerIndex,
          );
          const visibleCharacter = character === ' ' ? '\u00A0' : character;

          return (
            <span
              key={`${character}-${characterIndex}`}
              style={transitionStyle}
              className={cn(
                'inline-block h-4',
                'transition-transform duration-300 ease-in-out motion-reduce:transition-none motion-reduce:transform-none',
                'group-hover/nav:-translate-y-full',
                'group-data-[pressed=true]/nav:transition-none',
              )}
            >
              {visibleCharacter}
            </span>
          );
        })}
      </span>
      <span className={cn('absolute inset-0 block h-4 whitespace-nowrap')}>
        {characters.map((character, characterIndex) => {
          const transitionStyle = getTransitionStyle(
            characterIndex,
            centerIndex,
          );
          const visibleCharacter = character === ' ' ? '\u00A0' : character;

          return (
            <span
              key={`${character}-${characterIndex}`}
              style={transitionStyle}
              className={cn(
                'inline-block h-4 translate-y-full',
                'transition-transform duration-300 ease-in-out motion-reduce:transition-none motion-reduce:transform-none',
                'group-hover/nav:translate-y-0',
                'group-data-[pressed=true]/nav:transition-none',
              )}
            >
              {visibleCharacter}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function getTransitionStyle(
  characterIndex: number,
  centerIndex: number,
): CSSProperties {
  return {
    transitionDelay: `${Math.abs(characterIndex - centerIndex) * 35}ms`,
  };
}
