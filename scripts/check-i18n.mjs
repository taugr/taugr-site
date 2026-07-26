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

if (failures.length > 0) {
  console.error(
    [
      'Localization checks failed:',
      ...failures.map((failure) => `- ${failure}`),
    ].join('\n'),
  );
  process.exit(1);
}

console.log('Localization checks passed for 14 translated routes.');
