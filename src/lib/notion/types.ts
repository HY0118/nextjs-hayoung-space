// 블로그 포스트 타입 정의
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  tags: string[];
  featured: boolean;
  postType?: 'note' | 'project'; // 글 유형
  projectName?: string; // 프로젝트명(있으면 project로 분류)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any; // Notion 블록 컨텐츠
  mdContentRaw?: string; // Markdown 원문
  source?: 'db' | 'extra' | 'md';
}

// DB 속성 키들
export const PROPERTY_KEYS = {
  TITLE: ['Title', '이름', 'Name', 'title'], // 다양성 고려
  SLUG: ['Slug', 'slug'],
  SUMMARY: ['Summary', '요약'],
  TAG: ['Tags', '태그'],
  FEATURED: ['Featured'],
  DATE: ['Published Date', '발행일', 'Date'],
  POST_TYPE: ['Type', 'Post Type', '포스트 유형', '게시글 유형'],
  PROJECT_NAME: ['Project', '프로젝트명', '프로젝트'],
} as const;
