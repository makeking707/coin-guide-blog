import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['guide', 'fees', 'troubleshoot', 'tax']),
    /** 레퍼럴 박스를 보여줄 거래소. 비우면 레퍼럴 없는 정보 글 */
    exchanges: z.array(z.enum(['binance', 'bybit'])).default([]),
    summary: z.array(z.string()).min(1).max(5),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
