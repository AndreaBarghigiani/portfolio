import type { CollectionEntry } from 'astro:content';
import { DEFAULT_CONFIGURATION } from './constants';

const dateParts = (date: Date) => ({
  day: String(date.getUTCDate()).padStart(2, '0'),
  month: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
  year: date.getUTCFullYear(),
});

/** Full mono date as drawn in the design, for example "08 MAR 2026". */
export const formatDate = (date: Date) => {
  const { day, month, year } = dateParts(date);
  return `${day} ${month} ${year}`;
};

/** Date inside a year group, where the margin already shows the year: "08 MAR". */
export const formatDayMonth = (date: Date) => {
  const { day, month } = dateParts(date);
  return `${day} ${month}`;
};

const WORDS_PER_MINUTE = 200;

/** Reading time derived from the source text, for example "7 MIN". Omitted when there is no text. */
export const formatReadingTime = (body?: string) => {
  const words = body?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return words > 0 ? `${Math.ceil(words / WORDS_PER_MINUTE)} MIN` : undefined;
};

export const generateAbsoluteUrl = (path: string) => DEFAULT_CONFIGURATION.baseUrl.concat(path);

export const isDevelopment = () => import.meta.env.MODE === 'development';

export const includeDraft = (draft: boolean) => {
  if (isDevelopment()) return true;
  return draft !== true;
};

export const sortJobsByDate = (jobs: CollectionEntry<'jobs'>[]) => {
  // Convert "Now" to current year, otherwise returns the year as is
  const getEndYear = (job: CollectionEntry<'jobs'>) =>
    job.data.to === 'Now' ? new Date().getFullYear() : job.data.to;

  return jobs.sort((current, next) => {
    // Compare end years first, then fall back to start years if end years are equal
    const [currentEnd, nextEnd] = [getEndYear(current), getEndYear(next)];
    return nextEnd - currentEnd || next.data.from - current.data.from;
  });
};

export const sortPostsByDate = (posts: CollectionEntry<'posts'>[]) =>
  [...posts].sort((a, b) => {
    const aTime =
      a.data.date instanceof Date
        ? a.data.date.getTime()
        : new Date(a.data.date as unknown as string).getTime();

    const bTime =
      b.data.date instanceof Date
        ? b.data.date.getTime()
        : new Date(b.data.date as unknown as string).getTime();

    return bTime - aTime; // descending: newest first
  });

export const getPostSlugFromId = (postId: string) => {
  const withoutIndex = postId.replace(/\/index$/, '');
  const parts = withoutIndex.split('/');
  return parts[parts.length - 1] ?? withoutIndex;
};

export const getNotesSlugFromId = (entryId: string) => {
  const withoutIndex = entryId.replace(/\/index$/, '');
  const parts = withoutIndex.split('/');
  return parts[parts.length - 1] ?? withoutIndex;
};

export const getLessonRouteInfoFromId = (lessonId: string) => {
  const sanitized = lessonId.replace(/\/index$/, '');
  const parts = sanitized.split('/');
  const courseSlug = parts[0];
  const lessonIndex = parts.indexOf('lesson');

  const lessonSegments = lessonIndex >= 0 ? parts.slice(lessonIndex + 1) : parts.slice(1);
  const lessonSlug = parts[parts.length - 1] ?? '';
  const lessonPathSegments = ['lesson', lessonSlug];
  const lessonPath = lessonPathSegments.join('/');

  return {
    courseSlug,
    lessonSegments,
    lessonSlug,
    lessonPathSegments,
    lessonPath,
  } as const;
};

/**
 * Checks if the current URL path matches the given path or path pattern
 * @param currentPath The current URL path (from Astro.url.pathname)
 * @param targetPath The path or path pattern to match against
 * @returns boolean indicating if the current path matches the target path/pattern
 */
export function isCurrent(currentPath: string, targetPath: string): boolean {
  // Normalize targetPath: ensure leading slash and remove trailing slash unless root
  let normalizedTarget = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  if (normalizedTarget.length > 1 && normalizedTarget.endsWith('/')) {
    normalizedTarget = normalizedTarget.slice(0, -1);
  }

  // Normalize currentPath similarly (optional but recommended)
  let normalizedCurrent = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  if (normalizedCurrent.length > 1 && normalizedCurrent.endsWith('/')) {
    normalizedCurrent = normalizedCurrent.slice(0, -1);
  }

  // Early return for root path
  if (normalizedTarget === '/') {
    return normalizedCurrent === '/';
  }

  // Return true if currentPath is exactly targetPath or starts with targetPath + '/'
  return (
    normalizedCurrent === normalizedTarget || normalizedCurrent.startsWith(normalizedTarget + '/')
  );
}
