export const ATMOSPHERE_STORAGE_KEY = 'portfolio-atmosphere';

export const ATMOSPHERES = [
  'default',
  'morning',
  'day',
  'evening',
  'night',
] as const;

export const ATMOSPHERE_PREFERENCES = [
  'default',
  'auto',
  'morning',
  'day',
  'evening',
  'night',
] as const;

export type Atmosphere = (typeof ATMOSPHERES)[number];
export type AtmospherePreference = (typeof ATMOSPHERE_PREFERENCES)[number];

export const ATMOSPHERE_SCHEDULE: ReadonlyArray<{
  atmosphere: Atmosphere;
  startHour: number;
}> = [
  { atmosphere: 'morning', startHour: 5 },
  { atmosphere: 'day', startHour: 11 },
  { atmosphere: 'evening', startHour: 17 },
  { atmosphere: 'night', startHour: 21 },
];

export type AtmosphereOption = Readonly<{
  description: string;
  label: string;
  value: AtmospherePreference;
}>;

export const ATMOSPHERE_OPTIONS: readonly AtmosphereOption[] = [
  {
    description: 'The original portfolio palette',
    label: 'Default',
    value: 'default',
  },
  {
    description: 'Follows your local time',
    label: 'Automatic',
    value: 'auto',
  },
  {
    description: 'Dawn paper · pine teal',
    label: 'Morning',
    value: 'morning',
  },
  {
    description: 'Clear sky · marine blue',
    label: 'Day',
    value: 'day',
  },
  {
    description: 'Golden stone · muted copper',
    label: 'Evening',
    value: 'evening',
  },
  {
    description: 'Midnight slate · steel blue',
    label: 'Night',
    value: 'night',
  },
];

export function getAtmosphereForHour(hour: number): Atmosphere {
  let atmosphere: Atmosphere = 'night';

  for (const period of ATMOSPHERE_SCHEDULE) {
    if (hour >= period.startHour) atmosphere = period.atmosphere;
  }

  return atmosphere;
}

export function resolveAtmosphere(
  preference: AtmospherePreference,
  date = new Date(),
): Atmosphere {
  return preference === 'auto'
    ? getAtmosphereForHour(date.getHours())
    : preference;
}

export function isAtmospherePreference(
  value: string | null,
): value is AtmospherePreference {
  return ATMOSPHERE_PREFERENCES.some((preference) => preference === value);
}

export const ATMOSPHERE_INIT_SCRIPT = `
  (() => {
    const root = document.documentElement;
    const appearanceStorageKey = 'theme';
    const storageKey = '${ATMOSPHERE_STORAGE_KEY}';
    const allowedAppearances = ['light', 'dark', 'system'];
    const allowedPreferences = ${JSON.stringify(ATMOSPHERE_PREFERENCES)};
    const schedule = ${JSON.stringify(ATMOSPHERE_SCHEDULE)};

    function resolveSystemAppearance() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    function applyAppearance(appearance) {
      const resolvedAppearance =
        appearance === 'system' ? resolveSystemAppearance() : appearance;

      root.classList.remove('light', 'dark');
      root.classList.add(resolvedAppearance);
      root.style.colorScheme = resolvedAppearance;
    }

    function resolveAutomaticAtmosphere() {
      const hour = new Date().getHours();
      let atmosphere = 'night';

      for (const period of schedule) {
        if (hour >= period.startHour) atmosphere = period.atmosphere;
      }

      return atmosphere;
    }

    try {
      const storedAppearance = localStorage.getItem(appearanceStorageKey);
      const appearance = allowedAppearances.includes(storedAppearance)
        ? storedAppearance
        : 'system';
      const storedPreference = localStorage.getItem(storageKey);
      const preference = allowedPreferences.includes(storedPreference)
        ? storedPreference
        : 'default';
      const atmosphere =
        preference === 'auto' ? resolveAutomaticAtmosphere() : preference;

      applyAppearance(appearance);
      root.dataset.atmosphere = atmosphere;
    } catch {
      applyAppearance('system');
      root.dataset.atmosphere = 'default';
    }
  })();
`;
