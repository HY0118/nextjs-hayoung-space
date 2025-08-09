"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/notion";
import TagFilter from "@/components/blog/TagFilter";
import PostsSection from "@/components/blog/sections/PostsSection";

interface BlogFilteredSectionsProps {
  posts: BlogPost[];
  allTags: string[];
  selectedTagsInit: string[];
  initialMode?: "and" | "or";
}

export default function BlogFilteredSections({ posts, allTags, selectedTagsInit, initialMode = "and" }: BlogFilteredSectionsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedTagsInit);
  const [mode, setMode] = useState<"and" | "or">(initialMode);

  const filtered = selectedTags.length
    ? posts.filter((p) => (mode === "and"
        ? selectedTags.every((t: string) => p.tags.includes(t))
        : selectedTags.some((t: string) => p.tags.includes(t))))
    : posts;

  const featuredPosts = filtered.filter((p) => p.featured);
  const projectPosts = filtered.filter((p) => p.postType === "project");
  const notePosts = filtered.filter((p) => p.postType !== "project");

  const hasAny = filtered.length > 0;
  const showOrHint = !hasAny && mode === "and" && selectedTags.length >= 2;

  return (
    <div className="max-w-6xl">
      <div className="mb-6 relative">
        <TagFilter tags={allTags} selectedTags={selectedTags} onChange={setSelectedTags} mode={mode} onModeChange={setMode} />
        {showOrHint && (
          <div className="absolute -bottom-10 right-0 bg-surface border border-border rounded-lg px-3 py-2 shadow text-xs text-text-secondary">
            AND로는 결과가 없어요. OR로 바꿔보시겠어요?
            <div className="absolute -top-2 right-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-border/60" />
          </div>
        )}
      </div>

      {!hasAny ? (
        <div className="text-center py-24">
          <p className="text-text-secondary text-lg">일치하는 게시물이 없습니다.</p>
        </div>
      ) : (
        <>
          <PostsSection title="추천 글" posts={featuredPosts} featured />
          <PostsSection title="프로젝트 이슈" posts={projectPosts} />
          <PostsSection title="일상/학습 노트" posts={notePosts} />
        </>
      )}
    </div>
  );
}
