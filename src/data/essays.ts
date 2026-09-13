import { getCollection, type CollectionEntry } from 'astro:content';
import getReadingTime from 'reading-time';
import { localizedPath, type Locale } from '../i18n';

export type Essay =
  | CollectionEntry<'posts'>
  | CollectionEntry<'postTranslations'>;
export type EssayAlternates = Partial<Record<Locale, string>>;

export function essayLocale(post: Essay): Locale {
  return post.collection === 'postTranslations' ? post.data.locale : 'en';
}

export function essaySlug(post: Essay): string {
  return post.collection === 'postTranslations'
    ? post.data.translationOf.id
    : post.id;
}

export function essayPath(post: Essay): string {
  return `${localizedPath(essayLocale(post), 'essays')}${essaySlug(post)}/`;
}

export function readingTime(body: string, locale: Locale): string {
  const minutes = Math.max(1, Math.ceil(getReadingTime(body).minutes));
  if (locale === 'es') return `${minutes} min de lectura`;
  if (locale === 'hy') return `${minutes} րոպե ընթերցանություն`;
  return `${minutes} min read`;
}

// Only expose translations whose original is also published.
export async function publishedTranslations() {
  const [posts, translations] = await Promise.all([
    getCollection('posts', ({ data }) => !data.draft),
    getCollection('postTranslations', ({ data }) => !data.draft),
  ]);
  const originals = new Set(posts.map((post) => post.id));
  const seen = new Set<string>();
  return translations.filter((post) => {
    const key = `${post.data.locale}/${post.data.translationOf.id}`;
    if (seen.has(key)) throw new Error(`Duplicate essay translation: ${key}`);
    seen.add(key);
    return originals.has(post.data.translationOf.id);
  });
}

export async function getLocalizedPosts(locale: Locale): Promise<Essay[]> {
  const [posts, translations] = await Promise.all([
    getCollection('posts', ({ data }) => !data.draft),
    locale === 'en' ? Promise.resolve([]) : publishedTranslations(),
  ]);
  return posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(
      (post) =>
        translations.find(
          (translation) =>
            translation.data.locale === locale &&
            translation.data.translationOf.id === post.id,
        ) ?? post,
    );
}

export async function essayAlternates(slug: string): Promise<EssayAlternates> {
  const alternates: EssayAlternates = { en: `/essays/${slug}/` };
  for (const translation of await publishedTranslations()) {
    if (translation.data.translationOf.id === slug) {
      alternates[translation.data.locale] = essayPath(translation);
    }
  }
  return alternates;
}
