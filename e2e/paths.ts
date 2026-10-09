/** The site is served under this base path, as on GitHub Pages. */
export const BASE_PATH = "/monedo";

/** "/cursos" → "/monedo/cursos/" (trailing slash, as exported). Keeps any #hash. */
export function route(path: string): string {
  const [pathname = "/", hash] = path.split("#");
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${BASE_PATH}${slashed}${hash ? `#${hash}` : ""}`;
}
