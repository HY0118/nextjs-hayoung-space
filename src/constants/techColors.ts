export interface TechColor {
  [key: string]: string;
}

export const techColors: TechColor = {
  // JavaScript 생태계
  React: "bg-[#61DAFB]/10 text-[#4FA8C9] dark:text-[#61DAFB]/90",
  TypeScript: "bg-[#3178C6]/10 text-[#2A669E] dark:text-[#3178C6]/90",
  "Next.js": "bg-black/10 text-black dark:bg-white/10 dark:text-white/90",
  JavaScript: "bg-[#F7DF1E]/10 text-[#B3A516] dark:text-[#F7DF1E]/90",
  Vue: "bg-[#4FC08D]/10 text-[#3FA173] dark:text-[#4FC08D]/90",
  Angular: "bg-[#DD0031]/10 text-[#B8002A] dark:text-[#DD0031]/90",
  Svelte: "bg-[#FF3E00]/10 text-[#D93400] dark:text-[#FF3E00]/90",

  // CSS 관련
  TailwindCSS: "bg-[#06B6D4]/10 text-[#0597AF] dark:text-[#06B6D4]/90",
  Sass: "bg-[#CC6699]/10 text-[#AA557F] dark:text-[#CC6699]/90",
  "styled-components": "bg-[#DB7093]/10 text-[#B75D7A] dark:text-[#DB7093]/90",

  // 백엔드
  Node: "bg-[#339933]/10 text-[#2A802A] dark:text-[#339933]/90",
  Python: "bg-[#3776AB]/10 text-[#2E6189] dark:text-[#3776AB]/90",
  Django: "bg-[#092E20]/10 text-[#0A2318] dark:text-[#0F4D35]/90",
  Flask: "bg-[#000000]/10 text-black dark:bg-white/10 dark:text-white/90",
  Java: "bg-[#007396]/10 text-[#005F7A] dark:text-[#007396]/90",
  Spring: "bg-[#6DB33F]/10 text-[#5A9434] dark:text-[#6DB33F]/90",
  PHP: "bg-[#777BB4]/10 text-[#636595] dark:text-[#777BB4]/90",
  Laravel: "bg-[#FF2D20]/10 text-[#D6251A] dark:text-[#FF2D20]/90",

  // 데이터베이스
  PostgreSQL: "bg-[#336791]/10 text-[#2A5578] dark:text-[#336791]/90",
  MySQL: "bg-[#4479A1]/10 text-[#386385] dark:text-[#4479A1]/90",
  MongoDB: "bg-[#47A248]/10 text-[#3B863C] dark:text-[#47A248]/90",
  Redis: "bg-[#DC382D]/10 text-[#B82F25] dark:text-[#DC382D]/90",

  // 클라우드 & DevOps
  Docker: "bg-[#2496ED]/10 text-[#1E7BC4] dark:text-[#2496ED]/90",
  Kubernetes: "bg-[#326CE5]/10 text-[#2959BF] dark:text-[#326CE5]/90",
  AWS: "bg-[#FF9900]/10 text-[#D68000] dark:text-[#FF9900]/90",
  "Google Cloud": "bg-[#4285F4]/10 text-[#366DC9] dark:text-[#4285F4]/90",
  Azure: "bg-[#0078D4]/10 text-[#0064AF] dark:text-[#0078D4]/90",

  // 상태 관리
  Redux: "bg-[#764ABC]/10 text-[#623D9C] dark:text-[#764ABC]/90",
  Zustand: "bg-[#764ABC]/10 text-[#623D9C] dark:text-[#764ABC]/90",
  Recoil: "bg-[#3578E5]/10 text-[#2C63BF] dark:text-[#3578E5]/90",

  // 테스팅
  Jest: "bg-[#C21325]/10 text-[#A11020] dark:text-[#C21325]/90",
  Cypress: "bg-[#17202C]/10 text-[#131A24] dark:text-[#23324A]/90",

  // 기타 도구
  Git: "bg-[#F05032]/10 text-[#C7422A] dark:text-[#F05032]/90",
  GraphQL: "bg-[#E10098]/10 text-[#BC007E] dark:text-[#E10098]/90",
  Webpack: "bg-[#8DD6F9]/10 text-[#75B4D3] dark:text-[#8DD6F9]/90",
  Vite: "bg-[#646CFF]/10 text-[#525AD4] dark:text-[#646CFF]/90",
  Firebase: "bg-[#FFCA28]/10 text-[#D6A821] dark:text-[#FFCA28]/90",
} as const;

// 기본 스타일 (목록에 없는 기술 스택용)
export const defaultTechColor = "bg-primary/10 text-primary";

// 기술 스택의 색상을 가져오는 헬퍼 함수
export const getTechColor = (tech: string): string => {
  const color = techColors[tech];
  if (!color) {
    console.warn(`No color defined for tech: ${tech}`);
    return defaultTechColor;
  }
  return color;
};
