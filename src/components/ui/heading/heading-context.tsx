'use client';

import { createContext, useContext, useMemo } from 'react';

type HeadingContextType = Readonly<{
  level: number;
}>;

export const HeadingContext = createContext<HeadingContextType>({
  level: 1,
});

export function useHeadingLevel() {
  return useContext(HeadingContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  increment?: boolean; // Whether to increment the heading level.
  level?: number; // Override level.
}>;

export function HeadingLevelIncrease({
  children,
  increment = true,
  level: levelProp,
}: Props) {
  const { level } = useHeadingLevel();
  const nextLevel = Math.min(level + (increment ? 1 : 0), 6); // Max of H6.
  const resolvedLevel = levelProp ?? nextLevel;
  const value = useMemo(() => ({ level: resolvedLevel }), [resolvedLevel]);

  return (
    <HeadingContext.Provider value={value}>{children}</HeadingContext.Provider>
  );
}
