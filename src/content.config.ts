import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: z.string().optional(),
    category: z.string().default('技术随笔'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
