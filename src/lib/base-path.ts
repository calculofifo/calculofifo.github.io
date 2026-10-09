/** Deployment base path ("/monedo" on GitHub Pages, "" in unit tests). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative path for elements Next.js does not rewrite itself
 * (plain <a href> to files, <img src>). next/link and metadata icons are handled by Next.
 */
export function asset(path: `/${string}`): string {
  return `${BASE_PATH}${path}`;
}
