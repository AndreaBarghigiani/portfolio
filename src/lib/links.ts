/**
 * Arrow convention (docs/design-system.md section 8):
 * `→` internal, `↗` external (including mailto: and other origins),
 * `←` back, `↑` / `↓` directional only.
 */
export type ArrowDirection = 'back' | 'up' | 'down';

export const ARROWS = {
  internal: '→',
  external: '↗',
  back: '←',
  up: '↑',
  down: '↓',
} as const;

/** True when the destination leaves the site: absolute http(s), protocol-relative or mailto:. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href) || /^mailto:/i.test(href);
}
