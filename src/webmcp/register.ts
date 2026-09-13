import {
  CONTENT_KINDS,
  integerOption,
  parseSearch,
  searchEntries,
  validateInput,
} from './search.ts';
import type { SearchEntry } from './search';

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown;
};

type ModelContext = {
  registerTool: (
    tool: Tool,
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};

// The proposed browser API is not yet included in TypeScript's DOM declarations.
type WebMCPDocument = Document & { modelContext?: ModelContext };
const annotations = { readOnlyHint: true, untrustedContentHint: true };
const objectSchema = (properties: object) => ({
  type: 'object',
  properties,
  additionalProperties: false,
});

function linksFrom(document: Document, selector: string) {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>(selector))
    .filter((link) => ['https:', 'http:', 'mailto:'].includes(link.protocol))
    .map((link) => ({
      label: (link.textContent || link.getAttribute('aria-label') || '').trim(),
      url: link.href,
    }));
}

export function createTools(document: Document, fetcher: typeof fetch): Tool[] {
  let index: Promise<SearchEntry[]> | undefined;
  const language = document.documentElement.lang;
  const locale = language.startsWith('es')
    ? 'es'
    : language.startsWith('hy')
      ? 'hy'
      : 'en';
  return [
    {
      name: 'search_site',
      title: 'Search Tom Auger’s site',
      description:
        'Find published projects, essays, archived writing, teaching, speaking, and pages by title, description, or keywords. Omit query to browse. Returns links without opening them. Results use the current page language; essays use available translations and otherwise fall back to English. Archived writing remains English. Use offset to retrieve more results.',
      inputSchema: objectSchema({
        query: { type: 'string', maxLength: 200 },
        kind: { type: 'string', enum: CONTENT_KINDS },
        offset: { type: 'integer', minimum: 0, maximum: 100000, default: 0 },
        limit: { type: 'integer', minimum: 1, maximum: 25, default: 10 },
      }),
      annotations,
      async execute(input) {
        const args = parseSearch(input);
        index ??= fetcher(new URL(`/webmcp/${locale}.json`, document.URL))
          .then(async (response) => {
            if (!response.ok)
              throw new Error('Site search is temporarily unavailable.');
            return (await response.json()) as SearchEntry[];
          })
          .catch((error) => {
            index = undefined;
            throw error;
          });
        const result = searchEntries(await index, args);
        return {
          ...result,
          results: result.results.map((entry) => ({
            ...entry,
            url: new URL(entry.url, document.URL).href,
            links: entry.links?.map((link) => ({
              ...link,
              href: new URL(link.href, document.URL).href,
            })),
          })),
        };
      },
    },
    {
      name: 'get_site_navigation',
      title: 'Get site navigation',
      description:
        'List the site sections, language choices, and public contact/profile links available on this page. Returns destinations without navigating or contacting anyone.',
      inputSchema: objectSchema({}),
      annotations,
      execute(input) {
        validateInput(input, []);
        return {
          language,
          sections: linksFrom(
            document,
            '[data-nav-route], [data-footer-archive]',
          ),
          languages: linksFrom(document, '[data-language-choice]'),
          contact: linksFrom(
            document,
            '.site-footer a[href^="mailto:"], .site-footer [data-profile-link]',
          ),
        };
      },
    },
    {
      name: 'read_current_page',
      title: 'Read the current page',
      description:
        'Read the currently rendered main content and its links, excluding site navigation and footer. Does not open collapsed details or navigate. Text is paginated in characters; use nextOffset for more. Returns up to 100 content links.',
      inputSchema: objectSchema({
        offset: { type: 'integer', minimum: 0, maximum: 1000000, default: 0 },
        limit: { type: 'integer', minimum: 1, maximum: 12000, default: 12000 },
      }),
      annotations,
      execute(input) {
        const args = validateInput(input, ['offset', 'limit']);
        const offset = integerOption(args.offset, 0, 0, 1000000);
        const limit = integerOption(args.limit, 12000, 1, 12000);
        const text = document.querySelector('main')?.innerText.trim() ?? '';
        const links = linksFrom(document, 'main a[href]');
        return {
          title: document.title,
          url: document.URL,
          language,
          text: text.slice(offset, offset + limit),
          totalCharacters: text.length,
          nextOffset: offset + limit < text.length ? offset + limit : null,
          links: links.slice(0, 100),
          linksTruncated: links.length > 100,
        };
      },
    },
  ];
}

export function installWebMCP(
  document: WebMCPDocument,
  window: Window,
  fetcher: typeof fetch,
) {
  let lifecycle: AbortController | undefined;
  const register = () => {
    const context = document.modelContext;
    if (!context?.registerTool || lifecycle) return;
    lifecycle = new AbortController();
    for (const tool of createTools(document, fetcher)) {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch((error) =>
          console.warn(`WebMCP: could not register ${tool.name}.`, error),
        );
      } catch (error) {
        console.warn(`WebMCP: could not register ${tool.name}.`, error);
      }
    }
  };
  const cleanup = () => {
    lifecycle?.abort();
    lifecycle = undefined;
  };
  register();
  window.addEventListener('pagehide', cleanup);
  // A back/forward-cache restore reuses the document after pagehide cleanup.
  window.addEventListener('pageshow', register);
  return () => {
    cleanup();
    window.removeEventListener('pagehide', cleanup);
    window.removeEventListener('pageshow', register);
  };
}
