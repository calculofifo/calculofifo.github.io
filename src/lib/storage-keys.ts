/**
 * Every key Monedo writes to browser storage. All share the "monedo:" prefix because
 * the site is served from a github.io origin it shares with other projects (the FIFO
 * calculator): localStorage is per origin, so unprefixed keys could collide.
 * Never call localStorage.clear(): remove Monedo's own keys only.
 */
export const STORAGE_PREFIX = "monedo:";

export const STORAGE_KEYS = {
  theme: `${STORAGE_PREFIX}theme`,
  progress: `${STORAGE_PREFIX}progress`,
} as const;
