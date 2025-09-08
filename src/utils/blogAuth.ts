import { notFound, redirect } from 'next/navigation';

/**
 * 블로그 기능이 활성화되어 있는지 확인
 */
export function isBlogEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true';
}

/**
 * 블로그 페이지 접근 권한 확인
 * 비활성화된 경우 홈페이지로 리다이렉트하거나 404 처리
 */
export function checkBlogAccess(redirectToHome: boolean = true): void {
  if (!isBlogEnabled()) {
    if (redirectToHome) {
      redirect('/');
    } else {
      notFound();
    }
  }
}

/**
 * 클라이언트 사이드에서 블로그 기능 활성화 상태 확인
 */
export function useBlogEnabled(): boolean {
  return typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true';
}
