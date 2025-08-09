import { Metadata } from "next";
import { getBlogPosts, getAllTags } from "@lib/notion";
import BlogPageWrapper from "@/components/blog/BlogPageWrapper";
import BlogHero from "@/components/blog/sections/BlogHero";
import BlogFilteredSections from "@/components/blog/sections/BlogFilteredSections";

export const metadata: Metadata = {
  title: "Blog - Hayoung Space",
  description: "개발과 일상에 대한 생각들을 기록하고 공유합니다.",
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; tags?: string }>;
}) {
  const generationTime = new Date().toISOString();
  console.log(`🔄 [ISR] Blog 페이지 생성 시간: ${generationTime}`);

  const resolved = await searchParams;
  const [posts, allTags] = await Promise.all([getBlogPosts(), getAllTags()]);
  const selectedTags = (resolved.tags || "").split(",").map((s) => s.trim()).filter(Boolean);
  const selectedTag = resolved.tag;
  const effectiveSelected = selectedTags.length > 0 ? selectedTags : (selectedTag ? [selectedTag] : []);

  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-8">
            <BlogHero />
            <BlogFilteredSections posts={posts} allTags={allTags} selectedTagsInit={effectiveSelected} />
            <div className="mt-16 pt-8 border-t border-border/30">
              <p className="text-xs text-text-secondary/60 text-center">
                📅 페이지 생성 시간: {new Date(generationTime).toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </BlogPageWrapper>
  );
} 