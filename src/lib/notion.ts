/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";

// 환경 변수 확인
if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN 환경 변수가 설정되지 않았습니다.");
}

// DB ID는 다중 지원: NOTION_DATABASE_IDS(콤마), 없으면 NOTION_DATABASE_ID + NOTION_ADDITIONAL_DATABASE_IDS
const databaseIds: string[] = (() => {
  const idsEnv = process.env.NOTION_DATABASE_IDS;
  if (idsEnv && idsEnv.trim().length > 0) {
    return idsEnv.split(",").map((s) => s.trim()).filter(Boolean);
  }
  const base = process.env.NOTION_DATABASE_ID ? [process.env.NOTION_DATABASE_ID] : [];
  const more = process.env.NOTION_ADDITIONAL_DATABASE_IDS
    ? process.env.NOTION_ADDITIONAL_DATABASE_IDS.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  if (base.length === 0 && more.length === 0) {
    throw new Error("NOTION_DATABASE_ID 또는 NOTION_DATABASE_IDS 환경 변수가 필요합니다.");
  }
  return [...base, ...more] as string[];
})();

// 개별 페이지 포함(비-DB). ID 또는 URL을 환경 변수로 관리
const extraPageIdsFromIds: string[] = (process.env.NOTION_EXTRA_PAGE_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const extraPageIdsFromUrls: string[] = (process.env.NOTION_EXTRA_PAGE_URLS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((url) => extractNotionId(url))
  .filter(Boolean) as string[];
const extraPageIds: string[] = Array.from(new Set([...extraPageIdsFromIds, ...extraPageIdsFromUrls]));

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 유틸: Notion URL에서 32자 ID 추출
function extractNotionId(input: string): string | null {
  const m = input.match(/[0-9a-fA-F]{32}/);
  return m ? m[0] : null;
}

// 유틸: slugify
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\uAC00-\uD7AF\s-]/g, "") // 한글 허용
    .trim()
    .replace(/\s+/g, "-");
}

// 유틸: DB query 전체 페이지네이션 수집
async function queryAll(dbId: string, args: Omit<Parameters<typeof notion.databases.query>[0], "database_id">) {
  let cursor: string | undefined;
  const results: any[] = [];
  do {
    const resp = await notion.databases.query({ ...args, database_id: dbId, start_cursor: cursor });
    results.push(...resp.results);
    cursor = resp.next_cursor ?? undefined;
  } while (cursor);
  return results;
}

// 블로그 포스트 타입 정의
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  tags: string[];
  featured: boolean;
  postType?: "note" | "project"; // 글 유형
  projectName?: string; // 프로젝트명(있으면 project로 분류)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any; // Notion 블록 컨텐츠
}

// DB 속성 키
const TITLE_KEYS = ["Title", "이름", "Name", "title"]; // 다양성 고려
const SLUG_KEYS = ["Slug", "slug"]; 
const SUMMARY_KEYS = ["Summary", "요약"]; 
const TAG_KEYS = ["Tags", "태그"]; 
const FEATURED_KEYS = ["Featured"]; 
const DATE_KEYS = ["Published Date", "발행일", "Date"]; 
const POST_TYPE_KEYS = ["Type", "Post Type", "포스트 유형", "게시글 유형"]; 
const PROJECT_NAME_KEYS = ["Project", "프로젝트명", "프로젝트"];

function pickFirst<T = any>(obj: any, keys: string[], picker: (val: any) => T | undefined): T | undefined {
  for (const k of keys) {
    if (obj?.[k] !== undefined) {
      const v = picker(obj[k]);
      if (v !== undefined) return v;
    }
  }
  return undefined;
}

function mapDbPageToPost(page: any): Omit<BlogPost, "content"> {
  const p = page.properties || {};
  const title =
    pickFirst<string>(p, TITLE_KEYS, (v) => v?.title?.[0]?.plain_text) || "제목 없음";
  const slug =
    pickFirst<string>(p, SLUG_KEYS, (v) => v?.rich_text?.[0]?.plain_text) || slugify(title) || page.id;
  const summary = pickFirst<string>(p, SUMMARY_KEYS, (v) => v?.rich_text?.[0]?.plain_text) || "";
  const publishedDate = pickFirst<string>(p, DATE_KEYS, (v) => v?.date?.start) || page.created_time || "";
  const tags =
    pickFirst<string[]>(p, TAG_KEYS, (v) => v?.multi_select?.map((t: any) => t.name)) || [];
  const featured = pickFirst<boolean>(p, FEATURED_KEYS, (v) => v?.checkbox) || false;

  const postTypeRaw = pickFirst<string>(p, POST_TYPE_KEYS, (v) => v?.select?.name);
  const projectName = pickFirst<string>(p, PROJECT_NAME_KEYS, (v) => v?.select?.name || v?.rich_text?.[0]?.plain_text);
  const postType: "note" | "project" | undefined = postTypeRaw
    ? (/project|issue|프로젝트|이슈/i.test(postTypeRaw) ? "project" : "note")
    : (projectName ? "project" : "note");

  return { id: page.id, title, slug, summary, publishedDate, tags, featured, postType, projectName };
}

async function mapExtraPageToPost(pageId: string): Promise<Omit<BlogPost, "content"> | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const p: any = (page as any).properties || {};
    // 비-DB 페이지의 제목은 일반적으로 'title' 속성에 들어있음
    const title =
      pickFirst<string>(p, TITLE_KEYS, (v) => v?.title?.[0]?.plain_text) || (page as any).url || "Untitled";
    const slug = slugify(title);
    const summary = "";
    const publishedDate = (page as any).created_time || "";
    const tags: string[] = [];
    const featured = false;
    const postType: "note" = "note" as const;
    return { id: pageId, title, slug, summary, publishedDate, tags, featured, postType };
  } catch (e) {
    console.error("개별 페이지 조회 실패: ", pageId, e);
    return null;
  }
}

// 데이터베이스에서 모든 블로그 포스트 가져오기 (다중 DB + 페이지네이션 + 추가 페이지)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const publishedFilter = { property: "Published", checkbox: { equals: true } } as const;
    const sorts = [{ property: "Published Date", direction: "descending" as const }];

    const dbPagesArrays = await Promise.all(
      databaseIds.map((id) => queryAll(id, { filter: publishedFilter, sorts }))
    );
    const dbPages = dbPagesArrays.flat();

    const dbPosts = dbPages.map(mapDbPageToPost);

    const extraPostsRaw = await Promise.all(extraPageIds.map(mapExtraPageToPost));
    const extraPosts = extraPostsRaw.filter(Boolean) as Omit<BlogPost, "content">[];

    const all = [...dbPosts, ...extraPosts].sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));
    return all;
  } catch (error) {
    console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
    return [
      {
        id: "dummy-1",
        title: "블로그 설정이 필요합니다",
        slug: "setup-required",
        summary: "Notion API 설정을 완료하면 실제 블로그 포스트를 볼 수 있습니다.",
        publishedDate: new Date().toISOString(),
        tags: ["설정"],
        featured: true,
        postType: "note",
      },
    ];
  }
}

// 특정 블로그 포스트의 상세 내용 가져오기 (다중 DB + 추가 페이지)
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const startTime = Date.now();
  console.log(`🔍 [Notion API] ${slug} 포스트 조회 시작`);
  try {
    // 1) 모든 DB에서 slug로 조회
    for (const dbId of databaseIds) {
      const resp = await notion.databases.query({
        database_id: dbId,
        filter: { and: [ { property: "Slug", rich_text: { equals: slug } }, { property: "Published", checkbox: { equals: true } } ] },
      });
      if (resp.results.length > 0) {
        const page = resp.results[0] as any;
        const props = mapDbPageToPost(page);
        const blocks = await notion.blocks.children.list({ block_id: page.id });
        return { ...props, content: blocks.results } as BlogPost;
      }
    }

    // 2) 추가 페이지에서 제목 기반 slug 비교
    for (const pid of extraPageIds) {
      const post = await mapExtraPageToPost(pid);
      if (post && post.slug === slug) {
        const blocks = await notion.blocks.children.list({ block_id: pid });
        return { ...post, content: blocks.results } as BlogPost;
      }
    }

    console.log(`❌ [Notion API] ${slug} 포스트를 찾을 수 없음`);
    return null;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ [Notion API] ${slug} 포스트 조회 실패 (${totalTime}ms):`, error);
    return null;
  }
}

// 태그별 블로그 포스트 가져오기 (다중 DB)
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const pagesArrays = await Promise.all(
      databaseIds.map((id) =>
        notion.databases.query({
          database_id: id,
          filter: {
            and: [
              { property: "Tags", multi_select: { contains: tag } },
              { property: "Published", checkbox: { equals: true } },
            ],
          },
          sorts: [{ property: "Published Date", direction: "descending" }],
        })
      )
    );

    const pages = pagesArrays.flatMap((r) => r.results);
    return pages.map(mapDbPageToPost);
  } catch (error) {
    console.error("태그별 블로그 포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// 모든 태그 가져오기 (다중 DB)
export async function getAllTags(): Promise<string[]> {
  try {
    const allTags = new Set<string>();

    for (const id of databaseIds) {
      // Published=true인 페이지 전체 수집 (페이지네이션)
      const pages = await queryAll(id, {
        filter: { property: "Published", checkbox: { equals: true } },
      });

      pages.forEach((page: any) => {
        const p = page.properties || {};
        // 다양한 키에서 multi_select 추출
        for (const key of TAG_KEYS) {
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
    console.error("태그를 가져오는 중 오류 발생:", error);
    return ["설정"];
  }
} 