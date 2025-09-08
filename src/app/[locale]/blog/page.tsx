import { checkBlogAccess } from '@/utils/blogAuth';

// 기본 블로그 페이지 설정 재사용
export { metadata } from '@/app/blog/page';
export const revalidate = 60;

// 로케일별 블로그 페이지 래퍼
export default async function LocaleBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; tags?: string }>;
}) {
  // 블로그 기능이 비활성화된 경우 홈으로 리다이렉트
  checkBlogAccess();

  // 기본 블로그 페이지 컴포넌트 import 및 렌더링
  const { default: BlogPage } = await import('@/app/blog/page');
  return <BlogPage searchParams={searchParams} />;
}
