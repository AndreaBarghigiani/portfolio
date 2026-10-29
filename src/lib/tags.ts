/**
 * Normalises topic values from content into individual chip values.
 * Accepts the comma-separated string older posts use (`tags: til, javascript`)
 * or an array. It never adds values: unknown or missing input gives `[]`.
 * Wiring this to routes, and the content schema, is a later decision (#43).
 */
export function getTopics(tags?: string | readonly string[] | null): string[] {
  const raw = typeof tags === 'string' ? tags.split(',') : [...(tags ?? [])];
  const seen = new Set<string>();
  const topics: string[] = [];

  for (const value of raw) {
    const topic = value.trim();
    const key = topic.toLowerCase();
    if (topic && !seen.has(key)) {
      seen.add(key);
      topics.push(topic);
    }
  }

  return topics;
}
