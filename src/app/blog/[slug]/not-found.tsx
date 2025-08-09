import Link from "next/link";
import BlogPageWrapper from "@/components/blog/BlogPageWrapper";

export default function NotFound() {
  return (
    <BlogPageWrapper animationType="fade">
      <div className="min-h-screen bg-background">
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center px-8">
            <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-text-secondary mb-6">
              블로그 포스트를 찾을 수 없습니다
            </h2>
            <p className="text-text-secondary mb-8 max-w-md">
              요청하신 블로그 포스트가 존재하지 않거나 삭제되었을 수 있습니다.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                블로그로 돌아가기
              </Link>
              <Link
                href="/"
                className="bg-surface text-text-primary px-6 py-3 rounded-lg border border-border hover:bg-surface/80 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogPageWrapper>
  );
} 