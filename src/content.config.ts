import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
      originalUrl: z.string().url().optional(),
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
      tech: z.array(z.string()),
      github: z.string().url().optional(),
      url: z.string().url().optional(),
      featured: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { posts, projects, archive };
