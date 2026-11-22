# 코인 거래소 가이드 블로그

바이낸스·바이비트 가입, 수수료, 입출금 문제 해결을 다루는 레퍼럴 정보 블로그예요.
[Astro](https://astro.build) 정적 사이트라 서버 없이 무료 호스팅(GitHub Pages, Cloudflare Pages)으로 운영할 수 있어요.

## 직접 해야 하는 일 (순서대로)

1. **거래소 가입과 본인 인증** — 바이낸스, 바이비트 각각 가입·KYC 후 추천(Referral) 메뉴에서 본인 링크와 코드를 받아요.
2. **레퍼럴 정보 입력** — `src/config.ts` 의 `REFERRALS` 에 `url`, `code` 를 넣어요.
   - `benefit`(가입자 혜택)은 **공식 페이지에서 직접 확인한 내용만** 적고, `checkedAt` 에 확인 날짜를 적어요.
   - 링크를 비워 두면 해당 거래소의 추천 박스와 광고 고지는 자동으로 숨겨져요.
3. **사이트 정보 수정** — `src/config.ts` 의 `SITE`(사이트 이름, 문의 이메일)를 바꿔요.
4. **GitHub Pages 켜기** — 저장소 Settings → Pages → Source 를 *GitHub Actions* 로 설정해요. 그다음 Actions 탭에서 *Deploy* 를 다시 실행(Re-run)하면 `https://makeking707.github.io/coin-guide-blog/` 로 배포돼요. 이후에는 main 에 푸시할 때마다 자동 배포돼요.
5. **(선택) 도메인 연결** — 도메인을 사면 Settings → Pages → Custom domain 에 입력하고, Settings → Secrets and variables → Actions → Variables 에 `SITE_URL`(예: `https://coinguide.example.com`)과 `BASE_PATH`(`/`)를 등록해요. 도메인 이름에 거래소 상표(binance, bybit 등)는 넣지 마세요.
6. **구글 서치콘솔 등록** — 사이트 소유 확인 후 `사이트주소/sitemap-index.xml` 을 제출해요. 인증 태그는 `src/layouts/Base.astro` 의 주석 위치에 넣어요.
7. **캡처 이미지 추가** — 각 글의 `<!-- 캡처 이미지 추가 권장 -->` 주석 위치에 실제 화면 캡처를 넣으면 신뢰도와 검색 순위에 도움이 돼요. 이미지는 `src/content/posts/images/` 에 넣고 글에서 `![설명](./images/파일명.png)` 으로 써요. (자동으로 용량이 최적화돼요)

## 내 컴퓨터에서 실행

```bash
npm install
npm run dev        # http://localhost:4321 미리보기
npm run build      # dist/ 에 배포용 파일 생성 (콘텐츠 점검 자동 실행)
```

## 글 추가하기

`src/content/posts/새-글-주소.md` 파일을 만들고 아래 형식으로 써요. 파일 이름이 주소가 돼요.

```markdown
---
title: "글 제목 (2026 최신)"
description: "검색 결과에 보일 설명 (160자 이내)"
pubDate: 2026-12-01
category: guide          # guide | fees | troubleshoot | tax
exchanges: [binance]     # 추천 박스를 보여줄 거래소. 레퍼럴 없는 글은 []
summary:
  - "요약 1"
  - "요약 2"
  - "요약 3"
faq:
  - q: "질문"
    a: "답변"
---

본문(마크다운)...
```

광고 고지, 3줄 요약, 추천 박스(본문 위·아래), FAQ, 관련 글, 투자 위험 고지는 **자동으로** 붙어요.
본문에 레퍼럴 링크를 직접 쓰면 빌드가 실패해요. 링크는 `src/config.ts` 에서만 관리해요.

## 법적 위험을 줄이는 장치

| 장치 | 위치 | 하는 일 |
|---|---|---|
| 광고 고지 자동 표시 | `src/components/Disclosure.astro` | 레퍼럴 링크가 있는 글 첫머리에 표시 |
| 투자 위험 고지 | `src/components/RiskNotice.astro` | 모든 글 하단에 표시 |
| `rel="sponsored nofollow"` | `src/components/ReferralBox.astro` | 광고 링크임을 검색엔진에 알림 |
| 금칙어·차단 거래소 점검 | `scripts/check-content.mjs` | "원금 보장", "리딩방", 차단 거래소 이름 등이 있으면 빌드 중단 |
| **비상 스위치** | `src/config.ts` 의 `REFERRAL_ENABLED` | `false` 로 바꾸고 배포하면 모든 레퍼럴 링크·광고 고지가 사라지고 정보 글만 남음 |
| 정책 페이지 | `src/pages/` | 소개, 제휴 공개 정책, 면책 고지, 개인정보처리방침 |

## 운영 수칙

- **매월 1회** 금융정보분석원(FIU) 홈페이지에서 미신고 사업자 명단과 접속 차단 발표를 확인해요.
  - 바이낸스·바이비트가 명단에 오르면 **즉시 `REFERRAL_ENABLED = false` 로 배포**해요.
  - 새로 차단된 거래소 이름은 `scripts/check-content.mjs` 의 `BLOCKED_EXCHANGES` 에 추가해요.
- 수수료·혜택 수치는 **분기마다** 공식 페이지에서 다시 확인하고, 글의 `updatedDate` 를 갱신해요.
- 레퍼럴 수익은 소득이에요. 수익과 지급 내역을 기록하고, 꾸준히 생기면 사업자 등록·종합소득세 신고를 해요.
- 하지 않을 것: 특정 코인 매수 추천·목표가, 수익 보장 표현, 리딩방·시그널 유도, 차단 거래소 홍보나 우회 접속 안내.

> 해외 가상자산사업자 레퍼럴 홍보는 금융당국이 미신고 영업 조력으로 볼 여지가 있다고 안내한 영역이에요. 이 저장소의 장치는 위험을 줄이기 위한 것이며 법적 안전을 보장하지 않아요.

## 폴더 구조

```
src/
  config.ts              사이트·레퍼럴·카테고리 설정 (레퍼럴 링크는 여기서만)
  content/posts/*.md     글
  components/            광고 고지, 위험 고지, 추천 박스, 헤더, 푸터
  layouts/Base.astro     공통 레이아웃 (SEO 메타 태그)
  pages/                 홈, 카테고리, 글, 정책 페이지
scripts/check-content.mjs  빌드 전 콘텐츠 점검
```
