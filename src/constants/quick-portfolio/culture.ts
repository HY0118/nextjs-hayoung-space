import type { CultureItem } from '@/interfaces/quickPortfolio';

export const cultureItems: CultureItem[] = [
  {
    title: '코드 리뷰',
    description: 'PR 템플릿 · 체크리스트 · 스크린샷/영상 첨부',
  },
  {
    title: '테스트',
    description: 'Storybook Interaction · Unit/Integration/E2E',
  },
  {
    title: '릴리즈/변경관리',
    description: '주기 릴리즈 · 릴리즈 노트 · 롤백/채널 배포',
  },
  {
    title: '관측성/품질',
    description: 'Sentry 트레이싱  Web Vitals',
  },
  {
    title: '디자인 연계/문서화',
    description: 'Figma Tokens ↔ Storybook · 컴포넌트 계약서',
  },
  {
    title: '개발 생산성/도구',
    description: '모노레포 · CI 최적화·자동화 스크립트',
  },
];
