'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { BlogPost } from '@/utils/notion';

import BlogCard from '@/components/blog/BlogCard';

import { useRouteStore } from '@/store/routeStore';

interface PostsSectionProps {
  title: string;
  posts: BlogPost[];
  featured?: boolean;
}

export default function PostsSection({
  title,
  posts,
  featured = false,
}: PostsSectionProps) {
  const router = useRouter();
  const isNavigating = useRouteStore((s) => s.isNavigating);

  // 상위 N개 포스트 라우트를 선제 프리페치하여 체감 대기 시간 단축
  useEffect(() => {
    const topN = posts.slice(0, 6);
    topN.forEach((p) => router.prefetch(`/blog/${p.slug}`));
  }, [posts, router]);

  if (!posts || posts.length === 0) return null;
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-text-primary mb-8">{title}</h2>
      <div
        className={`group/zone grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${isNavigating ? 'pointer-events-none opacity-95' : ''}`}
        aria-busy={isNavigating}
        aria-disabled={isNavigating}
      >
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            featured={featured}
          />
        ))}
      </div>
    </div>
  );
}
