'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ATMOSPHERE_STORAGE_KEY,
  type Atmosphere,
  type AtmospherePreference,
  isAtmospherePreference,
  resolveAtmosphere,
} from '@/config/atmosphere';

type AtmosphereContextValue = Readonly<{
  isReady: boolean;
  preference: AtmospherePreference;
  previewAtmosphere: (preference: AtmospherePreference | null) => void;
  resolvedAtmosphere: Atmosphere;
  setAtmosphere: (preference: AtmospherePreference) => void;
}>;

const AtmosphereContext = createContext<AtmosphereContextValue | null>(null);

type Props = Readonly<{
  children: ReactNode;
}>;

export function AtmosphereProvider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [preference, setPreference] = useState<AtmospherePreference>('default');
  const [resolvedAtmosphere, setResolvedAtmosphere] =
    useState<Atmosphere>('default');
  const preferenceReference = useRef<AtmospherePreference>('default');

  const applyAtmosphere = useCallback(
    (nextPreference: AtmospherePreference) => {
      const nextAtmosphere = resolveAtmosphere(nextPreference);
      document.documentElement.dataset.atmosphere = nextAtmosphere;
      setResolvedAtmosphere(nextAtmosphere);
    },
    [],
  );

  const setAtmosphere = useCallback(
    (nextPreference: AtmospherePreference) => {
      preferenceReference.current = nextPreference;
      setPreference(nextPreference);
      applyAtmosphere(nextPreference);

      try {
        localStorage.setItem(ATMOSPHERE_STORAGE_KEY, nextPreference);
      } catch {}
    },
    [applyAtmosphere],
  );

  const previewAtmosphere = useCallback(
    (previewPreference: AtmospherePreference | null) => {
      applyAtmosphere(previewPreference ?? preferenceReference.current);
    },
    [applyAtmosphere],
  );

  useEffect(() => {
    let storedPreference: AtmospherePreference = 'default';

    try {
      const storedValue = localStorage.getItem(ATMOSPHERE_STORAGE_KEY);
      if (isAtmospherePreference(storedValue)) {
        storedPreference = storedValue;
      }
    } catch {}

    preferenceReference.current = storedPreference;
    setPreference(storedPreference);
    applyAtmosphere(storedPreference);
    setIsReady(true);
  }, [applyAtmosphere]);

  useEffect(() => {
    if (preference !== 'auto') return;

    function refreshAutomaticAtmosphere() {
      applyAtmosphere('auto');
    }

    const intervalId = window.setInterval(refreshAutomaticAtmosphere, 60_000);
    document.addEventListener('visibilitychange', refreshAutomaticAtmosphere);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener(
        'visibilitychange',
        refreshAutomaticAtmosphere,
      );
    };
  }, [applyAtmosphere, preference]);

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key !== ATMOSPHERE_STORAGE_KEY) return;

      const nextPreference = isAtmospherePreference(event.newValue)
        ? event.newValue
        : 'default';
      preferenceReference.current = nextPreference;
      setPreference(nextPreference);
      applyAtmosphere(nextPreference);
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [applyAtmosphere]);

  const contextValue = useMemo<AtmosphereContextValue>(
    () => ({
      isReady,
      preference,
      previewAtmosphere,
      resolvedAtmosphere,
      setAtmosphere,
    }),
    [isReady, preference, previewAtmosphere, resolvedAtmosphere, setAtmosphere],
  );

  return (
    <AtmosphereContext.Provider value={contextValue}>
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);

  if (!context) {
    throw new Error('useAtmosphere must be used within AtmosphereProvider');
  }

  return context;
}
