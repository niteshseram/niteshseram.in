'use client';

import { useEffect } from 'react';

export function useGlobalShortcut(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
