import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essayMetadata = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  editorial: z.boolean().default(false),
  imageAlt: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    essayMetadata.extend({
      image: image().optional(),
      originalUrl: z.string().url().optional(),
    }),
});

const postTranslations = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/post-translations',
  }),
  schema: ({ image }) =>
    essayMetadata.extend({
      image: image().optional(),
      locale: z.enum(['es', 'hy']),
      translationOf: reference('posts'),
    }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    originalUrl: z.string().url().optional(),
    archivePath: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      type: z
        .enum(['personal', 'open-source', 'commercial'])
        .default('personal'),
      status: z.enum(['prototype', 'archived']).optional(),
      tech: z.array(z.string()),
      github: z.string().url().optional(),
      url: z.string().url().optional(),
      featured: z.boolean().default(false),
      displayOrder: z.number().int().positive().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      screenshotAlt: z.string().optional(),
    }),
});

export const collections = { posts, postTranslations, projects, archive };
