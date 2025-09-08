import type { AnimationControls } from 'framer-motion';

export interface PageAnimationHandlers {
  canPrev: boolean;
  canNext: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  rightControls: AnimationControls;
  spreadsLength: number;
}

export function createPageHandlers({
  canPrev,
  canNext,
  setCurrent,
  rightControls,
  spreadsLength,
}: PageAnimationHandlers) {
  const handlePrev = async () => {
    if (!canPrev) return;
    // 들어있는 페이지를 오른쪽으로 넘기는 느낌 (오른쪽 페이지가 뒤로 젖혀짐)
    await rightControls.start({
      rotateY: 100,
      transformOrigin: 'right center',
      transition: { duration: 0.45, ease: 'easeInOut' },
      boxShadow: '-20px 0 40px rgba(0,0,0,0.15)',
    });
    setCurrent((c) => Math.max(c - 1, 0));
    // 다음 프레임에서 왼쪽에서 넘어오는 페이지 연출
    await rightControls.set({
      rotateY: -100,
      transformOrigin: 'left center',
      boxShadow: '20px 0 40px rgba(0,0,0,0.15)',
    });
    await rightControls.start({
      rotateY: 0,
      transition: { duration: 0.45, ease: 'easeInOut' },
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    });
  };

  const handleNext = async () => {
    if (!canNext) return;
    // 현재 오른쪽 페이지가 왼쪽으로 넘어가는 애니메이션
    await rightControls.start({
      rotateY: -100,
      transformOrigin: 'left center',
      transition: { duration: 0.45, ease: 'easeInOut' },
      boxShadow: '20px 0 40px rgba(0,0,0,0.15)',
    });
    setCurrent((c) => Math.min(c + 1, Math.max(spreadsLength - 1, 0)));
    // 새 오른쪽 페이지가 오른쪽에서 닫히며 나타남
    await rightControls.set({
      rotateY: 100,
      transformOrigin: 'right center',
      boxShadow: '-20px 0 40px rgba(0,0,0,0.15)',
    });
    await rightControls.start({
      rotateY: 0,
      transition: { duration: 0.45, ease: 'easeInOut' },
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    });
  };

  return { handlePrev, handleNext };
}
