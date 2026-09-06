import type { CollectionEntry } from 'astro:content';

// Explicit editorial order takes precedence; other projects remain newest first.
export function compareProjects(
  a: CollectionEntry<'projects'>,
  b: CollectionEntry<'projects'>,
) {
  const priority =
    (a.data.displayOrder ?? Number.MAX_SAFE_INTEGER) -
    (b.data.displayOrder ?? Number.MAX_SAFE_INTEGER);
  return priority || b.data.date.valueOf() - a.data.date.valueOf();
}
