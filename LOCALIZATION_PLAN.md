# Website localization plan

Status: implemented locally on 2026-07-27; awaiting deployment.

## Goal

Add complete localized versions of the site's non-article experience in:

- English (`en`) at the existing unprefixed URLs
- European Spanish (`es-ES`) under `/es/`
- Eastern Armenian (`hy-AM`) under `/hy/`

Article bodies can remain in English. The Armenian rendering of the site owner's name must always be `Թոմ Օգեր`.

## Product decisions

1. Keep all existing English URLs unchanged. This protects inbound links, existing canonical URLs, RSS links, and old-route redirects.
2. Use short, readable locale prefixes for translated pages: `/es/` and `/hy/`. Use the more precise `es-ES` and `hy-AM` language tags in HTML and metadata.
3. Do not redirect visitors automatically from `/` based on browser language. The selected language is represented by the URL, and the picker gives visitors explicit control.
4. Translate all visitor-facing non-article copy, including navigation, footer text, accessibility labels, metadata, project descriptions, the about timeline, teaching entries, speaking entries, dates, locations, link labels, status labels, lightbox controls, and the 404 message.
5. Treat essay and archive titles, descriptions, tags, and bodies as article content and leave them in English for now.
6. Keep article detail pages at their existing English-only URLs. Localized essay and archive indexes link to those canonical pages and clearly state that the articles are in English.
7. Treat the preserved resource pages under `/speaking/aitalk/`, `/speaking/aisymposium/`, and `/teaching/tumo2023/` as English article-like content. Localized teaching or speaking pages may link to them with an English-language indicator.
8. Leave RSS, `llms.txt`, and `llms-full.txt` English-only in this phase. They should continue pointing to canonical English article URLs. Localizing these machine-facing outputs can be a separate follow-up.
9. Do not use flags for the language picker. Show language endonyms: `English`, `Español`, and `Հայերեն`.

## Route model

| Page           | English            | Spanish         | Armenian        |
| -------------- | ------------------ | --------------- | --------------- |
| Home           | `/`                | `/es/`          | `/hy/`          |
| Essays index   | `/essays/`         | `/es/essays/`   | `/hy/essays/`   |
| Projects       | `/projects/`       | `/es/projects/` | `/hy/projects/` |
| Teaching       | `/teaching/`       | `/es/teaching/` | `/hy/teaching/` |
| Speaking       | `/speaking/`       | `/es/speaking/` | `/hy/speaking/` |
| About          | `/about/`          | `/es/about/`    | `/hy/about/`    |
| Archive index  | `/archive/`        | `/es/archive/`  | `/hy/archive/`  |
| Essay detail   | `/essays/<slug>/`  | English URL     | English URL     |
| Archive detail | `/archive/<slug>/` | English URL     | English URL     |

The picker should preserve the current page when an equivalent translated route exists. On an English-only article or resource page, selecting Spanish or Armenian should go to the closest localized index (`essays`, `archive`, `speaking`, or `teaching`) rather than inventing a localized detail URL.

## Current-state findings

- `astro.config.mjs` has no `i18n` configuration.
- `src/layouts/BaseLayout.astro` hard-codes `<html lang="en">`, English navigation, footer links, metadata labels, and analytics hooks.
- `src/site.ts` contains global English site metadata and navigation.
- The main translated surface spans home, projects, teaching, speaking, about, essays index, archive index, and the shared 404 page.
- Project descriptions and image alternative text live in ten Markdown entries under `src/content/projects/`.
- Teaching and speaking entries are structured TypeScript arrays, but they do not yet have stable IDs for translation lookup.
- The about timeline and homepage engagement copy are embedded directly in page components.
- Dates are inconsistent: projects use real `Date` values, while teaching and speaking use English display strings, including ranges and approximate periods.
- Header actions already become constrained at `1020px`, `790px`, and `520px`, so the picker needs explicit responsive behavior.
- There is no test runner or existing localization validation script. The current gates are formatting, linting, and the static Astro build.

## Proposed architecture

### 1. Configure Astro's locale-aware routing

Update `astro.config.mjs` with English as the unprefixed default and mapped regional codes for the translated route prefixes:

```js
i18n: {
  defaultLocale: 'en',
  locales: [
    'en',
    { path: 'es', codes: ['es-ES', 'es'] },
    { path: 'hy', codes: ['hy-AM', 'hy'] },
  ],
  routing: {
    prefixDefaultLocale: false,
  },
}
```

Do not configure locale fallbacks that silently generate English content at missing Spanish or Armenian URLs. A missing translation on a translated surface should fail validation rather than quietly ship in English.

Use Astro's `astro:i18n` URL helpers where they fit, but keep a small route-key map for picker behavior and for English-only article fallbacks.

### 2. Add a typed localization layer

Create a small `src/i18n/` module with:

- locale definitions, URL prefixes, BCP 47 tags, endonyms, and Open Graph locale values;
- route-key-to-path mappings;
- typed UI messages for shared chrome and each page;
- helpers such as `getLocaleFromPath`, `localizedPath`, `getMessages`, and locale-aware date formatting;
- content translation overlays keyed by stable IDs.

Suggested shape:

```text
src/i18n/
  config.ts
  routes.ts
  types.ts
  ui/
    en.ts
    es.ts
    hy.ts
  content/
    es.ts
    hy.ts
```

English remains the canonical source in the existing content files. Spanish and Armenian overlays contain only translatable fields, but their TypeScript types must require every key used on a translated surface. Avoid a generic runtime fallback that would hide missing translations.

### 3. Give repeated content stable identities

- Use each Astro project collection entry ID to look up localized project descriptions and image alt text.
- Add stable, language-neutral IDs to every teaching and speaking record.
- Move the about timeline out of `src/pages/about.astro` into structured data with stable IDs.
- Make homepage engagement cards reference teaching/speaking IDs instead of repeating their English strings.
- Keep proper names, product names, URLs, technologies, image paths, and analytics identifiers in the canonical data; translate only fields that readers see or assistive technology announces.

The translated overlays should cover, as applicable:

- title and description;
- role, format, status, and event labels;
- display date and location;
- notes and calls to action;
- media alt text and captions;
- internal/external link labels;
- accessible control labels.

### 4. Share page implementations across routes

Extract the rendering bodies of the seven localized pages into locale-aware page components. Keep the existing English route files as thin wrappers, and add static wrappers under `src/pages/[locale]/` for `es` and `hy`.

This avoids maintaining three copies of every Astro page while preserving the existing file-based English routes and English-only dynamic article routes.

Pass `locale` and a stable `routeKey` through page components into `BaseLayout`. Components such as `ProjectCard`, `PostList`, `ThemeToggle`, and the speaking/teaching lightboxes should receive localized labels or obtain them from the typed locale context.

### 5. Add the language picker to the shared header

Add a reusable `LanguagePicker.astro` beside the theme control with these requirements:

- render real links so it works without client JavaScript;
- expose an accessible localized label and `aria-current` state;
- use endonyms and `lang`/`hreflang` attributes on language choices;
- preserve the equivalent route where it exists;
- use the nearest localized index fallback for English-only article/resource pages;
- capture a stable `language_changed` PostHog event with source locale, destination locale, and route key;
- avoid flags and avoid automatic browser-language switching;
- collapse to a compact globe plus language code on narrow screens without hiding the control.

Update the header responsive rules so long Armenian and Spanish labels do not crowd the brand, navigation, or theme toggle. Verify the picker with keyboard-only navigation, focus styles, zoom, and reduced motion.

### 6. Make the layout locale-aware

Extend `BaseLayout.astro` to accept locale and translated site metadata, then update:

- `<html lang>` (`en`, `es-ES`, or `hy-AM`);
- page title and meta description;
- author/site naming (`Թոմ Օգեր` for Armenian; `Tom Auger` elsewhere);
- primary-navigation and footer copy;
- theme-toggle labels and accessible state;
- RSS and other machine-output labels where they appear in visible chrome;
- localized internal links;
- Open Graph locale values;
- canonical and alternate-language links.

For pages that have true translations, emit a self-canonical URL plus `hreflang` alternates for English, `es-ES`, `hy-AM`, and `x-default` pointing to English. Do not advertise untranslated article details as Spanish or Armenian alternates.

The Astro sitemap integration should discover the additional static routes; verify the emitted sitemap rather than assuming it does.

### 7. Translate non-article content deliberately

Prepare complete European Spanish and Eastern Armenian copy for:

- shared site description, navigation, footer, theme control, picker, and 404;
- homepage hero, profile summary, calls to action, section headings, and engagement details;
- all project descriptions, statuses, image alt text, and link labels;
- the about introduction, contact copy, quotation, career/education timeline, dates, locations, and thesis label;
- teaching and speaking headings, descriptions, formats, dates, locations, media labels, alt text, link labels, and lightbox controls;
- essays and archive index headings, descriptions, date formatting, archive labels, and the notice that linked articles are in English.

Translation rules:

- Spanish must consistently use European Spanish vocabulary, grammar, and punctuation.
- Armenian must consistently use contemporary Eastern Armenian.
- The Armenian personal name must be exactly `Թոմ Օգեր` everywhere, including visible copy, image alt text, metadata, and accessible labels.
- Preserve brand/product names unless there is an established localized form.
- Translate place names naturally where appropriate (for example, localized country and city names), but do not translate organization names without an accepted official form.
- Preserve technical terms where translation would reduce clarity, and keep code, URLs, repository names, and technology tags unchanged.

Have a fluent human speaker review each completed locale before release, especially the Armenian professional terminology and the distinction between European and Latin American Spanish wording.

### 8. Handle articles explicitly

`PostList` and the archive index should accept the active UI locale and:

- keep article title, description, and tags in English;
- format dates for the active locale;
- show a concise localized `English` indicator or notice before users follow the link;
- always link to the existing unprefixed canonical detail URL.

`PostLayout`, `ArchiveLayout`, article content collections, legacy article redirects, RSS, and the full-text LLM export remain English-only in this phase. They should not be copied under `/es/` or `/hy/`.

### 9. Normalize locale-sensitive presentation

- Use `Intl.DateTimeFormat` with the active locale and UTC for real `Date` values.
- For ranges or approximate periods that cannot be represented faithfully as one date, keep a stable sort value in canonical data and provide reviewed localized display labels.
- Do not construct translated sentences by concatenating fragments whose order may differ by language.
- Confirm Armenian glyph coverage in the current Inter and IBM Plex font setup. Add a language-aware Armenian font such as an appropriate Noto Armenian family if the current fonts produce fallback inconsistencies, especially in mono-styled headings.
- Check line height, wrapping, capitalization, and text-transform rules. Avoid uppercase transformations where they are unnatural or reduce Armenian readability.

## File-level change map

| Area                                              | Expected changes                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `astro.config.mjs`                                | Declare locales and unprefixed-default routing.                                                        |
| `src/i18n/`                                       | Add locale config, routes, typed UI messages, content overlays, and helpers.                           |
| `src/layouts/BaseLayout.astro`                    | Locale-aware HTML, metadata, navigation, footer, alternate links, and picker integration.              |
| `src/components/LanguagePicker.astro`             | New accessible language picker.                                                                        |
| `src/components/ThemeToggle.astro`                | Localized visible and accessible labels.                                                               |
| `src/components/ProjectCard.astro`                | Localized descriptions, dates, statuses, and link labels.                                              |
| `src/components/PostList.astro`                   | Locale-aware dates and English-content indication.                                                     |
| `src/components/pages/`                           | Shared localized page renderers for the seven translated routes.                                       |
| `src/pages/[locale]/`                             | Static Spanish and Armenian route wrappers.                                                            |
| Existing English page files                       | Thin wrappers around the shared page renderers.                                                        |
| `src/data/about.ts`                               | New stable structured timeline data.                                                                   |
| `src/data/speaking.ts` and `src/data/teaching.ts` | Add stable IDs and separate canonical data from localized display copy.                                |
| `src/content/projects/*.md`                       | Keep canonical project data; translations are keyed by project entry ID.                               |
| `src/styles/global.css`                           | Picker styles, responsive header behavior, language-aware typography, and translated-label wrapping.   |
| `src/pages/404.astro`                             | Choose a translated 404 message from the requested path prefix while preserving legacy redirect logic. |
| `scripts/check-i18n.mjs`                          | Validate generated localized pages and metadata without adding a full test framework.                  |
| `README.md`                                       | Document locales, URL structure, translation ownership, checks, and how to add/update copy.            |

## Implementation sequence

1. Add locale configuration, route keys, typed message contracts, and empty completeness-checked translation files.
2. Refactor shared layout and navigation to accept a locale while keeping English output visually and structurally unchanged.
3. Add the picker, localized URL helpers, canonical/hreflang metadata, and responsive styling.
4. Extract the seven page renderers and add Spanish/Armenian static route wrappers.
5. Add stable IDs and translation overlays for projects, about, teaching, speaking, media, controls, and homepage engagements.
6. Add the reviewed `es-ES` translations.
7. Add the reviewed Eastern Armenian translations, enforcing `Թոմ Օգեր` as a validation invariant.
8. Add English-content notices and fallback picker behavior for essay, archive, and resource links.
9. Add generated-output checks, documentation, and full responsive/accessibility review.
10. Validate locally, commit only the intended files, push when authorized, watch the exact GitHub Pages workflow for that commit, and verify the deployed routes on `tau.gr`.

## Validation plan

### Automated gates

Run the repository's required checks:

```sh
pnpm format
pnpm lint
pnpm build
```

Add a small post-build localization check that fails when:

- an expected `/es/` or `/hy/` route is absent;
- a generated page has the wrong `<html lang>`;
- a translated page lacks its self-canonical or complete alternate links;
- translated navigation links escape to the wrong locale;
- an unintended `/es/essays/<slug>/`, `/hy/essays/<slug>/`, `/es/archive/<slug>/`, or `/hy/archive/<slug>/` page is emitted;
- Armenian pages do not contain the exact name `Թոմ Օգեր`;
- a translation map is missing a required stable content ID;
- RSS article links or old English redirects change unexpectedly.

Inspect the generated sitemap for every translated index/page route and for the absence of invented localized article details.

### Manual review

Preview all three locales and verify at least:

- home, projects, teaching, speaking, about, essays, and archive;
- picker transitions between equivalent pages;
- picker fallback from an English-only article/resource page;
- an English article opened from each localized listing;
- header and picker at desktop, tablet, and narrow mobile widths;
- light and dark themes;
- keyboard navigation, focus visibility, screen-reader labels, and no-JavaScript links;
- Armenian glyphs, line wrapping, and font consistency;
- Spanish accents, punctuation, and long-label wrapping;
- localized page titles/descriptions, canonical URLs, `hreflang`, Open Graph locale, and sitemap entries;
- the legacy redirect behavior in `404.astro`.

### Deployment verification

Treat implementation, push, CI, and deployment as separate states. After an authorized push:

1. Confirm the remote `main` SHA matches the intended commit.
2. Watch the GitHub Pages workflow associated with that exact SHA through completion.
3. Check `https://tau.gr/`, `https://tau.gr/es/`, and `https://tau.gr/hy/` plus at least one nested page in each locale.
4. Exercise the picker on the live site and follow one English article from each translated essay index.
5. Check browser console and network failures, metadata, sitemap output, mobile layout, and Armenian font loading on the deployed origin.

## Acceptance criteria

- Existing English URLs and English article URLs remain stable.
- `/es/` contains complete European Spanish translations for every in-scope non-article surface.
- `/hy/` contains complete Eastern Armenian translations for every in-scope non-article surface.
- `Թոմ Օգեր` is used consistently on all Armenian surfaces.
- The language picker is present, accessible, responsive, and route-aware.
- Localized pages do not silently fall back to English except for content explicitly identified as an English article or resource.
- Article bodies and metadata are not duplicated or presented to search engines as translated content.
- Canonicals, alternate links, HTML language tags, Open Graph locale metadata, and sitemap entries are correct.
- Formatting, linting, build, localization output checks, manual responsive/accessibility review, and exact-SHA Pages deployment verification all pass.

## Out of scope for this phase

- Translating essay or archive article bodies, titles, descriptions, or tags.
- Translating the three preserved teaching/speaking resource documents.
- Localized RSS feeds or localized `llms.txt`/`llms-full.txt` endpoints.
- Browser-language auto-redirects or locale selection based on geolocation.
- A translation CMS or third-party runtime localization service.
- Renaming technical projects, repositories, technologies, brands, or external resources.
