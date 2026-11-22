// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 배포 주소: 도메인을 연결한 뒤 SITE_URL 환경변수 또는 아래 기본값을 바꾸세요.
// GitHub Pages 기본 주소(https://아이디.github.io/저장소명)를 쓸 때는 BASE_PATH=/저장소명 도 설정하세요.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
