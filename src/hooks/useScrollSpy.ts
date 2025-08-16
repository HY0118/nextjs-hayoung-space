import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      // 현재 화면에 보이는 모든 섹션을 찾습니다
      const visibleSections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          return {
            id,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter((section): section is NonNullable<typeof section> => section !== null);

      // 화면의 중앙 지점을 계산
      const windowHeight = window.innerHeight;
      const middleOfViewport = windowHeight / 2;

      // 화면 중앙에 가장 가까운 섹션을 찾습니다
      let nearestSection = visibleSections[0]?.id;
      let minDistance = Infinity;

      visibleSections.forEach((section) => {
        // 섹션의 중앙점을 계산
        const sectionMiddle = (section.top + section.bottom) / 2;
        const distance = Math.abs(sectionMiddle - middleOfViewport);

        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = section.id;
        }
      });

      if (nearestSection) {
        setActiveSection(nearestSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 컴포넌트 마운트 시 즉시 실행
    setTimeout(() => {
      handleScroll();
    }, 100); // 약간의 지연을 주어 DOM이 완전히 로드된 후 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
