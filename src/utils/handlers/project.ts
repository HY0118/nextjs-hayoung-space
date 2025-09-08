import type { Project } from '@/interfaces/project';

export interface ProjectHandlers {
  setSelectedProject: (project: Project | null) => void;
  openDetail: (mode: 'panel' | 'modal') => void;
}

// 프로젝트 선택 시 스크롤 애니메이션
export async function handleProjectSelect(
  project: Project,
  handlers: ProjectHandlers,
): Promise<void> {
  const card = document.querySelector(`#project-card-${project.id}`);
  if (!card) return;

  // URL 업데이트
  window.history.pushState({ projectId: project.id }, '', `/#projects/${project.id}`);
  handlers.setSelectedProject(project);

  // 스크롤 애니메이션 계산
  const cardRect = card.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTo = window.scrollY + cardRect.top - (windowHeight - cardRect.height) / 2;

  const startPosition = window.scrollY;
  const distance = scrollTo - startPosition;
  const duration = 400;
  const startTime = performance.now();

  return new Promise<void>((resolve) => {
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      window.scrollTo({
        top: startPosition + distance * easeProgress,
        behavior: 'auto',
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setTimeout(() => {
          handlers.openDetail('panel');
          resolve();
        }, 50);
      }
    };

    requestAnimationFrame(animateScroll);
  });
}
