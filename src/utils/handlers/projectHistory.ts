import { projects } from '@/constants/projects';

import type { Project } from '@/interfaces/project';

export interface HistoryHandlers {
  setSelectedProject: (project: Project | null) => void;
  openDetail: (mode: 'panel' | 'modal') => void;
  closeDetail: () => void;
}

// popstate 이벤트 핸들러 설정
export function setupProjectHistory(handlers: HistoryHandlers): () => void {
  const handlePopState = (event: PopStateEvent) => {
    const path = window.location.hash;
    const projectMatch = path.match(/#projects\/(.+)/);

    if (!projectMatch) {
      handlers.closeDetail(); // 스크롤 복원과 함께 상세페이지 닫기
    } else if (event.state?.projectId) {
      const project = projects.find((p) => p.id === event.state.projectId);
      if (project) {
        handlers.setSelectedProject(project);
        handlers.openDetail('panel');
      }
    }
  };

  window.addEventListener('popstate', handlePopState);

  // cleanup 함수 반환
  return () => window.removeEventListener('popstate', handlePopState);
}
