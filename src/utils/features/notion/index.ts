/* eslint-disable @typescript-eslint/no-explicit-any */
import { NOTION_ENABLED } from '@/utils/features/notion/config';
import {
  findPostInDatabase,
  getAllTags,
  getBlogPostsByTag,
  getBlogPostsFromDatabase,
} from '@/utils/features/notion/database';
import type { BlogPost } from '@/utils/features/notion/types';
import { getMarkdownPost, getMarkdownPosts } from '@/utils/helpers/markdown';

// 메인 exports - 기존 API 유지
export type { BlogPost } from '@/utils/features/notion/types';

// 데이터베이스에서 모든 블로그 포스트 가져오기 (다중 DB + 페이지네이션 + 추가 페이지 + MD)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Notion 비활성화면 MD만 반환
    if (!NOTION_ENABLED) {
      const mdPosts = await getMarkdownPosts();
      const mdMapped: Omit<BlogPost, 'content' | 'mdContentRaw'>[] = mdPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        publishedDate: p.publishedDate,
        tags: p.tags,
        featured: p.featured,
        postType: 'note',
        source: 'md',
      }));
      return mdMapped.sort((a, b) =>
        (b.publishedDate || '').localeCompare(a.publishedDate || ''),
      );
    }

    const dbPosts = await getBlogPostsFromDatabase();

    // MD 포스트 병합
    const mdPosts = await getMarkdownPosts();
    const mdMapped: Omit<BlogPost, 'content' | 'mdContentRaw'>[] = mdPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      publishedDate: p.publishedDate,
      tags: p.tags,
      featured: p.featured,
      postType: 'note',
      source: 'md',
    }));

    const all = [...dbPosts, ...mdMapped].sort((a, b) =>
      (b.publishedDate || '').localeCompare(a.publishedDate || ''),
    );
    return all;
  } catch (error) {
    console.error('블로그 포스트를 가져오는 중 오류 발생:', error);
    return [
      {
        id: 'dummy-1',
        title: '블로그 설정이 필요합니다',
        slug: 'setup-required',
        summary:
          'Notion API 또는 Markdown 설정을 완료하면 실제 블로그 포스트를 볼 수 있습니다.',
        publishedDate: new Date().toISOString(),
        tags: ['설정'],
        featured: true,
        postType: 'note',
      },
    ];
  }
}

// 특정 블로그 포스트의 상세 내용 가져오기 (다중 DB + 추가 페이지 + MD)
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const startTime = Date.now();
  console.log(`🔍 [Notion API] ${slug} 포스트 조회 시작`);
  try {
    // Notion 비활성화면 MD에서만 조회
    if (!NOTION_ENABLED) {
      const md = await getMarkdownPost(slug);
      if (!md) return null;
      return {
        id: md.id,
        title: md.title,
        slug: md.slug,
        summary: md.summary,
        publishedDate: md.publishedDate,
        tags: md.tags,
        featured: md.featured,
        postType: 'note',
        mdContentRaw: md.contentRaw,
        source: 'md',
      } as BlogPost;
    }

    // 1) 모든 DB에서 slug로 조회
    const dbPost = await findPostInDatabase(slug);
    if (dbPost) return dbPost;

    // 2) MD 파일에서 조회
    const md = await getMarkdownPost(slug);
    if (md) {
      return {
        id: md.id,
        title: md.title,
        slug: md.slug,
        summary: md.summary,
        publishedDate: md.publishedDate,
        tags: md.tags,
        featured: md.featured,
        postType: 'note',
        mdContentRaw: md.contentRaw,
        source: 'md',
      } as BlogPost;
    }

    console.log(`❌ [Notion API] ${slug} 포스트를 찾을 수 없음`);
    return null;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ [Notion API] ${slug} 포스트 조회 실패 (${totalTime}ms):`, error);
    return null;
  }
}

// 재export 기존 함수들
export { getAllTags, getBlogPostsByTag };
