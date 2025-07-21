"use client";

import Link from "next/link";

interface TagFilterProps {
  tags: string[];
  selectedTag?: string;
}

export default function TagFilter({ tags, selectedTag }: TagFilterProps) {

  return (
    <div className="flex flex-wrap gap-3">
      {/* All Posts */}
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${
            !selectedTag
              ? "bg-primary text-white shadow-lg"
              : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary border border-border"
          }`}
      >
        전체
      </Link>

      {/* Tag Links */}
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              selectedTag === tag
                ? "bg-primary text-white shadow-lg"
                : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary border border-border"
            }`}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
} 