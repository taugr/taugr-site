import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createTools, installWebMCP } from '../src/webmcp/register.ts';
import { parseSearch, searchEntries } from '../src/webmcp/search.ts';

const entries = [
  {
    title: 'Educación con IA',
    description: 'Taller práctico',
    keywords: ['TUMO'],
    kind: 'teaching',
    language: 'es-ES',
    url: '/es/teaching/',
  },
  {
    title: 'Scranbook',
    description: 'Food diary',
    keywords: ['TypeScript'],
    kind: 'project',
    language: 'en',
    url: '/projects/',
  },
  {
    title: 'Հայերեն',
    description: 'Արհեստական բանականություն',
    keywords: [],
    kind: 'essay',
    language: 'en',
    url: '/essays/example/',
  },
];

function page(language = 'en') {
  return {
    documentElement: { lang: language },
    URL: 'https://example.com/es/',
    title: 'Example',
    querySelector: () => ({ innerText: 'Visible main content' }),
    querySelectorAll: () => [],
  };
}

await test('search matches accents, case, multiple terms and Armenian; browsing is paginated', () => {
  assert.equal(
    searchEntries(entries, parseSearch({ query: 'educacion TUMO' })).results[0]
      .title,
    'Educación con IA',
  );
  assert.equal(
    searchEntries(entries, parseSearch({ query: 'Հայերեն' })).total,
    1,
  );
  assert.equal(
    searchEntries(entries, parseSearch({ query: 'TypeScript', kind: 'essay' }))
      .total,
    0,
  );
  const first = searchEntries(entries, parseSearch({ limit: 2 }));
  assert.equal(first.total, 3);
  assert.equal(first.nextOffset, 2);
  const last = searchEntries(
    entries,
    parseSearch({ offset: first.nextOffset, limit: 2 }),
  );
  assert.equal(last.results.length, 1);
  assert.equal(last.nextOffset, null);
  assert.equal(
    searchEntries(entries, parseSearch({ offset: 99 })).nextOffset,
    null,
  );
});

await test('invalid inputs are rejected before a search request', async () => {
  let requests = 0;
  const search = createTools(page(), async () => {
    requests++;
    return Response.json(entries);
  })[0];
  for (const input of [
    null,
    [],
    'query',
    { query: 1 },
    { query: 'x'.repeat(201) },
    { kind: 'missing' },
    { limit: 26 },
    { offset: -1 },
    { limit: 1.5 },
    { url: 'https://example.org' },
  ]) {
    await assert.rejects(() => search.execute(input), TypeError);
  }
  assert.equal(requests, 0);
});

await test('search loads the current locale lazily, retries failures and shares the successful request', async () => {
  const urls = [];
  const search = createTools(page('es-ES'), async (url) => {
    urls.push(String(url));
    return urls.length === 1
      ? new Response('', { status: 503 })
      : Response.json(entries);
  })[0];
  assert.equal(urls.length, 0);
  await assert.rejects(() => search.execute({}), /temporarily unavailable/);
  const [a, b] = await Promise.all([
    search.execute({}),
    search.execute({ kind: 'project' }),
  ]);
  assert.deepEqual(urls, [
    'https://example.com/webmcp/es.json',
    'https://example.com/webmcp/es.json',
  ]);
  assert.equal(a.total, 3);
  assert.equal(b.results[0].url, 'https://example.com/projects/');
});

await test('page reading paginates rendered main text and validates its arguments', () => {
  const tools = createTools(page(), fetch);
  const read = tools.find((tool) => tool.name === 'read_current_page');
  const first = read.execute({ limit: 7 });
  assert.equal(first.text, 'Visible');
  assert.equal(first.nextOffset, 7);
  assert.equal(read.execute({ offset: 7 }).text, ' main content');
  assert.throws(() => read.execute({ limit: 12001 }), TypeError);
  assert.throws(() => tools[1].execute({ unexpected: true }), TypeError);
});

await test('registration skips unsupported browsers and restores after page lifecycle cleanup', () => {
  const document = page();
  const window = new EventTarget();
  const stopUnsupported = installWebMCP(document, window, fetch);
  stopUnsupported();
  const registrations = [];
  document.modelContext = {
    registerTool: (tool, options) => registrations.push({ tool, ...options }),
  };
  const stop = installWebMCP(document, window, fetch);
  assert.equal(registrations.length, 3);
  window.dispatchEvent(new Event('pageshow'));
  assert.equal(registrations.length, 3);
  window.dispatchEvent(new Event('pagehide'));
  assert.ok(registrations.every((registration) => registration.signal.aborted));
  window.dispatchEvent(new Event('pageshow'));
  assert.equal(registrations.length, 6);
  assert.ok(
    registrations
      .slice(3)
      .every((registration) => !registration.signal.aborted),
  );
  stop();
  assert.ok(registrations.every((registration) => registration.signal.aborted));
  window.dispatchEvent(new Event('pageshow'));
  assert.equal(registrations.length, 6);
});

await test('synchronous and asynchronous registration failures do not break remaining tools', async (t) => {
  const warnings = t.mock.method(console, 'warn', () => {});
  let calls = 0;
  const document = page();
  document.modelContext = {
    registerTool: () => {
      calls++;
      if (calls === 1) throw new Error('Synchronous failure');
      if (calls === 2) return Promise.reject(new Error('Asynchronous failure'));
    },
  };
  const stop = installWebMCP(document, new EventTarget(), fetch);
  await Promise.resolve();
  assert.equal(calls, 3);
  assert.equal(warnings.mock.callCount(), 2);
  stop();
});
