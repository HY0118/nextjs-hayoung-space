import type { Project } from '@/interfaces/project';

export interface ProjectHandlers {
  setSelectedProject: (project: Project | null) => void;
  openDetail: (mode: 'panel' | 'modal') => void;
}

// 프로젝트 선택 처리
export function handleProjectSelect(project: Project, handlers: ProjectHandlers): void {
  // 프로젝트 선택 및 상세페이지 열기 (스크롤 위치는 openDetail에서 자동 처리)
  handlers.setSelectedProject(project);
  handlers.openDetail('panel');

  // URL 업데이트
  window.history.pushState({ projectId: project.id }, '', `/#projects/${project.id}`);
}
