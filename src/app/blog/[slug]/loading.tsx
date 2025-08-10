export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-8 pt-32 pb-20">
        {/* 빠른 스켈레톤 - 클라이언트 컴포넌트 의존 없이 즉시 표시 */}
        <div className="mb-12">
          <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
        </div>

        <header className="mb-12">
          <div className="mb-6 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="h-12 w-3/4 mb-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-6 w-full mb-6 rounded bg-gray-200 animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
            <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </header>

        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse" />
          <div className="h-8 w-full mt-8 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}