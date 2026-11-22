import { getCollection, type CollectionEntry } from 'astro:content';
import { REFERRAL_ENABLED, REFERRALS, type ExchangeId } from './config';

/** base 경로를 반영한 내부 링크 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
}

/**
 * 공개된 글 목록. pubDate 가 미래인 글은 예약 글로 보고 숨겨요.
 * (pubDate: 2026-11-25 → 한국 시간 11월 25일 오전 9시부터 공개. 매일 자동 빌드가 돌면서 반영돼요.)
 */
export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  // PREVIEW_SCHEDULED=1 npm run build → 예약 글까지 모두 포함해 미리 확인 (배포용 빌드에서는 쓰지 마세요)
  const now = process.env.PREVIEW_SCHEDULED ? Infinity : Date.now();
  const posts = await getCollection('posts', ({ data }) => !data.draft && data.pubDate.valueOf() <= now);
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
