import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getBlogPost, getBlogPosts } from "@lib/notion";
import NotionRenderer from "@/components/blog/NotionRenderer";
import BlogPageWrapper from "@/components/blog/BlogPageWrapper";
import Link from "next/link";

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
    
    // 모든 포스트의 경로를 미리 생성
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("정적 경로 생성 중 오류:", error);
    // 에러 시 빈 배열 반환 (동적 생성으로 폴백)
    return [];
  }
}

// 메타데이터 생성
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);
  
  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다 - Hayoung Space",
    };
  }

  return {
    title: `${post.title} - Hayoung Space`,
    description: post.summary || "Hayoung Space의 블로그 포스트",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        <article className="max-w-4xl mx-auto px-8 pt-32 pb-20">
          {/* Back Button */}
          <div className="mb-12">
            <Link
              href="/blog"
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
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
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
              <p className="text-xl text-text-secondary mb-6">
                {post.summary}
              </p>
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
                href="/blog"
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
      </div>
    </BlogPageWrapper>
  );
} 