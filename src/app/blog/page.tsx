import { Metadata } from 'next';
import Link from 'next/link';

import { checkBlogAccess } from '@/utils/helpers/blogAuth';
import { getAllTags, getBlogPosts } from '@/utils/helpers/notion';

import BlogPageWrapper from '@/components/blog/BlogPageWrapper';
import BlogFilteredSections from '@/components/blog/sections/BlogFilteredSections';
import BlogHero from '@/components/blog/sections/BlogHero';

export const metadata: Metadata = {
  title: 'Blog - Hayoung Space',
  description: '개발과 일상에 대한 생각들을 기록하고 공유합니다.',
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; tags?: string }>;
}) {
  // 블로그 기능이 비활성화된 경우 홈으로 리다이렉트
  checkBlogAccess();
  const generationTime = new Date().toISOString();
  console.log(`🔄 [ISR] Blog 페이지 생성 시간: ${generationTime}`);

  const resolved = await searchParams;
  const [posts, allTags] = await Promise.all([getBlogPosts(), getAllTags()]);
  const selectedTags = (resolved.tags || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const selectedTag = resolved.tag;
  const effectiveSelected =
    selectedTags.length > 0 ? selectedTags : selectedTag ? [selectedTag] : [];

  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-8">
            <BlogHero />
            <BlogFilteredSections
              posts={posts}
              allTags={allTags}
              selectedTagsInit={effectiveSelected}
            />
            {/* 프리로딩: 최초 접속 시 첫 포스트 몇 개의 상세 경로를 미리 워밍업 */}
            <div
              className="sr-only"
              aria-hidden
            >
              {posts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`./blog/${p.slug}`}
                  prefetch
                />
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-border/30">
              <p
                className="text-xs text-text-secondary/60 text-center"
                suppressHydrationWarning
              >
                📅 페이지 생성 시간:{' '}
                {new Date(generationTime).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </BlogPageWrapper>
  );
}
