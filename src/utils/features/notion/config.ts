import { Client } from '@notionhq/client';

// Notion 사용 가능 여부
export const NOTION_ENABLED = Boolean(process.env.NOTION_TOKEN);

// 유틸: slugify
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\uAC00-\uD7AF\s-]/g, '') // 한글 허용
    .trim()
    .replace(/\s+/g, '-');
}

// DB ID는 다중 지원: NOTION_DATABASE_IDS(콤마), 없으면 NOTION_DATABASE_ID + NOTION_ADDITIONAL_DATABASE_IDS
export const databaseIds: string[] = (() => {
  if (!NOTION_ENABLED) return [];
  const idsEnv = process.env.NOTION_DATABASE_IDS;
  if (idsEnv && idsEnv.trim().length > 0) {
    return idsEnv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const base = process.env.NOTION_DATABASE_ID ? [process.env.NOTION_DATABASE_ID] : [];
  const more = process.env.NOTION_ADDITIONAL_DATABASE_IDS
    ? process.env.NOTION_ADDITIONAL_DATABASE_IDS.split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  if (base.length === 0 && more.length === 0) {
    console.warn(
      'NOTION_DATABASE_ID 또는 NOTION_DATABASE_IDS 환경 변수가 설정되지 않았습니다. Blog 기능이 비활성화됩니다.',
    );
    return [];
  }
  return [...base, ...more] as string[];
})();

// Notion 클라이언트 초기화 (옵셔널)
export const notion: Client | null = NOTION_ENABLED
  ? new Client({
      auth: process.env.NOTION_TOKEN,
    })
  : null;
