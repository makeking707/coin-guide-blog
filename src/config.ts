// ─────────────────────────────────────────────────────────────
// 사이트 전체 설정 — 레퍼럴 링크는 이 파일에서만 관리해요.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: '코인 거래소 가이드',
  description: '해외 거래소 가입, 수수료, 입출금 문제 해결을 단계별로 정리한 가이드',
  author: '운영자',
  // 문의용 이메일 (개인정보처리방침·소개 페이지에 표시)
  contactEmail: 'contact@example.com',
  lang: 'ko',
  // 구글 애널리틱스(GA4) 측정 ID (G-로 시작). 비워 두면 통계 코드를 넣지 않아요.
  gaId: 'G-BVSVDRXBS8', // 2026-11-23 생성 (속성 coin-guide-blog)
};

// ★ 비상 스위치: false로 바꾸고 다시 배포하면 사이트의 모든 레퍼럴 링크·광고 고지가 사라지고
//   정보 글만 남아요. (FIU 미신고 사업자 명단에 거래소가 오르는 등 문제가 생기면 즉시 사용)
export const REFERRAL_ENABLED = true;

export type ExchangeId = 'binance' | 'bybit';

export interface ReferralInfo {
  name: string;
  /** 거래소 파트너 대시보드에서 받은 본인 추천 링크 */
  url: string;
  /** 추천 코드 */
  code: string;
  /** 가입자 혜택 — 반드시 공식 페이지에서 직접 확인한 내용만 적으세요. 비워 두면 표시하지 않아요. */
  benefit: string;
  /** 혜택을 마지막으로 확인한 날짜 (YYYY-MM-DD) */
  checkedAt: string;
  /** 공식 수수료 페이지 */
  feePage: string;
}

export const REFERRALS: Record<ExchangeId, ReferralInfo> = {
  binance: {
    name: '바이낸스',
    url: 'https://www.binance.com/register?ref=48145561', // 2026-11-22 추천 대시보드 기본 링크
    code: '48145561',
    benefit: '',
    checkedAt: '',
    feePage: 'https://www.binance.com/en/fee/schedule',
  },
  bybit: {
    name: '바이비트',
    url: '', // 예: https://www.bybit.com/invite?ref=XXXXXX
    code: '',
    benefit: '',
    checkedAt: '',
    feePage: 'https://www.bybit.com/en/announcement-info/fee-rate/',
  },
};

export const CATEGORIES = {
  guide: { label: '가입·사용 가이드', description: '가입, 본인 인증, 기본 사용법' },
  fees: { label: '수수료', description: '수수료 구조와 줄이는 방법' },
  troubleshoot: { label: '문제 해결', description: '입출금·인증 문제 해결' },
  tax: { label: '세금·제도', description: '세금 신고와 국내 제도' },
} as const;

export type CategoryId = keyof typeof CATEGORIES;
