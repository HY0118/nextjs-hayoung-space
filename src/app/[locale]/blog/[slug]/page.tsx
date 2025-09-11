import { checkBlogAccess } from '@/utils/helpers/blogAuth';

// ISR 설정: 60초마다 재생성 (원본과 동일)
export const revalidate = 60;

// 기본 블로그 슬러그 페이지 설정 재사용
export { generateStaticParams, generateMetadata } from '@/app/blog/[slug]/page';

// 로케일별 블로그 슬러그 페이지 래퍼
export default async function LocaleBlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 블로그 기능이 비활성화된 경우 홈으로 리다이렉트
  checkBlogAccess();

  // 기본 블로그 슬러그 페이지 컴포넌트 import 및 렌더링
  const { default: BlogSlugPage } = await import('@/app/blog/[slug]/page');
  return <BlogSlugPage params={params} />;
}
