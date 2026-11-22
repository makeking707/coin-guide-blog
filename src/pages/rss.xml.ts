import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPosts, url } from '../lib';

// RSS 피드 — 네이버 서치어드바이저 등에 제출해요.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: new URL(url(), context.site!).href,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: url(`posts/${p.id}/`),
    })),
    customData: `<language>ko</language>`,
  });
}
