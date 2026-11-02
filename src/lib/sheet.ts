/**
 * Sheet metadata derived from the route (docs/design-system.md section 6):
 * the page code shown in the title block and the footer's right-cell variant.
 * Codes follow the design's numbering; nothing is hand-maintained per page.
 */
export type SheetBack = { label: string; href: string };

export type SheetMeta = {
  /** Page code and name as drawn in the title block, for example "03 / WRITING". */
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
      return { code: '01 / HOME' };
    case 'posts':
      return depth === 1 ? { code: '03 / WRITING' } : { code: '02 / ARTICLE', back: WRITING };
    case 'notes':
      if (depth === 1) return { code: '04 / NOTES' };
      return third === undefined
        ? { code: '08 / COURSE NOTES', back: NOTES }
        : { code: '09 / LESSON', back: NOTES };
    case 'series':
      return depth === 1 ? { code: '05 / SERIES' } : { code: '06 / SERIES ENTRY', back: SERIES };
    case 'changelog':
      return { code: '07 / CHANGELOG' };
    case 'projects':
      return depth === 1 ? { code: '11 / PROJECTS' } : { code: '10 / PROJECT', back: PROJECTS };
    default:
      return { code: '--' };
  }
}
