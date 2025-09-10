import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Issue Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            요청하신 기술 이슈 해결 사례를 찾을 수 없습니다.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/#issues"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Issues 섹션으로 돌아가기
          </Link>

          <div>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
