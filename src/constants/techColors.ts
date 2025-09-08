export interface TechColor {
  [key: string]: string;
}

export const techColors: TechColor = {
  // JavaScript 생태계
  React: 'bg-[#0EA5E9]/10 text-[#0284C7] dark:text-[#0EA5E9]/90',
  TypeScript: 'bg-[#3178C6]/10 text-[#2A669E] dark:text-[#3178C6]/90',
  'Next.js': 'bg-[#3178C6]/10 text-black dark:text-white/90',
  JavaScript: 'bg-[#F7DF1E]/10 text-[#B3A516] dark:text-[#F7DF1E]/90',
  Vue: 'bg-[#4FC08D]/10 text-[#3FA173] dark:text-[#4FC08D]/90',
  Angular: 'bg-[#DD0031]/10 text-[#B8002A] dark:text-[#DD0031]/90',
  Svelte: 'bg-[#FF3E00]/10 text-[#D93400] dark:text-[#FF3E00]/90',

  // CSS 관련
  TailwindCSS: 'bg-[#06B6D4]/10 text-[#0597AF] dark:text-[#06B6D4]/90',
  Sass: 'bg-[#CC6699]/10 text-[#AA557F] dark:text-[#CC6699]/90',
  'styled-components': 'bg-[#DB7093]/10 text-[#B75D7A] dark:text-[#DB7093]/90',

  // UI 라이브러리
  MUI: 'bg-[#007FFF]/10 text-[#0066CC] dark:text-[#007FFF]/90',
  'Material-UI': 'bg-[#007FFF]/10 text-[#0066CC] dark:text-[#007FFF]/90',

  // 백엔드
  Node: 'bg-[#339933]/10 text-[#2A802A] dark:text-[#339933]/90',
  Python: 'bg-[#3776AB]/10 text-[#2E6189] dark:text-[#3776AB]/90',
  Django: 'bg-[#092E20]/10 text-[#0A2318] dark:text-[#0F4D35]/90',
  Flask: 'bg-[#000000]/10 text-black dark:text-white/90',
  Java: 'bg-[#007396]/10 text-[#005F7A] dark:text-[#007396]/90',
  Spring: 'bg-[#6DB33F]/10 text-[#5A9434] dark:text-[#6DB33F]/90',
  PHP: 'bg-[#777BB4]/10 text-[#636595] dark:text-[#777BB4]/90',
  Laravel: 'bg-[#FF2D20]/10 text-[#D6251A] dark:text-[#FF2D20]/90',
  Deno: 'bg-[#000000]/10 text-[#121212] dark:text-[#FFFFFF]/90',

  // 데이터베이스
  PostgreSQL: 'bg-[#336791]/10 text-[#2A5578] dark:text-[#336791]/90',
  MySQL: 'bg-[#4479A1]/10 text-[#386385] dark:text-[#4479A1]/90',
  MongoDB: 'bg-[#47A248]/10 text-[#3B863C] dark:text-[#47A248]/90',
  Redis: 'bg-[#DC382D]/10 text-[#B82F25] dark:text-[#DC382D]/90',
  MariaDB: 'bg-[#003545]/10 text-[#002B39] dark:text-[#4A90A4]/90',

  // 클라우드 & DevOps
  Docker: 'bg-[#2496ED]/10 text-[#1E7BC4] dark:text-[#2496ED]/90',
  Kubernetes: 'bg-[#326CE5]/10 text-[#2959BF] dark:text-[#326CE5]/90',
  AWS: 'bg-[#FF9900]/10 text-[#D68000] dark:text-[#FF9900]/90',
  'AWS S3': 'bg-[#FF9900]/10 text-[#D68000] dark:text-[#FF9900]/90',
  'AWS EC2': 'bg-[#FF9900]/10 text-[#D68000] dark:text-[#FF9900]/90',
  'AWS S3 / EC2': 'bg-[#FF9900]/10 text-[#D68000] dark:text-[#FF9900]/90',
  'Google Cloud': 'bg-[#4285F4]/10 text-[#366DC9] dark:text-[#4285F4]/90',
  Azure: 'bg-[#0078D4]/10 text-[#0064AF] dark:text-[#0078D4]/90',

  // 상태 관리
  Redux: 'bg-[#764ABC]/10 text-[#623D9C] dark:text-[#764ABC]/90',
  Zustand: 'bg-[#764ABC]/10 text-[#623D9C] dark:text-[#764ABC]/90',
  Recoil: 'bg-[#3578E5]/10 text-[#2C63BF] dark:text-[#3578E5]/90',

  // 테스팅
  Jest: 'bg-[#C21325]/10 text-[#A11020] dark:text-[#C21325]/90',
  Cypress: 'bg-[#17202C]/10 text-[#131A24] dark:text-[#23324A]/90',

  // 개발 도구 & 라이브러리
  Git: 'bg-[#F05032]/10 text-[#C7422A] dark:text-[#F05032]/90',
  Bitbucket: 'bg-[#0052CC]/10 text-[#0043A5] dark:text-[#0052CC]/90',
  Github: 'bg-[#181717]/10 text-[#0D1117] dark:text-[#F0F6FC]/90',
  github: 'bg-[#181717]/10 text-[#0D1117] dark:text-[#F0F6FC]/90',
  GraphQL: 'bg-[#E10098]/10 text-[#BC007E] dark:text-[#E10098]/90',
  Webpack: 'bg-[#8DD6F9]/10 text-[#75B4D3] dark:text-[#8DD6F9]/90',
  Vite: 'bg-[#646CFF]/10 text-[#525AD4] dark:text-[#646CFF]/90',
  Firebase: 'bg-[#FFCA28]/10 text-[#D6A821] dark:text-[#FFCA28]/90',
  NPM: 'bg-[#CB3837]/10 text-[#A82E2A] dark:text-[#CB3837]/90',

  // 문서화 & 스토리북
  Storybook: 'bg-[#FF4785]/10 text-[#D63A70] dark:text-[#FF4785]/90',
  Chromatic: 'bg-[#FC521F]/10 text-[#D1441A] dark:text-[#FC521F]/90',

  // 폼 & 스키마
  RJSF: 'bg-[#61DAFB]/10 text-[#4FA8C9] dark:text-[#61DAFB]/90',
  'react-jsonschema-form': 'bg-[#61DAFB]/10 text-[#4FA8C9] dark:text-[#61DAFB]/90',

  // 플로우 & 다이어그램
  ReactFlow: 'bg-[#FF0072]/10 text-[#D6005F] dark:text-[#FF0072]/90',

  // 애니메이션
  'Framer Motion': 'bg-[#0055FF]/10 text-[#0044CC] dark:text-[#0055FF]/90',

  // Python 관련
  Pyscript: 'bg-[#3776AB]/10 text-[#2E6189] dark:text-[#3776AB]/90',

  // Skills 관련 추가
  'UI Development': 'bg-[#E91E63]/10 text-[#C2185B] dark:text-[#E91E63]/90',
  'Version Control': 'bg-[#F05032]/10 text-[#C7422A] dark:text-[#F05032]/90',
  'Build & Deploy': 'bg-[#326CE5]/10 text-[#2959BF] dark:text-[#326CE5]/90',
  'Project Management': 'bg-[#0052CC]/10 text-[#0043A5] dark:text-[#0052CC]/90',
  'Windows Development': 'bg-[#0078D4]/10 text-[#0064AF] dark:text-[#0078D4]/90',
  'TanStack Query': 'bg-[#FF4154]/10 text-[#D6364C] dark:text-[#FF4154]/90',
  'RJSF(react-jsonschema-form)': 'bg-[#61DAFB]/10 text-[#4FA8C9] dark:text-[#61DAFB]/90',
  'Framer Motion && CSS': 'bg-[#0055FF]/10 text-[#0044CC] dark:text-[#0055FF]/90',
  'Web 성능 최적화': 'bg-[#00D084]/10 text-[#00B871] dark:text-[#00D084]/90',

  // API & 백엔드 프레임워크
  'RESTful API': 'bg-[#38B2AC]/10 text-[#2C8F8A] dark:text-[#38B2AC]/90',
  'Restful API': 'bg-[#38B2AC]/10 text-[#2C8F8A] dark:text-[#38B2AC]/90',
} as const;

// 기본 스타일 (목록에 없는 기술 스택용)
export const defaultTechColor = 'bg-white border-primary/30 text-primary';

// 기술 스택의 색상을 가져오는 헬퍼 함수
export const getTechColor = (tech: string): string => {
  const color = techColors[tech];
  if (!color) {
    // 개발 환경에서만 경고 출력
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🎨 No color defined for tech: ${tech}`);
    }
    return 'border-primary/30 text-primary';
  }

  // bg-[color]/10 패턴을 light/dark 모드에 맞게 변경
  return color.replace(/bg-\[(.*?)\]\/10/g, ' border-[$1]/30');
};
