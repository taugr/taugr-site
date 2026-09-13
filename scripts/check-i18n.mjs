import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const dist = join(root, 'dist');
const routes = [
  '',
  'essays',
  'projects',
  'teaching',
  'speaking',
  'about',
  'archive',
];
const localeConfig = {
  es: { lang: 'es-ES', name: 'Tom Auger' },
  hy: { lang: 'hy-AM', name: 'Թոմ Օգեր' },
};
const failures = [];

function readRoute(locale, route) {
  const file = join(dist, locale, route, 'index.html');
  if (!existsSync(file)) {
    failures.push(
      `Missing generated route: /${locale}/${route ? `${route}/` : ''}`,
    );
    return '';
  }
  return readFileSync(file, 'utf8');
}

for (const [locale, config] of Object.entries(localeConfig)) {
  for (const route of routes) {
    const html = readRoute(locale, route);
    if (!html) continue;
    const pathname = `/${locale}/${route ? `${route}/` : ''}`;
    if (!html.includes(`<html lang="${config.lang}">`)) {
      failures.push(`${pathname} does not use lang=${config.lang}`);
    }
    if (
      !html.includes(`<link rel="canonical" href="https://tau.gr${pathname}">`)
    ) {
      failures.push(`${pathname} has an incorrect canonical URL`);
    }
    for (const hreflang of ['en', 'es-ES', 'hy-AM', 'x-default']) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        failures.push(`${pathname} is missing hreflang=${hreflang}`);
      }
    }
    if (!html.includes(config.name)) {
      failures.push(
        `${pathname} is missing expected owner name: ${config.name}`,
      );
    }
    if (route && !html.includes(`href="/${locale}/${route}/"`)) {
      failures.push(`${pathname} is missing its localized navigation target`);
    }
  }
}

for (const locale of Object.keys(localeConfig)) {
  for (const section of ['essays', 'archive']) {
    const detailDirectory = join(
      dist,
      locale,
      section,
      'set-up-wireguard-vpn-ubuntu-mac',
    );
    if (existsSync(detailDirectory)) {
      failures.push(
        `Untranslated article detail was generated: /${locale}/${section}/...`,
      );
    }
  }
}

const rss = readFileSync(join(dist, 'rss.xml'), 'utf8');
if (
  !rss.includes('https://tau.gr/essays/') ||
  rss.includes('https://tau.gr/es/essays/')
) {
  failures.push('RSS article URLs are no longer canonical English URLs');
}

const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
for (const locale of Object.keys(localeConfig)) {
  for (const route of routes) {
    const url = `https://tau.gr/${locale}/${route ? `${route}/` : ''}`;
    if (!sitemap.includes(url)) failures.push(`Sitemap is missing ${url}`);
  }
}

// Check translated essay discovery, language switching, and content structure.
const englishEssays = JSON.parse(
  readFileSync(join(dist, 'webmcp/en.json'), 'utf8'),
).filter((entry) => entry.kind === 'essay');
let translatedEssayCount = 0;
for (const [locale, config] of Object.entries(localeConfig)) {
  const essays = JSON.parse(
    readFileSync(join(dist, `webmcp/${locale}.json`), 'utf8'),
  ).filter((entry) => entry.kind === 'essay' && entry.language === config.lang);
  for (const essay of essays) {
    translatedEssayCount++;
    const route = essay.url.replace(`/${locale}/`, '').replace(/\/$/, '');
    const html = readRoute(locale, route);
    const original = englishEssays.find(
      (entry) => essay.url === `/${locale}${entry.url}`,
    );
    if (!original) {
      failures.push(`${essay.url} has no published original`);
      continue;
    }
    const originalHtml = readFileSync(
      join(dist, original.url, 'index.html'),
      'utf8',
    );
    const body =
      html.match(/<div class="mt-6 prose"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    const originalBody =
      originalHtml.match(
        /<div class="mt-6 prose"[^>]*>([\s\S]*?)<\/div>/,
      )?.[1] ?? '';
    if (!body || !originalBody || body === originalBody)
      failures.push(`${essay.url} has no translated body`);
    const links = (value) =>
      [...value.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    if (JSON.stringify(links(body)) !== JSON.stringify(links(originalBody))) {
      failures.push(`${essay.url} changed or omitted source links`);
    }
    for (const tag of ['p', 'h2', 'blockquote', 'aside']) {
      const count = (value) =>
        (value.match(new RegExp(`<${tag}[ >]`, 'g')) ?? []).length;
      if (count(body) !== count(originalBody))
        failures.push(`${essay.url} changed ${tag} structure`);
    }
    if (
      !html.includes(`<html lang="${config.lang}">`) ||
      !html.includes(`<link rel="canonical" href="https://tau.gr${essay.url}">`)
    ) {
      failures.push(
        `${essay.url} has incorrect language or canonical metadata`,
      );
    }
    for (const [target, lang] of [
      ['en', 'en'],
      ...Object.entries(localeConfig).map(([key, value]) => [key, value.lang]),
    ]) {
      const path = target === 'en' ? original.url : `/${target}${original.url}`;
      if (
        !html.includes(`hreflang="${lang}" href="https://tau.gr${path}"`) ||
        !html.includes(`href="${path}" lang="${lang}"`)
      ) {
        failures.push(
          `${essay.url} is missing its ${target} article alternate or language choice`,
        );
      }
      if (
        !originalHtml.includes(
          `hreflang="${lang}" href="https://tau.gr${path}"`,
        )
      ) {
        failures.push(
          `${original.url} is missing its ${target} reciprocal alternate`,
        );
      }
    }
    for (const index of ['', 'essays']) {
      const indexHtml = readRoute(locale, index);
      if (
        !indexHtml.includes(`href="${essay.url}"`) ||
        !indexHtml.includes(essay.title)
      ) {
        failures.push(`/${locale}/${index} does not list the translated essay`);
      }
    }
    if (!sitemap.includes(`https://tau.gr${essay.url}`))
      failures.push(`Sitemap is missing ${essay.url}`);
    if (rss.includes(`https://tau.gr${essay.url}`))
      failures.push(`English RSS duplicates ${essay.url}`);
  }
}

if (failures.length > 0) {
  console.error(
    [
      'Localization checks failed:',
      ...failures.map((failure) => `- ${failure}`),
    ].join('\n'),
  );
  process.exit(1);
}

console.log(
  `Localization checks passed for 14 translated index routes and ${translatedEssayCount} translated essays.`,
);
