import type { BlogPost } from "@/lib/notion";
import PostsSection from "@/components/blog/sections/PostsSection";

interface BlogListServerProps {
  posts: BlogPost[];
  selectedTags: string[];
  mode: "and" | "or";
}

// 서버 컴포넌트: 필터/분류 로직만 수행하고 실제 렌더링은 클라이언트 컴포넌트(PostsSection)에 위임
export default function BlogListServer({ posts, selectedTags, mode }: BlogListServerProps) {
  const filtered = selectedTags.length
    ? posts.filter((p) => (mode === "and"
        ? selectedTags.every((t: string) => p.tags.includes(t))
        : selectedTags.some((t: string) => p.tags.includes(t))))
    : posts;

  if (!filtered || filtered.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-text-secondary text-lg">일치하는 게시물이 없습니다.</p>
      </div>
    );
  }

  const featuredPosts = filtered.filter((p) => p.featured);
  const projectPosts = filtered.filter((p) => p.postType === "project");
  const notePosts = filtered.filter((p) => p.postType !== "project");

  return (
    <div className="max-w-6xl">
      <PostsSection title="추천 글" posts={featuredPosts} featured />
      <PostsSection title="프로젝트 이슈" posts={projectPosts} />
      <PostsSection title="일상/학습 노트" posts={notePosts} />
    </div>
  );
}


