/**
 * 스마트 스크롤 유틸리티
 * Fixed header 높이를 자동으로 계산하여 적절한 위치로 스크롤
 */

export const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Fixed header 높이 자동 계산
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;

  // 타겟 위치 계산
  const elementPosition = element.offsetTop;
  const targetPosition = elementPosition - headerHeight;

  // 부드러운 스크롤
  window.scrollTo({
    top: Math.max(0, targetPosition), // 음수가 되지 않도록
    behavior: 'smooth',
  });
};

/**
 * 브라우저의 기본 anchor 스크롤 동작을 방지하고 커스텀 스크롤 사용
 */
export const handleSectionNavigation = (
  event: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string,
  onNavigate?: (sectionId: string) => void,
) => {
  event.preventDefault();

  smoothScrollToSection(sectionId);

  // URL 해시 업데이트 (스크롤 없이)
  const newUrl = `${window.location.pathname}#${sectionId}`;
  window.history.replaceState(null, '', newUrl);

  // 콜백 호출
  onNavigate?.(sectionId);
};
