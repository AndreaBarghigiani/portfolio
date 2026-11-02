/**
 * Sheet metadata derived from the route (docs/design-system.md section 6):
 * the page code shown in the title block and whether the page is a detail page.
 * Codes follow the design's numbering; nothing is hand-maintained per page.
 */
export type SheetMeta = {
  /** Page code and name as drawn in the title block, for example "03 / WRITING". */
  code: string;
  /** Detail pages have a reading bar with "back to top", so the footer's right cell stays empty. */
  detail?: boolean;
};

export function getSheetMeta(pathname: string): SheetMeta {
  const segments = pathname.split('/').filter(Boolean);
  const [section, , third] = segments;
  const depth = segments.length;

  switch (section) {
    case undefined:
      return { code: '01 / HOME' };
    case 'posts':
      return depth === 1 ? { code: '03 / WRITING' } : { code: '02 / ARTICLE', detail: true };
    case 'notes':
      if (depth === 1) return { code: '04 / NOTES' };
      return third === undefined
        ? { code: '08 / COURSE NOTES', detail: true }
        : { code: '09 / LESSON', detail: true };
    case 'series':
      return depth === 1 ? { code: '05 / SERIES' } : { code: '06 / SERIES ENTRY', detail: true };
    case 'changelog':
      return { code: '07 / CHANGELOG' };
    case 'projects':
      return depth === 1 ? { code: '11 / PROJECTS' } : { code: '10 / PROJECT', detail: true };
    default:
      return { code: '--' };
  }
}
