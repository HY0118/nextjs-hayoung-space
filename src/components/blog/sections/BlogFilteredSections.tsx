'use client';

import { useState } from 'react';

import type { BlogPost } from '@/utils/helpers/notion';

import TagFilter from '@/components/blog/TagFilter';
import BlogListServer from '@/components/blog/sections/BlogListServer';

interface BlogFilteredSectionsProps {
  posts: BlogPost[];
  allTags: string[];
  selectedTagsInit: string[];
  initialMode?: 'and' | 'or';
}

export default function BlogFilteredSections({
  posts,
  allTags,
  selectedTagsInit,
  initialMode = 'and',
}: BlogFilteredSectionsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedTagsInit);
  const [mode, setMode] = useState<'and' | 'or'>(initialMode);

  const hasAny =
    (selectedTags.length
      ? posts.filter((p) =>
          mode === 'and'
            ? selectedTags.every((t: string) => p.tags.includes(t))
            : selectedTags.some((t: string) => p.tags.includes(t)),
        )
      : posts
    ).length > 0;
  const showOrHint = !hasAny && mode === 'and' && selectedTags.length >= 2;

  return (
    <div className="max-w-6xl">
      <div className="mb-6 relative">
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
          mode={mode}
          onModeChange={setMode}
        />
        {showOrHint && (
          <div className="absolute -bottom-10 right-0 bg-surface border border-border rounded-lg px-3 py-2 shadow text-xs text-text-secondary">
            AND로는 결과가 없어요. OR로 바꿔보시겠어요?
            <div className="absolute -top-2 right-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-border/60" />
          </div>
        )}
      </div>
      <BlogListServer
        posts={posts}
        selectedTags={selectedTags}
        mode={mode}
      />
    </div>
  );
}
