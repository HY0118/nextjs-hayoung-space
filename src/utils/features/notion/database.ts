/* eslint-disable @typescript-eslint/no-explicit-any */
import { NOTION_ENABLED, databaseIds, notion } from '@/utils/features/notion/config';
import { mapDbPageToPost } from '@/utils/features/notion/transformers';
import { type BlogPost, PROPERTY_KEYS } from '@/utils/features/notion/types';
import type { Client } from '@notionhq/client';

// 유틸: DB query 전체 페이지네이션 수집
export async function queryAll(
  dbId: string,
  args: Omit<Parameters<Client['databases']['query']>[0], 'database_id'>,
) {
  if (!NOTION_ENABLED || !notion) return [] as any[];
  let cursor: string | undefined;
  const results: any[] = [];
  do {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const resp = await (notion as Client).databases.query({
        ...args,
        database_id: dbId,
        start_cursor: cursor,
      } as any);
      results.push(...resp.results);
      cursor = (resp.next_cursor ?? undefined) as string | undefined;
    } finally {
      clearTimeout(timeout);
    }
  } while (cursor);
  return results;
}

// 데이터베이스에서 모든 블로그 포스트 가져오기 (다중 DB + 페이지네이션 + 추가 페이지 + MD)
export async function getBlogPostsFromDatabase(): Promise<
  Omit<BlogPost, 'content' | 'mdContentRaw'>[]
> {
  if (!NOTION_ENABLED || !notion) return [];

  const publishedFilter = {
    property: 'Published',
    checkbox: { equals: true },
  } as const;
  const sorts = [{ property: 'Published Date', direction: 'descending' as const }];

  const dbPagesArrays = await Promise.all(
    databaseIds.map((id) => queryAll(id, { filter: publishedFilter, sorts })),
  );
  const dbPages = dbPagesArrays.flat();

  return dbPages.map(mapDbPageToPost);
}

// 태그별 블로그 포스트 가져오기 (다중 DB)
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    if (!NOTION_ENABLED || !notion) return [];
    const pagesArrays = await Promise.all(
      databaseIds.map((id) =>
        (notion as Client).databases.query({
          database_id: id,
          filter: {
            and: [
              { property: 'Tags', multi_select: { contains: tag } },
              { property: 'Published', checkbox: { equals: true } },
            ],
          },
          sorts: [{ property: 'Published Date', direction: 'descending' }],
        }),
      ),
    );

    const pages = pagesArrays.flatMap((r) => r.results);
    return pages.map(mapDbPageToPost);
  } catch (error) {
    console.error('태그별 블로그 포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
}

// 모든 태그 가져오기 (다중 DB)
export async function getAllTags(): Promise<string[]> {
  try {
    if (!NOTION_ENABLED || !notion) return [];
    const allTags = new Set<string>();

    for (const id of databaseIds) {
      // Published=true인 페이지 전체 수집 (페이지네이션)
      const pages = await queryAll(id, {
        filter: { property: 'Published', checkbox: { equals: true } },
      });

      pages.forEach((page: any) => {
        const p = page.properties || {};
        // 다양한 키에서 multi_select 추출
        for (const key of PROPERTY_KEYS.TAG) {
          const v = p[key];
          const list = v?.multi_select as any[] | undefined;
          if (list && Array.isArray(list)) {
            list.forEach((t) => t?.name && allTags.add(t.name));
            break; // 첫 매칭 키만 사용
          }
        }
      });
    }

    return Array.from(allTags).sort();
  } catch (error) {
    console.error('태그를 가져오는 중 오류 발생:', error);
    return ['설정'];
  }
}

// DB에서 특정 slug로 포스트 찾기
export async function findPostInDatabase(slug: string): Promise<BlogPost | null> {
  if (!NOTION_ENABLED || !notion) return null;

  // 자식 블록 전체 수집(페이지네이션 + 재귀)
  const listAllBlocks = async (blockId: string): Promise<any[]> => {
    const all: any[] = [];
    let cursor: string | undefined = undefined;
    do {
      const res = await (notion as Client).blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });
      for (const b of res.results as any[]) {
        if ((b as any).has_children) {
          try {
            (b as any).children = await listAllBlocks((b as any).id);
          } catch {
            (b as any).children = [];
          }
        }
        all.push(b);
      }
      cursor = (res as any).next_cursor ?? undefined;
    } while (cursor);
    return all;
  };

  // 모든 DB에서 slug로 조회
  for (const dbId of databaseIds) {
    const resp = await (notion as Client).databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    });
    if (resp.results.length > 0) {
      const page = resp.results[0] as any;
      const props = mapDbPageToPost(page);
      const blocks = await listAllBlocks(page.id);
      return { ...props, content: blocks } as BlogPost;
    }
  }

  return null;
}
