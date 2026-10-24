import { getCollection } from 'astro:content';

export async function getPublishedProjects() {
  const projects = await getCollection('projects', (project) => !project.data.draft);

  return projects.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}
