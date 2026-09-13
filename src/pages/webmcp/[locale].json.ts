import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { essayLocale, essayPath, getLocalizedPosts } from '../../data/essays';
import { compareProjects } from '../../data/project-order';
import { speakingTalks } from '../../data/speaking';
import { teachingItems } from '../../data/teaching';
import {
  getMessages,
  LOCALES,
  ROUTES,
  localizedPath,
  localizeProject,
  localizeSpeaking,
  localizeTeaching,
  type Locale,
  type RouteKey,
} from '../../i18n';
import type { SearchEntry } from '../../webmcp/search';

export function getStaticPaths() {
  return Object.keys(LOCALES).map((locale) => ({ params: { locale } }));
}

export async function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const [projects, posts, archive] = await Promise.all([
    getCollection('projects'),
    getLocalizedPosts(locale),
    getCollection('archive', ({ data }) => !data.draft),
  ]);
  const entries: SearchEntry[] = (Object.keys(ROUTES) as RouteKey[]).map(
    (route) => ({
      title:
        route === 'archive'
          ? messages.archivePage.heading
          : route === 'home'
            ? messages.home.name
            : messages[route].heading,
      description:
        route === 'home'
          ? messages.home.intro
          : route === 'archive'
            ? messages.archivePage.description
            : messages[route].description,
      url: localizedPath(locale, route),
      kind: 'page',
      language: LOCALES[locale].tag,
      keywords: [route],
    }),
  );
  entries.push(
    ...projects.sort(compareProjects).map((project) => ({
      title: project.data.name,
      description: localizeProject(project, locale).description,
      url: localizedPath(locale, 'projects'),
      kind: 'project' as const,
      language: LOCALES[locale].tag,
      keywords: [
        project.data.type,
        project.data.status ?? '',
        ...project.data.tech,
      ],
      links: [
        ...(project.data.url
          ? [{ label: 'site', href: project.data.url }]
          : []),
        ...(project.data.github
          ? [{ label: 'github', href: project.data.github }]
          : []),
      ],
    })),
  );
  entries.push(
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: essayPath(post),
      kind: 'essay' as const,
      language: LOCALES[essayLocale(post)].tag,
      keywords: post.data.tags,
    })),
  );
  entries.push(
    ...archive
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        url: `/archive/${entry.id}/`,
        kind: 'archive' as const,
        language: 'en',
        keywords: entry.data.tags,
      })),
  );
  for (const [kind, items] of [
    ['teaching', localizeTeaching(teachingItems, locale)],
    ['speaking', localizeSpeaking(speakingTalks, locale)],
  ] as const) {
    entries.push(
      ...items.map((item) => ({
        title: item.title,
        description: item.description,
        url: localizedPath(locale, kind),
        kind,
        language: LOCALES[locale].tag,
        keywords: [
          item.canonicalTitle,
          item.secondary,
          item.location,
          item.date,
        ],
        links: item.links.map(({ label, href }) => ({ label, href })),
      })),
    );
  }
  return Response.json(entries);
}
