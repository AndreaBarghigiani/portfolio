/**
 * Sheet metadata derived from the route (docs/design-system.md section 6):
 * the page code shown in the title block and the footer's right-cell variant.
 * Codes follow the design's numbering; nothing is hand-maintained per page.
 */
export type SheetBack = { label: string; href: string };

export type SheetMeta = {
  code: string;
  /** Present on detail pages: footer shows "Back to {label}" instead of "back to top". */
  back?: SheetBack;
};

const WRITING: SheetBack = { label: 'Posts', href: '/posts' };
const SERIES: SheetBack = { label: 'Series', href: '/series' };
const NOTES: SheetBack = { label: 'Notes', href: '/notes' };
const PROJECTS: SheetBack = { label: 'Projects', href: '/projects/' };

export function getSheetMeta(pathname: string): SheetMeta {
  const segments = pathname.split('/').filter(Boolean);
  const [section, , third] = segments;
  const depth = segments.length;

  switch (section) {
    case undefined:
      return { code: '01' };
    case 'posts':
      return depth === 1 ? { code: '03' } : { code: '02', back: WRITING };
    case 'notes':
      if (depth === 1) return { code: '04' };
      return third === undefined ? { code: '08', back: NOTES } : { code: '09', back: NOTES };
    case 'series':
      return depth === 1 ? { code: '05' } : { code: '06', back: SERIES };
    case 'changelog':
      return { code: '07' };
    case 'projects':
      return depth === 1 ? { code: '11' } : { code: '10', back: PROJECTS };
    default:
      return { code: '--' };
  }
}
