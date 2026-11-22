import { getCollection, type CollectionEntry } from 'astro:content';
import { REFERRAL_ENABLED, REFERRALS, type ExchangeId } from './config';

/** base 경로를 반영한 내부 링크 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
}

export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 실제로 링크가 표시될 거래소 목록 (스위치가 켜져 있고 링크가 입력된 경우만) */
export function activeReferrals(ids: ExchangeId[]) {
  if (!REFERRAL_ENABLED) return [];
  return ids.filter((id) => REFERRALS[id].url.trim() !== '').map((id) => ({ id, ...REFERRALS[id] }));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}
