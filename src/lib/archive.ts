import type { CollectionEntry } from 'astro:content';
import { sortPostsByDate } from '@/lib/utils';

export type YearGroup<T> = { year: number; items: T[] };

/** Groups items by UTC year, newest year first; items keep the order given. */
export function groupByYear<T>(items: T[], getDate: (item: T) => Date): YearGroup<T>[] {
  const groups = new Map<number, T[]>();
  for (const item of items) {
    const year = getDate(item).getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), item]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, list]) => ({ year, items: list }));
}

/** Splits year groups into pages of at most `yearsPerPage` years, whatever the item count. */
export function paginateYears<T>(groups: YearGroup<T>[], yearsPerPage = 3): YearGroup<T>[][] {
  const pages: YearGroup<T>[][] = [];
  for (let i = 0; i < groups.length; i += yearsPerPage) {
    pages.push(groups.slice(i, i + yearsPerPage));
  }
  return pages;
}

/** "2026 — 2024", or a single year when the page holds one. */
export function rangeLabel<T>(page: YearGroup<T>[]): string {
  const first = page[0]?.year;
  const last = page[page.length - 1]?.year;
  return first === last ? String(first) : `${first} — ${last}`;
}

export type PostArchivePage = {
  number: number;
  href: string;
  range: string;
  groups: YearGroup<CollectionEntry<'posts'>>[];
};

/** Post archive pages: `/posts/` then `/posts/page/N/`, three years each. */
export function buildPostArchivePages(posts: CollectionEntry<'posts'>[]): PostArchivePage[] {
  const pages = paginateYears(groupByYear(sortPostsByDate(posts), (post) => post.data.date));
  return pages.map((groups, index) => ({
    number: index + 1,
    href: index === 0 ? '/posts/' : `/posts/page/${index + 1}/`,
    range: rangeLabel(groups),
    groups,
  }));
}
