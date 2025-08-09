"use client";

import BlogCard from "@/components/blog/BlogCard";
import { BlogPost } from "@/lib/notion";

interface PostsSectionProps {
  title: string;
  posts: BlogPost[];
  featured?: boolean;
}

export default function PostsSection({ title, posts, featured = false }: PostsSectionProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-text-primary mb-8">{title}</h2>
      <div className="group/zone grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} featured={featured} />
        ))}
      </div>
    </div>
  );
}
