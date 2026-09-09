export const CONTENT_KINDS = [
  'page',
  'project',
  'essay',
  'archive',
  'teaching',
  'speaking',
] as const;

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  kind: (typeof CONTENT_KINDS)[number];
  language: string;
  keywords: string[];
  links?: { label: string; href: string }[];
};

export function validateInput(
  input: unknown,
  allowed: string[],
): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Expected an object.');
  }
  if (Object.keys(input).some((key) => !allowed.includes(key))) {
    throw new TypeError('Unexpected input property.');
  }
  return input as Record<string, unknown>;
}

export function integerOption(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  if (value === undefined) return fallback;
  if (
    typeof value !== 'number' ||
    !Number.isInteger(value) ||
    value < min ||
    value > max
  ) {
    throw new TypeError(`Expected an integer between ${min} and ${max}.`);
  }
  return value;
}

function normalize(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
}

export function parseSearch(input: unknown) {
  const args = validateInput(input, ['query', 'kind', 'offset', 'limit']);
  if (
    args.query !== undefined &&
    (typeof args.query !== 'string' || args.query.length > 200)
  ) {
    throw new TypeError('Query must be a string of at most 200 characters.');
  }
  if (
    args.kind !== undefined &&
    !CONTENT_KINDS.includes(args.kind as SearchEntry['kind'])
  ) {
    throw new TypeError('Unknown content kind.');
  }
  return {
    query: (args.query as string | undefined)?.trim() ?? '',
    kind: args.kind as SearchEntry['kind'] | undefined,
    offset: integerOption(args.offset, 0, 0, 100000),
    limit: integerOption(args.limit, 10, 1, 25),
  };
}

export function searchEntries(
  entries: SearchEntry[],
  args: ReturnType<typeof parseSearch>,
) {
  const terms = normalize(args.query).split(/\s+/u).filter(Boolean);
  const matches = entries.filter((entry) => {
    if (args.kind && entry.kind !== args.kind) return false;
    const text = normalize(
      [entry.title, entry.description, ...entry.keywords].join(' '),
    );
    return terms.every((term) => text.includes(term));
  });
  const results = matches.slice(args.offset, args.offset + args.limit);
  return {
    results,
    total: matches.length,
    nextOffset:
      args.offset + results.length < matches.length
        ? args.offset + results.length
        : null,
  };
}
