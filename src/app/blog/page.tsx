import { Metadata } from "next";
import { getBlogPosts, getAllTags } from "@lib/notion";
import BlogCard from "@/components/blog/BlogCard";
import TagFilter from "@/components/blog/TagFilter";
import BlogPageWrapper from "@/components/blog/BlogPageWrapper";

export const metadata: Metadata = {
  title: "Blog - Hayoung Space",
  description: "개발과 일상에 대한 생각들을 기록합니다.",
};

// ISR 설정: 60초마다 재생성
export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  // ISR 재생성 시점 로그
  const generationTime = new Date().toISOString();
  console.log(`🔄 [ISR] Blog 페이지 생성 시간: ${generationTime}`);
  
  // API 호출을 병렬로 처리하여 속도 향상
  const [posts, allTags] = await Promise.all([
    getBlogPosts(),
    getAllTags(),
  ]);
  const selectedTag = searchParams.tag;

  // 태그 필터링
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  // 추천 포스트와 일반 포스트 분리
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <section className="pt-32 pb-20 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20">
              <h1 className="text-4xl font-bold text-text-primary mb-6 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
                Blog
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mt-8">
                개발과 일상에 대한 생각들을 기록하고 공유합니다.
              </p>
            </div>
            
            <div className="max-w-6xl">
              {/* Tag Filter */}
              <div className="mb-12">
                <TagFilter tags={allTags} selectedTag={selectedTag} />
              </div>

              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-text-primary mb-8">
                    추천 글
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-8">
                  {selectedTag ? `"${selectedTag}" 태그의 글` : "모든 글"}
                </h2>
                {regularPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-text-secondary text-lg">
                      {selectedTag
                        ? `"${selectedTag}" 태그의 글이 없습니다.`
                        : "아직 작성된 글이 없습니다."}
                    </p>
                  </div>
                )}
              </div>

              {/* ISR 정보 표시 (개발용) */}
              <div className="mt-16 pt-8 border-t border-border/30">
                <p className="text-xs text-text-secondary/60 text-center">
                  📅 페이지 생성 시간: {new Date(generationTime).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BlogPageWrapper>
  );
} 