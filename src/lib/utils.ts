import type { CollectionEntry } from 'astro:content';
import { DEFAULT_CONFIGURATION } from './constants';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Default to UTC to prevent timezone issues
  });

  // Ensure we're parsing the date correctly
  return formatter.format(new Date(date));
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
