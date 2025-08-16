'use client';

import { ReactNode, useEffect, useState } from 'react';

import PageTransition from '@/components/common/PageTransition';

interface BlogPageWrapperProps {
  children: ReactNode;
  animationType?: 'slide' | 'fade';
  showImmediate?: boolean;
}

export default function BlogPageWrapper({
  children,
  animationType = 'slide',
  showImmediate = false,
}: BlogPageWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    setIsClient(true);

    // 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 브라우저의 스크롤 복원 기능 비활성화
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // 즉시 표시 모드일 경우 하이드레이션 대기 없이 렌더링
  if (showImmediate && !isClient) {
    return <div className="animate-fadeIn">{children}</div>;
  }

  return (
    <PageTransition direction={animationType === 'slide' ? 'right' : 'fade'}>
      {children}
    </PageTransition>
  );
}
