import BlogPageWrapper from '@/components/blog/BlogPageWrapper';

export default function Loading() {
  return (
    <BlogPageWrapper
      animationType="fade"
      showImmediate={true}
    >
      <div className="min-h-screen bg-background px-8 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* 제목 스켈레톤 */}
          <div className="mb-16">
            <div className="h-10 w-32 mb-4 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* 태그 필터 스켈레톤 */}
          <div className="mb-12 flex gap-2">
            <div className="h-8 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
          </div>

          {/* 블로그 카드 스켈레톤 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl p-6 border border-gray-200 animate-pulse"
              >
                <div className="h-6 w-3/4 mb-3 rounded bg-gray-200" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-5/6 rounded bg-gray-200" />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-5 w-12 rounded-full bg-gray-200" />
                  <div className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlogPageWrapper>
  );
}
