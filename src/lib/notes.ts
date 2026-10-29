import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { getLessonRouteInfoFromId } from '@/lib/utils';

export type ModuleGroup = {
  moduleKey: string;
  moduleName: string;
  moduleDescription: string | null;
  moduleUrl: string | null;
  lessons: CollectionEntry<'lessonNotes'>[];
};

export function lessonHref(courseSlug: string, lesson: CollectionEntry<'lessonNotes'>) {
  return `/notes/${courseSlug}/${getLessonRouteInfoFromId(lesson.id).lessonPath}/`;
}

/** A course's lessons grouped by module, in module then lesson order. */
export async function getCourseModules(courseSlug: string): Promise<ModuleGroup[]> {
  const lessons = await getCollection('lessonNotes');
  const modules = await getCollection('courseModules');

  const moduleLookup = new Map<string, CollectionEntry<'courseModules'>>();
  for (const module of modules) {
    if (!module.data.course || module.data.course === courseSlug)
      moduleLookup.set(module.id, module);
  }

  const groups: ModuleGroup[] = [];

  lessons
    .filter((lesson) => {
      const { courseSlug: lessonCourse } = getLessonRouteInfoFromId(lesson.id);
      return lessonCourse === courseSlug || lesson.data.course === courseSlug;
    })
    .map((lesson) => {
      const moduleId =
        typeof lesson.data.module === 'string'
          ? lesson.data.module
          : (lesson.data.module?.id ?? null);
      const moduleEntry = moduleId ? (moduleLookup.get(moduleId) ?? null) : null;
      return {
        lesson,
        moduleEntry,
        moduleName: moduleEntry?.data.title ?? 'Standalone lessons',
        moduleKey: moduleEntry?.id ?? '__standalone__',
        moduleOrder: moduleEntry?.data.order ?? lesson.data.moduleOrder ?? Number.MAX_SAFE_INTEGER,
        lessonOrder: lesson.data.order ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort(
      (a, b) =>
        a.moduleOrder - b.moduleOrder ||
        a.moduleName.localeCompare(b.moduleName) ||
        a.lessonOrder - b.lessonOrder ||
        a.lesson.data.title.localeCompare(b.lesson.data.title)
    )
    .forEach((current) => {
      const existing = groups.find((group) => group.moduleKey === current.moduleKey);
      if (existing) {
        existing.lessons.push(current.lesson);
        return;
      }
      groups.push({
        moduleKey: current.moduleKey,
        moduleName: current.moduleName,
        moduleDescription: current.moduleEntry?.data.description ?? null,
        moduleUrl: current.moduleEntry?.data.url ?? null,
        lessons: [current.lesson],
      });
    });

  return groups;
}
