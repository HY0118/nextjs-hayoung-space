/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";

// 환경 변수 확인
if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN 환경 변수가 설정되지 않았습니다.");
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
}

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 블로그 포스트 타입 정의
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  tags: string[];
  featured: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any; // Notion 블록 컨텐츠
}

// 데이터베이스에서 모든 블로그 포스트 가져오기
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // 타임아웃 설정 (10초)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("요청 시간 초과")), 10000)
    );

    const response = await Promise.race([
      notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: "Published Date",
            direction: "descending",
          },
        ],
      }),
      timeoutPromise,
    ]);

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || "제목 없음",
          slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
          summary: properties.Summary?.rich_text?.[0]?.plain_text || "",
          publishedDate: properties["Published Date"]?.date?.start || "",
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          featured: properties.Featured?.checkbox || false,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
    // 환경 변수가 설정되지 않은 경우 더미 데이터 반환
    return [
      {
        id: "dummy-1",
        title: "블로그 설정이 필요합니다",
        slug: "setup-required",
        summary: "Notion API 설정을 완료하면 실제 블로그 포스트를 볼 수 있습니다.",
        publishedDate: new Date().toISOString(),
        tags: ["설정"],
        featured: true,
      },
    ];
  }
}

// 특정 블로그 포스트의 상세 내용 가져오기
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const startTime = Date.now();
  console.log(`🔍 [Notion API] ${slug} 포스트 조회 시작`);
  
  try {
    // 타임아웃 설정 (8초)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("요청 시간 초과")), 8000)
    );

    // 데이터베이스 쿼리
    const queryStartTime = Date.now();
    const response = await Promise.race([
      notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          and: [
            {
              property: "Slug",
              rich_text: {
                equals: slug,
              },
            },
            {
              property: "Published",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      }),
      timeoutPromise,
    ]);
    console.log(`📊 [Notion API] 데이터베이스 쿼리 완료: ${Date.now() - queryStartTime}ms`);

    if (response.results.length === 0) {
      console.log(`❌ [Notion API] ${slug} 포스트를 찾을 수 없음`);
      return null;
    }

    const page = response.results[0] as any;
    const properties = page.properties;

    // 페이지 내용 가져오기 (별도 타임아웃 적용)
    const blocksStartTime = Date.now();
    const blocksTimeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("블록 내용 요청 시간 초과")), 8000)
    );

    const blocks = await Promise.race([
      notion.blocks.children.list({
        block_id: page.id,
      }),
      blocksTimeoutPromise,
    ]);
    console.log(`📊 [Notion API] 블록 내용 조회 완료: ${Date.now() - blocksStartTime}ms`);

    const totalTime = Date.now() - startTime;
    console.log(`✅ [Notion API] ${slug} 포스트 조회 완료: 총 ${totalTime}ms`);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || "제목 없음",
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      summary: properties.Summary?.rich_text?.[0]?.plain_text || "",
      publishedDate: properties["Published Date"]?.date?.start || "",
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      featured: properties.Featured?.checkbox || false,
      content: blocks.results,
    };
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ [Notion API] ${slug} 포스트 조회 실패 (${totalTime}ms):`, error);
    return null;
  }
}

// 태그별 블로그 포스트 가져오기
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "Tags",
            multi_select: {
              contains: tag,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
    });

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || "제목 없음",
          slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
          summary: properties.Summary?.rich_text?.[0]?.plain_text || "",
          publishedDate: properties["Published Date"]?.date?.start || "",
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          featured: properties.Featured?.checkbox || false,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("태그별 블로그 포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// 모든 태그 가져오기
export async function getAllTags(): Promise<string[]> {
  try {
    // 타임아웃 설정 (10초)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("요청 시간 초과")), 10000)
    );

    const response = await Promise.race([
      notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      }),
      timeoutPromise,
    ]);

    const allTags = new Set<string>();
    
    response.results.forEach((page: any) => {
      const tags = page.properties.Tags?.multi_select || [];
      tags.forEach((tag: any) => allTags.add(tag.name));
    });

    return Array.from(allTags).sort();
  } catch (error) {
    console.error("태그를 가져오는 중 오류 발생:", error);
    return ["설정"];
  }
} 