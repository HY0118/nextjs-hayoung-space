import { Suspense, cache } from 'react';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getBlogPost, getBlogPosts } from '@lib/notion';

import BlogPageWrapper from '@/components/blog/BlogPageWrapper';
import NotionRenderer from '@/components/blog/NotionRenderer';
import RouteDone from '@/components/blog/RouteDone';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ISR 설정: 60초마다 재생성 (더 빠른 업데이트)
export const revalidate = 60;

// 캐시된 getBlogPost 함수
const getCachedBlogPost = cache(async (slug: string) => {
  return await getBlogPost(slug);
});

// 정적 경로 생성 - 모든 포스트를 미리 생성
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    // 빌드 타임아웃 방지: DB 기반 포스트만 정적 생성 대상으로 포함
    const dbOnly = posts.filter((p) => p.source !== 'extra');
    // 상위 N개만 정적 생성, 나머지는 요청 시 생성
    const TOP_N = 30;
    return dbOnly.slice(0, TOP_N).map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('정적 경로 생성 중 오류:', error);
    return [];
  }
}

// 나머지 슬러그는 런타임에 동적 생성 허용
export const dynamicParams = true;

// 메타데이터 생성
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다 - Hayoung Space',
    };
  }

  return {
    title: `${post.title} - Hayoung Space`,
    description: post.summary || 'Hayoung Space의 블로그 포스트',
  };
}

async function PostArticle({ slug }: { slug: string }) {
  const post = await getCachedBlogPost(slug);
  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Seoul',
    });
  };

  return (
    <article className="max-w-5xl mx-auto px-8 pt-32 pb-20">
      {/* Back Button */}
      <div className="mb-12">
        <Link
          href="../"
          className="inline-flex items-center text-text-secondary hover:text-primary transition-colors font-medium"
        >
          ← 블로그로 돌아가기
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`../?tag=${encodeURIComponent(tag)}`}
              className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mr-2 mb-2 hover:bg-primary/20 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-xl text-text-secondary mb-6">{post.summary}</p>
        )}

        <div className="flex items-center gap-4 text-text-secondary">
          <time className="flex items-center gap-2">
            <span>📅</span>
            {formatDate(post.publishedDate)}
          </time>
          {post.featured && (
            <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">
              추천 글
            </span>
          )}
          {post.source === 'extra' && (
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded">
              Notion Page
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content && <NotionRenderer blocks={post.content} />}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex justify-between items-center">
          <Link
            href="../"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            ← 더 많은 글 보기
          </Link>

          <div className="text-text-secondary text-sm">
            마지막 수정: {formatDate(post.publishedDate)}
          </div>
        </div>
      </footer>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        {/* 상세 페이지가 마운트되면 네비게이션 상태 해제 */}
        <RouteDone />
        <Suspense
          fallback={
            <div className="max-w-5xl mx-auto px-8 pt-32 pb-20">
              <div className="h-6 w-32 rounded bg-gray-200 animate-pulse mb-8" />
              <div className="h-12 w-3/4 rounded bg-gray-200 animate-pulse mb-6" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          }
        >
          <PostArticle slug={slug} />
        </Suspense>
      </div>
    </BlogPageWrapper>
  );
}
