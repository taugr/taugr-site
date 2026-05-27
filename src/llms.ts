import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { speakingTalks } from './data/speaking';
import { teachingItems } from './data/teaching';
import type { ContentLink } from './data/content';
import type { SpeakingTalk } from './data/speaking';
import type { TeachingItem } from './data/teaching';
import { PROFILE_LINKS, SITE } from './site';

const STATIC_PAGES = [
  {
    title: 'Home',
    path: '/',
    description: SITE.description,
  },
  {
    title: 'About',
    path: '/about/',
    description:
      'About Tom Auger, Lead AI Engineer at the TUMO Center for Creative Technologies.',
  },
  {
    title: 'Essays',
    path: '/essays/',
    description: 'Essays and experiments.',
  },
  {
    title: 'Projects',
    path: '/projects/',
    description: 'A selection of products, tools, and research.',
  },
  {
    title: 'Teaching',
    path: '/teaching/',
    description: 'AI workshops and learning labs.',
  },
  {
    title: 'Speaking',
    path: '/speaking/',
    description: 'Public talks, panels, and appearances.',
  },
  {
    title: 'RSS',
    path: '/rss.xml',
    description: 'RSS feed for essays.',
  },
];

type SiteContent = {
  baseUrl: string;
  posts: CollectionEntry<'posts'>[];
  projects: CollectionEntry<'projects'>[];
};

function getBaseUrl(context: APIContext) {
  return (context.site ?? new URL(SITE.url)).toString();
}

function absoluteUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl).toString();
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function linkUrl(baseUrl: string, href: string) {
  return new URL(href, baseUrl).toString();
}

function renderLinks(links: ContentLink[], baseUrl: string) {
  return links
    .map((link) => `[${link.label}](${linkUrl(baseUrl, link.href)})`)
    .join(', ');
}

function textResponse(body: string) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

async function getSiteContent(context: APIContext): Promise<SiteContent> {
  const [posts, projects] = await Promise.all([
    getCollection('posts', ({ data }) => !data.draft),
    getCollection('projects'),
  ]);

  return {
    baseUrl: getBaseUrl(context),
    posts: posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
    projects: projects.sort(
      (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    ),
  };
}

function renderOverview({ baseUrl, posts, projects }: SiteContent) {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Site: ${absoluteUrl(baseUrl, '/')}`,
    '',
    'Tom Auger is Lead AI Engineer at the TUMO Center for Creative Technologies. His technical interests are in AI and cyber security, and he runs workshops teaching AI to teens around the world.',
    '',
    '## Primary pages',
    '',
    ...STATIC_PAGES.map(
      (page) =>
        `- [${page.title}](${absoluteUrl(baseUrl, page.path)}): ${page.description}`,
    ),
    '',
    '## Profiles',
    '',
    ...PROFILE_LINKS.map((link) => `- [${link.label}](${link.href})`),
    '',
    '## Essays',
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${absoluteUrl(baseUrl, `/essays/${post.id}/`)}) (${formatDate(post.data.date)}): ${normalizeText(post.data.description)}`,
    ),
    '',
    '## Projects',
    '',
    ...projects.map((project) => {
      const links = [project.data.url, project.data.github]
        .filter(Boolean)
        .join(', ');
      const suffix = links ? ` Links: ${links}.` : '';
      return `- [${project.data.name}](${absoluteUrl(baseUrl, `/projects/`)}) (${formatDate(project.data.date)}): ${normalizeText(project.data.description)}${suffix}`;
    }),
    '',
    '## Teaching',
    '',
    ...teachingItems.map((item) => {
      const links = renderLinks(item.links, baseUrl);
      const suffix = links ? ` Links: ${links}.` : '';
      return `- ${item.title} (${item.date}, ${item.location}): ${normalizeText(item.description)}${suffix}`;
    }),
    '',
    '## Speaking',
    '',
    ...speakingTalks.map((talk) => {
      const links = renderLinks(talk.links, baseUrl);
      const suffix = links ? ` Links: ${links}.` : '';
      return `- ${talk.title} (${talk.date}, ${talk.location}): ${normalizeText(talk.description)}${suffix}`;
    }),
  ];

  return lines.join('\n');
}

function renderPost(post: CollectionEntry<'posts'>, baseUrl: string) {
  return [
    `## ${post.data.title}`,
    '',
    `URL: ${absoluteUrl(baseUrl, `/essays/${post.id}/`)}`,
    `Date: ${formatDate(post.data.date)}`,
    `Description: ${normalizeText(post.data.description)}`,
    post.data.tags.length > 0
      ? `Tags: ${post.data.tags.join(', ')}`
      : undefined,
    '',
    post.body?.trim() ?? '',
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

function renderProject(project: CollectionEntry<'projects'>) {
  return [
    `## ${project.data.name}`,
    '',
    `Date: ${formatDate(project.data.date)}`,
    `Type: ${project.data.type}`,
    `Description: ${normalizeText(project.data.description)}`,
    `Tech: ${project.data.tech.join(', ')}`,
    project.data.url ? `URL: ${project.data.url}` : undefined,
    project.data.github ? `GitHub: ${project.data.github}` : undefined,
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

function renderTeachingItem(item: TeachingItem, baseUrl: string) {
  return [
    `## ${item.title}`,
    '',
    `Date: ${item.date}`,
    `Host: ${item.host}`,
    item.format ? `Format: ${item.format}` : undefined,
    `Location: ${item.location}`,
    `Description: ${normalizeText(item.description)}`,
    item.links.length > 0
      ? `Links: ${renderLinks(item.links, baseUrl)}`
      : undefined,
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

function renderSpeakingTalk(talk: SpeakingTalk, baseUrl: string) {
  return [
    `## ${talk.title}`,
    '',
    `Date: ${talk.date}`,
    `Event: ${talk.event}`,
    `Location: ${talk.location}`,
    `Description: ${normalizeText(talk.description)}`,
    talk.links.length > 0
      ? `Links: ${renderLinks(talk.links, baseUrl)}`
      : undefined,
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

export async function createLlmsTxt(context: APIContext) {
  const content = await getSiteContent(context);
  const body = [
    renderOverview(content),
    '',
    '## Full context',
    '',
    `- [llms-full.txt](${absoluteUrl(content.baseUrl, '/llms-full.txt')}): extended essay, project, teaching, and speaking context.`,
    '',
  ].join('\n');

  return textResponse(body);
}

export async function createLlmsFullTxt(context: APIContext) {
  const content = await getSiteContent(context);
  const body = [
    renderOverview(content),
    '',
    '# Full essay content',
    '',
    ...content.posts.flatMap((post) => [renderPost(post, content.baseUrl), '']),
    '# Full project context',
    '',
    ...content.projects.flatMap((project) => [renderProject(project), '']),
    '# Full teaching context',
    '',
    ...teachingItems.flatMap((item) => [
      renderTeachingItem(item, content.baseUrl),
      '',
    ]),
    '# Full speaking context',
    '',
    ...speakingTalks.flatMap((talk) => [
      renderSpeakingTalk(talk, content.baseUrl),
      '',
    ]),
  ].join('\n');

  return textResponse(body);
}
