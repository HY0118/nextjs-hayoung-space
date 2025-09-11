'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { smoothScrollToSection } from '@/utils/helpers/scroll';

interface BackButtonProps {
  locale?: string;
}

const BackButton = ({ locale }: BackButtonProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isNavigating) return;

    setIsNavigating(true);
    const homeUrl = locale ? `/${locale}/` : '/';
    router.push(homeUrl);

    // 페이지 이동 완료 후 issues 섹션으로 정확한 스크롤
    setTimeout(() => {
      smoothScrollToSection('issues');

      // URL 해시 업데이트 (홈페이지에서)
      const newUrl = `${window.location.pathname}#issues`;
      window.history.replaceState(null, '', newUrl);

      // 스크롤 완료 후 상태 리셋 (Navigation.tsx와 동일한 패턴)
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }, 150); // 페이지 전환에 충분한 시간 제공
  };

  return (
    <div className="sticky top-[150px] float-left -ml-20 mb-4 z-50">
      <button
        onClick={handleBackClick}
        disabled={isNavigating}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors
          ${
            isNavigating
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
          }`}
      >
        <svg
          className="w-4 h-4 text-gray-600 dark:text-gray-400"
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
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
