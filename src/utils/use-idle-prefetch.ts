import { useEffect } from 'react';

export function useIdlePrefetch(prefetch: () => void) {
  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(prefetch, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 1500);
    return () => clearTimeout(id);
  }, [prefetch]);
}
