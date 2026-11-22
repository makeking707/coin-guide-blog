// 빌드 전에 자동 실행되는 콘텐츠 점검 스크립트 (npm run check:content 로 단독 실행 가능)
// - 금칙어(수익 보장, 투자 권유, 리딩방 등)가 있으면 빌드를 멈춰요.
// - 차단·미신고 통보된 거래소 이름이 있으면 빌드를 멈춰요.
// - 글 본문에 레퍼럴 링크를 직접 넣으면 빌드를 멈춰요. (링크는 src/config.ts 에서만 관리)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const POSTS_DIR = 'src/content/posts';

// 쓰면 안 되는 표현 — 필요하면 추가하세요.
const BANNED = [
  '원금 보장', '원금보장', '수익 보장', '수익보장', '확정 수익', '확정수익', '100% 수익', '무조건 수익',
  '무조건 오', '손실 없', '리딩방', '시그널방', '유료 시그널', '목표가', '매수 추천', '강력 추천 코인',
  '떡상', '대박 코인', '레버리지 100배', '우회 접속', '우회접속', 'VPN', '차단 해제',
];

// 국내 접속 차단 또는 FIU 미신고 사업자로 통보·보도된 곳 — FIU 발표를 보고 계속 추가하세요.
const BLOCKED_EXCHANGES = ['쿠코인', 'KuCoin', 'MEXC', '멕스씨', '빙엑스', 'BingX', '테더맥스', '슈퍼트러스트', 'Phemex', '페멕스', 'XT.com', 'BitMart', '비트마트'];

const REFERRAL_URL = /(ref=|ref_code=|referral|invite\?|\/join\/|affiliate_id)/i;

const errors = [];
const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

for (const file of files) {
  const text = readFileSync(join(POSTS_DIR, file), 'utf8');
  text.split('\n').forEach((line, i) => {
    const where = `${file}:${i + 1}`;
    for (const w of BANNED) if (line.includes(w)) errors.push(`${where}  금칙어 "${w}"`);
    for (const x of BLOCKED_EXCHANGES) if (line.toLowerCase().includes(x.toLowerCase())) errors.push(`${where}  차단/미신고 거래소 "${x}"`);
    const links = line.match(/https?:\/\/[^\s)>"]+/g) || [];
    for (const l of links) if (REFERRAL_URL.test(l)) errors.push(`${where}  본문에 레퍼럴 링크 "${l}" — src/config.ts 로 옮기세요`);
  });
}

// 설정 점검 (경고만)
const config = readFileSync('src/config.ts', 'utf8');
const warnings = [];
for (const block of config.matchAll(/(\w+): \{\s*name: '([^']+)',\s*url: '([^']*)',[^\n]*\s*code: '([^']*)',\s*benefit: '([^']*)',\s*checkedAt: '([^']*)'/g)) {
  const [, id, name, url, , benefit, checkedAt] = block;
  if (!url) warnings.push(`${name}(${id}) 레퍼럴 링크가 비어 있어요 → 해당 거래소 추천 박스와 광고 고지는 표시되지 않아요.`);
  if (benefit && !checkedAt) errors.push(`src/config.ts  ${name} 혜택(benefit)을 적었으면 확인 날짜(checkedAt)도 적어야 해요.`);
}
if (/REFERRAL_ENABLED = false/.test(config)) warnings.push('REFERRAL_ENABLED = false → 모든 레퍼럴 링크가 꺼진 상태예요.');

for (const w of warnings) console.warn(`⚠️  ${w}`);
if (errors.length) {
  console.error(`\n❌ 콘텐츠 점검 실패 (${errors.length}건)\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✅ 콘텐츠 점검 통과 (글 ${files.length}개)`);
